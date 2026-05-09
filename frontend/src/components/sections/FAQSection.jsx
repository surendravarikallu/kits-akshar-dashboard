import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SPRING_REVEAL, SPRING_STAGGER } from '../../utils/animations';

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`border-b border-white/5 transition-all duration-500 ${isOpen ? 'bg-white/5 p-6' : 'p-6'}`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between text-left group"
      >
        <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-kits-gold' : 'text-white group-hover:text-kits-gold'}`}>
          {question}
        </h3>
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-kits-gold' : 'text-kits-gray'}`}>
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-kits-gray leading-relaxed text-lg font-satoshi">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ data }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = data?.items || [
    {
      question: "What makes KITS Akshar a 'Pro Max' experience?",
      answer: "We integrate cinematic motion design into our pedagogy. Every digital interaction on campus and in our learning management system is optimized for high-stiffness spring physics and kinetic synchronization."
    },
    {
      question: "Are admissions open for the current academic year?",
      answer: "Yes, admissions for the 2026-2027 batch are currently open. We recommend applying through our digital portal to experience our fluid application process."
    },
    {
      question: "What kind of industry support do students receive?",
      answer: "We have partnerships with over 150 Fortune 500 companies. Our students engage in real-world projects starting from their sophomore year, ensuring they are industry-ready."
    }
  ];

  return (
    <section className="w-full py-24 bg-kits-black">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SPRING_STAGGER(0.1)}
          className="text-center mb-16"
        >
          <motion.h2 variants={SPRING_REVEAL} className="text-3xl md:text-5xl font-clash font-bold text-white uppercase mb-4">
            {data?.title || "Common Queries"}
          </motion.h2>
          <motion.p variants={SPRING_REVEAL} className="text-kits-gray font-satoshi uppercase tracking-widest text-sm">
            Everything you need to know about the KITS ecosystem
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SPRING_REVEAL}
          className="glass border border-white/5 rounded-sm overflow-hidden"
        >
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
