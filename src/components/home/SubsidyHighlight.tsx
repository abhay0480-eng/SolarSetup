import { Link } from 'react-router-dom';
import { IndianRupee, ArrowRight, Info } from 'lucide-react';
import subsidyEn from '../../content/en/subsidyHighlight.json';
import subsidyHi from '../../content/hi/subsidyHighlight.json';
import { useContent } from '../../i18n/LanguageContext';

export default function SubsidyHighlight() {
  const s = useContent(subsidyEn, subsidyHi);
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-leaf-100/40 dark:bg-leaf-900/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-2-soft border border-leaf-200 dark:border-leaf-500/25 rounded-full px-4 py-1.5 mb-5 sm:mb-6">
              <IndianRupee size={14} className="text-leaf-600 dark:text-leaf-400" />
              <span className="text-leaf-700 dark:text-leaf-300 text-sm font-medium">{s.badgeText}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {s.heading}{' '}
              <span className="text-gradient-leaf">
                {s.headingHighlight}
              </span>{' '}
              {s.headingSuffix}
            </h2>

            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
              {s.description}
            </p>

            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="bento p-4 sm:p-5">
                <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-accent-soft rounded-lg flex items-center justify-center text-accent-strong dark:text-accent text-xs font-bold">C</span>
                  {s.centralTitle}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-canvas-alt rounded-xl p-3">
                    <p className="text-foreground-subtle text-xs mb-1">{s.centralTier1Label}</p>
                    <p className="text-foreground font-bold">{s.centralTier1Value}</p>
                    <p className="text-leaf-600 dark:text-leaf-400 text-xs">{s.centralTier1Note}</p>
                  </div>
                  <div className="bg-canvas-alt rounded-xl p-3">
                    <p className="text-foreground-subtle text-xs mb-1">{s.centralTier2Label}</p>
                    <p className="text-foreground font-bold">{s.centralTier2Value}</p>
                    <p className="text-leaf-600 dark:text-leaf-400 text-xs">{s.centralTier2Note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-foreground-subtle">
                  <Info size={12} className="text-solar-500 dark:text-solar-400" />
                  {s.centralFootnote}
                </div>
              </div>

              <div className="bento p-4 sm:p-5">
                <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-accent-3-soft rounded-lg flex items-center justify-center text-sky-700 dark:text-sky-300 text-xs font-bold">S</span>
                  {s.stateTitle}
                </h4>
                <p className="text-foreground-muted text-sm">{s.stateDescription}</p>
              </div>
            </div>

            <Link
              to="/subsidies"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-leaf-500 to-leaf-600 text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-leaf-500/25 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              {s.ctaLabel}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: State Table */}
          <div className="bento overflow-hidden">
            <div className="bg-gradient-to-r from-leaf-50 dark:from-leaf-900/25 to-solar-50 dark:to-solar-900/25 px-5 sm:px-6 py-4 border-b border-border">
              <h3 className="text-foreground font-bold">{s.tableTitle}</h3>
              <p className="text-foreground-subtle text-xs mt-1">{s.tableSubtitle}</p>
            </div>
            <div className="divide-y divide-border">
              {s.topStates.map((row) => (
                <div key={row.state} className="px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-canvas-alt/60 transition-colors">
                  <div>
                    <p className="text-foreground font-medium text-sm">{row.state}</p>
                    <p className="text-foreground-subtle text-xs">{s.centralLabel}: {row.central} + {s.stateLabel}: {row.stateSub}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-leaf-600 dark:text-leaf-400 font-bold">{row.total}</p>
                    <p className="text-foreground-subtle text-xs">{s.totalSubsidyLabel}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 sm:px-6 py-4 bg-canvas-alt border-t border-border">
              <Link to="/subsidies" className="text-solar-600 dark:text-solar-400 text-sm font-medium hover:text-solar-700 dark:hover:text-solar-300 flex items-center gap-1 group">
                {s.viewAllLabel}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
