import { NextResponse } from 'next/server';
import Staff from '@/models/staff';
import connectDB from '@/lib/DBconnection';

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// POST request handler for creating new staff
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Generate next StaffID (start from 1000 if none exists)
    const latest = await Staff.findOne({}).sort({ StaffID: -1 }).lean();
    const nextStaffId = (latest?.StaffID || 1000) + 1;

    const staffData = {
      Name: body.Name,
      StaffID: nextStaffId,
      JoinningData: body.JoinningData ? new Date(body.JoinningData) : null,
      Designation: body.Designation,
      DOB: body.DOB ? new Date(body.DOB) : null,
      FatherName: body.FatherNameORHusbandName || body.FatherName || '',
      Address: body.Address,
      WorkDuration: body.WorkDuration,
      gender: body.gender,
      qualification: body.qualification,
    };

    // Validate required fields (StaffID generated above)
    if (!staffData.Name || !staffData.DOB || !staffData.Designation || !staffData.WorkDuration || !staffData.gender || !staffData.qualification) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, DOB, Designation, WorkDuration, gender, and qualification are required',
        },
        { status: 400 }
      );
    }

    // Handle photo: accept either already-uploaded object or base64 from client
    if (body.photo && (body.photo.url || body.photo.public_id)) {
      staffData.photo = {
        public_id: body.photo.public_id || null,
        url: body.photo.url || null,
      };
    } else if (body.photoBase64) {
      staffData.photo = {
        public_id: null,
        url: body.photoBase64, // store as data URL or base64 string
      };
    }

    // Create new staff member
    const staff = await Staff.create(staffData);

    return NextResponse.json(
      {
        success: true,
        message: 'Staff member added successfully',
        data: staff,
        StaffID: staff.StaffID,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating staff:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Staff ID already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create staff member' },
      { status: 400 }
    );
  }
}