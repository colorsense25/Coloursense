import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Staff from '@/models/staff';
import connectDB from '@/lib/DBconnection';
import cloudinary from '@/lib/cloudinary';

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// GET request handler for listing all staff
export async function GET() {
  try {
    await connectToDatabase();
    const staffList = await Staff.find({}).sort({ StaffID: 1 }).lean();
    return NextResponse.json(staffList, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch staff list' },
      { status: 500 }
    );
  }
}

// POST request handler for creating new staff with base64 photo
export async function POST(request) {
  let staffData = {};
  
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    staffData = {
      Name: body.Name,
      StaffID: body.StaffID,
      JoinningData: body.JoinningData ? new Date(body.JoinningData) : null,
      Designation: body.Designation,
      DOB: new Date(body.DOB),
      FatherName: body.FatherName,
      Address: body.Address,
      WorkDuration: body.WorkDuration,
      gender: body.gender,
      qualification: body.qualification
    };

    // Validate required fields
    if (!staffData.Name || !staffData.StaffID || !staffData.DOB || !staffData.Designation) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Name, StaffID, DOB, and Designation are required fields' 
        },
        { status: 400 }
      );
    }

    // Check if staff with same StaffID already exists
    const existingStaff = await Staff.findOne({ StaffID: staffData.StaffID });
    
    if (existingStaff) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Staff ID already exists' 
        },
        { status: 400 }
      );
    }

    // Handle base64 photo upload if provided
    if (body.photoBase64) {
      try {
        const result = await cloudinary.uploader.upload(body.photoBase64, {
          folder: 'staff-photos'
          // Removed transformation options
        });
        
        staffData.photo = {
          public_id: result.public_id,
          url: result.secure_url
        };
      } catch (uploadError) {
        console.error('Photo upload error:', uploadError);
        return NextResponse.json(
          { 
            success: false, 
            message: 'Failed to upload photo' 
          },
          { status: 500 }
        );
      }
    }

    // Create new staff member
    const staff = await Staff.create(staffData);
    
    return NextResponse.json({
      success: true,
      message: 'Staff member added successfully',
      data: staff
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating staff:', error);
    
    // Clean up uploaded photo if staff creation fails
    if (staffData.photo && staffData.photo.public_id) {
      try {
        await cloudinary.uploader.destroy(staffData.photo.public_id);
      } catch (cleanupError) {
        console.error('Error cleaning up photo:', cleanupError);
      }
    }
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Staff ID already exists' },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  }
}