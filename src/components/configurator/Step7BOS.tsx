import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Shield, Zap, Info } from 'lucide-react';
import {
  bosComponents, getBosByCategory, bosCategoryConfig,
} from '../../data/bos';
import type { BosComponent, SystemConfig, BosCategory } from '../../types/solar';
import { formatINR, dcCableMetres, AC_CABLE_METRES } from '../../utils/priceCalculator';
import { calculatePanelCount } from '../../utils/priceCalculator';
import { solarPanels } from '../../data/panels';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

// 60/30/10 tier system: budget=sky (entry), standard=solar (recommended/primary), premium=leaf (top-tier/eco)
const TIER_COLORS: Record<string, string> = {
  budget: 'bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-500/30',
  standard: 'bg-solar-100 dark:bg-solar-500/15 text-solar-700 dark:text-solar-300 border-solar-300 dark:border-solar-500/30',
  premium: 'bg-leaf-100 dark:bg-leaf-500/15 text-leaf-700 dark:text-leaf-300 border-leaf-300 dark:border-leaf-500/30',
};

const CATEGORY_ORDER: BosCategory[] = [
  'dc-cable', 'ac-cable', 'dcdb', 'acdb', 'spd', 'earthing', 'mc4', 'net-meter-kit',
];

function getBosSelection(config: SystemConfig, cat: BosCategory): string | null {
  const map: Record<BosCategory, string | null> = {
    'dc-cable': config.bos.dcCableId,
    'ac-cable': config.bos.acCableId,
    'dcdb': config.bos.dcdbId,
    'acdb': config.bos.acdbId,
    'spd': config.bos.spdId,
    'earthing': config.bos.earthingId,
    'mc4': config.bos.mc4Id,
    'net-meter-kit': config.bos.netMeterKitId,
  };
  return map[cat];
}

function setBosSelection(config: SystemConfig, cat: BosCategory, id: string | null): Partial<SystemConfig> {
  const bos = { ...config.bos };
  if (cat === 'dc-cable') bos.dcCableId = id;
  if (cat === 'ac-cable') bos.acCableId = id;
  if (cat === 'dcdb') bos.dcdbId = id;
  if (cat === 'acdb') bos.acdbId = id;
  if (cat === 'spd') bos.spdId = id;
  if (cat === 'earthing') bos.earthingId = id;
  if (cat === 'mc4') bos.mc4Id = id;
  if (cat === 'net-meter-kit') bos.netMeterKitId = id;
  return { bos };
}

function unitPrice(comp: BosComponent, panelCount: number): number {
  if (comp.category === 'dc-cable') return comp.pricePerUnit * dcCableMetres(panelCount);
  if (comp.category === 'ac-cable') return comp.pricePerUnit * AC_CABLE_METRES;
  return comp.pricePerUnit;
}

function unitLabel(comp: BosComponent, panelCount: number): string {
  if (comp.category === 'dc-cable') return `${dcCableMetres(panelCount)}m`;
  if (comp.category === 'ac-cable') return `${AC_CABLE_METRES}m`;
  return comp.unitLabel;
}

