import { useState } from 'react';
import { Sun, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { solarPanels } from '../../data/panels';
import type { SystemConfig, Tier } from '../../types/solar';
import { calculatePanelCount, formatINR } from '../../utils/priceCalculator';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

const panelImages = import.meta.glob('../../assets/products/panels/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const panelImageById: Record<string, string> = {};
for (const path in panelImages) {
  const id = path.split('/').pop()!.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  panelImageById[id] = panelImages[path];
}

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

const panelTypes = ['All', 'Mono PERC', 'Bifacial Mono PERC', 'TOPCon', 'Polycrystalline'];

export default function Step3Panels({ config, onChange }: Props) {
  const t = useContent(configuratorEn, configuratorHi).step3;
  const tierLabels = useContent(configuratorEn, configuratorHi).tierLabels;
  const [typeFilter, setTypeFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState<'All' | Tier>('All');
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

  const filtered = solarPanels.filter(p => {
    if (typeFilter !== 'All' && p.type !== typeFilter) return false;
    if (tierFilter !== 'All' && p.tier !== tierFilter) return false;
    return true;
  });

  const selectedPanel = solarPanels.find(p => p.id === config.panelId);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">
          {t.subheadingPrefix} {config.capacityKw}kW {t.subheadingMiddle}{' '}
          {selectedPanel ? `${calculatePanelCount(config.capacityKw, selectedPanel)} ${t.subheadingPanelsSuffix}` : t.subheadingFallback}.
        </p>
      </div>

      {/* Tier Filter */}
      <div className="space-y-2">
        <p className="text-foreground-subtle text-xs font-medium uppercase tracking-wide">{t.budgetRange}</p>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'budget', 'standard', 'premium'] as const).map((tk) => {
            const cfg = TIER_CONFIG[tk];
            const isActive = tierFilter === tk;
            return (
              <button
                key={tk}
                onClick={() => setTierFilter(tk)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${isActive ? cfg.activeCls : cfg.cls}`}
              >
                {cfg.label}
                <span className="ml-2 text-xs opacity-60">
                  ({tk === 'All' ? solarPanels.length : solarPanels.filter(p => p.tier === tk).length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Technology Filter */}
      <div className="space-y-2">
        <p className="text-foreground-subtle text-xs font-medium uppercase tracking-wide">{t.technology}</p>
        <div className="flex gap-2 flex-wrap">
          {panelTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                typeFilter === type
                  ? 'bg-gradient-to-r from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/20 border-transparent'
                  : 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken'
              }`}
            >
              {type === 'All' ? t.allTechnology : type}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedPanel && (
        <div className="bg-solar-500/10 border border-solar-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-solar-700 dark:text-solar-300 text-xs font-medium uppercase tracking-wide mb-1">{t.selectedPanel}</p>
            <p className="text-foreground font-bold">{selectedPanel.brand} — {selectedPanel.model}</p>
            <p className="text-foreground-muted text-sm">{calculatePanelCount(config.capacityKw, selectedPanel)} × {selectedPanel.wattage}W = {formatINR(calculatePanelCount(config.capacityKw, selectedPanel) * selectedPanel.wattage * selectedPanel.pricePerWatt)}</p>
          </div>
          <div className="text-right">
            <p className="text-solar-600 dark:text-solar-400 text-2xl font-bold">{selectedPanel.efficiency}%</p>
            <p className="text-foreground-muted text-xs">{t.efficiencyLabel}</p>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-8 text-foreground-subtle">{t.noMatch}</div>
      )}

      {/* Panel Cards */}
      <div className="space-y-3">
        {filtered.map((panel) => {
          const isSelected = config.panelId === panel.id;
          const isExpanded = expandedId === panel.id;
          const panelCount = calculatePanelCount(config.capacityKw, panel);
          const totalCost = panelCount * panel.wattage * panel.pricePerWatt;

          return (
            <div
              key={panel.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected ? 'border-2 border-accent bg-accent-soft ring-2 ring-accent/15' : 'border border-border bg-surface hover:border-border-strong hover:shadow-md'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {panelImageById[panel.id] ? (
                    <div className="w-16 h-16 bg-surface rounded-xl border border-solar-400/20 shrink-0 overflow-hidden p-1">
                      <img src={panelImageById[panel.id]} alt={`${panel.brand} ${panel.model}`} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-solar-400/20 to-solar-400/10 rounded-xl flex items-center justify-center border border-solar-400/20 shrink-0">
                      <Sun size={18} className="text-solar-600 dark:text-solar-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-foreground font-bold">{panel.brand}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_BADGE[panel.tier]}`}>
                            {panel.tier.charAt(0).toUpperCase() + panel.tier.slice(1)}
                          </span>
                          {panel.highlight && (
                            <span className="bg-solar-500/20 text-solar-700 dark:text-solar-300 text-xs px-2 py-0.5 rounded-full border border-solar-500/30">
                              {panel.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-foreground-muted text-sm">{panel.model} • {panel.type}</p>
                        <p className="text-foreground-subtle text-xs">{panel.origin}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-foreground font-bold">{formatINR(totalCost)}</p>
                        <p className="text-foreground-muted text-xs">{panelCount} panels • ₹{panel.pricePerWatt}/W</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        { label: t.specLabels.power, value: `${panel.wattage}W` },
                        { label: t.specLabels.efficiency, value: `${panel.efficiency}%` },
                        { label: t.specLabels.warranty, value: `${panel.warranty.performance}yr` },
                        { label: t.specLabels.weight, value: `${panel.weight}kg` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-surface-alt rounded-lg px-3 py-1.5 text-center">
                          <p className="text-foreground-muted text-xs">{label}</p>
                          <p className="text-foreground text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onChange({ panelId: panel.id })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/20'
                        : 'bg-surface-alt text-foreground-muted hover:bg-surface-sunken hover:text-foreground'
                    }`}
                  >
                    {isSelected ? <><Check size={15} /> {t.selected}</> : t.selectThisPanel}
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : panel.id)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-surface-alt hover:bg-surface-alt text-foreground-muted hover:text-foreground text-sm transition-all"
                  >
                    {t.fullSpecs}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border p-4 bg-surface-alt">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <SpecRow label={t.specLabels.cellType} value={panel.type} />
                    <SpecRow label={t.specLabels.wattageStc} value={`${panel.wattage} W`} />
                    <SpecRow label={t.specLabels.efficiency} value={`${panel.efficiency}%`} />
                    <SpecRow label={t.specLabels.voc} value={`${panel.voc} V`} />
                    <SpecRow label={t.specLabels.isc} value={`${panel.isc} A`} />
                    <SpecRow label={t.specLabels.vmp} value={`${panel.vmp} V`} />
                    <SpecRow label={t.specLabels.imp} value={`${panel.imp} A`} />
                    <SpecRow label={t.specLabels.tempCoeff} value={`${panel.tempCoeff}% / °C`} />
                    <SpecRow label={t.specLabels.dimensions} value={panel.dimensions} />
                    <SpecRow label={t.specLabels.weight} value={`${panel.weight} kg`} />
                    <SpecRow label={t.specLabels.cellCount} value={`${panel.cellCount} cells`} />
                    <SpecRow label={t.specLabels.frame} value={panel.frameType} />
                    <SpecRow label={t.specLabels.productWarranty} value={`${panel.warranty.product} ${t.specLabels.years}`} />
                    <SpecRow label={t.specLabels.performanceWarranty} value={`${panel.warranty.performance} ${t.specLabels.years}`} />
                  </div>
                  <div className="mt-4">
                    <p className="text-foreground-subtle text-xs font-medium mb-2">{t.certifications}</p>
                    <div className="flex flex-wrap gap-2">
                      {panel.certification.map((cert) => (
                        <span key={cert} className="bg-leaf-500/10 border border-leaf-500/20 text-leaf-700 dark:text-leaf-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                          <Zap size={10} />
                          {cert}
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
