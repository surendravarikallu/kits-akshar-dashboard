import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';
import { SPRING_REVEAL, SPRING_HOVER } from '../utils/animations';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-kits-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kits-gold/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        variants={SPRING_REVEAL}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-kits-gold/10 border border-kits-gold/20 rounded-2xl mb-6">
            <ShieldCheck className="text-kits-gold" size={32} />
          </div>
          <h1 className="text-4xl font-clash font-bold text-white uppercase tracking-tight mb-2">Admin Portal</h1>
          <p className="text-kits-gray font-satoshi">KITS Akshar Content Management System</p>
        </div>

        <div className="glass p-8 rounded-sm border border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-kits-gold uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-kits-gray" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-kits-black/50 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white focus:outline-none focus:border-kits-gold transition-colors font-satoshi"
                  placeholder="admin@kitsakshar.ac.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-kits-gold uppercase tracking-widest mb-2 ml-1">Secret Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-kits-gray" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-kits-black/50 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white focus:outline-none focus:border-kits-gold transition-colors font-satoshi"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-400 text-sm font-medium text-center"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={SPRING_HOVER}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className={`w-full py-4 bg-kits-gold text-kits-black font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white'}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-kits-black/30 border-t-kits-black rounded-full animate-spin" />
              ) : (
                <>Access Dashboard <LogIn size={18} /></>
              )}
            </motion.button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-kits-gray hover:text-white transition-colors">
            ← Back to Public Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
