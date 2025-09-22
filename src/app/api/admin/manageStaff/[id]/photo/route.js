import dbConnect from '@/lib/DBconnection';
import Staff from '@/models/staff'; // Import Staff model
import cloudinary from '@/lib/cloudinary';

// Upload profile photo
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    let staff;
    
    // Check if it's a MongoDB ID
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      staff = await Staff.findById(id);
    } else {
      // Search by StaffID
      staff = await Staff.findOne({
        StaffID: parseInt(id) || id
      });
    }
    
    if (!staff) {
      return Response.json({
        success: false,
        message: 'Staff not found'
      }, { status: 404 });
    }
    
    const formData = await request.formData();
    const file = formData.get('photo');
    
    if (!file) {
      return Response.json({
        success: false,
        message: 'No photo file provided'
      }, { status: 400 });
    }
    
    // Convert file to buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Delete old photo from Cloudinary if exists
    if (staff.photo && staff.photo.public_id) {
      try {
        await cloudinary.uploader.destroy(staff.photo.public_id);
      } catch (cloudinaryError) {
        console.error('Error deleting old photo:', cloudinaryError);
      }
    }
    
    // Upload new photo to Cloudinary using base64
    const base64String = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'staff-photos', // Changed folder name
      transformation: [
        { width: 300, height: 300, crop: 'fill' },
        { quality: 'auto' },
        { format: 'auto' }
      ]
    });
    
    // Update staff with new photo details
    staff.photo = {
      public_id: result.public_id,
      url: result.secure_url
    };
    
    await staff.save();
    
    return Response.json({
      success: true,
      data: {
        photo: staff.photo
      }
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Delete profile photo
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    let staff;
    
    // Check if it's a MongoDB ID
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      staff = await Staff.findById(id);
    } else {
      // Search by StaffID
      staff = await Staff.findOne({
        StaffID: parseInt(id) || id
      });
    }
    
    if (!staff) {
      return Response.json({
        success: false,
        message: 'Staff not found'
      }, { status: 404 });
    }
    
    // Delete photo from Cloudinary if exists
    if (staff.photo && staff.photo.public_id) {
      try {
        await cloudinary.uploader.destroy(staff.photo.public_id);
      } catch (cloudinaryError) {
        console.error('Error deleting photo from Cloudinary:', cloudinaryError);
      }
      
      // Remove photo from staff record
      staff.photo = {
        public_id: null,
        url: null
      };
      
      await staff.save();
    }
    
    return Response.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};