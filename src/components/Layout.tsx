import { Globe, Phone, MapPin, Mail, Heart, Youtube, Instagram, Facebook, Utensils, User } from 'lucide-react';
import { ASSETS } from '../data';
import { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  onOpenReview: () => void;
}

export function Layout({ children, onOpenReview }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = location.pathname.slice(1) as 'home' | 'menu' | 'about' | 'contact' || 'home';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-deep-black min-h-screen flex flex-col font-body-md text-on-surface">
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-deep-black border-b border-momo-gold shadow-[0_4px_20px_rgba(237,28,36,0.15)] transition-all duration-300 ease-in-out ${
          scrolled ? 'py-2 bg-deep-black/95 backdrop-blur-sm' : 'py-4'
        }`}
      >
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img src={ASSETS.logo} alt="Hype Momo Logo" className="h-12 w-auto object-contain" />
            <span className="text-[16px] sm:text-headline-md font-headline-md font-black text-momo-gold uppercase tracking-tighter">
              Hype Momo
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/home')}
              className={`font-label-bold text-label-bold transition-colors duration-200 ${
                currentView === 'home'
                  ? 'text-momo-gold border-b-2 border-momo-gold pb-1'
                  : 'text-on-surface hover:text-spicy-red'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/menu')}
              className={`font-label-bold text-label-bold transition-colors duration-200 ${
                currentView === 'menu'
                  ? 'text-spicy-red border-b-2 border-spicy-red pb-1'
                  : 'text-on-surface hover:text-spicy-red'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => navigate('/about')}
              className={`font-label-bold text-label-bold transition-colors duration-200 ${
                currentView === 'about'
                  ? 'text-momo-gold border-b-2 border-momo-gold pb-1'
                  : 'text-on-surface hover:text-spicy-red'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`font-label-bold text-label-bold transition-colors duration-200 ${
                currentView === 'contact'
                  ? 'text-momo-gold border-b-2 border-momo-gold pb-1'
                  : 'text-on-surface hover:text-spicy-red'
              }`}
            >
              Contact
            </button>
          </nav>

          <button
            onClick={onOpenReview}
            className="bg-spicy-red text-pure-white px-6 py-2 rounded-full font-label-bold text-label-bold transition-all shadow-lg shadow-spicy-red/20 active:scale-95 hover:bg-red-700"
          >
            Submit Review
          </button>
        </div>
      </header>

      <main className="flex-1 mt-20 md:mt-24">{children}</main>

      <a
        href="https://wa.me/919315795638"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-6 z-50 flex flex-col items-center gap-1"
      >
        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40 hover:bg-green-600 hover:scale-110 transition-all">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <span className="text-[10px] font-label-bold text-green-500 bg-deep-black/80 px-2 py-0.5 rounded whitespace-nowrap">
          Order on WhatsApp
        </span>
      </a>

      <footer className="bg-surface-container-lowest border-t border-momo-gold/30 w-full py-10 sm:py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src={ASSETS.logo} alt="Logo" className="h-10 w-auto" />
              <span className="text-headline-md font-headline-md font-extrabold text-momo-gold">
                Hype Momo
              </span>
            </div>
            <p className="text-body-md text-on-surface-variant max-w-xs opacity-80">
              Hype Momo is a rapidly growing food brand, founded in 2026 by two young and passionate entrepreneurs – Sandeep Kamat and Raju Kamat.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-on-surface-variant hover:text-momo-gold transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-on-surface-variant hover:text-spicy-red transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-on-surface-variant hover:text-spicy-red transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-label-bold font-label-bold text-momo-gold uppercase tracking-widest">
              Connect With Us
            </h4>
            <ul className="space-y-3">
              <li className="text-body-md text-on-surface-variant flex items-center gap-2">
                <Phone className="w-5 h-5 text-momo-gold" /> <a href="tel:+919315795638" className="hover:text-momo-gold transition-colors">+91 9315795638</a>
              </li>
              <li className="text-body-md text-on-surface-variant flex items-center gap-2">
                <MapPin className="w-5 h-5 text-momo-gold" /> <a href="https://www.google.com/maps?q=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="hover:text-momo-gold transition-colors">B-1/547 J J Colony, Phase-1, Madanpur Khadar, South Delhi-110076</a>
              </li>
              <li className="text-body-md text-on-surface-variant flex items-center gap-2">
                <Mail className="w-5 h-5 text-momo-gold" /> <a href="mailto:momoshype@gmail.com" className="hover:text-momo-gold transition-colors">momoshype@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
             <p className="text-body-md text-on-surface-variant md:text-right max-w-xs md:opacity-80">
                © 2026 Hype Momo. All rights reserved. <br/> Good Food, Good Mood.
             </p>

            <div className="mt-2 flex items-center gap-2 md:justify-end">
              <Heart fill="currentColor" className="text-spicy-red w-4 h-4" />
              <span className="text-label-bold text-momo-gold italic lowercase">
                made with love in delhi
              </span>
            </div>
          </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-deep-black/95 backdrop-blur-md flex justify-around items-center py-4 px-4 z-50 border-t border-momo-gold/20">
        <button
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'home' ? 'text-momo-gold font-bold' : 'text-on-surface-variant hover:text-spicy-red'
          }`}
        >
           <Globe fill={currentView === 'home' ? 'currentColor' : 'none'} className="w-6 h-6" />
          <span className="text-[10px] font-label-bold">Home</span>
        </button>
        <button
           onClick={() => navigate('/menu')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'menu' ? 'text-spicy-red font-bold' : 'text-on-surface-variant hover:text-spicy-red'
          }`}
        >
          <Utensils fill={currentView === 'menu' ? 'currentColor' : 'none'} className="w-6 h-6" />
          <span className="text-[10px] font-label-bold">Menu</span>
        </button>
        <button
          onClick={() => navigate('/about')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'about' ? 'text-momo-gold font-bold' : 'text-on-surface-variant hover:text-spicy-red'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-label-bold">About</span>
        </button>
        <button
          onClick={() => navigate('/contact')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'contact' ? 'text-momo-gold font-bold' : 'text-on-surface-variant hover:text-spicy-red'
          }`}
        >
          <Phone className="w-6 h-6" />
          <span className="text-[10px] font-label-bold">Contact</span>
        </button>
      </div>
    </div>
  );
}
