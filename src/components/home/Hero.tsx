import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, IndianRupee, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-blue-900/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-300 text-sm font-medium">Government-Empanelled EPC Company · MNRE · GeM · UPNEDA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Engineering{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                The Energy
              </span>{' '}
              for India
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Industrial & Commercial Solar EPC — design your custom system component by component.
              Real Indian brands, live pricing, and state-specific PM Surya Ghar subsidies applied instantly.
            </p>

            {/* Features row */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: IndianRupee, text: 'State Subsidies Applied' },
                { icon: Shield, text: 'BIS Certified Products' },
                { icon: Award, text: 'MNRE Empanelled' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-7 h-7 bg-orange-500/15 rounded-lg flex items-center justify-center">
                    <Icon size={14} className="text-orange-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/configurator"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-2xl hover:from-orange-400 hover:to-amber-400 transition-all duration-200 shadow-xl shadow-orange-500/30 text-lg group"
              >
                <Zap size={20} />
                Start Designing
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/subsidies"
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200 text-lg"
              >
                Check Subsidies
              </Link>
            </div>
          </div>

          {/* Right: Solar Illustration */}
          <div className="relative flex items-center justify-center">
            <SolarIllustration />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '23+ MW', label: 'Commissioned' },
            { value: '450+', label: 'Projects Delivered' },
            { value: '56+', label: 'Engineering Parameters' },
            { value: '30 Yrs', label: 'Lifecycle Focus' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolarIllustration() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Main house with solar */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-3xl scale-110" />

        <div className="relative glass rounded-3xl p-8 space-y-4">
          {/* Solar panel grid */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-slate-600 relative overflow-hidden"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Panel cell lines */}
                <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="bg-slate-600/40 rounded-sm" />
                  ))}
                </div>
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
              </div>
            ))}
          </div>

          {/* Live reading card */}
          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Live Generation</span>
              <span className="flex items-center gap-1 text-green-400 text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">4.2</span>
              <span className="text-orange-300 font-semibold mb-1">kW</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-gray-400 text-xs">Today's Units</p>
                <p className="text-white font-semibold">18.5 kWh</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Monthly Savings</p>
                <p className="text-green-400 font-semibold">₹2,840</p>
              </div>
            </div>
          </div>

          {/* System info */}
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-xs mb-1">System</p>
              <p className="text-white font-bold">5 kW</p>
              <p className="text-orange-400 text-xs">Hybrid</p>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-xs mb-1">Subsidy</p>
              <p className="text-green-400 font-bold">₹78K</p>
              <p className="text-gray-400 text-xs">Applied</p>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-xs mb-1">ROI</p>
              <p className="text-amber-400 font-bold">4.2 yr</p>
              <p className="text-gray-400 text-xs">Payback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-semibold text-green-400 border border-green-500/20 animate-bounce">
        ₹1.2L Saved!
      </div>
      <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs font-semibold text-orange-400 border border-orange-500/20">
        Waaree • 440W × 12
      </div>
    </div>
  );
}
