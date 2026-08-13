import { useState } from 'react';
import { Sun, Cpu, BatteryFull, Wrench, Cable } from 'lucide-react';
import { solarPanels } from '../data/panels';
import { inverters } from '../data/inverters';
import { batteries } from '../data/batteries';
import { mountingStructures } from '../data/mounting';
import { bosComponents, bosCategoryConfig } from '../data/bos';
import { formatINR } from '../utils/priceCalculator';
import type { BosCategory } from '../types/solar';

type Tab = 'panels' | 'inverters' | 'batteries' | 'mounting' | 'bos';

const tabs: { id: Tab; label: string; icon: typeof Sun }[] = [
  { id: 'panels', label: 'Solar Panels', icon: Sun },
  { id: 'inverters', label: 'Inverters', icon: Cpu },
  { id: 'batteries', label: 'Batteries', icon: BatteryFull },
  { id: 'mounting', label: 'Mounting', icon: Wrench },
  { id: 'bos', label: 'Wiring & BOS', icon: Cable },
];

const TIER_LABELS: Record<string, string> = { budget: 'Budget', standard: 'Standard', premium: 'Premium' };
const TIER_COLORS: Record<string, string> = {
  budget: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  standard: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  premium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

export default function Products() {
  const [tab, setTab] = useState<Tab>('panels');

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Solar{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Products Catalogue</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            All products sourced from leading Indian manufacturers. BIS certified, MNRE approved.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8 p-1 glass rounded-2xl w-fit mx-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {tab === 'panels' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solarPanels.map((panel) => (
              <div key={panel.id} className="glass rounded-2xl p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-bold">{panel.brand}</h3>
                      {panel.highlight && (
                        <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full">{panel.highlight}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{panel.model}</p>
                    <p className="text-orange-400 text-xs font-medium">{panel.type}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                    <Sun size={20} className="text-amber-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { l: 'Power', v: `${panel.wattage}W` },
                    { l: 'Efficiency', v: `${panel.efficiency}%` },
                    { l: 'Warranty', v: `${panel.warranty.performance}yr` },
                    { l: 'Weight', v: `${panel.weight}kg` },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-gray-400 text-xs">{l}</p>
                      <p className="text-white text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Price</span>
                  <span className="text-white font-bold">₹{panel.pricePerWatt}/W</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{panel.origin}</p>
              </div>
            ))}
          </div>
        )}

        {/* Inverters */}
        {tab === 'inverters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inverters.map((inv) => (
              <div key={inv.id} className="glass rounded-2xl p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-bold">{inv.brand}</h3>
                      {inv.highlight && (
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full">{inv.highlight}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{inv.model}</p>
                    <p className="text-blue-400 text-xs font-medium">{inv.type}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                    <Cpu size={20} className="text-blue-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { l: 'Capacity', v: `${inv.capacity}kW` },
                    { l: 'Efficiency', v: `${inv.efficiency}%` },
                    { l: 'MPPT', v: `${inv.mpptTrackers}` },
                    { l: 'Phase', v: inv.phase },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="text-gray-400 text-xs">{l}</p>
                      <p className="text-white text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Price</span>
                  <span className="text-white font-bold">{formatINR(inv.price)}</span>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {inv.compatible.map(c => (
                    <span key={c} className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded capitalize">{c.replace('-', ' ')}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Batteries */}
        {tab === 'batteries' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {batteries.map((batt) => {
              const isLi = batt.type.includes('Lithium');
              return (
                <div key={batt.id} className="glass rounded-2xl p-5 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-white font-bold">{batt.brand}</h3>
                        {batt.highlight && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isLi ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'}`}>{batt.highlight}</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{batt.model}</p>
                      <p className={`text-xs font-medium ${isLi ? 'text-green-400' : 'text-amber-400'}`}>{batt.type}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isLi ? 'bg-green-500/15 border-green-500/20' : 'bg-amber-500/15 border-amber-500/20'}`}>
                      <BatteryFull size={20} className={isLi ? 'text-green-400' : 'text-amber-400'} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { l: 'Capacity', v: `${batt.capacity}Ah` },
                      { l: 'Voltage', v: `${batt.voltage}V` },
                      { l: 'DoD', v: `${batt.dod}%` },
                      { l: 'Cycles', v: `${batt.cycleLife.toLocaleString()}` },
                    ].map(({ l, v }) => (
                      <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-gray-400 text-xs">{l}</p>
                        <p className="text-white text-sm font-semibold">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-white font-bold">{formatINR(batt.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOS — Wiring & Balance of System */}
        {tab === 'bos' && (
          <div className="space-y-8">
            {(Object.keys(bosCategoryConfig) as BosCategory[]).map(cat => {
              const catItems = bosComponents.filter(b => b.category === cat);
              if (!catItems.length) return null;
              const cfg = bosCategoryConfig[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{cfg.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{cfg.label}</h3>
                      <p className="text-gray-400 text-xs">{cfg.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catItems.map(comp => (
                      <div key={comp.id} className="glass rounded-2xl p-5 card-hover flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-white font-bold text-sm">{comp.brand}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_COLORS[comp.tier]}`}>
                                {TIER_LABELS[comp.tier]}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs">{comp.model}</p>
                            {comp.highlight && (
                              <span className="inline-block mt-1 bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full">
                                {comp.highlight}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed mb-3">{comp.description}</p>
                        <div className="space-y-1.5 mb-4 flex-1">
                          {comp.specs.slice(0, 5).map(s => (
                            <div key={s.label} className="flex justify-between text-xs">
                              <span className="text-gray-500">{s.label}</span>
                              <span className="text-white font-medium text-right ml-2">{s.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {comp.certification.slice(0, 3).map(c => (
                            <span key={c} className="bg-green-500/10 border border-green-500/20 text-green-300 text-xs px-1.5 py-0.5 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-gray-400 text-xs">{comp.unitLabel}</span>
                          <span className="text-white font-bold">{formatINR(comp.pricePerUnit)}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {mountingStructures.map((m) => (
              <div key={m.id} className="glass rounded-2xl p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold mb-1">{m.type}</h3>
                    <p className="text-gray-400 text-sm">{m.roofType}</p>
                    {m.highlight && (
                      <span className="inline-block mt-1 bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full">{m.highlight}</span>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/15 to-amber-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                    <Wrench size={20} className="text-orange-400" />
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Material</span>
                    <span className="text-gray-300">{m.material.split('(')[0].trim()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Wind Load</span>
                    <span className="text-white font-medium">{m.windSpeed} km/h</span>
                  </div>
                  {m.galvanizingCoating && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Zinc Coating</span>
                      <span className="text-blue-300">{m.galvanizingCoating}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Warranty</span>
                    <span className="text-white font-medium">{m.warranty} years</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Per kW installed</span>
                  <span className="text-white font-bold">₹{m.pricePerKw.toLocaleString('en-IN')}/kW</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
