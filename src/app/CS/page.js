"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { 
  FaUserGraduate, FaChalkboardTeacher, FaEdit, FaUserEdit,
  FaMoneyBillWave, FaUsers, FaCamera, FaCertificate,
  FaChevronLeft, FaChevronRight, FaSignOutAlt, FaCalendarAlt,
  FaTimes, FaHome, FaChartLine, FaCog, FaBars
} from 'react-icons/fa';
import { GrGallery } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isHovering, setIsHovering] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    certifiedStudents: 0,
    totalstaff: 0,
  });
  const [statsError, setStatsError] = useState(null);

  // Close mobile menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = localStorage.getItem('adminData');
        if (adminData) {
          const parsedData = JSON.parse(adminData);
          setAdminName(parsedData.name || 'Admin');
        }

        const [totalRes, activeRes, certifiedRes, staffRes] = await Promise.all([
          fetch('/api/admin/stats?type=total', { method: 'GET' }),
          fetch('/api/admin/stats?type=active', { method: 'GET' }),
          fetch('/api/admin/stats?type=certified', { method: 'GET' }),
          fetch('/api/admin/stats?type=staff', { method: 'GET' }),
        ]);

        const errors = [];
        if (!totalRes.ok) errors.push(`Total: ${totalRes.status}`);
        if (!activeRes.ok) errors.push(`Active: ${activeRes.status}`);
        if (!certifiedRes.ok) errors.push(`Certified: ${certifiedRes.status}`);
        if (!staffRes.ok) errors.push(`Staff: ${staffRes.status}`);
        if (errors.length > 0) {
          throw new Error(`Failed to fetch data: ${errors.join(', ')}`);
        }

        const totalData = await totalRes.json();
        const activeData = await activeRes.json();
        const certifiedData = await certifiedRes.json();
        const staffData = await staffRes.json();

        setStats({
          totalStudents: totalData.data?.totalStudents || 0,
          activeStudents: activeData.data?.activeStudents || 0,
          certifiedStudents: certifiedData.data?.certifiedStudents || 0,
          totalStaff: staffData.data?.certifiedStaff || staffData.data?.totalStaff || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStatsError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const actionCards = [
    { 
      id: 'view-students', 
      title: 'View Students', 
      icon: <FaUsers className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-indigo-900',
      hoverBgColor: 'bg-indigo-800',
      textColor: 'text-indigo-100',
      path: '/skillup/students/all-students'
    },
    { 
      id: 'add-student', 
      title: 'Add Student', 
      icon: <FaUserGraduate className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-purple-900',
      hoverBgColor: 'bg-purple-800',
      textColor: 'text-purple-100',
      path: '/skillup/students/add-student'
    },
    { 
      id: 'add-staff', 
      title: 'Add Staff', 
      icon: <FaChalkboardTeacher className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-blue-900',
      hoverBgColor: 'bg-blue-800',
      textColor: 'text-blue-100',
      path: '/CS/staff/addstaff'
    },
    { 
      id: 'edit-student', 
      title: 'Edit Student', 
      icon: <FaEdit className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-green-900',
      hoverBgColor: 'bg-green-800',
      textColor: 'text-green-100',
      path: '/skillup/students/edit-student'
    },
    { 
      id: 'edit-staff', 
      title: 'Edit Staff', 
      icon: <FaUserEdit className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-yellow-900',
      hoverBgColor: 'bg-yellow-800',
      textColor: 'text-yellow-100',
      path: '/skillup/edit-staff'
    },
    { 
      id: 'edit-gallery', 
      title: 'Edit Gallery', 
      icon: <GrGallery className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-teal-900',
      hoverBgColor: 'bg-teal-800',
      textColor: 'text-teal-100',
      path: '/CS/editGallery'
    },
    { 
      id: 'add-admin', 
      title: 'Add Admin', 
      icon: <GrUserAdmin  className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-cyan-900',
      hoverBgColor: 'bg-cyan-800',
      textColor: 'text-cyan-100',
      path: '/CS/addAdmin'
    },
    { 
      id: 'certificates', 
      title: 'Certificates', 
      icon: <FaCertificate className="text-2xl md:text-3xl lg:text-4xl" />,
      bgColor: 'bg-pink-900',
      hoverBgColor: 'bg-pink-800',
      textColor: 'text-pink-100',
      path: '/skillup/certificate'
    }
  ];

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin-login');
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-900"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030712] lg:pt-5 text-gray-100"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 shadow-sm py-4 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-30"
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          <Link href="/skillup" className="flex items-center">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-blue-600 p-2 rounded-lg"
            >
              <FaUserGraduate className="text-white text-lg sm:text-xl" />
            </motion.div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 ml-2 sm:p-4">
              Color Sense Admin Section
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCalendarOpen(true)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
          >
            <FaCalendarAlt className="text-gray-300" />
            <span className="hidden sm:inline">Calendar</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 shadow-md text-sm sm:text-base"
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-800 shadow-xl z-40 p-4 overflow-y-auto md:hidden"
          >
            <div className="grid grid-cols-1 gap-2">
              {actionCards.map((card) => (
                <Link href={card.path} key={card.id} onClick={() => setMobileMenuOpen(false)}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`${card.bgColor} ${card.textColor} rounded-lg p-3 flex items-center space-x-3`}
                  >
                    <div>{card.icon}</div>
                    <span>{card.title}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-blue-500"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-2">
            Welcome back, <span className="text-blue-400">{adminName}</span>!
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            You are the Admin now, You have the Power!!!
          </p>
          
          {statsError ? (
            <div className="text-red-400 text-center mt-4">Error: {statsError}</div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4"
            >
              <div className="bg-yellow-900 bg-opacity-50 p-2 sm:p-4 rounded-lg border border-yellow-800">
                <p className="text-xs sm:text-sm text-yellow-300">Active Students</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-100">{stats.activeStudents}</p>
              </div>
              <div className="bg-red-900 bg-opacity-50 p-2 sm:p-4 rounded-lg border border-red-800">
                <p className="text-xs sm:text-sm text-red-300">Certificate Issued</p>
                <p className="text-lg sm:text-2xl font-bold text-red-100">{stats.certifiedStudents}</p>
              </div>
              <div className="bg-blue-900 bg-opacity-50 p-2 sm:p-4 rounded-lg border border-blue-800">
                <p className="text-xs sm:text-sm text-blue-300">Total Students</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-100">{stats.totalStudents}</p>
              </div>
              <div className="bg-green-900 bg-opacity-50 p-2 sm:p-4 rounded-lg border border-green-800">
                <p className="text-xs sm:text-sm text-green-300">Staff</p>
                <p className="text-lg sm:text-2xl font-bold text-green-100">{stats.totalStaff}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {actionCards.map((card) => (
            <Link href={card.path} key={card.id}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHovering(card.id)}
                onMouseLeave={() => setIsHovering(null)}
                className={`${card.bgColor} ${isHovering === card.id ? card.hoverBgColor : ''} ${card.textColor} rounded-xl shadow-sm p-4 sm:p-6 flex flex-col items-center cursor-pointer h-full transition-all duration-300 border border-transparent hover:border-opacity-20 hover:border-current`}
              >
                <motion.div
                  animate={isHovering === card.id ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="mb-3 sm:mb-4"
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 text-center">{card.title}</h3>
                <motion.p 
                  animate={isHovering === card.id ? { 
                    opacity: [0.8, 1, 0.8],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs sm:text-sm opacity-80"
                >
                  Click to access
                </motion.p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Calendar Panel */}
      <AnimatePresence>
        {calendarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCalendarOpen(false)}
              className="fixed inset-0  bg-blur bg-opacity-70 z-40 backdrop-blur-sm"
            />
            
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-sm sm:max-w-md h-full bg-gray-800 shadow-xl z-50 p-4 sm:p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl font-bold text-gray-100"
                >
                  Academic Calendar
                </motion.h2>
                
                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCalendarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                >
                  <FaTimes />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between mb-3 sm:mb-4 bg-gray-700 p-2 rounded-lg"
              >
                <motion.button 
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevMonth}
                  className="p-2 rounded-md hover:bg-gray-600 text-gray-300"
                >
                  <FaChevronLeft />
                </motion.button>
                
                <motion.span 
                  key={currentDate.toString()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-medium text-sm sm:text-base text-gray-200"
                >
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </motion.span>
                
                <motion.button 
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextMonth}
                  className="p-2 rounded-md hover:bg-gray-600 text-gray-300"
                >
                  <FaChevronRight />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-700 rounded-lg p-2 sm:p-4 shadow-inner"
              >
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={false}
                  height="300px"
                  initialDate={currentDate}
                  themeSystem="standard"
                />
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;