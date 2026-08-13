import { Link } from 'react-router-dom';
import { Zap, Battery, Globe, ArrowRight, Check } from 'lucide-react';

const systems = [
  {
    id: 'on-grid',
    icon: Globe,
    title: 'On-Grid Solar',
    subtitle: 'Grid-Tied System',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-500',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    iconBg: 'from-blue-500 to-cyan-400',
    features: [
      'Export surplus to grid (net metering)',
      'Maximum PM Surya Ghar subsidy eligible',
      'No battery needed — lowest cost',
      'Grid acts as your backup storage',
      'ROI: 3–5 years',
    ],
    suitable: 'Best for areas with reliable grid supply. Ideal for most urban homes.',
    priceRange: '₹35,000 – ₹1.5L',
    path: '/configurator?type=on-grid',
  },
  {
    id: 'hybrid',
    icon: Zap,
    title: 'Hybrid Solar',
    subtitle: 'Grid + Battery',
    badge: 'Recommended',
    badgeColor: 'bg-orange-500',
    gradient: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    iconBg: 'from-orange-500 to-amber-400',
    features: [
      'Power backup during outages',
      'Smart battery + grid switching',
      'Export to grid when battery is full',
      'Subsidy applicable on solar component',
      'ROI: 4–6 years',
    ],
    suitable: 'Perfect for areas with frequent power cuts. Best of both worlds.',
    priceRange: '₹65,000 – ₹3L',
    path: '/configurator?type=hybrid',
  },
  {
    id: 'off-grid',
    icon: Battery,
    title: 'Off-Grid Solar',
    subtitle: 'Fully Independent',
    badge: 'Rural & Remote',
    badgeColor: 'bg-green-500',
    gradient: 'from-green-500/20 to-emerald-500/10',
    border: 'border-green-500/30',
    glow: 'shadow-green-500/20',
    iconBg: 'from-green-500 to-emerald-400',
    features: [
      'Complete grid independence',
      'Battery bank stores all energy',
      'Ideal for no-grid / remote areas',
      'No electricity bills at all',
      'ROI: 5–8 years',
    ],
    suitable: 'Ideal for farms, villages, remote homes without grid connectivity.',
    priceRange: '₹80,000 – ₹4L',
    path: '/configurator?type=off-grid',
  },
];

export default function SystemTypes() {
  return (
    <section className="py-24 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange-300 text-sm font-medium">Choose Your System Type</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Which Solar System is{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Right for You?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every home is different. Choose the system that matches your power needs, grid availability, and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((sys) => (
            <div
              key={sys.id}
              className={`relative bg-gradient-to-br ${sys.gradient} border ${sys.border} rounded-3xl p-7 card-hover shadow-xl ${sys.glow} flex flex-col`}
            >
              {/* Badge */}
              <div className={`absolute -top-3 left-6 ${sys.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                {sys.badge}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${sys.iconBg} rounded-2xl flex items-center justify-center shadow-xl mb-5 mt-2`}>
                <sys.icon size={26} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{sys.title}</h3>
              <p className="text-gray-400 text-sm mb-5">{sys.subtitle}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-1">
                {sys.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={14} className="text-green-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Suitable for */}
              <div className="bg-white/5 rounded-xl p-3 mb-5">
                <p className="text-gray-400 text-xs leading-relaxed">{sys.suitable}</p>
              </div>

              {/* Price range */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-gray-400 text-sm">Starting from</span>
                <span className="text-white font-bold">{sys.priceRange}</span>
              </div>

              <Link
                to={sys.path}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold py-3 rounded-xl transition-all duration-200 group"
              >
                Design This System
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
