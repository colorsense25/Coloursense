// app/about/page.jsx
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  // Check if motion is available
  if (typeof motion === 'undefined') {
    console.error('motion component is undefined');
    return <div>Loading...</div>;
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#030712] px-4 sm:px-6 lg:px-8 pt-15 pb-20">
      {/* Main About Section */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={container}
        className="text-center py-16 mb-12"
      >
        <motion.div variants={item}>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About Color Sense
          </h1>
          <motion.p 
            variants={item}
            className="text-xl text-white font-medium mb-6"
          >
            Where Precision Meets Elegance
          </motion.p>
          <motion.p 
            variants={item}
            className="max-w-3xl mx-auto text-gray-300 leading-8 text-base sm:text-lg"
          >
            At Color Sense Salon, we combine technical mastery with timeless aesthetics to create sophisticated beauty experiences. 
            Our commitment to perfection and minimalist approach ensures every client receives tailored services in our sleek, 
            monochromatic sanctuary.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-gray-900 to-black py-16 text-center mb-12 rounded-xl mx-4 sm:mx-8 lg:mx-16 shadow-2xl border border-gray-800"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl text-white italic mb-4">
            &ldquo;Beauty in monochrome&rdquo;
          </h2>
          <p className="text-gray-400 text-base sm:text-lg uppercase tracking-wider">
            Tailored Services • Premium Products • Timeless Results
          </p>
        </motion.div>
      </motion.section>

      {/* Visit Us Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="mb-16 w-full"
      >
        <motion.h2 variants={item} className="text-center text-3xl sm:text-4xl font-bold text-white mb-4">
          Our Studio
        </motion.h2>
        <motion.p variants={item} className="text-center text-gray-400 text-lg font-medium mb-8">
          Where Your Transformation Begins
        </motion.p>
        
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={item}
            className="bg-gray-900 p-6 rounded-xl shadow-lg text-center mb-8 max-w-3xl mx-auto border border-gray-800 hover:border-silver-300 transition-colors duration-300"
          >
            <p className="text-gray-300 text-base sm:text-lg font-medium flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-silver-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Nangal Rd - Deep Colony St, near Arya School, Garhshankar, Punjab 144527
            </p>
          </motion.div>

          <motion.div
              variants={item}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto"
            >
              {/* Salon Image */}
              <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[950px] group">
                <Image
                  src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755841551/20250822_1106_Enhanced_Salon_Facade_remix_01k384ape5eaavk3qn9dbsz6nr_ezqqq3.png"
                  alt="Luxury salon interior"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  priority
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h2 className="text-xl font-semibold">Colour Sense Salon</h2>
                  <p className="text-sm opacity-90">Unisex Salon & Academy</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[400px] sm:h-[500px] lg:h-[950px] border border-gray-700">
                <iframe
                  title="Salon Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.190656270404!2d76.14374797495266!3d31.21544686214489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391abfae872e3e05%3A0xc23ca808c7811e18!2sColour%20Sense%20Unisex%20Salon%20%26%20Academy!5e0!3m2!1sen!2sin!4v1755030438575!5m2!1sen!2sin"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

                    </div>
            </motion.section>

      {/* Our Artists Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="mt-20"
      >
        <motion.h2 variants={item} className="text-center text-3xl sm:text-4xl font-bold text-white mb-4">
          Meet Our Artists
        </motion.h2>
        <motion.p variants={item} className="text-center text-gray-400 text-lg mb-12">
          Certified Professionals Passionate About Your Beauty
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
          {/* Stylist Card 1 */}
          <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755845511/WhatsApp_Image_2025-08-22_at_12.19.52_PM_nn6vjo.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>
                    
                    
          {/* Stylist Card 2 */}
          <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755845511/WhatsApp_Image_2025-08-22_at_12.19.51_PM_1_btiufw.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>

          {/* Stylist Card 3 */}
          <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755845510/WhatsApp_Image_2025-08-22_at_12.19.53_PM_vyyawp.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>

          {/* Stylist Card 4 */}
            <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755845510/WhatsApp_Image_2025-08-22_at_12.19.52_PM_2_uadcwv.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>


            {/* Stylist Card 5 */}
            <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755845511/WhatsApp_Image_2025-08-22_at_12.19.51_PM_npmbei.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>

            {/* Stylist Card 6 */}
            <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755845510/WhatsApp_Image_2025-08-22_at_12.19.52_PM_1_fukd5x.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>

                    {/* Stylist Card 7 */}
                    <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755852497/WhatsApp_Image_2025-08-22_at_2.11.45_PM_2_n4cowd.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>

                    {/* Stylist Card 8 */}
                    <motion.div 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-silver-300"
          >
           <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-[800px] sm:h-[500px] lg:h-[370px] group">
              <Image
                src="https://res.cloudinary.com/dtg4pxws2/image/upload/v1755852497/WhatsApp_Image_2025-08-22_at_2.11.45_PM_3_yiiabm.jpg"
                alt="Emma Chen"
                fill
                className="h-[500px]"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-silver-300 mb-2">Emma Chen</h3>
              <p className="text-gray-400 text-sm font-medium">Cutting Specialist</p>
              <p className="text-gray-500 text-xs mt-2">8+ years experience</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;