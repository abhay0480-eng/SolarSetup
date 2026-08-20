import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Eye } from 'lucide-react';
import galleryEn from '../../content/en/gallery.json';
import galleryHi from '../../content/hi/gallery.json';
import { imageMap } from '../../content/images';
import companyEn from '../../content/en/company.json';
import companyHi from '../../content/hi/company.json';
import { useContent } from '../../i18n/LanguageContext';

export default function ProjectGallery() {
  const gallery = useContent(galleryEn, galleryHi);
  const company = useContent(companyEn, companyHi);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? gallery.items
    : gallery.items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIndex((i) => i !== null ? (i + 1) % filtered.length : null);

  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-canvas-alt" id="gallery">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-solar-100/40 dark:bg-solar-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-leaf-100/40 dark:bg-leaf-900/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-solar-200 dark:border-solar-500/25 rounded-full px-4 py-1.5 mb-4">
            <Camera size={14} className="text-accent-strong dark:text-accent" />
            <span className="text-accent-strong dark:text-accent text-sm font-medium">{gallery.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {gallery.heading}{' '}
            <span className="text-gradient">{gallery.headingHighlight}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            {gallery.subheading}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-10">
          {gallery.categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-solar-500 text-white shadow-lg shadow-solar-500/30'
                  : 'bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-border-strong'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-style Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {filtered.map((item, i) => (
            <div
              key={item.imageKey + item.caption}
              className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden border border-border"
              onClick={() => openLightbox(i)}
            >
              {/* Image */}
              <img
                src={imageMap[item.imageKey]}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-3 sm:p-5">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.category === 'aerial' ? 'bg-blue-500/30 text-blue-300' :
                      item.category === 'onsite' ? 'bg-amber-500/30 text-amber-300' :
                      item.category === 'team' ? 'bg-purple-500/30 text-purple-300' :
                      'bg-green-500/30 text-green-300'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-xs sm:text-sm leading-snug">{item.caption}</p>
                </div>

                {/* View icon */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                  <Eye size={16} className="text-white" />
                </div>
              </div>

              {/* Subtle amber glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-solar-400/50 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Stats bar under gallery */}
        <div className="mt-8 sm:mt-12 bento p-4 sm:p-6 flex flex-wrap justify-center gap-6 sm:gap-16">
          {gallery.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold text-gradient">{s.value}</div>
              <div className="text-foreground-subtle text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal — deliberately fixed dark, it's a full-screen photo viewer independent of site theme */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={22} />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-2 sm:left-8 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="absolute right-2 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageMap[filtered[lightboxIndex].imageKey]}
              alt={filtered[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-4 sm:p-6">
              <p className="text-white font-semibold text-base sm:text-lg">{filtered[lightboxIndex].caption}</p>
              <p className="text-gray-400 text-sm mt-1">
                {lightboxIndex + 1} / {filtered.length} · {company.legalName}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
