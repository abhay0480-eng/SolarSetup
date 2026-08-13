import { Check } from 'lucide-react';

const STEPS = [
  { label: 'Basics' },
  { label: 'System' },
  { label: 'Panels' },
  { label: 'Inverter' },
  { label: 'Battery' },
  { label: 'Mounting' },
  { label: 'Wiring & BOS' },
  { label: 'Summary' },
];

interface Props {
  currentStep: number;
}

export default function StepHeader({ currentStep }: Props) {
  return (
    <div className="mb-8">
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm">Step {currentStep + 1} of {STEPS.length}</span>
        <span className="text-white font-medium text-sm">{STEPS[currentStep].label}</span>
      </div>
      <div className="sm:hidden h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  done
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                    : active
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/40 scale-110 ring-4 ring-orange-500/20'
                    : 'bg-white/10 text-gray-500'
                }`}
              >
                {done ? <Check size={16} /> : <span>{i + 1}</span>}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap transition-colors ${active ? 'text-orange-300' : done ? 'text-gray-300' : 'text-gray-600'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
