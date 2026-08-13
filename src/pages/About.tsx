import { Award, Users, Zap, MapPin, CheckCircle2, Building2, Wrench, BarChart3 } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange-300 text-sm font-medium">Government-Empanelled EPC · Aligarh, UP · Industrial & Commercial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Zenbright Future Energy</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A professionally managed solar EPC company specialising in high-performance industrial and commercial solar power solutions across India.
            Headquartered in Aligarh, Uttar Pradesh.
          </p>
        </div>

        {/* Founding philosophy */}
        <div className="glass rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl" />
          <blockquote className="relative">
            <p className="text-white text-xl sm:text-2xl font-semibold italic leading-relaxed mb-4">
              "We engineer before we quote. We document before we build. We monitor after we leave."
            </p>
            <footer className="text-orange-400 font-medium">— Managing Director, Zenbright Future Energy Pvt. Ltd.</footer>
          </blockquote>
        </div>

        {/* Company overview */}
        <div className="glass rounded-3xl p-8 mb-10">
          <h2 className="text-white font-bold text-2xl mb-4">Company Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Zenbright Future Energy Private Limited is a professionally managed solar EPC company specialising in high-performance
            industrial and commercial solar power solutions across India. We deliver end-to-end turnkey services — from design
            engineering and procurement through construction, commissioning, and long-term O&amp;M.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            As a government-empanelled EPC company, we follow stringent engineering, safety, and compliance standards at every stage.
            Our approach is built on technical transparency, lifecycle reliability, and performance-oriented outcomes — not commodity-driven delivery.
          </p>

          {/* Company facts grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Headquarters', value: 'Aligarh, Uttar Pradesh' },
              { label: 'Industry Focus', value: 'Industrial & Commercial Solar EPC' },
              { label: 'Registration', value: 'Government-Empanelled EPC Company' },
              { label: 'Procurement', value: 'Technology-Neutral, Independent' },
              { label: 'Project Scope', value: 'EPC + O&M, Rooftop & Ground-Mount' },
              { label: 'Empanelments', value: 'MNRE · UPNEDA · GeM · PM Surya Ghar' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3">
                <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                <p className="text-white text-sm font-medium leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Zap, value: '23+ MW', label: 'Commissioned', color: 'text-orange-400' },
            { icon: Building2, value: '450+', label: 'Projects Delivered', color: 'text-blue-400' },
            { icon: BarChart3, value: '56+', label: 'Engineering Parameters', color: 'text-green-400' },
            { icon: Award, value: '30 Yrs', label: 'Lifecycle Focus', color: 'text-purple-400' },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="glass rounded-2xl p-5 text-center">
              <Icon size={24} className={`${color} mx-auto mb-2`} />
              <p className="text-white font-black text-2xl">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Why Organizations Choose Zenbright */}
        <div className="mb-10">
          <h2 className="text-white font-bold text-2xl mb-2">Why Organizations Choose Zenbright</h2>
          <p className="text-gray-400 text-sm mb-6">Six concrete differentiators built into how we work — not claimed in marketing material.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Wrench,
                title: 'Engineering-Led Execution',
                desc: 'We engineer before we quote — not the other way around. 3D modelling, complete technical documentation on every job.',
              },
              {
                icon: Users,
                title: 'Brand-Neutral Procurement',
                desc: 'No manufacturer affiliations. Components selected purely on technical suitability, reliability, and lifecycle performance for your specific site.',
              },
              {
                icon: MapPin,
                title: 'Proactive Monitoring Culture',
                desc: 'A dedicated technical team tracks every installed plant in real time. Corrective actions are often initiated before clients identify deviations.',
              },
              {
                icon: Award,
                title: 'Government-Empanelled Status',
                desc: 'Execution aligned with full regulatory, safety, and engineering compliance requirements — a pre-qualification credential for serious procurement.',
              },
              {
                icon: Building2,
                title: 'Industrial Sector Depth',
                desc: 'Proven across beverage manufacturing, hardware, cold storage, packaging, agro-processing, and education — not generic residential installs.',
              },
              {
                icon: BarChart3,
                title: '30-Year Lifecycle Focus',
                desc: 'Projects engineered for asset durability and predictable generation over a 30-year horizon. We optimise for total lifecycle value.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-5 flex gap-3">
                <div className="w-9 h-9 bg-orange-500/15 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Documentation */}
        <div className="glass rounded-3xl p-6 sm:p-8 mb-10">
          <h2 className="text-white font-bold text-xl mb-2">Engineering Documentation on Every Project</h2>
          <p className="text-gray-400 text-sm mb-5">Complete technical documentation package included with every project:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              '3D Solar Plant Modelling',
              'Detailed Generation Assessment Report',
              'Shadow Analysis Report',
              'Single Line Diagram (SLD)',
              'PV Array Layout Drawings',
              'String Identification Layout',
              'Lightning Arrester (LA) Identification Layout',
              'Earthing Identification Layout',
              'Roof Load & Structural Weight Analysis',
              'Cable Routing & Electrical Layouts',
              'Equipment Datasheets & Technical BOQ',
              'Inverter & String Configuration Analysis',
              'System Optimization Studies',
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="glass rounded-3xl p-6 sm:p-8 mb-10">
          <h2 className="text-white font-bold text-xl mb-5">Industries We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Beverage Manufacturing',
              'Cold Storage & Ice Plants',
              'Hardware Manufacturing',
              'Packaging & Agro-Processing',
              'Educational Institutions',
              'Hospitals & Healthcare',
              'Commercial Establishments',
              'Industrial Factories',
              'Rooftop & Ground-Mount',
            ].map((ind) => (
              <div key={ind} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="text-blue-200 text-sm">{ind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-bold text-xl mb-4">Certifications & Registrations</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Startup India Registered',
              'MSME Registered',
              'MNRE Empanelled',
              'PM Surya Ghar Yojana',
              'UPNEDA Approved',
              'GeM Registered',
              'Government-Empanelled EPC',
              'BIS Certified Products Only',
              'IEC 61215 / IEC 61730',
              'CEA 2010 Compliant',
            ].map((cert) => (
              <div key={cert} className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-green-200 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
