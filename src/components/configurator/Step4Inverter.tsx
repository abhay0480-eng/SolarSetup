import { useState } from 'react';
import { Cpu, Check, ChevronDown, ChevronUp, Wifi } from 'lucide-react';
import { inverters } from '../../data/inverters';
import type { SystemConfig } from '../../types/solar';
import { formatINR } from '../../utils/priceCalculator';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

export default function Step4Inverter({ config, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const compatible = inverters.filter(inv => inv.compatible.includes(config.systemType));
  const selectedInv = inverters.find(inv => inv.id === config.inverterId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Inverter</h2>
        <p className="text-gray-400">
          Showing inverters compatible with your{' '}
          <span className="text-orange-400 font-medium capitalize">{config.systemType.replace('-', ' ')}</span> system ({config.capacityKw}kW).
        </p>
      </div>

      {selectedInv && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-orange-300 text-xs font-medium uppercase tracking-wide mb-1">Selected Inverter</p>
            <p className="text-white font-bold">{selectedInv.brand} {selectedInv.model}</p>
            <p className="text-gray-400 text-sm">{selectedInv.capacity}kW • {selectedInv.phase} • {selectedInv.efficiency}% efficiency</p>
          </div>
          <p className="text-white font-bold text-xl shrink-0">{formatINR(selectedInv.price)}</p>
        </div>
      )}

      <div className="space-y-3">
        {compatible.map((inv) => {
          const isSelected = config.inverterId === inv.id;
          const isExpanded = expandedId === inv.id;

          return (
            <div
              key={inv.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/3 hover:border-white/20'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shrink-0">
                    <Cpu size={18} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold">{inv.brand}</h3>
                          {inv.highlight && (
                            <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
                              {inv.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{inv.model}</p>
                        <p className="text-gray-500 text-xs">{inv.type} • {inv.phase}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white font-bold text-lg">{formatINR(inv.price)}</p>
                        <p className="text-gray-400 text-xs">{inv.warranty}yr warranty</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        { label: 'Capacity', value: `${inv.capacity}kW` },
                        { label: 'Efficiency', value: `${inv.efficiency}%` },
                        { label: 'MPPT', value: `${inv.mpptTrackers} trackers` },
                        { label: 'Max PV', value: `${inv.maxPvVoltage}V` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                          <p className="text-gray-400 text-xs">{label}</p>
                          <p className="text-white text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Connectivity */}
                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      <Wifi size={12} className="text-gray-500" />
                      {inv.connectivity.map((c) => (
                        <span key={c} className="text-gray-400 text-xs bg-white/5 px-2 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onChange({ inverterId: inv.id })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {isSelected ? <><Check size={15} /> Selected</> : 'Select Inverter'}
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : inv.id)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                  >
                    Full Specs {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-white/10 p-4 bg-white/3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <SpecRow label="Inverter Type" value={inv.type} />
                    <SpecRow label="Capacity" value={`${inv.capacity} kW`} />
                    <SpecRow label="Phase" value={inv.phase} />
                    <SpecRow label="MPPT Trackers" value={`${inv.mpptTrackers}`} />
                    <SpecRow label="Max PV Voltage" value={`${inv.maxPvVoltage} V`} />
                    <SpecRow label="Peak Efficiency" value={`${inv.efficiency}%`} />
                    <SpecRow label="Protection Rating" value={inv.protection} />
                    <SpecRow label="Display" value={inv.display} />
                    <SpecRow label="Warranty" value={`${inv.warranty} years`} />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 text-xs font-medium mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {inv.certification.map((cert) => (
                        <span key={cert} className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-lg">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-500 text-xs font-medium mb-2">Compatible Systems</p>
                    <div className="flex gap-2">
                      {inv.compatible.map((c) => (
                        <span key={c} className="bg-green-500/10 border border-green-500/20 text-green-300 text-xs px-2 py-1 rounded-lg capitalize">
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
    <div className="bg-white/3 rounded-lg p-2.5">
      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  );
}
