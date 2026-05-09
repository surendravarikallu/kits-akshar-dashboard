import { motion } from 'framer-motion';
import { GRAVITY_IN, STAGGER } from '../../utils/animations';
import { ArrowRight } from 'lucide-react';

export default function DepartmentSection({ data }) {
  const departments = data?.items || [
    { id: 1, name: "Computer Science", code: "CSE" },
    { id: 2, name: "Electrical Engineering", code: "EEE" },
    { id: 3, name: "Mechanical Engineering", code: "MECH" },
    { id: 4, name: "Civil Engineering", code: "CIVIL" },
  ];

  return (
    <section className="relative w-full py-24 bg-kits-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER(0.1)}
          >
            <motion.h2 variants={GRAVITY_IN} className="text-3xl md:text-4xl font-clash font-bold text-white uppercase tracking-wide">
              {data?.title || "Academic Departments"}
            </motion.h2>
            <motion.div variants={GRAVITY_IN} className="h-1 w-24 bg-kits-gold mt-4" />
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-kits-gold hover:text-white transition-colors"
          >
            View All <ArrowRight size={16} />
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              variants={GRAVITY_IN}
              className="group cursor-pointer p-8 bg-kits-navy/50 border border-white/5 rounded-sm hover:border-kits-gold/50 hover:bg-kits-navy transition-all duration-500 flex flex-col justify-between h-64 relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-kits-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="text-5xl font-clash font-bold text-white/10 group-hover:text-kits-gold/20 transition-colors duration-500 absolute -top-4 -right-2">
                  {dept.code}
                </span>
                <h3 className="text-xl font-satoshi font-semibold text-white mt-12 group-hover:text-kits-gold transition-colors duration-300">
                  {dept.name}
                </h3>
              </div>
              
              <div className="relative z-10 flex items-center text-sm text-kits-gray group-hover:text-white transition-colors duration-300">
                Explore Programs
                <ArrowRight size={14} className="ml-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
