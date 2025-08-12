'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    { name: 'Hair Styling', icon: '✂️', desc: 'Modern cuts & timeless styles' },
    { name: 'Coloring', icon: '🎨', desc: 'Vibrant & natural tones' },
    { name: 'Treatments', icon: '💆', desc: 'Revitalizing hair therapies' },
    { name: 'Extensions', icon: '👑', desc: 'Luxurious length & volume' },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-black/60 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <source src="/salon-bg.mp4" type="video/mp4" />
        </motion.video>

        <motion.div 
          className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
          >
            Color <span className="text-amber-400">Sense</span> Salon
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-8"
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where artistry meets precision in every strand
          </motion.p>
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Book Appointment
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-800">
        <motion.div
          className="text-center mb-16"
          whileInView={{ y: [30, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileInView={{ y: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-900">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src="/salon-interior.jpg" 
                alt="Salon Interior" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2010, Color Sense Salon has been transforming hair and elevating confidence with our 
              team of master stylists. We combine technical expertise with artistic vision to create looks 
              that are as unique as you are.
            </p>
            <p className="text-gray-300 mb-6">
              Our eco-conscious salon uses only premium products that nourish your hair while delivering 
              stunning results. We believe beauty should be sustainable.
            </p>
            <button className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 font-medium px-6 py-3 rounded-lg transition-all duration-300">
              Meet Our Team
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-800">
        <motion.div
          className="text-center mb-16"
          whileInView={{ y: [30, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Client Stories</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="bg-gray-900 p-8 rounded-lg"
              whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: item * 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-gray-400 text-sm">Regular Client</p>
                </div>
              </div>
              <p className="text-gray-300">
                &ldquo;The stylists at Color Sense truly understand hair. I&apos;ve never left disappointed. They&apos;ve 
                transformed my damaged hair into healthy, beautiful locks.&rdquo;
              </p>
              <div className="flex mt-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-32 px-6 sm:px-12 lg:px-24 bg-gray-900 relative overflow-hidden"
        style={{ y: isMobile ? 0 : yPos }}
      >
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6"
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            transition={{ duration: 0.6 }}
          >
            Ready for Your Transformation?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book your appointment today and experience the Color Sense difference.
          </motion.p>
          <motion.div
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}