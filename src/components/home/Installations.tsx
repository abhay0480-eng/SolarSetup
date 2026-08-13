import { useState } from 'react';
import { Building2, Zap, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    name: 'Reliance Campa Bottling Facility',
    location: 'Uttar Pradesh',
    capacity: '700 kW',
    type: 'Industrial Rooftop',
    description: 'Large-scale industrial rooftop solar for a beverage manufacturing facility. Engineering-led design with 3D modelling and structural analysis.',
    img: '/images/install-5.jpeg',
  },
  {
    name: 'Metal Master / Bajaj Locks',
    location: 'Aligarh, UP',
    capacity: 'Commercial',
    type: 'Rooftop On-Grid',
    description: 'Hardware manufacturing unit. System optimised for industrial load profile with full engineering documentation.',
    img: '/images/install-1.jpeg',
  },
  {
    name: 'Shanti Devi Ice & Cold Store',
    location: 'Khair, Aligarh',
    capacity: 'Cold Storage',
    type: 'Industrial Solar',
    description: 'Cold storage facility with continuous power demand. Designed for high uptime and low lifecycle cost.',
    img: '/images/install-2.jpeg',
  },
  {
    name: 'Rasik Refreshment Pvt. Ltd.',
    location: 'Ayodhya, UP',
    capacity: 'Commercial',
    type: 'Rooftop Solar',
    description: 'Beverage production unit. Brand-neutral procurement — components selected purely on technical performance for the specific site.',
    img: '/images/install-5.jpeg',
  },
  {
    name: 'Sadani Overseas',
    location: 'Aligarh, UP',
    capacity: 'Commercial',
    type: 'On-Grid Rooftop',
    description: 'Export-oriented manufacturing. 56+ engineering parameters evaluated including shadow analysis, string configuration, and structural weight.',
    img: '/images/install-2.jpeg',
  },
];

const stats = [
  { value: '23+', unit: 'MW', label: 'Commissioned' },
  { value: '450+', unit: '', label: 'Projects Delivered' },
  { value: '56+', unit: '', label: 'Engineering Parameters' },
  { value: '30', unit: 'Yrs', label: 'Lifecycle Focus' },
];

export default function Installations() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
            <Building2 size={14} className="text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Real Installations · Verified Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Projects We've{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Engineered & Built</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From design to commissioning — industrial and commercial solar across Uttar Pradesh and beyond.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-gradient mb-1">
                {s.value}<span className="text-lg font-bold text-orange-400">{s.unit}</span>
              </div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Featured project viewer */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
          {/* Photo */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] glass">
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={13} className="text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">{project.location}</span>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">{project.name}</h3>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/25 rounded-full px-3 py-1 text-orange-300 text-sm font-medium mb-3">
                <Zap size={12} /> {project.type}
              </span>
              <h3 className="text-white text-2xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-400 leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Capacity</p>
                <p className="text-white font-bold">{project.capacity}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Location</p>
                <p className="text-white font-bold">{project.location}</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 space-y-2">
              {[
                'Engineering-led design with 3D modelling',
                '56+ engineering parameters evaluated',
                'Full technical documentation provided',
                'Long-term O&M monitoring included',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project thumbnails */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActive(a => (a - 1 + projects.length) % projects.length)}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] w-36 shrink-0 transition-all duration-200 ${
                  i === active
                    ? 'ring-2 ring-orange-400 opacity-100'
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <img src={p.img} alt={p.name} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/30" />
                <p className="absolute bottom-1 left-1 right-1 text-white text-[10px] font-medium leading-tight px-1 line-clamp-2">
                  {p.name}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setActive(a => (a + 1) % projects.length)}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Engineering Documentation callout */}
        <div className="mt-12 glass rounded-3xl p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-white text-xl font-bold mb-2">Engineering Documentation on Every Project</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We engineer before we quote — not the other way around. Every project includes full technical documentation,
                shadow analysis, and system optimization studies.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                '3D Solar Plant Modelling',
                'Shadow Analysis Report',
                'Single Line Diagram (SLD)',
                'PV Array Layout Drawing',
                'Cable Routing & Electrical Layout',
                'Equipment Datasheets & BOQ',
                'Inverter & String Config Analysis',
                'Roof Load & Structural Analysis',
              ].map((doc) => (
                <div key={doc} className="flex items-center gap-2 text-gray-300">
                  <span className="w-1 h-1 bg-green-400 rounded-full shrink-0" />
                  <span className="text-xs">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
