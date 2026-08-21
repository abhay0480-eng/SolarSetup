import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyEn from '../../content/en/company.json';
import companyHi from '../../content/hi/company.json';
import footerEn from '../../content/en/footer.json';
import footerHi from '../../content/hi/footer.json';
import uiEn from '../../content/en/ui.json';
import uiHi from '../../content/hi/ui.json';
import { useContent } from '../../i18n/LanguageContext';

export default function Footer() {
  const company = useContent(companyEn, companyHi);
  const footer = useContent(footerEn, footerHi);
  const ui = useContent(uiEn, uiHi);
  return (
    <footer className="bg-canvas-alt border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Greentech Energy Solution Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed mb-3">
              {company.footerDescription}
            </p>
            <p className="text-foreground-subtle text-xs italic mb-5">
              "{company.philosophyQuote}"
            </p>
            <div className="flex gap-3">
              {company.socials.map((s) => (
                <div key={s} className="w-8 h-8 bg-surface hover:bg-surface-alt border border-border rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-foreground-muted text-xs">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{ui.quickLinks}</h4>
            <ul className="space-y-2">
              {footer.quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-foreground-muted hover:text-accent text-sm transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Served */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{ui.industriesServed}</h4>
            <ul className="space-y-2">
              {footer.industriesServed.map((p) => (
                <li key={p}>
                  <span className="text-foreground-muted text-sm cursor-pointer hover:text-accent transition-colors">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{ui.contactUs}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                <span className="text-foreground-muted text-sm">{company.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-accent shrink-0" />
                <div className="text-foreground-muted text-sm">
                  {company.phones.map((phone, i) => (
                    <span key={phone}>
                      {i > 0 && <span className="text-foreground-subtle mx-1">|</span>}
                      <a href={`tel:${phone}`} className="hover:text-accent transition-colors">{phone.replace('+91', '+91-')}</a>
                    </span>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-accent shrink-0" />
                <a href={`mailto:${company.email}`} className="text-foreground-muted text-sm hover:text-accent transition-colors">{company.email}</a>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-accent-2-soft rounded-xl border border-leaf-500/20">
              <p className="text-accent-2 text-xs font-medium">{company.govtBadge.title}</p>
              <p className="text-foreground-muted text-xs mt-0.5">{company.govtBadge.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 lg:mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-foreground-subtle text-sm">{company.copyrightText}</p>
          <div className="flex flex-wrap justify-center gap-4 text-foreground-subtle text-xs">
            {footer.legalLinks.map((label) => (
              <span key={label} className="cursor-pointer hover:text-foreground-muted transition-colors">{label}</span>
            ))}
            <span className="cursor-pointer hover:text-foreground-muted transition-colors">{company.website}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
