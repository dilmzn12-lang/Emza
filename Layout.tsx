
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Menu, X, Phone, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-black/95 text-white sticky top-0 z-50 border-b border-yellow-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link 
            to="/" 
            className="flex flex-col items-center"
            onDoubleClick={() => window.location.hash = '/emza-manage-750'}
          >
            <span className="text-2xl font-serif font-bold tracking-widest text-yellow-500">EMZA</span>
            <span className="text-xs tracking-[0.3em] text-gray-400">WATCH VIP</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <button 
              onClick={() => window.location.reload()} 
              className="text-gray-400 hover:text-yellow-500"
            >
              <Globe size={18} />
            </button>
            <Link to="/" className="hover:text-yellow-500 transition-colors">{t.all}</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-b border-yellow-800/30 pb-4 px-4">
          <div className="flex flex-col space-y-4 pt-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg">{t.all}</Link>
            <div className="flex space-x-4 rtl:space-x-reverse border-t border-gray-800 pt-4">
              <button onClick={() => { setLanguage('en'); setIsOpen(false); }}>English</button>
              <button onClick={() => { setLanguage('ar'); setIsOpen(false); }}>العربية</button>
              <button onClick={() => { setLanguage('ku'); setIsOpen(false); }}>کوردی</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-neutral-950 text-white pt-12 pb-6 border-t border-yellow-900/20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-serif font-bold text-yellow-500 mb-4">{t.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{t.subtitle}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">{t.contactUs}</h4>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-yellow-600" />
              <span dir="ltr">{t.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-yellow-600" />
              <span>{t.location}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">{t.brands}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
            <span>Rolex</span>
            <span>Omega</span>
            <span>Patek Philippe</span>
            <span>Cartier</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-gray-900 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} {t.title}. All rights reserved.
      </div>
    </footer>
  );
};
