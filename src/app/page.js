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
    { name: 'Hair Styling', icon: <TiScissors size={isMobile ? 40 : 60} />, desc: 'Modern cuts & timeless styles' },
    { name: 'Coloring', icon: <FaPalette size={isMobile ? 30 : 40} />, desc: 'Vibrant & natural tones' },
    { name: 'Treatments', icon: <FaSpa size={isMobile ? 30 : 40} />, desc: 'Revitalizing hair therapies' },
    { name: 'Extensions', icon: <FaCrown size={isMobile ? 30 : 40} />, desc: 'Luxurious length & volume' },
  ];

  const teamMembers = [
    {
      name: 'Alex Rivera',
      role: 'Master Stylist',
      image: 'https://res.cloudinary.com/dtg4pxws2/image/upload/v1712345678/stylist-1_hlj3xj.jpg',
      bio: 'Specializing in precision cuts and balayage techniques with 12 years experience.'
    },
    {
      name: 'Sophie Chen',
      role: 'Color Specialist',
      image: 'https://res.cloudinary.com/dtg4pxws2/image/upload/v1712345678/stylist-2_hlj3xj.jpg',
      bio: 'Expert in vibrant fashion colors and natural-looking dimensional color.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Extensions Expert',
      image: 'https://res.cloudinary.com/dtg4pxws2/image/upload/v1712345678/stylist-3_hlj3xj.jpg',
      bio: 'Creates flawless, undetectable extensions tailored to each client.'
    }
  ];

  const interiorPhotos = [
    {
      title: 'Modern Luxury',
      desc: 'Our sleek, contemporary styling stations',
      image: 'https://res.cloudinary.com/dtg4pxws2/image/upload/v1754991091/20250812_1500_Modern_Barber_Shop_remix_01k2esryzxebytqft07n0yegjh_temmee.png'
    },
    {
      title: 'Relaxation Area',
      desc: 'Comfortable seating for your consultation',
      image: 'https://res.cloudinary.com/dtg4pxws2/image/upload/v1755027050/20250813_0058_Salon_Wash_Station_remix_01k2fvz9e1fdnr8nyzypjs6adq_tjczib.png'
    },
    {
      title: 'Color Bar',
      desc: 'Where our magic happens',
      image: 'https://res.cloudinary.com/dtg4pxws2/image/upload/v1755027252/20250813_0103_Professional_Equipment_Display_remix_01k2fw7tqxftc9gq8ta8kw9ksa_ulxgkk.png'
    }
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
    <div className="bg-black text-white min-h-screen">
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
          className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="max-w-3xl">
            <motion.div 
              className="mb-4 md:mb-6 flex items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="w-12 md:w-16 h-px bg-white mr-3 md:mr-4" />
              <span className="text-xs md:text-sm tracking-widest text-gray-300">LUXURY HAIR EXPERIENCE</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="text-white">Color</span>{' '}
              <span className="text-white font-light">Sense</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              COLOR SENSE<br />
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
          <FaChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-gray-900">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Services</h2>
          <div className="w-16 md:w-24 h-0.5 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Premium hair services tailored to your unique style and needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-white/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="text-white mb-4 md:mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">{service.name}</h3>
              <p className="text-gray-400 text-sm md:text-base">{service.desc}</p>
              <div className="mt-4 md:mt-6">
              </div>
            </motion.div>
          ))}
        </div>
      </section>

     {/* Salon Interiors Section */}
     <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-gray-900">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Salon</h2>
          <div className="w-16 md:w-24 h-0.5 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            A luxurious space designed for your comfort and relaxation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {interiorPhotos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg h-fit"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative h-120 md:h-90 w-full">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 group-hover:bg-black/50 transition-all duration-300" />
              </div>
              
              <motion.div 
                className="absolute bottom-0 left-0 p-4 md:p-6 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white">{photo.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{photo.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >

        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-gray-950">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Expert Team</h2>
          <div className="w-16 md:w-24 h-0.5 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Meet the talented professionals behind your transformation
          </p>
        </motion.div>

        <div className="relative">
          {/* Single Team Photo */}
          <motion.div
            className="relative h-96 md:h-[32rem] w-full rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755847860/WhatsApp_Image_2025-08-22_at_12.41.43_PM_kxswrf.jpg"
              alt="Color Sense Team"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>

        
        </div>
      </section>

 

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-gray-950">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Client Stories</h2>
          <div className="w-16 md:w-24 h-0.5 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Hear what our clients say about their Color Sense experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 mr-3 md:mr-4 flex items-center justify-center text-lg md:text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs md:text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 md:mb-6 italic text-sm md:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex text-white">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 md:w-5 md:h-5" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6 sm:px-8 lg:px-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Color Sense</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                Luxury hair salon specializing in personalized color and cutting services.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/colorsense_salon/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Contact</h4>
              <address className="text-gray-400 not-italic text-sm md:text-base">
                <p className="mb-2 md:mb-3 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-xs md:text-sm" />
                  Nangal Rd - Deep Colony St,
                </p>
                <p className="mb-2 md:mb-3"> near Arya School Garhshankar, Punjab 144527</p>
                <p className="mb-2 md:mb-3 flex items-center">
                  <FaPhone className="mr-2 text-xs md:text-sm" />
                  +91 7889287161
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-xs md:text-sm" />
                  colorsensesalon@gmail.com
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-8 text-center text-gray-500 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} Color Sense Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}