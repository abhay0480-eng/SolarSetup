import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqEn from '../../content/en/faq.json';
import faqHi from '../../content/hi/faq.json';
import { useContent } from '../../i18n/LanguageContext';

export default function FAQ() {
  const faq = useContent(faqEn, faqHi);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {faq.heading}{' '}
            <span className="text-gradient">{faq.headingHighlight}</span>
          </h2>
          <p className="text-foreground-muted">{faq.subheading}</p>
        </div>

        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <div
              key={i}
              className={`bento overflow-hidden transition-all duration-200 ${openIndex === i ? '!border-solar-300 dark:!border-solar-500/50' : ''}`}
            >
              <button
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`font-medium text-sm sm:text-base transition-colors ${openIndex === i ? 'text-accent-strong dark:text-accent' : 'text-foreground'}`}>
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-foreground-subtle transition-transform duration-200 ${openIndex === i ? 'rotate-180 text-solar-500 dark:text-solar-400' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                  <p className="text-foreground-muted text-sm leading-relaxed border-t border-border pt-4">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
