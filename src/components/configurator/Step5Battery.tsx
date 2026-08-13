import { useState } from 'react';
import { BatteryFull, Check, ChevronDown, ChevronUp, Info, Minus, Plus } from 'lucide-react';
import { batteries } from '../../data/batteries';
import type { SystemConfig } from '../../types/solar';
import { formatINR, estimateBatteryCount } from '../../utils/priceCalculator';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

export default function Step5Battery({ config, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (config.systemType === 'on-grid') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Battery Storage</h2>
        </div>
        <div className="glass rounded-3xl p-10 text-center">
          <BatteryFull size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-white font-bold text-xl mb-2">No Battery Needed for On-Grid</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            On-grid systems use the utility grid as virtual storage. When your panels generate more than you consume,
            excess is exported to the grid (net metering). When consumption exceeds generation, you draw from the grid.
          </p>
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 inline-block">
            <p className="text-blue-300 text-sm">Want backup power? Upgrade to <strong>Hybrid System</strong> in Step 2.</p>
          </div>
        </div>
      </div>
    );
  }

  const compatible = batteries.filter(b => b.compatible.includes(config.systemType));
  const selectedBatt = batteries.find(b => b.id === config.batteryId);

  const handleSelect = (battId: string) => {
    const batt = batteries.find(b => b.id === battId);
    const suggestedCount = batt ? estimateBatteryCount(config.capacityKw, batt) : 2;
    onChange({ batteryId: battId, batteryCount: suggestedCount });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Battery Storage</h2>
        <p className="text-gray-400">
          Choose a battery for your{' '}
          <span className="text-orange-400 font-medium capitalize">{config.systemType.replace('-', ' ')}</span> system.
          Recommended backup: 6–10 hours for a typical home.
        </p>
      </div>

      {/* Battery Type Info */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass rounded-xl p-4">
          <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            Tubular Lead-Acid
          </h4>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>• Budget friendly (₹12K–18K per battery)</li>
            <li>• 1,200–1,500 cycles</li>
            <li>• 60% usable depth of discharge</li>
            <li>• Wired in series to match inverter voltage</li>
            <li>• 48V inverter needs 4 × 12V batteries</li>
            <li>• Requires monthly water top-up</li>
            <li>• 5-year warranty</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Lithium LFP (Li Iron Phosphate)
          </h4>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>• Complete 48V / 51.2V pack — 1 unit = standard</li>
            <li>• e.g. Deye 5kW inverter + Deye 5kWh = 1 battery</li>
            <li>• 4,000+ cycles — 10+ year life</li>
            <li>• 90% usable depth of discharge</li>
            <li>• Zero maintenance, plug-and-play</li>
            <li>• 7-year warranty</li>
          </ul>
        </div>
      </div>

      {selectedBatt && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-orange-300 text-xs font-medium uppercase tracking-wide mb-1">Selected Battery</p>
              <p className="text-white font-bold">{selectedBatt.brand} — {selectedBatt.model}</p>
              <p className="text-gray-400 text-sm">{selectedBatt.capacity}Ah / {selectedBatt.voltage}V • {selectedBatt.type}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Battery count control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onChange({ batteryCount: Math.max(1, config.batteryCount - 1) })}
                  className="w-8 h-8 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-white font-bold w-8 text-center">{config.batteryCount}</span>
                <button
                  onClick={() => onChange({ batteryCount: Math.min(12, config.batteryCount + 1) })}
                  className="w-8 h-8 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{formatINR(selectedBatt.price * config.batteryCount)}</p>
                <p className="text-gray-400 text-xs">{config.batteryCount} × {formatINR(selectedBatt.price)}</p>
              </div>
            </div>
          </div>
          {/* Backup estimate */}
          {(() => {
            const usableKwh = (selectedBatt.capacity * selectedBatt.voltage * (selectedBatt.dod / 100) / 1000) * config.batteryCount;
            const avgLoadKw = 0.5; // typical home backup load ~500W
            const backupHrs = Math.round(usableKwh / avgLoadKw);
            return (
              <div className="flex items-center gap-2 mt-3 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <Info size={12} />
                {(usableKwh).toFixed(1)} kWh usable → ~{backupHrs} hrs backup at 500W avg load
              </div>
            );
          })()}
        </div>
      )}

      <div className="space-y-3">
        {compatible.map((batt) => {
          const isSelected = config.batteryId === batt.id;
          const isExpanded = expandedId === batt.id;
          const isLithium = batt.type.includes('Lithium');

          return (
            <div
              key={batt.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/3 hover:border-white/20'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${isLithium ? 'bg-green-500/15 border-green-500/20' : 'bg-amber-500/15 border-amber-500/20'}`}>
                    <BatteryFull size={18} className={isLithium ? 'text-green-400' : 'text-amber-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold">{batt.brand}</h3>
                          {batt.highlight && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${isLithium ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                              {batt.highlight}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isLithium ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {isLithium ? 'Lithium LFP' : 'Lead-Acid'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{batt.model}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white font-bold text-lg">{formatINR(batt.price)}</p>
                        <p className="text-gray-400 text-xs">per unit • {batt.warranty}yr warranty</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        { label: 'Capacity', value: `${batt.capacity}Ah` },
                        { label: 'Voltage', value: `${batt.voltage}V` },
                        { label: 'DoD', value: `${batt.dod}%` },
                        { label: 'Cycles', value: `${batt.cycleLife.toLocaleString()}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                          <p className="text-gray-400 text-xs">{label}</p>
                          <p className="text-white text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleSelect(batt.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {isSelected ? <><Check size={15} /> Selected</> : 'Select Battery'}
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : batt.id)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                  >
                    Full Specs {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-white/10 p-4 bg-white/3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <SpecRow label="Battery Type" value={batt.type} />
                    <SpecRow label="Capacity" value={`${batt.capacity} Ah`} />
                    <SpecRow label="Voltage" value={`${batt.voltage} V`} />
                    <SpecRow label="Energy" value={`${((batt.capacity * batt.voltage) / 1000).toFixed(1)} kWh`} />
                    <SpecRow label="Depth of Discharge" value={`${batt.dod}%`} />
                    <SpecRow label="Usable Energy" value={`${((batt.capacity * batt.voltage * batt.dod) / 100000).toFixed(1)} kWh`} />
                    <SpecRow label="Cycle Life" value={`${batt.cycleLife.toLocaleString()} cycles`} />
                    <SpecRow label="Charge Time" value={`~${batt.chargingTime} hrs`} />
                    <SpecRow label="Warranty" value={`${batt.warranty} years`} />
                    <SpecRow label="Weight" value={`${batt.weight} kg`} />
                    <SpecRow label="Dimensions" value={batt.dimensions} />
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
