import Hero from '../components/home/Hero';
import WhyZenbright from '../components/home/WhyZenbright';
import Installations from '../components/home/Installations';
import ProjectGallery from '../components/home/ProjectGallery';
import SystemTypes from '../components/home/SystemTypes';
import Brands from '../components/home/Brands';
import SubsidyHighlight from '../components/home/SubsidyHighlight';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Phone } from 'lucide-react';
import companyEn from '../content/en/company.json';
import companyHi from '../content/hi/company.json';
import homeEn from '../content/en/home.json';
import homeHi from '../content/hi/home.json';
import { useContent } from '../i18n/LanguageContext';

export default function Home() {
  const company = useContent(companyEn, companyHi);
  const home = useContent(homeEn, homeHi);
  return (
    <div>
      <Hero />
      <WhyZenbright />
      <Installations />
      <ProjectGallery />
      <SystemTypes />
      <Brands />
      <SubsidyHighlight />
      <Testimonials />
      <FAQ />

      {/* Final CTA — dark bookend, mirrors the Hero */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 bg-gradient-to-br from-solar-500/10 to-leaf-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-solar-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {home.finalCta.heading}{' '}
            <span className="bg-gradient-to-r from-solar-300 to-solar-400 bg-clip-text text-transparent">{home.finalCta.headingHighlight}</span>
          </h2>
          <p className="text-white/70 text-lg mb-4 max-w-2xl mx-auto">
            {home.finalCta.description}
          </p>
          <p className="text-white/45 text-sm mb-10 italic">
            "{company.fullPhilosophyQuote}"
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/configurator"
              className="flex items-center gap-2 bg-gradient-to-r from-solar-500 to-solar-600 text-white font-bold px-10 py-4 rounded-full hover:shadow-xl hover:shadow-solar-500/30 hover:-translate-y-0.5 transition-all duration-200 text-lg group"
            >
              <Zap size={20} />
              {home.finalCta.primaryCta}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${company.phones[0]}`}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-200 text-lg"
            >
              <Phone size={18} />
              {home.finalCta.secondaryCta} {company.phones[0].replace('+91', '+91-')}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/45 text-sm">
            <span>📧 {company.email}</span>
            <span>📍 {company.addressShort}</span>
            <span>🌐 {company.website}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
