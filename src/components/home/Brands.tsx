const panelBrands = ['Waaree', 'Adani Solar', 'Vikram Solar', 'Tata Power Solar', 'Premier Energies', 'Goldi Solar', 'RenewSys', 'Luminous'];
const inverterBrands = ['Growatt', 'Sungrow', 'Delta', 'Luminous', 'Havells', 'SMA', 'Flin Energy', 'Su-Kam', 'Microtek'];
const batteryBrands = ['Luminous', 'Exide', 'Amaron', 'Okaya', 'Livguard', 'Su-Kam', 'Coslight'];

function BrandScroller({ brands, direction = 'left' }: { brands: string[]; direction?: 'left' | 'right' }) {
  const doubled = [...brands, ...brands];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-4 w-max ${direction === 'left' ? 'animate-[scroll-left_20s_linear_infinite]' : 'animate-[scroll-right_20s_linear_infinite]'}`}
        style={{
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} 25s linear infinite`,
        }}
      >
        {doubled.map((brand, i) => (
          <div
            key={i}
            className="glass rounded-xl px-5 py-2.5 whitespace-nowrap text-gray-300 text-sm font-medium hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {brand}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function Brands() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Real Products from{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Trusted Indian Brands
            </span>
          </h2>
          <p className="text-gray-400">All products BIS certified and MNRE approved</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 pl-2">Solar Panels</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#07101f] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#07101f] to-transparent z-10" />
              <BrandScroller brands={panelBrands} direction="left" />
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 pl-2">Inverters</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#07101f] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#07101f] to-transparent z-10" />
              <BrandScroller brands={inverterBrands} direction="right" />
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 pl-2">Batteries</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#07101f] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#07101f] to-transparent z-10" />
              <BrandScroller brands={batteryBrands} direction="left" />
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {['BIS Certified', 'IEC 61215', 'IEC 61730', 'MNRE Approved', 'PM Surya Ghar', 'CEA 2010 Compliant'].map((cert) => (
            <div key={cert} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-300 text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
