import { Globe, Zap, Battery, Check } from 'lucide-react';
import type { SystemConfig, SystemType } from '../../types/solar';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

const systemTypes = [
  {
    id: 'on-grid' as SystemType,
    icon: Globe,
    title: 'On-Grid',
    subtitle: 'Grid-Tied System',
    description: 'Connected to utility grid. Export surplus electricity via net metering. No battery required.',
    pros: ['Lowest cost — no battery', 'Eligible for full central subsidy', 'Net metering income', 'Grid as backup'],
    cons: ['No backup during power cuts', 'Dependent on grid availability'],
    bestFor: 'Urban homes with reliable power supply',
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
    textColor: 'text-blue-400',
  },
  {
    id: 'hybrid' as SystemType,
    icon: Zap,
    title: 'Hybrid',
    subtitle: 'Grid + Battery Backup',
    description: 'Battery storage + grid connection. Powers your home during cuts. Export when battery is full.',
    pros: ['Backup during power cuts', 'Export surplus to grid', 'Smart energy management', 'Future-ready'],
    cons: ['Higher cost than on-grid', 'Battery maintenance'],
    bestFor: 'Homes with frequent power cuts',
    gradient: 'from-orange-500 to-amber-500',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    textColor: 'text-orange-400',
  },
  {
    id: 'off-grid' as SystemType,
    icon: Battery,
    title: 'Off-Grid',
    subtitle: 'Fully Independent',
    description: 'Completely independent from grid. Large battery bank. No electricity bills ever.',
    pros: ['100% grid independent', 'No electricity bills', 'Works in remote areas', 'Energy independence'],
    cons: ['Highest cost', 'Large battery bank needed', 'Not eligible for net metering'],
    bestFor: 'Remote areas, farms, no-grid locations',
    gradient: 'from-green-500 to-emerald-500',
    border: 'border-green-500/40',
    bg: 'bg-green-500/10',
    textColor: 'text-green-400',
  },
];

export default function Step2SystemType({ config, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your System Type</h2>
        <p className="text-gray-400">Select the solar system configuration that suits your power needs and location.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {systemTypes.map((sys) => {
          const isSelected = config.systemType === sys.id;
          return (
            <button
              key={sys.id}
              onClick={() => onChange({ systemType: sys.id, batteryId: sys.id === 'on-grid' ? null : config.batteryId })}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
                isSelected
                  ? `${sys.border} ${sys.bg}`
                  : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${sys.gradient} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                  <sys.icon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-lg">{sys.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sys.bg} ${sys.textColor} border ${sys.border}`}>
                      {sys.subtitle}
                    </span>
                    {isSelected && (
                      <span className="ml-auto w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{sys.description}</p>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wide">Advantages</p>
                      <ul className="space-y-1">
                        {sys.pros.map((p) => (
                          <li key={p} className="flex items-center gap-1.5 text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wide">Limitations</p>
                      <ul className="space-y-1">
                        {sys.cons.map((c) => (
                          <li key={c} className="flex items-center gap-1.5 text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 bg-red-400/60 rounded-full shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wide">Best For</p>
                      <p className={`text-xs font-medium ${sys.textColor}`}>{sys.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {config.systemType === 'on-grid' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
          <strong>Note:</strong> On-grid systems require net metering connection with your DISCOM. We handle all paperwork.
          Battery will be skipped in Step 5.
        </div>
      )}

      {config.systemType === 'hybrid' && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-sm text-orange-300">
          <strong>Note:</strong> Hybrid inverters support both battery + grid. You'll select battery in Step 5.
          Central subsidy still applicable on the solar + inverter components.
        </div>
      )}

      {config.systemType === 'off-grid' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-sm text-green-300">
          <strong>Note:</strong> Off-grid systems aren't eligible for net metering or DISCOM connection.
          You'll need adequate battery storage for overnight + cloudy days. We'll calculate the right battery bank size.
        </div>
      )}
    </div>
  );
}