export default function Step7BOS({ config, onChange }: Props) {
  const t = useContent(configuratorEn, configuratorHi).step7;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openCat, setOpenCat] = useState<BosCategory>('dc-cable');

  const panel = solarPanels.find(p => p.id === config.panelId) ?? null;
  const panelCount = panel ? calculatePanelCount(config.capacityKw, panel) : Math.ceil((config.capacityKw * 1000) / 440);

  // Filter net-meter-kit out for off-grid
  const visibleCategories = CATEGORY_ORDER.filter(
    cat => cat !== 'net-meter-kit' || config.systemType !== 'off-grid',
  );

  const selectedCount = visibleCategories.filter(cat => getBosSelection(config, cat) !== null).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">
          {t.subheadingPrefix} ({selectedCount}/{visibleCategories.length} {t.selectedOf})
        </p>
      </div>

      {/* Info callout */}
      <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 text-sm text-sky-700 dark:text-sky-300 flex gap-3">
        <Info size={16} className="shrink-0 mt-0.5" />
        <div>
          <strong>{t.infoCalloutBold}</strong> {t.infoCallout}
        </div>
      </div>

      {/* Category Accordion */}
      <div className="space-y-3">
        {visibleCategories.map(cat => {
          const catCfg = bosCategoryConfig[cat];
          const items = getBosByCategory(cat);
          const selectedId = getBosSelection(config, cat);
          const selectedComp = bosComponents.find(b => b.id === selectedId);
          const isOpen = openCat === cat;

          return (
            <div
              key={cat}
              className={`rounded-2xl border overflow-hidden transition-all ${
                isOpen ? 'border-solar-500/30' : selectedComp ? 'border-leaf-500/20' : 'border-border'
              }`}
            >
              {/* Accordion header */}
              <button
                onClick={() => setOpenCat(isOpen ? ('' as BosCategory) : cat)}
                className="w-full flex items-center gap-4 p-4 text-left bg-surface-alt hover:bg-surface-alt transition-colors"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                  selectedComp ? 'bg-leaf-500/15 border border-leaf-500/20' : 'bg-surface-alt border border-border'
                }`}>
                  {catCfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-foreground font-semibold text-sm">{catCfg.label}</span>
                    {selectedComp && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_COLORS[selectedComp.tier]}`}>
                        {selectedComp.tier}
                      </span>
                    )}
                  </div>
                  {selectedComp
                    ? <p className="text-foreground-muted text-xs truncate">{selectedComp.brand} — {selectedComp.model}</p>
                    : <p className="text-foreground-subtle text-xs">{catCfg.description}</p>
                  }
                </div>
                <div className="text-right shrink-0 flex items-center gap-3">
                  {selectedComp && (
                    <p className="text-foreground font-semibold text-sm">
                      {formatINR(unitPrice(selectedComp, panelCount))}
                    </p>
                  )}
                  {selectedComp
                    ? <Check size={16} className="text-leaf-600 dark:text-leaf-400" />
                    : isOpen ? <ChevronUp size={16} className="text-foreground-muted" /> : <ChevronDown size={16} className="text-foreground-muted" />
                  }
                  {selectedComp && (isOpen ? <ChevronUp size={16} className="text-foreground-muted" /> : <ChevronDown size={16} className="text-foreground-muted" />)}
                </div>
              </button>

              {/* Accordion body */}
              {isOpen && (
                <div className="border-t border-border p-4 space-y-3">
                  <p className="text-foreground-muted text-xs mb-3">{catCfg.description}</p>

                  {items.map(comp => {
                    const isSelected = selectedId === comp.id;
                    const isExpanded = expandedId === comp.id;
                    const cost = unitPrice(comp, panelCount);
                    const qty = unitLabel(comp, panelCount);

                    return (
                      <div
                        key={comp.id}
                        className={`rounded-xl border overflow-hidden transition-all ${
                          isSelected
                            ? 'border-2 border-accent bg-accent-soft ring-2 ring-accent/15'
                            : 'border border-border bg-surface hover:border-border-strong hover:shadow-md'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span className="text-foreground font-semibold text-sm">{comp.brand}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_COLORS[comp.tier]}`}>
                                      {comp.tier}
                                    </span>
                                    {comp.highlight && (
                                      <span className="bg-solar-500/20 text-solar-700 dark:text-solar-300 text-xs px-2 py-0.5 rounded-full border border-solar-500/30">
                                        {comp.highlight}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-foreground-muted text-xs">{comp.model}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-foreground font-bold">{formatINR(cost)}</p>
                                  <p className="text-foreground-subtle text-xs">{qty}</p>
                                </div>
                              </div>

                              <p className="text-foreground-muted text-xs mt-2 leading-relaxed">{comp.description}</p>

                              {/* Quick spec pills */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {comp.specs.slice(0, 4).map(s => (
                                  <div key={s.label} className="bg-surface-alt rounded-lg px-2.5 py-1">
                                    <span className="text-foreground-subtle text-xs">{s.label}: </span>
                                    <span className="text-foreground text-xs font-medium">{s.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => onChange(setBosSelection(config, cat, comp.id))}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/20'
                                  : 'bg-surface-sunken text-foreground-muted hover:bg-surface-alt hover:text-foreground'
                              }`}
                            >
                              {isSelected ? <><Check size={14} /> {t.selected}</> : t.select}
                            </button>
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-alt hover:bg-surface-alt text-foreground-muted hover:text-foreground text-xs transition-all"
                            >
                              {t.allSpecs}
                              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </div>
                        </div>

                        {/* Full specs */}
                        {isExpanded && (
                          <div className="border-t border-border p-4 bg-surface-alt">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                              {comp.specs.map(s => (
                                <div key={s.label} className="bg-surface-alt rounded-lg p-2.5">
                                  <p className="text-foreground-subtle text-xs mb-0.5">{s.label}</p>
                                  <p className="text-foreground text-sm font-medium">{s.value}</p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="text-foreground-subtle text-xs font-medium mb-2 flex items-center gap-1">
                                <Shield size={11} /> {t.certifications}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {comp.certification.map(c => (
                                  <span key={c} className="bg-leaf-500/10 border border-leaf-500/20 text-leaf-700 dark:text-leaf-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                                    <Zap size={9} />{c}
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
              )}
            </div>
          );
        })}
      </div>

      {/* DC cable note */}
      {panel && (
        <div className="bg-surface-alt border border-border rounded-xl p-4 text-xs text-foreground-muted">
          <p className="font-medium text-foreground-muted mb-1">{t.cableEstimateTitle}</p>
          <p>{t.dcCableText.replace('{m}', String(dcCableMetres(panelCount))).replace('{count}', String(panelCount))}</p>
          <p className="mt-0.5">{t.acCableText.replace('{m}', String(AC_CABLE_METRES))}</p>
        </div>
      )}
    </div>
  );
}
