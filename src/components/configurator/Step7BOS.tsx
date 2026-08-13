import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Shield, Zap, Info } from 'lucide-react';
import {
  bosComponents, getBosByCategory, bosCategoryConfig,
} from '../../data/bos';
import type { BosComponent, SystemConfig, BosCategory } from '../../types/solar';
import { formatINR, dcCableMetres, AC_CABLE_METRES } from '../../utils/priceCalculator';
import { calculatePanelCount } from '../../utils/priceCalculator';
import { solarPanels } from '../../data/panels';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

const TIER_COLORS: Record<string, string> = {
  budget: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  standard: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  premium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
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
        <h2 className="text-2xl font-bold text-white mb-2">Wiring & Balance of System (BOS)</h2>
        <p className="text-gray-400">
          Select cables, protection boxes, SPDs, earthing and connectors — the components that complete your
          solar installation. ({selectedCount}/{visibleCategories.length} selected)
        </p>
      </div>

      {/* Info callout */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300 flex gap-3">
        <Info size={16} className="shrink-0 mt-0.5" />
        <div>
          <strong>Pre-selected</strong> with standard-tier defaults. Upgrade any component to premium brands (Phoenix Contact SPD, Stäubli MC4, chemical earthing) for better protection in coastal or high-lightning areas.
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
                isOpen ? 'border-orange-500/30' : selectedComp ? 'border-green-500/20' : 'border-white/10'
              }`}
            >
              {/* Accordion header */}
              <button
                onClick={() => setOpenCat(isOpen ? ('' as BosCategory) : cat)}
                className="w-full flex items-center gap-4 p-4 text-left bg-white/3 hover:bg-white/5 transition-colors"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                  selectedComp ? 'bg-green-500/15 border border-green-500/20' : 'bg-white/5 border border-white/10'
                }`}>
                  {catCfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{catCfg.label}</span>
                    {selectedComp && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_COLORS[selectedComp.tier]}`}>
                        {selectedComp.tier}
                      </span>
                    )}
                  </div>
                  {selectedComp
                    ? <p className="text-gray-400 text-xs truncate">{selectedComp.brand} — {selectedComp.model}</p>
                    : <p className="text-gray-500 text-xs">{catCfg.description}</p>
                  }
                </div>
                <div className="text-right shrink-0 flex items-center gap-3">
                  {selectedComp && (
                    <p className="text-white font-semibold text-sm">
                      {formatINR(unitPrice(selectedComp, panelCount))}
                    </p>
                  )}
                  {selectedComp
                    ? <Check size={16} className="text-green-400" />
                    : isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />
                  }
                  {selectedComp && (isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />)}
                </div>
              </button>

              {/* Accordion body */}
              {isOpen && (
                <div className="border-t border-white/10 p-4 space-y-3">
                  <p className="text-gray-400 text-xs mb-3">{catCfg.description}</p>

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
                            ? 'border-orange-500/40 bg-orange-500/5'
                            : 'border-white/10 bg-white/3 hover:border-white/20'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span className="text-white font-semibold text-sm">{comp.brand}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_COLORS[comp.tier]}`}>
                                      {comp.tier}
                                    </span>
                                    {comp.highlight && (
                                      <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full border border-orange-500/30">
                                        {comp.highlight}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-400 text-xs">{comp.model}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-white font-bold">{formatINR(cost)}</p>
                                  <p className="text-gray-500 text-xs">{qty}</p>
                                </div>
                              </div>

                              <p className="text-gray-400 text-xs mt-2 leading-relaxed">{comp.description}</p>

                              {/* Quick spec pills */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {comp.specs.slice(0, 4).map(s => (
                                  <div key={s.label} className="bg-white/5 rounded-lg px-2.5 py-1">
                                    <span className="text-gray-500 text-xs">{s.label}: </span>
                                    <span className="text-white text-xs font-medium">{s.value}</span>
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
                                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                                  : 'bg-white/8 text-gray-300 hover:bg-white/12 hover:text-white'
                              }`}
                            >
                              {isSelected ? <><Check size={14} /> Selected</> : 'Select'}
                            </button>
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all"
                            >
                              All Specs
                              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </div>
                        </div>

                        {/* Full specs */}
                        {isExpanded && (
                          <div className="border-t border-white/10 p-4 bg-white/3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                              {comp.specs.map(s => (
                                <div key={s.label} className="bg-white/3 rounded-lg p-2.5">
                                  <p className="text-gray-500 text-xs mb-0.5">{s.label}</p>
                                  <p className="text-white text-sm font-medium">{s.value}</p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs font-medium mb-2 flex items-center gap-1">
                                <Shield size={11} /> Certifications
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {comp.certification.map(c => (
                                  <span key={c} className="bg-green-500/10 border border-green-500/20 text-green-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
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
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-gray-400">
          <p className="font-medium text-gray-300 mb-1">Cable Length Estimate</p>
          <p>DC cable: {dcCableMetres(panelCount)}m (based on {panelCount} panels × 4m avg run × 1.25 overhead, both conductors)</p>
          <p className="mt-0.5">AC cable: {AC_CABLE_METRES}m (fixed estimate — inverter to distribution board)</p>
        </div>
      )}
    </div>
  );
}
