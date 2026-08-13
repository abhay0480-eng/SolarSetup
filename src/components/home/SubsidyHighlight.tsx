import { Link } from 'react-router-dom';
import { IndianRupee, ArrowRight, Info } from 'lucide-react';

const topStates = [
  { state: 'Haryana', central: '₹78,000', state_sub: '₹54,000', total: '₹1,32,000' },
  { state: 'Delhi', central: '₹78,000', state_sub: '₹60,000', total: '₹1,38,000' },
  { state: 'Andhra Pradesh', central: '₹78,000', state_sub: '₹30,000', total: '₹1,08,000' },
  { state: 'Gujarat', central: '₹78,000', state_sub: '₹30,000', total: '₹1,08,000' },
  { state: 'Tamil Nadu', central: '₹78,000', state_sub: '₹50,000', total: '₹1,28,000' },
  { state: 'Telangana', central: '₹78,000', state_sub: '₹30,000', total: '₹1,08,000' },
];

export default function SubsidyHighlight() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
              <IndianRupee size={14} className="text-green-400" />
              <span className="text-green-300 text-sm font-medium">PM Surya Ghar Yojana 2024</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Up to{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                ₹1.4 Lakh
              </span>{' '}
              in Subsidies
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Under PM Surya Ghar Muft Bijli Yojana, homeowners get up to ₹78,000 central government subsidy
              plus additional state subsidies — directly in your bank account.
            </p>

            <div className="space-y-4 mb-8">
              <div className="glass rounded-2xl p-5">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 text-xs font-bold">C</span>
                  Central Government Subsidy (All States)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Up to 2 kW</p>
                    <p className="text-white font-bold">₹30,000 / kW</p>
                    <p className="text-green-400 text-xs">Max ₹60,000</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">2 kW to 3 kW</p>
                    <p className="text-white font-bold">₹18,000 / kW</p>
                    <p className="text-green-400 text-xs">Additional ₹18,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <Info size={12} className="text-amber-400" />
                  Maximum central subsidy = ₹78,000 for 3kW+ system
                </div>
              </div>

              <div className="glass rounded-2xl p-5">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-xs font-bold">S</span>
                  State Subsidies (varies by state)
                </h4>
                <p className="text-gray-400 text-sm">Additional subsidies of ₹2,000 – ₹18,000/kW depending on your state. Auto-calculated in our configurator.</p>
              </div>
            </div>

            <Link
              to="/subsidies"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-200 shadow-xl shadow-green-500/25 group"
            >
              Check Your State Subsidy
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: State Table */}
          <div className="glass rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 px-6 py-4 border-b border-white/10">
              <h3 className="text-white font-bold">Top States — Max Subsidy (3kW System)</h3>
              <p className="text-gray-400 text-xs mt-1">Central + State combined subsidy</p>
            </div>
            <div className="divide-y divide-white/5">
              {topStates.map((row) => (
                <div key={row.state} className="px-6 py-4 flex items-center justify-between hover:bg-white/3 transition-colors">
                  <div>
                    <p className="text-white font-medium text-sm">{row.state}</p>
                    <p className="text-gray-500 text-xs">Central: {row.central} + State: {row.state_sub}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{row.total}</p>
                    <p className="text-gray-500 text-xs">total subsidy</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-white/3 border-t border-white/10">
              <Link to="/subsidies" className="text-orange-400 text-sm font-medium hover:text-orange-300 flex items-center gap-1 group">
                View all 28 states
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
