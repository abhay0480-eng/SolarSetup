import { Check, Wrench, Shield, AlertTriangle } from 'lucide-react';
import { mountingStructures } from '../../data/mounting';
import type { SystemConfig } from '../../types/solar';
import { formatINR } from '../../utils/priceCalculator';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}


export default function Step6Mounting({ config, onChange }: Props) {
  const selectedMount = mountingStructures.find(m => m.id === config.mountingId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Mounting Structure</h2>
        <p className="text-gray-400">The mounting structure holds your panels in place. Choose based on roof type and location's wind/corrosion conditions.</p>
      </div>

      {/* Material Guide */}
      <div className="glass rounded-2xl p-5">
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Wrench size={16} className="text-orange-400" />
          Mounting Material Guide
        </h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 rounded-xl p-3">
            <h5 className="text-white font-medium mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full" />
              Pre-Galvanized (Pre-GI)
            </h5>
            <p className="text-gray-400 text-xs">Steel sheet galvanized before cutting. Coating: 120–150 g/m². Good for inland areas with moderate humidity. 10-year warranty.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <h5 className="text-white font-medium mb-1 flex items-center gap-2">
              <Shield size={12} className="text-blue-400" />
              Hot Dip Galvanized (HDG)
            </h5>
            <p className="text-gray-400 text-xs">Fabricated structure dipped in molten zinc. Coating: 600–700 g/m² (85–100 microns). Mandatory for coastal, high-humidity, industrial areas. 25-year warranty.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <h5 className="text-white font-medium mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
              Aluminum Alloy (6005-T5)
            </h5>
            <p className="text-gray-400 text-xs">Corrosion-free, lightweight. No galvanizing needed. Best for all-weather use. Premium cost but 20-year warranty with zero rust.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <h5 className="text-white font-medium mb-1 flex items-center gap-2">
              <AlertTriangle size={12} className="text-yellow-400" />
              Mild Steel (MS) Painted
            </h5>
            <p className="text-gray-400 text-xs">Budget option with epoxy/zinc paint. Not recommended for coastal or high-humidity areas. 5-year warranty. May need re-painting.</p>
          </div>
        </div>
      </div>

      {selectedMount && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-orange-300 text-xs font-medium uppercase tracking-wide mb-1">Selected Structure</p>
            <p className="text-white font-bold">{selectedMount.type}</p>
            <p className="text-gray-400 text-sm">{selectedMount.roofType} • Wind: {selectedMount.windSpeed} km/h • {selectedMount.warranty}yr warranty</p>
          </div>
          <p className="text-white font-bold text-lg shrink-0">{formatINR(selectedMount.pricePerKw * config.capacityKw)}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mountingStructures.map((mount) => {
          const isSelected = config.mountingId === mount.id;
          const isHDG = mount.type.includes('Hot Dip');
          const isAlum = mount.type.includes('Aluminum');
          const isMS = mount.type.includes('Mild Steel');

          const iconColor = isHDG ? 'text-blue-400' : isAlum ? 'text-purple-400' : isMS ? 'text-yellow-400' : 'text-orange-400';
          const borderColor = isSelected ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/3 hover:border-white/20';

          return (
            <button
              key={mount.id}
              onClick={() => onChange({ mountingId: mount.id })}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${borderColor}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white font-bold text-sm">{mount.type}</h3>
                    {mount.highlight && (
                      <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full border border-orange-500/30">
                        {mount.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">{mount.roofType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-white font-bold">{formatINR(mount.pricePerKw * config.capacityKw)}</p>
                    <p className="text-gray-400 text-xs">₹{mount.pricePerKw.toLocaleString('en-IN')}/kW</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Wrench size={11} className={iconColor} />
                  {mount.material}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Thickness:</span> {mount.thickness}
                </div>
                {mount.galvanizingCoating && (
                  <div className="flex items-center gap-2">
                    <Shield size={11} className="text-blue-400" />
                    Zinc coating: {mount.galvanizingCoating}
                  </div>
                )}
                <div className="flex gap-4 mt-2">
                  <div>
                    <span className="text-gray-500">Wind load:</span>
                    <span className="text-white ml-1 font-medium">{mount.windSpeed} km/h</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Warranty:</span>
                    <span className="text-white ml-1 font-medium">{mount.warranty} yrs</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm">
        <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle size={15} />
          Location-Based Recommendation
        </h4>
        <ul className="text-gray-300 space-y-1 text-xs">
          <li>• <strong>Coastal areas</strong> (within 5km of sea): HDG is mandatory — salt spray corrodes Pre-GI rapidly</li>
          <li>• <strong>High humidity</strong> (Kerala, coastal Karnataka, Odisha): HDG or Aluminum recommended</li>
          <li>• <strong>High wind zones</strong> (cyclone-prone: AP, Odisha, Gujarat coast): HDG with proper wind load calculation</li>
          <li>• <strong>Standard inland</strong> urban/semi-urban: Pre-GI is sufficient and cost-effective</li>
          <li>• <strong>Tin sheet roofs</strong>: Use L-foot clamps, ensure proper waterproofing at mounting points</li>
        </ul>
      </div>
    </div>
  );
}
