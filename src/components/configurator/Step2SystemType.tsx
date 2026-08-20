import { Globe, Zap, Battery, Check } from 'lucide-react';
import type { SystemConfig, SystemType } from '../../types/solar';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

const iconFor: Record<SystemType, typeof Globe> = {
  'on-grid': Globe,
  hybrid: Zap,
  'off-grid': Battery,
};

const styleFor: Record<SystemType, { gradient: string; border: string; bg: string; textColor: string }> = {
  'on-grid': { gradient: 'from-sky-500 to-sky-300', border: 'border-sky-500/40', bg: 'bg-sky-500/10', textColor: 'text-sky-600 dark:text-sky-400' },
  hybrid: { gradient: 'from-solar-500 to-solar-400', border: 'border-solar-500/40', bg: 'bg-solar-500/10', textColor: 'text-solar-600 dark:text-solar-400' },
  'off-grid': { gradient: 'from-leaf-600 to-leaf-400', border: 'border-leaf-500/40', bg: 'bg-leaf-500/10', textColor: 'text-leaf-600 dark:text-leaf-400' },
};

export default function Step2SystemType({ config, onChange }: Props) {
  const t = useContent(configuratorEn, configuratorHi).step2;

  const systemTypes = [
    { id: 'on-grid' as SystemType, ...t.onGrid },
    { id: 'hybrid' as SystemType, ...t.hybrid },
    { id: 'off-grid' as SystemType, ...t.offGrid },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">{t.subheading}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {systemTypes.map((sys) => {
          const isSelected = config.systemType === sys.id;
          const Icon = iconFor[sys.id];
          const sty = styleFor[sys.id];
          return (
            <button
              key={sys.id}
              onClick={() => onChange({ systemType: sys.id, batteryId: sys.id === 'on-grid' ? null : config.batteryId })}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
                isSelected
                  ? `${sty.border} ${sty.bg}`
                  : 'border-border bg-surface-alt hover:border-border-strong hover:bg-surface-alt'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${sty.gradient} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-foreground font-bold text-lg">{sys.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sty.bg} ${sty.textColor} border ${sty.border}`}>
                      {sys.subtitle}
                    </span>
                    {isSelected && (
                      <span className="ml-auto w-6 h-6 bg-gradient-to-br from-solar-500 to-solar-400 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </span>
                    )}
                  </div>
                  <p className="text-foreground-muted text-sm mb-3">{sys.description}</p>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-foreground-subtle text-xs font-medium mb-1.5 uppercase tracking-wide">{t.advantages}</p>
                      <ul className="space-y-1">
                        {sys.pros.map((p) => (
                          <li key={p} className="flex items-center gap-1.5 text-xs text-foreground-muted">
                            <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground-subtle text-xs font-medium mb-1.5 uppercase tracking-wide">{t.limitations}</p>
                      <ul className="space-y-1">
                        {sys.cons.map((c) => (
                          <li key={c} className="flex items-center gap-1.5 text-xs text-foreground-muted">
                            <span className="w-1.5 h-1.5 bg-red-400/70 rounded-full shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground-subtle text-xs font-medium mb-1.5 uppercase tracking-wide">{t.bestFor}</p>
                      <p className={`text-xs font-medium ${sty.textColor}`}>{sys.bestForText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {config.systemType === 'on-grid' && (
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 text-sm text-sky-700 dark:text-sky-300">
          <strong>{t.noteLabel}</strong> {t.onGridNote}
        </div>
      )}

      {config.systemType === 'hybrid' && (
        <div className="bg-solar-500/10 border border-solar-500/20 rounded-xl p-4 text-sm text-solar-700 dark:text-solar-300">
          <strong>{t.noteLabel}</strong> {t.hybridNote}
        </div>
      )}

      {config.systemType === 'off-grid' && (
        <div className="bg-leaf-500/10 border border-leaf-500/20 rounded-xl p-4 text-sm text-leaf-700 dark:text-leaf-300">
          <strong>{t.noteLabel}</strong> {t.offGridNote}
        </div>
      )}
    </div>
  );
}
