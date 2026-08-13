import { Settings2, Calculator, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: '01',
    icon: Settings2,
    title: 'Design Your System',
    desc: 'Use our interactive configurator to pick system type (On-Grid / Hybrid / Off-Grid), capacity, and every component — panels, inverters, batteries, and mounting from real Indian brands.',
    color: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-500/20',
  },
  {
    step: '02',
    icon: Calculator,
    title: 'Get Subsidy & Price',
    desc: 'Automatically calculate your state + central (PM Surya Ghar) subsidy. Get a live detailed price breakdown with ROI analysis. Zero hidden charges.',
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/20',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Installation & Support',
    desc: 'Our MNRE-certified team installs your system with warranty support. We handle DISCOM net metering registration and subsidy paperwork.',
    color: 'from-green-500 to-emerald-500',
    shadow: 'shadow-green-500/20',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative" id="how-it-works">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange-300 text-sm font-medium">Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How SolarCraft{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From design to installation — everything handled by India's top solar experts.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-0.5 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-green-500/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="glass rounded-3xl p-8 h-full card-hover">
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl ${step.shadow}`}>
                      <step.icon size={28} className="text-white" />
                    </div>
                    <span className="text-4xl font-black text-white/10">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/configurator"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-10 py-4 rounded-2xl hover:from-orange-400 hover:to-amber-400 transition-all duration-200 shadow-xl shadow-orange-500/30 text-lg group"
          >
            Start Designing Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
