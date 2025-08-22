'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight, FiSun, FiMoon } from 'react-icons/fi';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check user's preferred color scheme
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/gallery/getAllPhoto');
        const data = await response.json();
        if (data.success) {
          setPhotos(data.photos);
        } else {
          setError('Failed to load photos');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openImage = useCallback((photo, index) => {
    setSelectedImage(photo);
    setSelectedIndex(index);
  }, []);

  const navigateImage = useCallback((direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1;
    } else {
      newIndex = selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1;
    }
    setSelectedImage(photos[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, photos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') {
          setSelectedImage(null);
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        } else if (e.key === 'ArrowRight') {
          navigateImage('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-100"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  dark:bg-[#030712]  px-4 sm:px-6  sm:py-10 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center w-full">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold  text-white pt-7 pb-7"
            >
              Photo Gallery
            </motion.h1>
          </div>


        {photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500 dark:text-gray-400"
          >
            No photos available
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.public_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer group"
                onClick={() => openImage(photo, index)}
              >
                <Image
                  src={photo.url}
                  alt={photo.public_id}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white text-2xl z-10 hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <FiX size={28} />
              </button>
              
              <div className="relative w-full h-full flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-0 -translate-x-12 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-colors"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={24} />
                </button>
                
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.public_id}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="object-contain max-w-full max-h-[80vh] mx-auto"
                  priority
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-0 translate-x-12 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-colors"
                  aria-label="Next image"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-center text-white"
              >
                <p className="text-sm opacity-80">
                  {selectedIndex + 1} of {photos.length} • Uploaded: {new Date(selectedImage.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Shimmer effect for image placeholders
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f3f3f3" offset="20%" />
      <stop stop-color="#ecebeb" offset="50%" />
      <stop stop-color="#f3f3f3" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f3f3f3" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default Gallery;