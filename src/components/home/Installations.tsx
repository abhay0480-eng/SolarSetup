import { useState } from 'react';
import { Building2, Zap, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import installationsEn from '../../content/en/installations.json';
import installationsHi from '../../content/hi/installations.json';
import { imageMap } from '../../content/images';
import { useContent } from '../../i18n/LanguageContext';

export default function Installations() {
  const installations = useContent(installationsEn, installationsHi);
  const [active, setActive] = useState(0);
  const project = installations.projects[active];

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-surface">
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-solar-100/40 dark:bg-solar-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-leaf-100/40 dark:bg-leaf-900/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-accent-3-soft border border-sky-200 dark:border-sky-500/25 rounded-full px-4 py-1.5 mb-4">
            <Building2 size={14} className="text-accent-3" />
            <span className="text-sky-700 dark:text-sky-300 text-sm font-medium">{installations.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {installations.heading}{' '}
            <span className="text-gradient">{installations.headingHighlight}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            {installations.subheading}
          </p>
        </div>

        {/* Featured project viewer — bento */}
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 items-stretch mb-6 sm:mb-8">
          {/* Photo */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-[var(--shadow-bento-lg)] border border-border">
            <img
              src={imageMap[project.imageKey]}
              alt={project.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={13} className="text-solar-300" />
                <span className="text-solar-200 text-sm font-medium">{project.location}</span>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">{project.name}</h3>
            </div>
          </div>

          {/* Details */}
          <div className="bento p-5 sm:p-7 flex flex-col justify-center space-y-4 sm:space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-accent-soft border border-solar-200 dark:border-solar-500/25 rounded-full px-3 py-1 text-accent-strong dark:text-accent text-sm font-medium mb-3">
                <Zap size={12} /> {project.type}
              </span>
              <h3 className="text-foreground text-xl sm:text-2xl font-bold mb-2">{project.name}</h3>
              <p className="text-foreground-muted leading-relaxed text-sm sm:text-base">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-canvas-alt rounded-xl p-4">
                <p className="text-foreground-subtle text-xs mb-1">{installations.capacityLabel}</p>
                <p className="text-foreground font-bold">{project.capacity}</p>
              </div>
              <div className="bg-canvas-alt rounded-xl p-4">
                <p className="text-foreground-subtle text-xs mb-1">{installations.locationLabel}</p>
                <p className="text-foreground font-bold">{project.location}</p>
              </div>
            </div>

            <div className="bg-canvas-alt rounded-2xl p-4 space-y-2">
              {installations.featureBullets.map((point) => (
                <div key={point} className="flex items-start gap-2 text-sm text-foreground-muted">
                  <span className="w-1.5 h-1.5 bg-accent-2 rounded-full mt-1.5 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project thumbnails */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-14">
          <button
            onClick={() => setActive(a => (a - 1 + installations.projects.length) % installations.projects.length)}
            className="w-11 h-11 bento flex items-center justify-center text-foreground-subtle hover:text-foreground transition-colors shrink-0"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1">
            {installations.projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] w-32 sm:w-36 shrink-0 transition-all duration-300 ${
                  i === active
                    ? 'ring-2 ring-solar-500 opacity-100 scale-105'
                    : 'opacity-70 sm:opacity-60 hover:opacity-90'
                }`}
              >
                <img src={imageMap[p.imageKey]} alt={p.name} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/30" />
                <p className="absolute bottom-1 left-1 right-1 text-white text-[10px] font-medium leading-tight px-1 line-clamp-2">
                  {p.name}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setActive(a => (a + 1) % installations.projects.length)}
            className="w-11 h-11 bento flex items-center justify-center text-foreground-subtle hover:text-foreground transition-colors shrink-0"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Client Ticker */}
        <div className="mb-8 sm:mb-14">
          <h3 className="text-center text-foreground font-bold text-lg sm:text-xl mb-2">{installations.clientsHeading}</h3>
          <p className="text-center text-foreground-subtle text-sm mb-5 sm:mb-6">{installations.clientsSubheading}</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-surface to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-surface to-transparent z-10" />
            <div
              className="flex gap-3 w-max"
              style={{ animation: 'scrollClients 40s linear infinite' }}
            >
              {[...installations.clients, ...installations.clients].map((client, i) => (
                <div
                  key={i}
                  className="bento rounded-xl px-4 py-2.5 whitespace-nowrap text-foreground-muted text-sm font-medium hover:text-foreground hover:border-solar-300 dark:hover:border-solar-500/40 transition-colors"
                >
                  {client}
                </div>
              ))}
            </div>
            <style>{`
              @keyframes scrollClients {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        </div>

        {/* Engineering Documentation callout */}
        <div className="bento p-5 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 items-start">
            <div>
              <h3 className="text-foreground text-lg sm:text-xl font-bold mb-2">{installations.docsCallout.heading}</h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                {installations.docsCallout.description}
              </p>
              <div className="inline-flex items-center gap-2 bg-accent-2-soft border border-leaf-200 dark:border-leaf-500/25 rounded-full px-4 py-1.5">
                <span className="text-leaf-700 dark:text-leaf-300 text-sm font-medium">{installations.docsCallout.badge}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
              {installations.engineeringDocs.map((doc) => (
                <div key={doc} className="flex items-center gap-2 text-foreground-muted">
                  <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                  <span className="text-xs">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
