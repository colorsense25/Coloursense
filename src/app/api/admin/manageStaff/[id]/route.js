import dbConnect from '@/lib/DBconnection';
import Staff from '@/models/staff'; // Import Staff model
import cloudinary from '@/lib/cloudinary';

// Get staff by ID or StaffID
export async function GET(request, { params }) {
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
    
    return Response.json({
      success: true,
      data: staff
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Update staff
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
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
    
    // Check if StaffID is being updated and if it already exists
    if (body.StaffID && body.StaffID !== staff.StaffID) {
      const existingStaff = await Staff.findOne({ StaffID: body.StaffID });
      if (existingStaff) {
        return Response.json({
          success: false,
          message: 'Staff ID already exists'
        }, { status: 400 });
      }
    }
    
    // Update staff
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff._id,
      body,
      { new: true, runValidators: true }
    );
    
    return Response.json({
      success: true,
      data: updatedStaff
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return Response.json({
        success: false,
        message: `${field} already exists`
      }, { status: 400 });
    } else {
      return Response.json({ success: false, message: error.message }, { status: 400 });
    }
  }
}

// Delete staff
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
      await cloudinary.uploader.destroy(staff.photo.public_id);
    }
    
    await Staff.findByIdAndDelete(staff._id);
    
    return Response.json({
      success: true,
      message: 'Staff deleted successfully'
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}