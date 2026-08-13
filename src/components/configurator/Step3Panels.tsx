import { useState } from 'react';
import { Sun, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { solarPanels } from '../../data/panels';
import type { SystemConfig } from '../../types/solar';
import { calculatePanelCount, formatINR } from '../../utils/priceCalculator';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

const panelTypes = ['All', 'Mono PERC', 'Bifacial Mono PERC', 'TOPCon', 'Polycrystalline'];

export default function Step3Panels({ config, onChange }: Props) {
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = solarPanels.filter(p => filter === 'All' || p.type === filter);
  const selectedPanel = solarPanels.find(p => p.id === config.panelId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Solar Panels</h2>
        <p className="text-gray-400">
          Choose from India's top solar panel manufacturers. For a {config.capacityKw}kW system, you'll need{' '}
          {selectedPanel ? `${calculatePanelCount(config.capacityKw, selectedPanel)} panels` : 'panels based on wattage'}.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {panelTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === type
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/8'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Selected Summary */}
      {selectedPanel && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-orange-300 text-xs font-medium uppercase tracking-wide mb-1">Selected Panel</p>
            <p className="text-white font-bold">{selectedPanel.brand} — {selectedPanel.model}</p>
            <p className="text-gray-400 text-sm">{calculatePanelCount(config.capacityKw, selectedPanel)} panels × {selectedPanel.wattage}W = {formatINR(calculatePanelCount(config.capacityKw, selectedPanel) * selectedPanel.wattage * selectedPanel.pricePerWatt)}</p>
          </div>
          <div className="text-right">
            <p className="text-orange-400 text-2xl font-bold">{selectedPanel.efficiency}%</p>
            <p className="text-gray-400 text-xs">efficiency</p>
          </div>
        </div>
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
                isSelected ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/3 hover:border-white/20'
              }`}
            >
              {/* Header row */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 shrink-0">
                    <Sun size={18} className="text-amber-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold">{panel.brand}</h3>
                          {panel.highlight && (
                            <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full border border-orange-500/30">
                              {panel.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{panel.model} • {panel.type}</p>
                        <p className="text-gray-500 text-xs">{panel.origin}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white font-bold">{formatINR(totalCost)}</p>
                        <p className="text-gray-400 text-xs">{panelCount} panels • ₹{panel.pricePerWatt}/W</p>
                      </div>
                    </div>

                    {/* Quick specs */}
                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        { label: 'Power', value: `${panel.wattage}W` },
                        { label: 'Efficiency', value: `${panel.efficiency}%` },
                        { label: 'Warranty', value: `${panel.warranty.performance}yr` },
                        { label: 'Weight', value: `${panel.weight}kg` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                          <p className="text-gray-400 text-xs">{label}</p>
                          <p className="text-white text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onChange({ panelId: panel.id })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {isSelected ? <><Check size={15} /> Selected</> : 'Select This Panel'}
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : panel.id)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                  >
                    Full Specs
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Expanded Specs */}
              {isExpanded && (
                <div className="border-t border-white/10 p-4 bg-white/3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <SpecRow label="Cell Type" value={panel.type} />
                    <SpecRow label="Wattage (STC)" value={`${panel.wattage} W`} />
                    <SpecRow label="Efficiency" value={`${panel.efficiency}%`} />
                    <SpecRow label="Voc" value={`${panel.voc} V`} />
                    <SpecRow label="Isc" value={`${panel.isc} A`} />
                    <SpecRow label="Vmp" value={`${panel.vmp} V`} />
                    <SpecRow label="Imp" value={`${panel.imp} A`} />
                    <SpecRow label="Temp. Coefficient (Pmax)" value={`${panel.tempCoeff}% / °C`} />
                    <SpecRow label="Dimensions" value={panel.dimensions} />
                    <SpecRow label="Weight" value={`${panel.weight} kg`} />
                    <SpecRow label="Cell Count" value={`${panel.cellCount} cells`} />
                    <SpecRow label="Frame" value={panel.frameType} />
                    <SpecRow label="Product Warranty" value={`${panel.warranty.product} years`} />
                    <SpecRow label="Performance Warranty" value={`${panel.warranty.performance} years`} />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 text-xs font-medium mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {panel.certification.map((cert) => (
                        <span key={cert} className="bg-green-500/10 border border-green-500/20 text-green-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
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
    <div className="bg-white/3 rounded-lg p-2.5">
      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  );
}
