import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroBg from '../../assets/hero-bg.jpg';
import heroEn from '../../content/en/hero.json';
import heroHi from '../../content/hi/hero.json';
import { iconMap } from '../../content/icons';
import { useContent } from '../../i18n/LanguageContext';

export default function Hero() {
  const hero = useContent(heroEn, heroHi);
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image — full bleed */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Solar panel installation"
          className="w-full h-full object-cover object-center"
        />
        {/* Left-to-right gradient overlay — adjusted for mobile to allow text readability */}
        <div
          className="absolute inset-0 bg-white/80 sm:bg-transparent"
          style={{
            background: window.innerWidth >= 640 ?
              'linear-gradient(to right, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.1) 65%, transparent 80%)'
              : 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 100%)',
          }}
        />
        {/* Subtle bottom gradient for stats readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,0.3) 0%, transparent 15%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-56 sm:pb-20 w-full">
        <div className="max-w-2xl">
          {/* Main heading */}
          <h1 className="mb-4 sm:mb-6" style={{ textShadow: '0 1px 8px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,0.9)' }}>
            <span className="block text-[#0d2137] text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.1] tracking-tight uppercase">
              {hero.headingLine1}
            </span>
            <span className="block text-[#1a6339] text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.1] tracking-tight uppercase italic">
              {hero.headingHighlight}
            </span>
            <span className="block text-[#0d2137] text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.1] tracking-tight uppercase">
              {hero.headingLine3}
            </span>
          </h1>

          {/* Green accent line */}
          <div className="w-16 h-1 bg-[#1a6339] rounded-full mb-6" />

          {/* Subtitle */}
          <p className="text-[#2d3748] text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl font-medium" style={{ textShadow: '0 1px 6px rgba(255,255,255,0.6)' }}>
            {hero.subtitle}
          </p>

          {/* Feature badges row */}
          <div className="flex flex-wrap items-center gap-0 mb-10">
            {hero.features.map((feat, idx) => {
              const Icon = iconMap[feat.icon];
              return (
                <div key={feat.label} className="flex items-center">
                  {idx > 0 && (
                    <div className="w-px h-10 bg-gray-300 mx-4 sm:mx-6" />
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1a6339] flex items-center justify-center shrink-0 shadow-md shadow-green-900/20">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <span className="block text-[#0d2137] text-xs sm:text-sm font-bold leading-tight">
                        {feat.label}
                      </span>
                      <span className="block text-[#5a6a7c] text-xs sm:text-sm leading-tight">
                        {feat.sublabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Link
              to="/configurator"
              className="group flex justify-center items-center gap-2 bg-[#1a6339] text-white font-bold w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-md hover:bg-[#14522e] transition-all duration-200 text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-green-900/25"
            >
              {hero.primaryCta}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/products"
              className="group flex justify-center items-center gap-2 bg-transparent text-[#0d2137] font-bold w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-md border-2 border-[#0d2137] hover:bg-[#0d2137] hover:text-white transition-all duration-200 text-sm sm:text-base tracking-wide uppercase"
            >
              {hero.secondaryCta}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar — floating at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-5 text-center border border-white/60 shadow-lg shadow-black/5"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-0.5">
                  <span className="text-[#1a6339]">{stat.value}</span>
                  <span className="text-[#1a6339] text-sm sm:text-base font-bold">
                    {stat.unit}
                  </span>
                </div>
                <div className="text-[#5a6a7c] text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
