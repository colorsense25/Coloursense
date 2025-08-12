'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  FaPalette, 
  FaSpa, 
  FaCrown,
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,

} from 'react-icons/fa';
import { TiScissors } from "react-icons/ti";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    { name: 'Hair Styling', icon: <TiScissors size={60} />, desc: 'Modern cuts & timeless styles' },
    { name: 'Coloring', icon: <FaPalette size={40} />, desc: 'Vibrant & natural tones' },
    { name: 'Treatments', icon: <FaSpa size={40} />, desc: 'Revitalizing hair therapies' },
    { name: 'Extensions', icon: <FaCrown size={40} />, desc: 'Luxurious length & volume' },
  ];

  const testimonials = [
    { 
      name: 'Sarah J.', 
      role: 'Regular Client',
      quote: "The stylists at Color Sense truly understand hair. I've never left disappointed. They've transformed my damaged hair into healthy, beautiful locks.",
      rating: 5
    },
    { 
      name: 'Michael T.', 
      role: 'New Client',
      quote: "Best salon experience ever! The attention to detail is incredible. My haircut gets compliments every day.",
      rating: 5
    },
    { 
      name: 'Emma L.', 
      role: 'Color Specialist',
      quote: "As a photographer, I need my look to be perfect. Color Sense consistently delivers exceptional results that last.",
      rating: 5
    }
  ];

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-10" />
        
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1754989862/20250812_1438_Chic_Salon_Interior_remix_01k2erf779ehmtbq575rw63a60_ipstiz.png"
            alt="Luxury Salon Interior"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div 
          className="relative z-20 h-full flex flex-col justify-start pt-45 px-6 sm:px-12 lg:px-24 bg-blend-hard-light"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="max-w-3xl">
            <motion.div 
              className="mb-6 flex items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="w-16 h-px bg-amber-400 mr-4" />
              <span className="text-sm tracking-widest text-gray-300">LUXURY HAIR EXPERIENCE</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="text-white">Color</span>{' '}
              <span className="text-amber-400">Sense</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
             COLOR SENSE
             UNISEX SALON & ACADEMY
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >

            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="w-8 h-8 text-gray-100" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-900">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Services</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Premium hair services tailored to your unique style and needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-amber-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
            >
              <div className="text-amber-400 mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.name}</h3>
              <p className="text-gray-400">{service.desc}</p>
              <div className="mt-6">
                <button className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center justify-center">
                  Learn more
                  <FaChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-950">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative">
              <Image 
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1754991091/20250812_1500_Modern_Barber_Shop_remix_01k2esryzxebytqft07n0yegjh_temmee.png" 
                alt="Salon Interior" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-amber-400 rounded-lg z-10 hidden lg:block"></div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center">
              <div className="w-16 h-px bg-amber-400 mr-4" />
              <span className="text-sm tracking-widest text-gray-300">ABOUT US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Our Story</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded in 2010, Color Sense Salon has been transforming hair and elevating confidence with our 
              team of master stylists. We combine technical expertise with artistic vision to create looks 
              that are as unique as you are.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our eco-conscious salon uses only premium products that nourish your hair while delivering 
              stunning results. We believe beauty should be sustainable and ethical without compromising on quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium px-6 py-3 rounded-lg transition-all duration-300">
                Meet Our Team
              </button>
              <button className="border border-gray-600 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-medium px-6 py-3 rounded-lg transition-all duration-300">
                Our Philosophy
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-900">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Client Stories</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Hear what our clients say about their Color Sense experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-amber-400/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gray-700 mr-4 flex items-center justify-center text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-32 px-6 sm:px-12 lg:px-24 bg-gray-950 relative overflow-hidden"
        style={{ y: isMobile ? 0 : yPos }}
      >
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dtg4pxws2/image/upload/v1712345678/texture-dark_hlj3xj.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            className="mb-6 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-amber-400" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-8"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Ready for Your</span>{' '}
            <span className="text-amber-400">Transformation?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Book your appointment today and experience the Color Sense difference.
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </button>
            <button className="border border-gray-600 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6 sm:px-12 lg:px-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Color Sense</h3>
              <p className="text-gray-400 mb-6">
                Luxury hair salon specializing in personalized color and cutting services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
              <address className="text-gray-400 not-italic">
                <p className="mb-3 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  123 Beauty Street
                </p>
                <p className="mb-3">New York, NY 10001</p>
                <p className="mb-3 flex items-center">
                  <FaPhone className="mr-2" />
                  (555) 123-4567
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  info@colorsense.com
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Color Sense Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}