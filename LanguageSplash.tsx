
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSplash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { setLanguage } = useLanguage();

  const handleSelect = (lang: 'en' | 'ar' | 'ku') => {
    setLanguage(lang);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover"
          alt="Luxury background"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center w-full max-w-xl px-6"
      >
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-yellow-500 tracking-tighter mb-2">EMZA</h1>
          <p className="text-white/60 tracking-[0.5em] text-xs uppercase">Watch VIP Luxury Collection</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleSelect('en')}
            className="w-full py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-yellow-600 hover:border-yellow-600 transition-all duration-500 text-lg font-medium tracking-widest"
          >
            ENGLISH
          </button>
          <button 
            onClick={() => handleSelect('ar')}
            className="w-full py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-yellow-600 hover:border-yellow-600 transition-all duration-500 text-xl font-bold font-serif"
          >
            العربية
          </button>
          <button 
            onClick={() => handleSelect('ku')}
            className="w-full py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-yellow-600 hover:border-yellow-600 transition-all duration-500 text-xl font-bold font-serif"
          >
            کوردی
          </button>
        </div>

        <div className="mt-16 text-white/30 text-[10px] tracking-[0.3em] uppercase">
          Kurdistan - Erbil
        </div>
      </motion.div>
    </div>
  );
};
