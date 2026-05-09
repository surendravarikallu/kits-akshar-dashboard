import { motion } from 'framer-motion';
import { SPRING_REVEAL, SPRING_STAGGER, SPRING_HOVER } from '../../utils/animations';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';

export default function EventsSection({ data }) {
  const events = data?.items || [
    {
      id: 1,
      title: "Tech Symposium 2026",
      date: "Oct 15, 2026",
      location: "Main Auditorium",
      category: "Technical"
    },
    {
      id: 2,
      title: "Global Alumni Meet",
      date: "Nov 02, 2026",
      location: "Virtual / Campus",
      category: "Alumni"
    },
    {
      id: 3,
      title: "AI Hackathon",
      date: "Dec 10, 2026",
      location: "Innovation Lab",
      category: "Competition"
    }
  ];

  return (
    <section className="relative w-full py-24 bg-kits-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={SPRING_STAGGER(0.1)}
          >
            <motion.h2 variants={SPRING_REVEAL} className="text-3xl md:text-5xl font-clash font-bold text-white uppercase">
              {data?.title || "Upcoming Events"}
            </motion.h2>
            <motion.p variants={SPRING_REVEAL} className="mt-4 text-kits-white/80 max-w-lg">
              {data?.subtitle || "Discover what's happening across the campus. Join seminars, workshops, and global conferences."}
            </motion.p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={SPRING_HOVER}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 border border-kits-gold/30 text-kits-gold hover:bg-kits-gold hover:text-kits-black transition-colors duration-300 rounded-sm whitespace-nowrap cursor-pointer"
          >
            View Full Calendar <ArrowRight size={16} />
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={SPRING_STAGGER(0.15)}
          className="flex flex-col gap-4"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={SPRING_REVEAL}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.02)", y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group w-full bg-kits-navy/30 border border-white/5 hover:border-kits-gold/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 rounded-sm cursor-pointer"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center w-full md:w-2/3">
                <div className="bg-kits-black/50 px-4 py-2 rounded-sm border border-white/5 w-fit text-kits-gold font-mono text-sm group-hover:bg-kits-gold group-hover:text-kits-black transition-colors duration-300">
                  {event.category}
                </div>
                <h3 className="text-2xl font-satoshi font-semibold text-white group-hover:text-kits-gold transition-colors duration-300">
                  {event.title}
                </h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full md:w-auto text-kits-gray font-satoshi text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-kits-gold" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-kits-gold" />
                  {event.location}
                </div>
              </div>
              
              <div className="hidden md:flex opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <button className="w-12 h-12 bg-kits-gold text-kits-black rounded-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
