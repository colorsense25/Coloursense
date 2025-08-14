'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { FaPhone, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosCall } from "react-icons/io";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Force dark mode
    setDarkMode(true);
    document.documentElement.classList.add('dark');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  const phoneNumbers = [
    { label: 'Official Contact', number: '+91 62804-05570' },
    { label: 'Emergency', number: '+91 78892-87161' }
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'About', href: '/about' },
    { 
      name: 'Verification', 
      href: '#', 
      dropdown: [
        { name: 'Staff', href: '/staff' },
        { name: 'Student', href: '/student' }
      ] 
    },
  ];

  const socialLinks = [
    { 
      icon: <FaInstagram className="h-7 w-7" />, 
      href: 'https://www.instagram.com/colorsense_salon/', 
      name: 'Instagram' 
    },
    { 
      icon: <FaWhatsapp className="h-7 w-7" />, 
      href: 'https://wa.me/7889287161?text=Hi%2C%20I%20am%20interested%20in%20your%20services%20at%20Colour%20Sense%20Salon.%20Could%20you%20please%20help%20me%20with%20more%20details%3F',
      name: 'WhatsApp' 
    }
  ];

  const isVerificationActive = pathname === '/staff' || pathname === '/student';

  return (
    <>
      {/* Main Navbar */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 bg-gray-900 shadow-sm `}
        initial={{ y: 0 }}  // Changed from -100 to 0 to remove the downward motion
        animate={{ y: 0 }}  // Kept as 0
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20"> {/* Increased height */}
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="text-white font-bold text-xl flex items-center"> {/* Increased text size */}
                <motion.div
                  className="w-10 h-10 mr-3 rounded-full flex items-center justify-center" 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    rotate: scrolled ? [0, 5, -5, 0] : 0,
                    transition: { duration: 0.5 }
                  }}
                >
                  <img src="/logo.png" alt="Color Sense Logo" className="w-full h-full object-contain" />
                </motion.div>
                Color Sense
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8"> {/* Increased spacing */}
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      onHoverStart={() => setIsVerificationOpen(true)}
                      onHoverEnd={() => setIsVerificationOpen(false)}
                    >
                      <motion.button
                        className={`flex items-center px-3 py-2 text-lg font-medium transition-colors duration-200 ${
                          isVerificationActive
                            ? 'text-amber-400'
                            : 'text-gray-300 hover:text-amber-400'
                        }`} // Increased text size
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: isVerificationOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon className="ml-1 h-5 w-5" /> {/* Increased icon size */}
                        </motion.div>
                      </motion.button>
                      {isVerificationActive && (
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                          layoutId="activeLinkUnderline"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      <AnimatePresence>
                        {isVerificationOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                            onMouseEnter={() => setIsVerificationOpen(true)}
                            onMouseLeave={() => setIsVerificationOpen(false)}
                          >
                            {link.dropdown.map((item) => (
                              <motion.div
                                key={item.name}
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                              >
                                <Link
                                  href={item.href}
                                  className={`block px-4 py-2 text-base ${
                                    pathname === item.href
                                      ? 'bg-gray-700 text-amber-400'
                                      : 'text-gray-300 hover:bg-gray-700'
                                  }`} // Increased text size
                                >
                                  {item.name}
                                  {pathname === item.href && (
                                    <motion.span 
                                      className="block h-0.5 bg-amber-400 mt-1"
                                      initial={{ width: 0 }}
                                      animate={{ width: '100%' }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`relative px-3 py-2 text-lg font-medium transition-colors duration-200 ${
                          pathname === link.href
                            ? 'text-amber-400'
                            : 'text-gray-300 hover:text-amber-400'
                        }`} // Increased text size
                      >
                        {link.name}
                        {pathname === link.href && (
                          <motion.span 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                            layoutId="activeLinkUnderline"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Social Icons */}
            <div className="flex items-center space-x-5"> {/* Increased spacing */}
              {/* Phone Number Dropdown - Desktop */}
              <div className="hidden md:block relative">
                <motion.button
                  onClick={() => setIsPhoneOpen(!isPhoneOpen)}
                  className="p-2 text-gray-300 hover:text-amber-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoIosCall className="h-8 w-8" /> {/* Increased icon size */}
                </motion.button>

                <AnimatePresence>
                  {isPhoneOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                      onMouseEnter={() => setIsPhoneOpen(true)}
                      onMouseLeave={() => setIsPhoneOpen(false)}
                    >
                      <div className="px-4 py-2 text-base font-medium text-gray-300 border-b border-gray-700"> {/* Increased text size */}
                        Contact Numbers
                      </div>
                      {phoneNumbers.map((phone, index) => (
                        <motion.a
                          key={index}
                          href={`tel:${phone.number.replace(/\D/g, '')}`}
                          className="block px-4 py-2 text-base text-gray-300 hover:bg-gray-700" // Increased text size
                          whileHover={{ x: 3 }}
                        >
                          <div className="font-medium">{phone.label}</div>
                          <div className="text-amber-400">{phone.number}</div>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Icons - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 p-2"
                    whileHover={{ 
                      y: -3,
                      scale: 1.1,
                      transition: { type: 'spring', stiffness: 500 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <motion.button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-amber-400 focus:outline-none"
                  whileHover={{ 
                    rotate: isOpen ? 0 : 90,
                    scale: 1.1,
                    transition: { type: 'spring', stiffness: 500 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <XMarkIcon className="h-8 w-8" /> 
                  ) : (
                    <Bars3Icon className="h-8 w-8" /> 
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-gray-800 shadow-lg overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {link.dropdown ? (
                      <div className="space-y-1">
                        <motion.button
                          onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                          className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-lg font-medium ${
                            isVerificationActive
                              ? 'bg-gray-700 text-amber-400'
                              : 'text-gray-300 hover:bg-gray-700'
                          }`} // Increased text size and padding
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {link.name}
                          <motion.div
                            animate={{ rotate: isVerificationOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDownIcon className="ml-1 h-5 w-5" /> {/* Increased icon size */}
                          </motion.div>
                        </motion.button>
                        <AnimatePresence>
                          {isVerificationOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 space-y-1"
                            >
                              {link.dropdown.map((item, i) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <Link
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className={`block px-3 py-3 rounded-md text-lg font-medium ${
                                      pathname === item.href
                                        ? 'bg-gray-700 text-amber-400'
                                        : 'text-gray-300 hover:bg-gray-700'
                                    }`} // Increased text size and padding
                                  >
                                    {item.name}
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-3 py-3 rounded-md text-lg font-medium ${
                            pathname === link.href
                              ? 'bg-gray-700 text-amber-400'
                              : 'text-gray-300 hover:bg-gray-700'
                          }`} // Increased text size and padding
                          onClick={toggleMenu}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Phone Numbers in Mobile Menu */}
                <div className="px-3 py-3"> {/* Increased padding */}
                  <div className="text-lg font-medium text-gray-400 mb-2"> {/* Increased text size */}
                    Contact Numbers
                  </div>
                  {phoneNumbers.map((phone, index) => (
                    <motion.a
                      key={index}
                      href={`tel:${phone.number.replace(/\D/g, '')}`}
                      className="block py-2 text-lg text-gray-300" // Increased text size and padding
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (navLinks.length + index) * 0.05 }}
                    >
                      <div className="font-medium">{phone.label}</div>
                      <div className="text-amber-400">{phone.number}</div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Social Bar - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around py-4"> {/* Increased padding */}
            <motion.a
              href={`tel:${phoneNumbers[0].number.replace(/\D/g, '')}`}
              className="text-gray-300 hover:text-amber-400 p-3" // Increased padding
              whileHover={{ 
                y: -5,
                scale: 1.2,
                transition: { type: 'spring', stiffness: 500 }
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Call"
            >
              <IoIosCall className="h-6 w-6" /> {/* Increased icon size */}
            </motion.a>
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 p-3" // Increased padding
                whileHover={{ 
                  y: -5,
                  scale: 1.2,
                  transition: { type: 'spring', stiffness: 500 }
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Padding to account for fixed social bar on mobile */}
      <div className="md:hidden pb-20"></div> {/* Increased padding */}
    </>
  );
};

export default Navbar;