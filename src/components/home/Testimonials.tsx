import { Star, Quote } from 'lucide-react';
import testimonialsEn from '../../content/en/testimonials.json';
import testimonialsHi from '../../content/hi/testimonials.json';
import { useContent } from '../../i18n/LanguageContext';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'text-solar-400 fill-solar-400' : 'text-ink-100 dark:text-white/10'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const testimonials = useContent(testimonialsEn, testimonialsHi);
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative bg-canvas-alt overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-solar-100/40 dark:bg-solar-900/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-solar-200 dark:border-solar-500/25 rounded-full px-4 py-1.5 mb-4">
            <Star size={14} className="text-solar-500 dark:text-solar-400 fill-solar-500 dark:fill-solar-400" />
            <span className="text-accent-strong dark:text-accent text-sm font-medium">{testimonials.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {testimonials.heading}{' '}
            <span className="text-gradient">{testimonials.headingHighlight}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-xl mx-auto">
            {testimonials.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.items.map((t, i) => (
            <div key={i} className="bento bento-hover p-5 sm:p-6 flex flex-col">
              <Quote size={24} className="text-solar-300 mb-3" />
              <p className="text-foreground-muted text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>

              <div className="border-t border-border pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-foreground font-semibold text-sm">{t.name}</p>
                    <p className="text-foreground-subtle text-xs">{t.location}</p>
                    <p className="text-sky-600 dark:text-sky-400 text-xs mt-1">{t.system}</p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={t.rating} />
                    <p className="text-leaf-600 dark:text-leaf-400 text-xs font-semibold mt-1">{t.savings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
