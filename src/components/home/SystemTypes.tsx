import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import systemTypesEn from '../../content/en/systemTypes.json';
import systemTypesHi from '../../content/hi/systemTypes.json';
import { iconMap } from '../../content/icons';
import { useContent } from '../../i18n/LanguageContext';

export default function SystemTypes() {
  const systemTypes = useContent(systemTypesEn, systemTypesHi);
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative bg-surface overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-solar-100/40 dark:bg-solar-900/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-solar-200 dark:border-solar-500/25 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-strong dark:text-accent text-sm font-medium">{systemTypes.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {systemTypes.heading}{' '}
            <span className="text-gradient">{systemTypes.headingHighlight}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            {systemTypes.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {systemTypes.systems.map((sys) => {
            const Icon = iconMap[sys.icon];
            return (
              <div
                key={sys.id}
                className={`relative bento bento-hover p-5 sm:p-7 hover:shadow-2xl ${sys.glow} flex flex-col`}
              >
                {/* Badge */}
                <div className={`absolute -top-3 left-6 ${sys.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {sys.badge}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${sys.iconBg} rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-5 mt-2`}>
                  <Icon size={24} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{sys.title}</h3>
                <p className="text-foreground-subtle text-sm mb-4 sm:mb-5">{sys.subtitle}</p>

                {/* Features */}
                <ul className="space-y-2 mb-5 sm:mb-6 flex-1">
                  {sys.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground-muted">
                      <Check size={14} className="text-accent-2 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Suitable for */}
                <div className="bg-canvas-alt rounded-xl p-3 mb-4 sm:mb-5">
                  <p className="text-foreground-subtle text-xs leading-relaxed">{sys.suitable}</p>
                </div>

                {/* Price range */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="text-foreground-subtle text-sm">{systemTypes.startingFromLabel}</span>
                  <span className="text-solar-600 dark:text-solar-400 font-bold">{sys.priceRange}</span>
                </div>

                <Link
                  to={sys.path}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-solar-500 to-solar-600 hover:shadow-lg hover:shadow-solar-500/30 text-white font-semibold py-3 rounded-full transition-all duration-200 group"
                >
                  {systemTypes.ctaLabel}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
