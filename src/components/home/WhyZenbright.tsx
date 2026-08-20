import whyUsEn from '../../content/en/whyUs.json';
import whyUsHi from '../../content/hi/whyUs.json';
import companyEn from '../../content/en/company.json';
import companyHi from '../../content/hi/company.json';
import { iconMap } from '../../content/icons';
import { useContent } from '../../i18n/LanguageContext';

export default function WhyZenbright() {
  const whyUs = useContent(whyUsEn, whyUsHi);
  const company = useContent(companyEn, companyHi);
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative bg-canvas overflow-hidden" id="why-zenbright">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-solar-200/30 dark:bg-solar-900/25 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-solar-200 dark:border-solar-500/25 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-strong dark:text-accent text-sm font-medium">{whyUs.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {whyUs.heading}{' '}
            <span className="text-gradient">{whyUs.headingHighlight}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-3xl mx-auto">
            {whyUs.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {whyUs.differentiators.map((d, i) => {
            const Icon = iconMap[d.icon];
            return (
              <div key={i} className={`bento bento-hover p-5 sm:p-7 group ${i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${d.color} rounded-2xl flex items-center justify-center shadow-lg ${d.shadow} mb-4 sm:mb-5`}>
                  <Icon size={24} className="text-white" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 sm:mb-3">{d.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Founding Philosophy Quote */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-solar-100/50 dark:from-solar-900/20 to-leaf-100/40 dark:to-leaf-900/15 rounded-3xl blur-xl" />
          <div className="relative bento p-6 sm:p-10 text-center">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent-soft rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" fill="currentColor" opacity="0.3" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <blockquote className="text-lg sm:text-2xl text-foreground font-medium italic leading-relaxed mb-4">
              "{company.fullPhilosophyQuote}"
            </blockquote>
            <p className="text-accent-strong dark:text-accent font-semibold">{company.philosophyAttribution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
