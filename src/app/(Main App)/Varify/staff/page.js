'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Calendar, 
  Badge, 
  GraduationCap, 
  MapPin, 
  Clock, 
  VenusAndMars,
  Download,
  ShieldCheck,
  AlertCircle,
  Camera,
  Mail,
  Phone,
  Building,
  Award,
  Star,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

const StaffVerification = () => {
  const [formData, setFormData] = useState({
    staffID: '',
    dob: ''
  });
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStaffData(null);

    try {
      const response = await fetch('/api/Varification/Varification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setStaffData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ staffID: '', dob: '' });
    setStaffData(null);
    setError('');
  };

  const downloadStaffCard = () => {
    // Implement download functionality
    console.log('Download staff card');
  };

  // Mock photo data - replace with actual data from API
  const getStaffPhoto = () => {
    return staffData?.photo?.url || '/api/placeholder/150/150';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/20';
      case 'On Leave': return 'text-yellow-400 bg-yellow-400/20';
      case 'Inactive': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-16 pb-36 from-gray-900 via-black to-gray-900 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-white bg-clip-text text-transparent bg-300% animate-gradient">
              Staff Verification Portal
            </h1>
          </div>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Secure identity verification system with advanced biometric authentication and real-time validation
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Verification Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-1"
          >
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-blue-500/10">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Quick Verification</h2>
                  <p className="text-gray-400 text-sm">Enter credentials to verify identity</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Staff ID Input */}
                <div className="group">
                  <label htmlFor="staffID" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <Badge className="h-4 w-4 mr-2 text-blue-400" />
                    Staff Identification Number
                  </label>
                  <div className="relative">
                    <Badge className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="number"
                      id="staffID"
                      name="staffID"
                      value={formData.staffID}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your unique Staff ID"
                    />
                  </div>
                </div>

                {/* Date of Birth Input */}
                <div className="group">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Security Note */}
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                    <p className="text-yellow-300 text-sm">
                      Your information is securely encrypted and will not be stored or shared.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-3" />
                      Verify Identity
                    </>
                  )}
                </motion.button>
              </form>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start"
                  >
                    <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-red-300 font-medium block">Verification Failed</span>
                      <span className="text-red-400 text-sm">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Results Panel - Right Side */}
          <div className="xl:col-span-2">
            <AnimatePresence mode="wait">
              {staffData ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-500/30 hover:border-green-500/50 transition-all duration-500 h-full"
                >
                  {/* Success Header with Photo */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                    <div className="flex items-center mb-4 lg:mb-0">
                      {/* Staff Photo */}
                      <div className="relative mr-6">
                        <div className="h-44 w-44 rounded-2xl border-4 border-green-500/30 overflow-hidden bg-gray-700">
                          {staffData.photo?.url ? (
                            <img 
                              src={staffData.photo.url} 
                              alt={staffData.Name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/150/150';
                              }}
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                              <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-gray-800">
                          <ShieldCheck className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-1">{staffData.Name}</h2>
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Verified Identity
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                            {staffData.Designation}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    
                  </div>

                  {/* Enhanced Staff Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-400" />
                        Personal Information
                      </h3>
                      <DetailItem icon={Badge} label="Staff ID" value={staffData.StaffID} />
                      <DetailItem icon={Calendar} label="Date of Birth" value={new Date(staffData.DOB).toLocaleDateString()} />
                       <DetailItem icon={VenusAndMars} label="Gender" value={staffData.gender} />
                      <DetailItem icon={User} label="Father's Name" value={staffData.FatherName} />
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Building className="h-5 w-5 mr-2 text-green-400" />
                        Professional Details
                      </h3>
                      <DetailItem icon={Calendar} label="Joining Date" value={new Date(staffData.JoinningData).toLocaleDateString()} />
                      <DetailItem icon={Award} label="Designation" value={staffData.Designation} />
                      <DetailItem icon={Clock} label="Work Duration" value={staffData.WorkDuration} />
                      <DetailItem icon={GraduationCap} label="Qualification" value={staffData.qualification} />
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                        Contact Information
                      </h3>
                      <DetailItem icon={MapPin} label="Address" value={staffData.Address} />
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Star className="h-5 w-5 mr-2 text-yellow-400" />
                        Additional Info
                      </h3>
                      <div className="p-4 bg-gray-900/50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Verification Status</span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">Active</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Last verified: {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <div className="relative mb-6">
                    <div className="h-32 w-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                      <User className="h-16 w-16 text-gray-600" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-400 mb-3">
                    Staff Verification Ready
                  </h3>
                  <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                    Enter the staff ID and date of birth to verify identity and access comprehensive profile details including photo verification.
                  </p>
                  <div className="mt-6 flex space-x-2">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: item * 0.2 }}
                        className="h-2 w-2 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Detail Item Component
const DetailItem = ({ icon: Icon, label, value }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
    className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-all duration-300 group border border-transparent hover:border-gray-700/50"
  >
    <div className="flex items-center">
      <div className="h-10 w-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-5 w-5 text-blue-400" />
      </div>
      <div>
        <span className="text-gray-400 text-sm block">{label}</span>
        <span className="text-white font-medium">{value || 'N/A'}</span>
      </div>
    </div>
  </motion.div>
);

export default StaffVerification;