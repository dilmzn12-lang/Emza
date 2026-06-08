
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { StoreProvider, useStore } from './StoreContext';
import { Navbar, Footer } from './components/Layout';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductCard, FeedbackSection } from './components/HomeComponents';
import { BRANDS_INFO } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';
import { LanguageSplash } from './components/LanguageSplash';

const HomePage = () => {
  const { t } = useLanguage();
  const { products } = useStore();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');

  const filteredProducts = products.filter(p => {
    const brandMatch = selectedBrand === 'All' || p.brand === selectedBrand;
    const genderMatch = selectedGender === 'all' || p.gender === selectedGender;
    return brandMatch && genderMatch;
  });

  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('language_selected'));

  if (showSplash) {
    return <LanguageSplash onComplete={() => {
      setShowSplash(false);
      sessionStorage.setItem('language_selected', 'true');
    }} />;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1600" 
            alt="Luxury Watch Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-500 tracking-[0.4em] uppercase text-sm mb-4 font-semibold"
          >
            {t.subtitle}
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={() => {
                setSelectedGender('men');
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-white transition-all uppercase text-sm tracking-widest"
            >
              {t.men}
            </button>
            <button 
              onClick={() => {
                setSelectedGender('women');
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border border-white/30 backdrop-blur-md px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest"
            >
              {t.women}
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/50" />
        </div>
      </section>

      {/* Filters & Grid */}
      <section id="products" className="py-12 max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-center text-4xl font-serif font-bold mb-12 uppercase tracking-[0.2em] text-neutral-900">{t.brands}</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <button 
              onClick={() => setSelectedBrand('All')}
              className={`group flex flex-col items-center gap-2 transition-all ${selectedBrand === 'All' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center text-[10px] font-bold tracking-widest uppercase ${selectedBrand === 'All' ? 'border-yellow-600 bg-black text-yellow-500' : 'border-neutral-200 bg-white text-neutral-400'}`}>
                {t.all}
              </div>
            </button>
            {BRANDS_INFO.map((brand) => (
              <button 
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`group flex flex-col items-center gap-2 transition-all ${selectedBrand === brand.name ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-100 hover:scale-105'}`}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 p-3 flex items-center justify-center overflow-hidden transition-all ${selectedBrand === brand.name ? 'border-yellow-600 shadow-xl' : 'border-neutral-100 shadow-sm'}`}>
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-[8px] font-bold text-neutral-400">${brand.name.substring(0,3).toUpperCase()}</span>`;
                    }}
                  />
                </div>
                <span className={`text-xs font-extrabold uppercase tracking-widest mt-1 ${selectedBrand === brand.name ? 'text-yellow-600' : 'text-neutral-500'}`}>
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-neutral-100 p-1.5 rounded-full">
            <button 
              onClick={() => setSelectedGender('all')}
              className={`px-8 py-3 rounded-full text-xs font-bold transition-all ${selectedGender === 'all' ? 'bg-black text-white shadow-lg' : 'text-neutral-500 hover:text-black'}`}
            >
              {t.all}
            </button>
            <button 
              onClick={() => setSelectedGender('men')}
              className={`px-8 py-3 rounded-full text-xs font-bold transition-all ${selectedGender === 'men' ? 'bg-black text-white shadow-lg' : 'text-neutral-500 hover:text-black'}`}
            >
              {t.men}
            </button>
            <button 
              onClick={() => setSelectedGender('women')}
              className={`px-8 py-3 rounded-full text-xs font-bold transition-all ${selectedGender === 'women' ? 'bg-black text-white shadow-lg' : 'text-neutral-500 hover:text-black'}`}
            >
              {t.women}
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
            <Filter size={48} className="mx-auto text-neutral-300 mb-4" />
            <p className="text-neutral-500 font-medium">{t.noProducts}</p>
          </div>
        )}
      </section>

      <FeedbackSection />
    </main>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/emza-manage-750" element={<AdminDashboard />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </StoreProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
