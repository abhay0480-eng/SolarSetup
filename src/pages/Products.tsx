import { useState } from 'react';
import { Sun, Cpu, BatteryFull, Wrench, Cable } from 'lucide-react';
import { solarPanels } from '../data/panels';
import { inverters } from '../data/inverters';
import { batteries } from '../data/batteries';
import { mountingStructures } from '../data/mounting';
import { bosComponents, bosCategoryConfig } from '../data/bos';
import { formatINR } from '../utils/priceCalculator';
import type { BosCategory } from '../types/solar';
import productsEn from '../content/en/products.json';
import productsHi from '../content/hi/products.json';
import { useContent } from '../i18n/LanguageContext';

type Tab = 'panels' | 'inverters' | 'batteries' | 'mounting' | 'bos';

// Tier color-coding follows the site's 60/30/10 accent split: budget = sky
// (informational, entry tier), standard = solar (primary, most-picked tier),
// premium = leaf (top tier, "invest for savings").
const TIER_COLORS: Record<string, string> = {
  budget: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40',
  standard: 'bg-solar-50 dark:bg-solar-500/10 text-solar-700 dark:text-solar-300 border-solar-200 dark:border-solar-800/40',
  premium: 'bg-leaf-50 dark:bg-leaf-500/10 text-leaf-700 dark:text-leaf-300 border-leaf-200 dark:border-leaf-800/40',
};

