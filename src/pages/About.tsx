import { Zap, Building2, BarChart3, Award, CheckCircle2 } from 'lucide-react';
import companyEn from '../content/en/company.json';
import companyHi from '../content/hi/company.json';
import aboutEn from '../content/en/about.json';
import aboutHi from '../content/hi/about.json';
import whyUsEn from '../content/en/whyUs.json';
import whyUsHi from '../content/hi/whyUs.json';
import installationsEn from '../content/en/installations.json';
import installationsHi from '../content/hi/installations.json';
import footerEn from '../content/en/footer.json';
import footerHi from '../content/hi/footer.json';
import { iconMap } from '../content/icons';
import { useContent } from '../i18n/LanguageContext';

export default function About() {
  const company = useContent(companyEn, companyHi);
  const about = useContent(aboutEn, aboutHi);
  const whyUs = useContent(whyUsEn, whyUsHi);
  const installations = useContent(installationsEn, installationsHi);
  const footer = useContent(footerEn, footerHi);

  const stats = [
    { icon: Zap, value: `${company.installedCapacityKw.toLocaleString('en-IN')} kWp`, label: about.statLabels.installedCapacity, color: 'text-solar-500 dark:text-solar-400', bg: 'bg-solar-50 dark:bg-solar-500/10' },
    { icon: Building2, value: `${company.installationsCount}+`, label: about.statLabels.installations, color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/10' },
    { icon: BarChart3, value: `${company.rating}/5`, label: about.statLabels.customerRating, color: 'text-leaf-600 dark:text-leaf-400', bg: 'bg-leaf-50 dark:bg-leaf-500/10' },
    { icon: Award, value: `${new Date().getFullYear() - company.establishedYear}+ ${about.statLabels.years}`, label: about.statLabels.inOperation, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 sm:pb-20 bg-canvas">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-solar-200 dark:border-solar-800/40 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-strong dark:text-accent text-sm font-medium">{about.badgeText}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {about.heading} <span className="text-gradient">{about.headingHighlight}</span>
          </h1>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            {about.subheading}
          </p>
        </div>

        {/* Founding philosophy + stats bento row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
          <div className="lg:col-span-2 bento bento-hover p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-solar-100/60 dark:bg-solar-500/10 rounded-full blur-3xl" />
            <blockquote className="relative">
              <p className="text-foreground text-lg sm:text-2xl font-semibold italic leading-relaxed mb-4">
                "{company.fullPhilosophyQuote}"
              </p>
              <footer className="text-accent-strong dark:text-accent font-medium">{company.philosophyAttribution}</footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map(({ icon: Icon, value, label, color, bg }) => (
              <div key={label} className={`bento bento-hover p-3.5 sm:p-4 text-center flex flex-col items-center justify-center ${bg}`}>
                <Icon size={20} className={`${color} mb-2`} />
                <p className="text-foreground font-black text-lg sm:text-xl leading-tight">{value}</p>
                <p className="text-foreground-subtle text-[11px] sm:text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company overview */}
        <div className="bento bento-hover p-6 sm:p-8 mb-4 sm:mb-5">
          <h2 className="text-foreground font-bold text-xl sm:text-2xl mb-4">{about.companyOverviewTitle}</h2>
          {about.overviewParagraphs.map((para, i) => (
            <p key={i} className={`text-foreground-muted leading-relaxed ${i === about.overviewParagraphs.length - 1 ? 'mb-6' : 'mb-4'}`}>
              {para}
            </p>
          ))}

          {/* Company facts grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {about.facts.map(({ label, value }) => (
              <div key={label} className="bg-surface-alt rounded-2xl p-3">
                <p className="text-foreground-subtle text-xs mb-0.5">{label}</p>
                <p className="text-foreground text-sm font-medium leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Organizations Choose Us */}
        <div className="mb-4 sm:mb-5">
          <h2 className="text-foreground font-bold text-xl sm:text-2xl mb-2">{whyUs.heading} <span className="text-gradient">{whyUs.headingHighlight}</span></h2>
          <p className="text-foreground-muted text-sm mb-5 sm:mb-6">{about.whyChooseSubheading}</p>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {whyUs.differentiators.map(({ icon, title, desc }) => {
              const Icon = iconMap[icon];
              return (
                <div key={title} className="bento bento-hover p-5 flex gap-3">
                  <div className="w-9 h-9 bg-accent-soft rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent-strong dark:text-accent" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">{title}</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engineering Documentation */}
        <div className="bento bento-hover p-6 sm:p-8 mb-4 sm:mb-5">
          <h2 className="text-foreground font-bold text-lg sm:text-xl mb-2">{installations.docsCallout.heading}</h2>
          <p className="text-foreground-muted text-sm mb-5">{installations.docsCallout.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {installations.engineeringDocs.map((doc) => (
              <div key={doc} className="flex items-center gap-2 text-sm text-foreground-muted">
                <CheckCircle2 size={14} className="text-accent-2 shrink-0" />
                {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Industries + Certifications bento row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="bento bento-hover p-6 sm:p-8">
            <h2 className="text-foreground font-bold text-lg sm:text-xl mb-5">{about.industriesTitle}</h2>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {footer.industriesServed.map((ind) => (
                <div key={ind} className="flex items-center gap-2 bg-accent-3-soft border border-sky-100 dark:border-sky-800/40 rounded-full px-4 py-2 min-h-[2.5rem]">
                  <div className="w-1.5 h-1.5 bg-accent-3 rounded-full shrink-0" />
                  <span className="text-accent-3 text-sm">{ind}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bento bento-hover p-6">
            <h2 className="text-foreground font-bold text-lg sm:text-xl mb-4">{about.certificationsTitle}</h2>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {about.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2 bg-accent-2-soft border border-leaf-100 dark:border-leaf-800/40 rounded-full px-4 py-2 min-h-[2.5rem]">
                  <div className="w-2 h-2 bg-accent-2 rounded-full shrink-0" />
                  <span className="text-accent-2 text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
