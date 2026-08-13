import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is PM Surya Ghar Muft Bijli Yojana subsidy?',
    a: 'PM Surya Ghar is the central government scheme providing up to ₹78,000 subsidy for residential rooftop solar. You get ₹30,000/kW for the first 2kW and ₹18,000/kW for the 3rd kW. The subsidy is directly credited to your bank account after installation via your DISCOM.',
  },
  {
    q: 'What is the difference between On-Grid, Hybrid and Off-Grid?',
    a: 'On-Grid: Connected to utility grid, exports surplus electricity, no battery needed — cheapest option. Hybrid: Battery + grid connection, provides backup during power cuts and can export to grid. Off-Grid: Completely independent from grid, ideal for areas without reliable electricity.',
  },
  {
    q: 'What is the difference between Pre-GI and Hot Dip Galvanized (HDG) mounting?',
    a: 'Pre-Galvanized (Pre-GI): Steel sheet is galvanized before fabrication, zinc coating 120–150 g/m². Suitable for most locations. Hot Dip Galvanized (HDG): Fabricated structure is dipped in molten zinc, coating 600–700 g/m² (85–100 microns). Much better corrosion resistance, mandatory for coastal areas, high humidity, or industrial zones. HDG comes with 25-year warranty vs 10 years for Pre-GI.',
  },
  {
    q: 'What is Mono PERC vs Bifacial vs TOPCon solar panel?',
    a: 'Mono PERC: Monocrystalline silicon with Passivated Emitter Rear Cell technology. Efficiency 20–21.5%. Industry standard. Bifacial: Generates power from both front and rear side (reflected light). 5–20% more yield. TOPCon (Tunnel Oxide Passivated Contact): Latest technology, 22–23% efficiency, lower temperature coefficient. Premium pricing but best performance. For most homes, Mono PERC offers the best value.',
  },
  {
    q: 'What is net metering and how does it work?',
    a: 'Net metering allows you to export excess solar electricity to the grid and get credit on your electricity bill. Your meter tracks electricity imported from grid and exported to grid. You only pay for the "net" units consumed. Available for on-grid and hybrid systems. Available in all major states — handled by SolarCraft.',
  },
  {
    q: 'How many solar panels do I need for my home?',
    a: 'A typical 3BHK home with ₹2,000–3,000/month electricity bill needs a 3–5 kW system. At 440W per panel, a 5kW system needs 12 panels. Our configurator calculates this automatically based on your monthly bill and selected panel.',
  },
  {
    q: 'What is the ROI and payback period for solar in India?',
    a: 'After subsidy, a typical 5kW on-grid system costs ₹1.5–2L with payback of 3–5 years. Hybrid systems take 4–6 years. Solar panels last 25+ years, so you enjoy 20+ years of free electricity after payback. Solar gives 15–25% annual returns — far better than most investments.',
  },
  {
    q: 'Are Lithium (LFP) batteries worth it vs Tubular Lead-Acid?',
    a: 'Lithium LFP: Higher cost (₹70K–1L for 5kWh), 4000+ cycles, 90% DoD, 10+ year life, no maintenance, lighter. Tubular Lead-Acid: Lower cost (₹13–18K per 150Ah), 1200–1500 cycles, 60% DoD, 5-year warranty, requires maintenance. For long-term: LFP is better. For budget constraints: Tubular is proven and reliable.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-400">Everything you need to know about going solar in India</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass rounded-2xl overflow-hidden transition-all duration-200 ${openIndex === i ? 'border-orange-500/30' : ''}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`font-medium text-sm sm:text-base transition-colors ${openIndex === i ? 'text-orange-300' : 'text-white'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180 text-orange-400' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
