import { MapPin, Zap, Maximize2, TrendingUp } from 'lucide-react';
import { stateSubsidies } from '../../data/subsidies';
import type { SystemConfig } from '../../types/solar';
import { estimateCapacityFromBill } from '../../utils/priceCalculator';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

export default function Step1Basics({ config, onChange }: Props) {
  const handleBillChange = (bill: number) => {
    const estimated = estimateCapacityFromBill(bill);
    onChange({ monthlyBill: bill, capacityKw: estimated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about your home</h2>
        <p className="text-gray-400">We'll use this to recommend the right solar system size and calculate subsidies.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* State Selection */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <MapPin size={15} className="text-orange-400" />
            Your State / UT
          </label>
          <select
            value={config.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0f172a]">Select your state...</option>
            {stateSubsidies.map((s) => (
              <option key={s.code} value={s.code} className="bg-[#0f172a]">
                {s.state}
              </option>
            ))}
          </select>
          {config.state && (() => {
            const sub = stateSubsidies.find(s => s.code === config.state);
            return sub ? (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <span className="font-medium">DISCOM:</span> {sub.discom} •
                {sub.netMeteringAvailable ? ' Net Metering Available ✓' : ' No Net Metering'}
              </div>
            ) : null;
          })()}
        </div>

        {/* Monthly Bill */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Zap size={15} className="text-orange-400" />
            Monthly Electricity Bill (₹)
          </label>
          <input
            type="number"
            value={config.monthlyBill || ''}
            onChange={(e) => handleBillChange(Number(e.target.value))}
            placeholder="e.g. 3000"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-600"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {[1500, 2500, 4000, 6000, 10000].map((b) => (
              <button
                key={b}
                onClick={() => handleBillChange(b)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  config.monthlyBill === b
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/8'
                }`}
              >
                ₹{b.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* System Capacity */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <TrendingUp size={15} className="text-orange-400" />
            Required Capacity (kW)
          </label>
          <input
            type="number"
            value={config.capacityKw}
            onChange={(e) => onChange({ capacityKw: Math.max(0.5, Math.min(10, Number(e.target.value))) })}
            step={0.5}
            min={0.5}
            max={10}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {[1, 2, 3, 5, 7, 10].map((kw) => (
              <button
                key={kw}
                onClick={() => onChange({ capacityKw: kw })}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  config.capacityKw === kw
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/8'
                }`}
              >
                {kw} kW
              </button>
            ))}
          </div>
        </div>

        {/* Roof Area */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Maximize2 size={15} className="text-orange-400" />
            Available Roof Area (sq. ft.)
          </label>
          <input
            type="number"
            value={config.roofArea || ''}
            onChange={(e) => onChange({ roofArea: Number(e.target.value) })}
            placeholder="e.g. 600 (1 kW needs ~100 sq ft)"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-600"
          />
          <p className="mt-2 text-gray-500 text-xs">Rule of thumb: 1 kW requires ~100 sq ft of shadow-free roof</p>
        </div>
      </div>

      {/* Quick Insight */}
      {config.monthlyBill > 0 && (
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-5">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-orange-400" />
            Quick Estimate for Your Consumption
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-xs mb-1">Monthly Units</p>
              <p className="text-white font-bold">{Math.round(config.monthlyBill / 8)} kWh</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Suggested Size</p>
              <p className="text-orange-400 font-bold">{config.capacityKw} kW</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Roof Needed</p>
              <p className="text-white font-bold">~{config.capacityKw * 100} sq ft</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Annual Savings</p>
              <p className="text-green-400 font-bold">₹{(config.monthlyBill * 12 * 0.85).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
