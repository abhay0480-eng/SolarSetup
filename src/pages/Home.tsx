import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import SystemTypes from '../components/home/SystemTypes';
import Brands from '../components/home/Brands';
import SubsidyHighlight from '../components/home/SubsidyHighlight';
import Installations from '../components/home/Installations';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <SystemTypes />
      <Brands />
      <SubsidyHighlight />
      <Installations />
      <Testimonials />
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Go Solar?{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Start Today.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Design your custom solar setup in 10 minutes. Get real prices with subsidy calculated instantly.
            No sales calls, no pressure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/configurator"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-10 py-4 rounded-2xl hover:from-orange-400 hover:to-amber-400 transition-all duration-200 shadow-xl shadow-orange-500/30 text-lg group"
            >
              <Zap size={20} />
              Design My Solar Setup
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-10 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
