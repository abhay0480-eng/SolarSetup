import brandsEn from '../../content/en/brands.json';
import brandsHi from '../../content/hi/brands.json';
import { useContent } from '../../i18n/LanguageContext';

function BrandScroller({ brandList, direction = 'left' }: { brandList: string[]; direction?: 'left' | 'right' }) {
  const doubled = [...brandList, ...brandList];
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-3 sm:gap-4 w-max"
        style={{
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} 25s linear infinite`,
        }}
      >
        {doubled.map((brand, i) => (
          <div
            key={i}
            className="bento rounded-xl px-4 sm:px-5 py-3 sm:py-2.5 whitespace-nowrap text-foreground-muted text-sm font-medium hover:text-foreground hover:border-solar-300 dark:hover:border-solar-500/40 transition-colors cursor-pointer"
          >
            {brand}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function Brands() {
  const brands = useContent(brandsEn, brandsHi);
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {brands.heading}{' '}
            <span className="text-gradient">
              {brands.headingHighlight}
            </span>
          </h2>
          <p className="text-foreground-muted">{brands.subheading}</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-foreground-subtle text-xs uppercase tracking-widest mb-3 pl-2">{brands.panelsLabel}</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-canvas to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-canvas to-transparent z-10" />
              <BrandScroller brandList={brands.panelBrands} direction="left" />
            </div>
          </div>

          <div>
            <p className="text-foreground-subtle text-xs uppercase tracking-widest mb-3 pl-2">{brands.invertersLabel}</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-canvas to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-canvas to-transparent z-10" />
              <BrandScroller brandList={brands.inverterBrands} direction="right" />
            </div>
          </div>

          <div>
            <p className="text-foreground-subtle text-xs uppercase tracking-widest mb-3 pl-2">{brands.batteriesLabel}</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-canvas to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-canvas to-transparent z-10" />
              <BrandScroller brandList={brands.batteryBrands} direction="left" />
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
          {brands.certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2 shadow-[var(--shadow-bento)]">
              <div className="w-2 h-2 bg-accent-2 rounded-full" />
              <span className="text-foreground-muted text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
