import { useState } from 'react';
import { Cpu, Check, ChevronDown, ChevronUp, Wifi } from 'lucide-react';
import { inverters } from '../../data/inverters';
import type { SystemConfig, Tier } from '../../types/solar';
import { formatINR } from '../../utils/priceCalculator';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

const inverterImages = import.meta.glob('../../assets/products/inverters/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const inverterImageById: Record<string, string> = {};
for (const path in inverterImages) {
  const id = path.split('/').pop()!.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  inverterImageById[id] = inverterImages[path];
}

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

export default function Step4Inverter({ config, onChange }: Props) {
  const { step4: t, tierLabels } = useContent(configuratorEn, configuratorHi);
  const [tierFilter, setTierFilter] = useState<'All' | Tier>('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 60/30/10 tier system: budget=sky (entry), standard=solar (recommended/primary), premium=leaf (top-tier/eco)
  const TIER_CONFIG: Record<string, { label: string; cls: string; activeCls: string }> = {
    All: {
      label: tierLabels.All,
      cls: 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken',
      activeCls: 'bg-surface-sunken border-border-strong text-foreground',
    },
    budget: {
      label: tierLabels.budget,
      cls: 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/25 text-sky-700 dark:text-sky-300 hover:text-foreground',
      activeCls: 'bg-sky-100 dark:bg-sky-500/25 border-sky-400 dark:border-sky-400/60 text-sky-800 dark:text-sky-200',
    },
    standard: {
      label: tierLabels.standard,
      cls: 'bg-solar-50 dark:bg-solar-500/10 border-solar-200 dark:border-solar-500/25 text-solar-700 dark:text-solar-300 hover:text-foreground',
      activeCls: 'bg-solar-100 dark:bg-solar-500/25 border-solar-400 dark:border-solar-400/60 text-solar-800 dark:text-solar-200',
    },
    premium: {
      label: tierLabels.premium,
      cls: 'bg-leaf-50 dark:bg-leaf-500/10 border-leaf-200 dark:border-leaf-500/25 text-leaf-700 dark:text-leaf-300 hover:text-foreground',
      activeCls: 'bg-leaf-100 dark:bg-leaf-500/25 border-leaf-400 dark:border-leaf-400/60 text-leaf-800 dark:text-leaf-200',
    },
  };

  const TIER_BADGE: Record<Tier, string> = {
    budget: 'bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-500/30',
    standard: 'bg-solar-100 dark:bg-solar-500/15 text-solar-700 dark:text-solar-300 border-solar-300 dark:border-solar-500/30',
    premium: 'bg-leaf-100 dark:bg-leaf-500/15 text-leaf-700 dark:text-leaf-300 border-leaf-300 dark:border-leaf-500/30',
  };

  const compatible = inverters.filter(inv => inv.compatible.includes(config.systemType));
  const brands = ['All', ...Array.from(new Set(compatible.map(i => i.brand)))];

  const filtered = compatible.filter(inv => {
    if (tierFilter !== 'All' && inv.tier !== tierFilter) return false;
    if (brandFilter !== 'All' && inv.brand !== brandFilter) return false;
    return true;
  });

  const selectedInv = inverters.find(inv => inv.id === config.inverterId);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">
          {t.subheadingPrefix}{' '}
          <span className="text-solar-600 dark:text-solar-400 font-medium capitalize">{config.systemType.replace('-', ' ')}</span> {t.subheadingSuffix} ({config.capacityKw}kW).
        </p>
      </div>

      {/* Tier Filter */}
      <div className="space-y-2">
        <p className="text-foreground-subtle text-xs font-medium uppercase tracking-wide">{t.budgetRange}</p>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'budget', 'standard', 'premium'] as const).map((tk) => {
            const cfg = TIER_CONFIG[tk];
            const isActive = tierFilter === tk;
            const count = tk === 'All' ? compatible.length : compatible.filter(i => i.tier === tk).length;
            return (
              <button
                key={tk}
                onClick={() => setTierFilter(tk)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${isActive ? cfg.activeCls : cfg.cls}`}
              >
                {cfg.label}
                <span className="ml-2 text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <p className="text-foreground-subtle text-xs font-medium uppercase tracking-wide">{t.brand}</p>
        <div className="flex gap-2 flex-wrap">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setBrandFilter(brand)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                brandFilter === brand
                  ? 'bg-gradient-to-r from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/20 border-transparent'
                  : 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {selectedInv && (
        <div className="bg-solar-500/10 border border-solar-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-solar-700 dark:text-solar-300 text-xs font-medium uppercase tracking-wide mb-1">{t.selectedInverter}</p>
            <p className="text-foreground font-bold">{selectedInv.brand} {selectedInv.model}</p>
            <p className="text-foreground-muted text-sm">{selectedInv.capacity}kW • {selectedInv.phase} • {selectedInv.efficiency}% efficiency</p>
          </div>
          <p className="text-foreground font-bold text-xl shrink-0">{formatINR(selectedInv.price)}</p>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-8 text-foreground-subtle">{t.noMatch}</div>
      )}

      <div className="space-y-3">
        {filtered.map((inv) => {
          const isSelected = config.inverterId === inv.id;
          const isExpanded = expandedId === inv.id;

          return (
            <div
              key={inv.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected ? 'border-2 border-accent bg-accent-soft ring-2 ring-accent/15' : 'border border-border bg-surface hover:border-border-strong hover:shadow-md'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {inverterImageById[inv.id] ? (
                    <div className="w-16 h-16 bg-surface rounded-xl border border-sky-500/20 shrink-0 overflow-hidden p-1">
                      <img src={inverterImageById[inv.id]} alt={`${inv.brand} ${inv.model}`} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500/20 to-sky-300/10 rounded-xl flex items-center justify-center border border-sky-500/20 shrink-0">
                      <Cpu size={18} className="text-sky-600 dark:text-sky-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-foreground font-bold">{inv.brand}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_BADGE[inv.tier]}`}>
                            {inv.tier.charAt(0).toUpperCase() + inv.tier.slice(1)}
                          </span>
                          {inv.highlight && (
                            <span className="bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs px-2 py-0.5 rounded-full border border-sky-500/30">
                              {inv.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-foreground-muted text-sm">{inv.model}</p>
                        <p className="text-foreground-subtle text-xs">{inv.type} • {inv.phase}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-foreground font-bold text-lg">{formatINR(inv.price)}</p>
                        <p className="text-foreground-muted text-xs">{inv.warranty}{t.warrantyYear}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        { label: t.specLabels.capacity, value: `${inv.capacity}kW` },
                        { label: t.specLabels.efficiency, value: `${inv.efficiency}%` },
                        { label: t.specLabels.mppt, value: `${inv.mpptTrackers} ${t.specLabels.trackers}` },
                        { label: t.specLabels.maxPv, value: `${inv.maxPvVoltage}V` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-surface-alt rounded-lg px-3 py-1.5 text-center">
                          <p className="text-foreground-muted text-xs">{label}</p>
                          <p className="text-foreground text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      <Wifi size={12} className="text-foreground-subtle" />
                      {inv.connectivity.map((c) => (
                        <span key={c} className="text-foreground-muted text-xs bg-surface-alt px-2 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onChange({ inverterId: inv.id })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/20'
                        : 'bg-surface-alt text-foreground-muted hover:bg-surface-sunken hover:text-foreground'
                    }`}
                  >
                    {isSelected ? <><Check size={15} /> {t.selected}</> : t.selectInverter}
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : inv.id)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-surface-alt hover:bg-surface-alt text-foreground-muted hover:text-foreground text-sm transition-all"
                  >
                    {t.fullSpecs} {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border p-4 bg-surface-alt">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <SpecRow label={t.specLabels.inverterType} value={inv.type} />
                    <SpecRow label={t.specLabels.capacity} value={`${inv.capacity} kW`} />
                    <SpecRow label={t.specLabels.phase} value={inv.phase} />
                    <SpecRow label={t.specLabels.mpptTrackers} value={`${inv.mpptTrackers}`} />
                    <SpecRow label={t.specLabels.maxPvVoltage} value={`${inv.maxPvVoltage} V`} />
                    <SpecRow label={t.specLabels.peakEfficiency} value={`${inv.efficiency}%`} />
                    <SpecRow label={t.specLabels.protectionRating} value={inv.protection} />
                    <SpecRow label={t.specLabels.display} value={inv.display} />
                    <SpecRow label={t.specLabels.warranty} value={`${inv.warranty} ${t.specLabels.years}`} />
                  </div>
                  <div className="mt-4">
                    <p className="text-foreground-subtle text-xs font-medium mb-2">{t.certifications}</p>
                    <div className="flex flex-wrap gap-2">
                      {inv.certification.map((cert) => (
                        <span key={cert} className="bg-sky-500/10 border border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs px-2 py-1 rounded-lg">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-foreground-subtle text-xs font-medium mb-2">{t.compatibleSystems}</p>
                    <div className="flex gap-2">
                      {inv.compatible.map((c) => (
                        <span key={c} className="bg-leaf-500/10 border border-leaf-500/20 text-leaf-700 dark:text-leaf-300 text-xs px-2 py-1 rounded-lg capitalize">
                          {c.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-alt rounded-lg p-2.5">
      <p className="text-foreground-subtle text-xs mb-0.5">{label}</p>
      <p className="text-foreground text-sm font-medium">{value}</p>
    </div>
  );
}
