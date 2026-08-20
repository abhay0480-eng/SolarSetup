import { Check } from 'lucide-react';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  currentStep: number;
}

export default function StepHeader({ currentStep }: Props) {
  const { stepLabels, stepOfMobile } = useContent(configuratorEn, configuratorHi);

  return (
    <div className="mb-8">
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between mb-3">
        <span className="text-foreground-muted text-sm">
          {stepOfMobile.replace('{n}', String(currentStep + 1)).replace('{total}', String(stepLabels.length))}
        </span>
        <span className="text-foreground font-medium text-sm">{stepLabels[currentStep]}</span>
      </div>
      <div className="sm:hidden h-1.5 bg-surface-alt rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-solar-500 to-solar-300 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / stepLabels.length) * 100}%` }}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-alt" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-solar-500 to-solar-300 transition-all duration-500"
          style={{ width: `${(currentStep / (stepLabels.length - 1)) * 100}%` }}
        />
        {stepLabels.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  done
                    ? 'bg-gradient-to-br from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/30'
                    : active
                    ? 'bg-gradient-to-br from-solar-500 to-solar-400 text-white shadow-xl shadow-solar-500/40 scale-110 ring-4 ring-solar-500/20'
                    : 'bg-surface-alt border border-border text-foreground-subtle'
                }`}
              >
                {done ? <Check size={16} /> : <span>{i + 1}</span>}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap transition-colors ${active ? 'text-solar-700 dark:text-solar-300' : done ? 'text-foreground-muted' : 'text-foreground-subtle'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
