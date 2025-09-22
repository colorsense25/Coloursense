import connectToDatabase from '@/lib/DBconnection'; 
import Staff from '@/models/staff';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse request body
    const { staffID, dob } = await request.json();

    // Validate input
    if (!staffID || !dob) {
      return NextResponse.json(
        { error: 'StaffID and DOB are required' },
        { status: 400 }
      );
    }

    // Convert StaffID to number and DOB to Date object
    const numericStaffID = Number(staffID);
    const dobDate = new Date(dob);

    // Validate StaffID conversion
    if (isNaN(numericStaffID)) {
      return NextResponse.json(
        { error: 'StaffID must be a valid number' },
        { status: 400 }
      );
    }

    // Validate DOB conversion
    if (isNaN(dobDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format for DOB' },
        { status: 400 }
      );
    }

    // Find staff member by StaffID and DOB
    const staff = await Staff.findOne({
      StaffID: numericStaffID,
      DOB: dobDate,
    });

    // Check if staff exists
    if (!staff) {
      return NextResponse.json(
        { error: 'Invalid StaffID or DOB' },
        { status: 404 }
      );
    }

    // Return all staff data including new fields
    return NextResponse.json(
      {
        message: 'Staff verified successfully',
        data: {
          Name: staff.Name,
          StaffID: staff.StaffID,
          JoinningData: staff.JoinningData,
          Designation: staff.Designation,
          DOB: staff.DOB,
          FatherName: staff.FatherName,
          Address: staff.Address,
          // New fields from updated schema
          photo: staff.photo,
          WorkDuration: staff.WorkDuration,
          gender: staff.gender,
          qualification: staff.qualification,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying staff:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}