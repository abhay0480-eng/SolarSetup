import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    location: 'Jaipur, Rajasthan',
    system: '5kW Hybrid | Waaree + Growatt',
    rating: 5,
    text: 'Designed my 5kW hybrid system myself on SolarCraft. The subsidy calculator showed me exactly how much I\'d get from Rajasthan state + central. Saved ₹1.1 lakh on the setup!',
    savings: '₹2,400/month',
  },
  {
    name: 'Priya Menon',
    location: 'Kochi, Kerala',
    system: '3kW On-Grid | Vikram + Sungrow',
    rating: 5,
    text: 'KSEB net metering was handled by the SolarCraft team. Now I export surplus units and my monthly bill has dropped from ₹3,200 to under ₹400. Best decision ever!',
    savings: '₹2,800/month',
  },
  {
    name: 'Amarjit Singh',
    location: 'Ludhiana, Punjab',
    system: '10kW On-Grid | Adani + Delta',
    rating: 5,
    text: 'Running my workshop on solar. The technical specs in the configurator helped me compare Adani and Waaree panels side-by-side before choosing. Very professional installation team.',
    savings: '₹8,500/month',
  },
  {
    name: 'Meena Agrawal',
    location: 'Bhopal, MP',
    system: '3kW Hybrid | Goldi + Luminous',
    rating: 5,
    text: 'Frequent power cuts were our main problem. The hybrid system recommendation with Luminous battery solved everything. No power cuts affect us now. The subsidy reduced our cost by ₹90,000!',
    savings: '₹1,900/month',
  },
  {
    name: 'Suresh Babu',
    location: 'Hyderabad, Telangana',
    system: '6kW Hybrid | Vikram + Deye',
    rating: 5,
    text: 'Compared 15 different component combinations on the configurator. The live price update feature is incredibly useful. Telangana state subsidy of ₹30,000 was a bonus!',
    savings: '₹4,200/month',
  },
  {
    name: 'Anita Verma',
    location: 'Noida, UP',
    system: '4kW Hybrid | Waaree TOPCon + Growatt',
    rating: 5,
    text: 'After comparing panels, I chose Waaree TOPCon for the higher efficiency. The HDG mounting was recommended due to my building. 25-year structure warranty gives great peace of mind.',
    savings: '₹3,100/month',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-300 text-sm font-medium">4.8/5 from 2,400+ reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Indian Homeowners</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Real customers, real savings. From Jaipur to Kochi, SolarCraft is powering India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6 card-hover flex flex-col">
              <Quote size={24} className="text-orange-400/40 mb-3" />
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                    <p className="text-orange-400 text-xs mt-1">{t.system}</p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={t.rating} />
                    <p className="text-green-400 text-xs font-semibold mt-1">Saves {t.savings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
