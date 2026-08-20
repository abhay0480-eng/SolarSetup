import { Settings2, Calculator, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: '01',
    icon: Settings2,
    title: 'Design Your System',
    desc: 'Use our interactive configurator to pick system type (On-Grid / Hybrid / Off-Grid), capacity, and every component — panels, inverters, batteries, and mounting from real Indian brands.',
    color: 'from-solar-500 to-solar-600',
    shadow: 'shadow-solar-500/20',
  },
  {
    step: '02',
    icon: Calculator,
    title: 'Get Subsidy & Price',
    desc: 'Automatically calculate your state + central (PM Surya Ghar) subsidy. Get a live detailed price breakdown with ROI analysis. Zero hidden charges.',
    color: 'from-sky-500 to-sky-400',
    shadow: 'shadow-sky-500/20',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Installation & Support',
    desc: 'Our MNRE-certified team installs your system with warranty support. We handle DISCOM net metering registration and subsidy paperwork.',
    color: 'from-leaf-500 to-leaf-600',
    shadow: 'shadow-leaf-500/20',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden" id="how-it-works">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-solar-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-solar-200 dark:border-solar-500/25 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-strong dark:text-accent text-sm font-medium">Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How SolarCraft <span className="text-gradient">Works</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            From design to installation — everything handled by India's top solar experts.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-0.5 bg-gradient-to-r from-solar-500/30 via-sky-500/30 to-leaf-500/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="glass rounded-3xl p-6 sm:p-8 h-full card-hover">
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-5 sm:mb-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl ${step.shadow}`}>
                      <step.icon size={26} className="text-white" />
                    </div>
                    <span className="text-4xl font-black text-foreground/10">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-foreground-muted leading-relaxed text-sm sm:text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/configurator"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-solar-500 to-solar-600 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full hover:shadow-xl hover:shadow-solar-500/30 hover:-translate-y-0.5 transition-all duration-200 text-base sm:text-lg group"
          >
            Start Designing Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
