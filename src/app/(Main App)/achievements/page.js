'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiFilter, FiSearch, FiCalendar, FiUser, FiAward, FiClock } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  // Image sizing state
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/achievements?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}${
            searchQuery ? `&search=${searchQuery}` : ''
          }`
        );
        const data = await res.json();
        setAchievements(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [page, limit, sortBy, sortOrder, searchQuery]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      setSortBy(field);
      setSortOrder(-1);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 py-12 px-4 sm:px-6 pt-15 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Student Achievements</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Celebrating excellence and remarkable accomplishments of our students
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <form onSubmit={handleSearch} className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search achievements..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-silver-500 focus:border-transparent text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => handleSort('date')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'date' ? 'bg-silver-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FiCalendar />
                <span>Date</span>
                {sortBy === 'date' && (
                  <span>{sortOrder === -1 ? '↓' : '↑'}</span>
                )}
              </button>

              <button
                onClick={() => handleSort('studentName')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'studentName' ? 'bg-silver-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FiUser />
                <span>Name</span>
                {sortBy === 'studentName' && (
                  <span>{sortOrder === -1 ? '↓' : '↑'}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>



        {/* Achievements Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8">
            {[...Array(limit)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div 
                    className="flex-shrink-0 w-full md:w-auto" 
                    style={{ 
                      width: isMobile ? '100%' : `${imageWidth}px`, 
                      height: isMobile ? '300px' : `${imageHeight}px` 
                    }}
                  >
                    <Skeleton 
                      height={isMobile ? 300 : imageHeight} 
                      width={isMobile ? '100%' : imageWidth} 
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <Skeleton count={4} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : achievements.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            <AnimatePresence>
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-silver-500 transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Photo Section - Customizable Size */}
                    <div 
                      className="relative group overflow-hidden flex-shrink-0 w-full md:w-auto" 
                                             style={{ 
                         width: isMobile ? '100%' : `${imageWidth}px`, 
                         height: isMobile ? '300px' : `${imageHeight}px` 
                       }}
                    >
                      <img
                        src={achievement.photo.url}
                        alt={achievement.title}
                        style={{ 
                          width: isMobile ? '100%' : `${imageWidth}px`, 
                          height: isMobile ? '300px' : `${imageHeight}px` 
                        }}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-silver-400 mb-2">
                            <FiAward className="text-lg" />
                            <span className="text-sm font-medium">ACHIEVEMENT</span>
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-2">{achievement.title}</h2>
                          <p className="text-gray-300 mb-4">{achievement.description}</p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-700">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-gray-400">
                              <FiUser className="text-silver-400" />
                              <span>{achievement.studentName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <FiCalendar className="text-silver-400" />
                              <span>{formatDate(achievement.date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-silver-400 text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-medium text-white mb-2">No achievements found</h3>
            <p className="text-gray-400">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Check back later for new achievements'}
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${
                      page === pageNum
                        ? 'bg-silver-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && page < totalPages - 2 && (
                <span className="text-gray-400 px-2">...</span>
              )}

              {totalPages > 5 && page < totalPages - 2 && (
                <button
                  onClick={() => setPage(totalPages)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    page === totalPages
                      ? 'bg-silver-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } transition-colors`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight />
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;