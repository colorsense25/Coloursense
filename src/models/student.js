import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
      },
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
      gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
          values: ['Male', 'Female', 'Other'],
          message: 'Gender must be either Male, Female, or Other',
        },
        trim: true,
      },
      fatherName: {
        type: String,
        required: [true, "Father's name is required"],
        trim: true,
      },
      phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'],
      },
      dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required'],
      },
      joiningDate: {
        type: Date,
        required: [true, 'Joining date is required'],
        default: Date.now,
      },
      farewellDate: {
        type: Date,
      },
      selectedCourse: {
        type: String,
        required: [true, 'Course selection is required'],
      },
      courseDuration: {
        type: String,
        required: [true, 'Course duration is required'],
        enum: ['3 Months', '6 Months', '1 Year'],
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
      },
      certificate: {
        type: Boolean,
        default: false,
      },
      });  
      
    
  
  // Auto-generate Roll Number before saving
  userSchema.pre('save', async function (next) {
    if (this.rollNo) return next();
  
    const currentYear = new Date().getFullYear();
    const lastUser = await mongoose.model('registered_students').findOne().sort({ rollNo: -1 });
  
    let newRollNo;
    if (lastUser && lastUser.rollNo && lastUser.rollNo.startsWith(currentYear.toString())) {
      const lastRollNumber = parseInt(lastUser.rollNo.slice(4), 10);
      newRollNo = `${currentYear}${String(lastRollNumber + 1).padStart(3, '0')}`;
    } else {
      newRollNo = `${currentYear}001`;
    }
  
    this.rollNo = newRollNo;
    next();
  });
  
  
  // Create indexes for frequently queried fields
  userSchema.index({ emailAddress: 1 });
  userSchema.index({ aadharNumber: 1 });
  userSchema.index({ rollNo: 1 });
  
  // Export the model
  const registered_students = mongoose.models.registered_students || mongoose.model('registered_students', userSchema);
  export default registered_students;
      
