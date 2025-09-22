
import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  Name: String,
  StaffID: { type: Number, unique: true },
  JoinningData: Date,
  Designation: String,
  DOB: { type: Date, required: true },
  FatherName: String,
  Address: String,
  photo: {
    public_id: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  },
  WorkDuration: {
    type: String,
    required: [true, 'Course duration is required'],
    enum: ['3 Months', '6 Months', '1 Year'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be either Male, Female, or Other',
    },
    trim: true,
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    enum: ['8th','10th', '12th', 'Graduated'],
  },
});

const Staff = mongoose.models['Staff Data'] || mongoose.model('Staff Data', staffSchema);

export default Staff;
