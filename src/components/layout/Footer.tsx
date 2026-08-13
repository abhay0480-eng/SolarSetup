import { Sun, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#040c18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center">
                <Sun size={20} className="text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none">SolarCraft</span>
                <span className="block text-orange-400 text-xs font-medium">India</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              India's leading self-design solar setup platform. Custom solar solutions for every Indian home.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'YouTube'].map((s) => (
                <div key={s} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-gray-400 text-xs">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Design Solar Setup', path: '/configurator' },
                { label: 'Solar Products', path: '/products' },
                { label: 'State Subsidies', path: '/subsidies' },
                { label: 'About Us', path: '/about' },
                { label: 'Blog', path: '/blog' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solar Products</h4>
            <ul className="space-y-2">
              {['Solar Panels', 'Inverters', 'Batteries', 'Mounting Structures', 'Wiring & BOS', 'Charge Controllers'].map((p) => (
                <li key={p}>
                  <span className="text-gray-400 text-sm cursor-pointer hover:text-orange-400 transition-colors">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-orange-400 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">Solar Tower, Sector 18, Noida, UP 201301</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-orange-400 shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-orange-400 shrink-0" />
                <span className="text-gray-400 text-sm">hello@solarcraft.in</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
              <p className="text-orange-300 text-xs font-medium">MNRE Empanelled Vendor</p>
              <p className="text-gray-400 text-xs mt-0.5">Certified under PM Surya Ghar Yojana</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2025 SolarCraft India Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500 text-xs">
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
