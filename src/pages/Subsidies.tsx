import { useState } from 'react';
import { IndianRupee, Search, Info, MapPin } from 'lucide-react';
import { stateSubsidies } from '../data/subsidies';
import { formatINR } from '../utils/priceCalculator';

function calcSubsidy(kw: number, state: typeof stateSubsidies[0]) {
  const capped = Math.min(kw, 10);
  let central = capped <= 2
    ? capped * state.centralSubsidy.upTo2kw
    : 2 * state.centralSubsidy.upTo2kw + Math.min(capped - 2, 1) * state.centralSubsidy.per2to3kw;

  let stateAmt = 0;
  const s = state.stateSubsidy;
  if (s.type === 'flat') stateAmt = s.amount;
  else if (s.type === 'per_kw') {
    const kwS = s.maxKw ? Math.min(capped, s.maxKw) : capped;
    stateAmt = kwS * s.amount;
    if (s.maxAmount) stateAmt = Math.min(stateAmt, s.maxAmount);
  } else if (s.type === 'percentage') {
    const gross = kw * 60000;
    stateAmt = Math.round((gross * s.amount) / 100);
    if (s.maxAmount) stateAmt = Math.min(stateAmt, s.maxAmount);
  }

  return { central: Math.round(central), state: stateAmt, total: Math.round(central) + stateAmt };
}

export default function Subsidies() {
  const [search, setSearch] = useState('');
  const [capacity, setCapacity] = useState(3);

  const filtered = stateSubsidies.filter(s => s.state.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-4">
            <IndianRupee size={14} className="text-green-400" />
            <span className="text-green-300 text-sm font-medium">Updated 2024-25</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Solar Subsidies Across{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">India</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Central + State subsidies under PM Surya Ghar Muft Bijli Yojana for residential rooftop solar.
          </p>
        </div>

        {/* Central Subsidy Info */}
        <div className="glass rounded-3xl p-6 mb-8">
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Info size={20} className="text-orange-400" />
            PM Surya Ghar — Central Subsidy (All States)
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">For 1 kW system</p>
              <p className="text-white font-black text-3xl">₹30,000</p>
              <p className="text-orange-300 text-sm mt-1">Central subsidy</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">For 2 kW system</p>
              <p className="text-white font-black text-3xl">₹60,000</p>
              <p className="text-orange-300 text-sm mt-1">₹30,000 × 2kW</p>
            </div>
            <div className="bg-orange-500/15 border border-orange-500/30 rounded-2xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">For 3 kW+ system</p>
              <p className="text-white font-black text-3xl">₹78,000</p>
              <p className="text-orange-300 text-sm mt-1">Maximum central subsidy</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4 flex items-center gap-2">
            <Info size={14} className="text-amber-400 shrink-0" />
            For 2–3kW: additional ₹18,000/kW (for the 3rd kW only). No additional central subsidy beyond 3kW.
            Subsidy credited directly to bank account via DISCOM after installation.
          </p>
        </div>

        {/* Calculator */}
        <div className="glass rounded-2xl p-5 mb-8">
          <h3 className="text-white font-semibold mb-4">Quick Subsidy Calculator</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <label className="text-gray-400 text-sm">System Size:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 5, 7, 10].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setCapacity(kw)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      capacity === kw
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {kw}kW
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search state..."
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-600"
          />
        </div>

        {/* State Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 px-6 py-3 grid grid-cols-5 gap-4 text-xs font-medium text-gray-400 uppercase tracking-wide">
            <div className="col-span-2">State / UT</div>
            <div className="text-right">Central ({capacity}kW)</div>
            <div className="text-right">State Subsidy</div>
            <div className="text-right">Total</div>
          </div>

          <div className="divide-y divide-white/5">
            {filtered.map((state) => {
              const sub = calcSubsidy(capacity, state);
              return (
                <div key={state.code} className="px-6 py-4 grid grid-cols-5 gap-4 hover:bg-white/3 transition-colors">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-gray-500 shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">{state.state}</p>
                        <p className="text-gray-500 text-xs">{state.discom}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-300 font-semibold text-sm">{formatINR(sub.central)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${sub.state > 0 ? 'text-blue-300' : 'text-gray-600'}`}>
                      {sub.state > 0 ? formatINR(sub.state) : '—'}
                    </p>
                    <p className="text-gray-600 text-xs capitalize">{state.stateSubsidy.type.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${sub.total > 90000 ? 'text-green-400' : sub.total > 60000 ? 'text-amber-300' : 'text-white'}`}>
                      {formatINR(sub.total)}
                    </p>
                    {state.netMeteringAvailable && (
                      <p className="text-green-500 text-xs">Net metering ✓</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-gray-500 text-xs text-center mt-6">
          * Subsidy amounts are indicative based on published government guidelines. Actual amounts may vary.
          State subsidies subject to state government notifications and DISCOM policies.
          Data updated as per PM Surya Ghar Yojana guidelines (2024-25).
        </p>
      </div>
    </div>
  );
}
