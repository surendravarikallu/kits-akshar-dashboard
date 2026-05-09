import { motion } from 'framer-motion';
import { SPRING_REVEAL, SPRING_STAGGER, SPRING_HOVER } from '../../utils/animations';
import { ArrowRight } from 'lucide-react';

export default function GallerySection({ data }) {
  const images = data?.items || [
    { id: 1, src: "", title: "Convocation 2025", size: "large" },
    { id: 2, src: "", title: "Hackathon Winners", size: "small" },
    { id: 3, src: "", title: "Tech Fest", size: "small" },
    { id: 4, src: "", title: "Campus Life", size: "medium" },
    { id: 5, src: "", title: "Alumni Meet", size: "small" },
    { id: 6, src: "", title: "Robotics Workshop", size: "medium" },
  ];

  return (
    <section className="relative w-full py-24 bg-kits-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={SPRING_STAGGER(0.1)}
          >
            <motion.h2 variants={SPRING_REVEAL} className="text-3xl md:text-5xl font-clash font-bold text-white uppercase">
              {data?.title || "Life at KITS"}
            </motion.h2>
            <motion.p variants={SPRING_REVEAL} className="mt-4 text-kits-white/80 max-w-lg font-satoshi">
              {data?.subtitle || "Experience the vibrant culture, academic excellence, and memorable moments."}
            </motion.p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={SPRING_HOVER}
            className="hidden md:flex items-center gap-2 text-kits-gold hover:text-white transition-colors uppercase tracking-widest text-sm font-bold cursor-pointer"
          >
            Explore Gallery <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Masonry-style Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={SPRING_STAGGER(0.1)}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {images.map((img) => {
            let rowSpan = "row-span-1";
            let colSpan = "col-span-1";
            
            if (img.size === 'large') {
               rowSpan = "row-span-2";
               colSpan = "md:col-span-2";
            } else if (img.size === 'medium') {
               rowSpan = "row-span-2";
            }

            return (
              <motion.div
                key={img.id}
                variants={SPRING_REVEAL}
                className={`relative group overflow-hidden rounded-sm bg-kits-navy border border-white/5 cursor-pointer ${rowSpan} ${colSpan}`}
              >
                {img.src ? (
                  <motion.img 
                    src={img.src} 
                    alt={img.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100" 
                  />
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.05, backgroundColor: "#000" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center bg-kits-navy/50 text-kits-gray font-mono text-xs text-center p-4"
                  >
                    [Image: {img.title}]
                  </motion.div>
                )}
                
                {/* Overlay overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-kits-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-satoshi font-semibold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
