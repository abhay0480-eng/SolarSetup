import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyEn from '../../content/en/company.json';
import companyHi from '../../content/hi/company.json';
import { useContent } from '../../i18n/LanguageContext';

export default function MobileCTABar() {
  const company = useContent(companyEn, companyHi);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] sm:hidden bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 pb-safe">
      <div className="flex h-16">
        <a
          href={`tel:${company.phones[0]}`}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[#0d2137] bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-200"
        >
          <Phone size={18} className="text-[#1a6339]" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Call Now</span>
        </a>
        <Link
          to="/configurator"
          className="flex-[1.5] flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a6339] to-[#14522e] text-white font-bold uppercase tracking-wide active:opacity-90 transition-opacity"
        >
          <span>Get a Quote</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
