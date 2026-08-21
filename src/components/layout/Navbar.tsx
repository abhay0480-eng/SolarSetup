import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import companyEn from '../../content/en/company.json';
import companyHi from '../../content/hi/company.json';
import navEn from '../../content/en/nav.json';
import navHi from '../../content/hi/nav.json';
import { useContent } from '../../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const company = useContent(companyEn, companyHi);
  const nav = useContent(navEn, navHi);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
          : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0 py-2">
            <img src="/logo.png" alt="Greentech Energy Solution Logo" className="h-12 lg:h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {nav.links.map((link) => (
              <Link
                key={link.path + link.label}
                to={link.path}
                className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#1a6339]'
                    : 'text-[#2d3748] hover:text-[#1a6339]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Link
              to="/configurator"
              className="flex items-center gap-2 bg-[#1a6339] text-white font-bold px-6 py-2.5 rounded-md border-2 border-[#1a6339] hover:bg-[#14522e] hover:border-[#14522e] transition-all duration-200 text-sm tracking-wide uppercase"
            >
              {nav.ctaLabel}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              className="p-2 text-[#2d3748] hover:text-[#1a6339] transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {nav.links.map((link) => (
              <Link
                key={link.path + link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
                  location.pathname === link.path
                    ? 'text-[#1a6339] bg-green-50'
                    : 'text-[#2d3748] hover:text-[#1a6339] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/configurator"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#1a6339] text-white font-bold px-5 py-3 rounded-md mt-3 text-sm uppercase tracking-wide"
            >
              {nav.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
