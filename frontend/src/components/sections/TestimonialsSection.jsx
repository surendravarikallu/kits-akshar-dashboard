import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SPRING_REVEAL, SPRING_STAGGER, SPRING_HOVER } from '../../utils/animations';

export default function TestimonialsSection({ data }) {
  const testimonials = data?.items || [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "SDE @ Google",
      content: "The immersive learning environment at KITS Akshar was the catalyst for my career. The focus on UI/UX excellence is unmatched.",
      avatar: "AM"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Product Designer",
      content: "KITS doesn't just teach you how to build; they teach you how to create experiences that resonate with users on a visceral level.",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "AI Researcher",
      content: "The R&D labs here are state-of-the-art. Working on quantum computing projects as an undergrad was a dream come true.",
      avatar: "VS"
    }
  ];

  return (
    <section className="relative w-full py-24 bg-kits-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={SPRING_STAGGER(0.1)}
          className="text-center mb-20"
        >
          <motion.h2 variants={SPRING_REVEAL} className="text-3xl md:text-5xl font-clash font-bold text-white uppercase mb-4">
            {data?.title || "Voices of Excellence"}
          </motion.h2>
          <motion.div variants={SPRING_REVEAL} className="h-1 w-20 bg-kits-gold mx-auto" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SPRING_STAGGER(0.15)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={SPRING_REVEAL}
              whileHover={SPRING_HOVER}
              className="glass p-8 rounded-sm border border-white/5 relative group cursor-default"
            >
              <Quote className="absolute top-6 right-6 text-kits-gold opacity-20 group-hover:opacity-40 transition-opacity" size={40} />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-kits-navy border border-kits-gold/30 rounded-full flex items-center justify-center text-kits-gold font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-xs text-kits-gold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              <p className="text-kits-white/80 italic font-satoshi leading-relaxed">
                "{t.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