export default function Products() {
  const t = useContent(productsEn, productsHi);
  const [tab, setTab] = useState<Tab>('panels');

  const tabs: { id: Tab; label: string; icon: typeof Sun }[] = [
    { id: 'panels', label: t.tabs.panels, icon: Sun },
    { id: 'inverters', label: t.tabs.inverters, icon: Cpu },
    { id: 'batteries', label: t.tabs.batteries, icon: BatteryFull },
    { id: 'mounting', label: t.tabs.mounting, icon: Wrench },
    { id: 'bos', label: t.tabs.bos, icon: Cable },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 sm:pb-20 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t.heading} <span className="text-gradient">{t.headingHighlight}</span>
          </h1>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center mb-6 sm:mb-8 p-1.5 bento w-fit max-w-full mx-auto rounded-full overflow-x-auto scrollbar-hide">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap min-h-[2.5rem] ${
                tab === id
                  ? 'bg-gradient-to-r from-solar-500 to-solar-600 text-white shadow-md shadow-solar-500/25'
                  : 'text-foreground-subtle hover:text-foreground'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {tab === 'panels' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {solarPanels.map((panel) => (
              <div key={panel.id} className="bento bento-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-foreground font-bold">{panel.brand}</h3>
                      {panel.highlight && (
                        <span className="bg-accent-soft text-accent-strong dark:text-accent text-xs px-2 py-0.5 rounded-full">{panel.highlight}</span>
                      )}
                    </div>
                    <p className="text-foreground-muted text-sm">{panel.model}</p>
                    <p className="text-solar-600 dark:text-solar-400 text-xs font-medium">{panel.type}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-solar-100 to-solar-50 dark:from-solar-500/20 dark:to-solar-500/10 rounded-xl flex items-center justify-center border border-solar-200 dark:border-solar-800/40 shrink-0">
                    <Sun size={20} className="text-solar-500 dark:text-solar-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { l: t.specLabels.power, v: `${panel.wattage}W` },
                    { l: t.specLabels.efficiency, v: `${panel.efficiency}%` },
                    { l: t.specLabels.warranty, v: `${panel.warranty.performance}yr` },
                    { l: t.specLabels.weight, v: `${panel.weight}kg` },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-surface-alt rounded-lg p-2 text-center">
                      <p className="text-foreground-subtle text-xs">{l}</p>
                      <p className="text-foreground text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted text-sm">{t.price}</span>
                  <span className="text-solar-600 dark:text-solar-400 font-bold">₹{panel.pricePerWatt}/W</span>
                </div>
                <p className="text-foreground-subtle text-xs mt-1">{panel.origin}</p>
              </div>
            ))}
          </div>
        )}

        {/* Inverters */}
        {tab === 'inverters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {inverters.map((inv) => (
              <div key={inv.id} className="bento bento-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-foreground font-bold">{inv.brand}</h3>
                      {inv.highlight && (
                        <span className="bg-accent-3-soft text-accent-3 text-xs px-2 py-0.5 rounded-full">{inv.highlight}</span>
                      )}
                    </div>
                    <p className="text-foreground-muted text-sm">{inv.model}</p>
                    <p className="text-sky-600 dark:text-sky-400 text-xs font-medium">{inv.type}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-500/20 dark:to-sky-500/10 rounded-xl flex items-center justify-center border border-sky-200 dark:border-sky-800/40 shrink-0">
                    <Cpu size={20} className="text-sky-500 dark:text-sky-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { l: t.specLabels.capacity, v: `${inv.capacity}kW` },
                    { l: t.specLabels.efficiency, v: `${inv.efficiency}%` },
                    { l: t.specLabels.mppt, v: `${inv.mpptTrackers}` },
                    { l: t.specLabels.phase, v: inv.phase },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-surface-alt rounded-lg p-2 text-center">
                      <p className="text-foreground-subtle text-xs">{l}</p>
                      <p className="text-foreground text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted text-sm">{t.price}</span>
                  <span className="text-solar-600 dark:text-solar-400 font-bold">{formatINR(inv.price)}</span>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {inv.compatible.map(c => (
                    <span key={c} className="text-xs px-2 py-0.5 bg-accent-2-soft text-accent-2 rounded capitalize">{c.replace('-', ' ')}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Batteries */}
        {tab === 'batteries' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {batteries.map((batt) => {
              const isLi = batt.type.includes('Lithium');
              return (
                <div key={batt.id} className="bento bento-hover p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-foreground font-bold">{batt.brand}</h3>
                        {batt.highlight && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isLi ? 'bg-accent-2-soft text-accent-2' : 'bg-accent-soft text-accent-strong dark:text-accent'}`}>{batt.highlight}</span>
                        )}
                      </div>
                      <p className="text-foreground-muted text-sm">{batt.model}</p>
                      <p className={`text-xs font-medium ${isLi ? 'text-leaf-600 dark:text-leaf-400' : 'text-solar-600 dark:text-solar-400'}`}>{batt.type}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${isLi ? 'bg-leaf-50 dark:bg-leaf-500/10 border-leaf-200 dark:border-leaf-800/40' : 'bg-solar-50 dark:bg-solar-500/10 border-solar-200 dark:border-solar-800/40'}`}>
                      <BatteryFull size={20} className={isLi ? 'text-leaf-500 dark:text-leaf-400' : 'text-solar-500 dark:text-solar-400'} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { l: t.specLabels.capacity, v: `${batt.capacity}Ah` },
                      { l: t.specLabels.voltage, v: `${batt.voltage}V` },
                      { l: t.specLabels.dod, v: `${batt.dod}%` },
                      { l: t.specLabels.cycles, v: `${batt.cycleLife.toLocaleString()}` },
                    ].map(({ l, v }) => (
                      <div key={l} className="bg-surface-alt rounded-lg p-2 text-center">
                        <p className="text-foreground-subtle text-xs">{l}</p>
                        <p className="text-foreground text-sm font-semibold">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-muted text-sm">{t.price}</span>
                    <span className="text-solar-600 dark:text-solar-400 font-bold">{formatINR(batt.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOS — Wiring & Balance of System */}
        {tab === 'bos' && (
          <div className="space-y-6 sm:space-y-8">
            {(Object.keys(bosCategoryConfig) as BosCategory[]).map(cat => {
              const catItems = bosComponents.filter(b => b.category === cat);
              if (!catItems.length) return null;
              const cfg = bosCategoryConfig[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{cfg.icon}</span>
                    <div>
                      <h3 className="text-foreground font-bold">{cfg.label}</h3>
                      <p className="text-foreground-muted text-xs">{cfg.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catItems.map(comp => (
                      <div key={comp.id} className="bento bento-hover p-5 flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-foreground font-bold text-sm">{comp.brand}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_COLORS[comp.tier]}`}>
                                {t.tierLabels[comp.tier as keyof typeof t.tierLabels]}
                              </span>
                            </div>
                            <p className="text-foreground-muted text-xs">{comp.model}</p>
                            {comp.highlight && (
                              <span className="inline-block mt-1 bg-accent-soft text-accent-strong dark:text-accent text-xs px-2 py-0.5 rounded-full">
                                {comp.highlight}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-foreground-muted text-xs leading-relaxed mb-3">{comp.description}</p>
                        <div className="space-y-1.5 mb-4 flex-1">
                          {comp.specs.slice(0, 5).map(s => (
                            <div key={s.label} className="flex justify-between text-xs">
                              <span className="text-foreground-subtle">{s.label}</span>
                              <span className="text-foreground font-medium text-right ml-2">{s.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {comp.certification.slice(0, 3).map(c => (
                            <span key={c} className="bg-accent-2-soft border border-leaf-200 dark:border-leaf-800/40 text-accent-2 text-xs px-1.5 py-0.5 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-foreground-muted text-xs">{comp.unitLabel}</span>
                          <span className="text-solar-600 dark:text-solar-400 font-bold">{formatINR(comp.pricePerUnit)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mounting */}
        {tab === 'mounting' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {mountingStructures.map((m) => (
              <div key={m.id} className="bento bento-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-foreground font-bold mb-1">{m.type}</h3>
                    <p className="text-foreground-muted text-sm">{m.roofType}</p>
                    {m.highlight && (
                      <span className="inline-block mt-1 bg-accent-soft text-accent-strong dark:text-accent text-xs px-2 py-0.5 rounded-full">{m.highlight}</span>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-solar-100 to-solar-50 dark:from-solar-500/20 dark:to-solar-500/10 rounded-xl flex items-center justify-center border border-solar-200 dark:border-solar-800/40 shrink-0">
                    <Wrench size={20} className="text-solar-500 dark:text-solar-400" />
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-subtle">{t.mounting.material}</span>
                    <span className="text-foreground-muted">{m.material.split('(')[0].trim()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-subtle">{t.mounting.windLoad}</span>
                    <span className="text-foreground font-medium">{m.windSpeed} km/h</span>
                  </div>
                  {m.galvanizingCoating && (
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-subtle">{t.mounting.zincCoating}</span>
                      <span className="text-sky-600 dark:text-sky-400">{m.galvanizingCoating}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-subtle">{t.mounting.warranty}</span>
                    <span className="text-foreground font-medium">{m.warranty} {t.mounting.years}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted text-sm">{t.mounting.perKwInstalled}</span>
                  <span className="text-solar-600 dark:text-solar-400 font-bold">₹{m.pricePerKw.toLocaleString('en-IN')}/kW</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
