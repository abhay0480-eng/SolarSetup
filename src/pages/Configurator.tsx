import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import StepHeader from '../components/configurator/StepHeader';
import Step1Basics from '../components/configurator/Step1Basics';
import Step2SystemType from '../components/configurator/Step2SystemType';
import Step3Panels from '../components/configurator/Step3Panels';
import Step4Inverter from '../components/configurator/Step4Inverter';
import Step5Battery from '../components/configurator/Step5Battery';
import Step6Mounting from '../components/configurator/Step6Mounting';
import Step7BOS from '../components/configurator/Step7BOS';
import Step8Summary from '../components/configurator/Step8Summary';
import LivePriceBar from '../components/configurator/LivePriceBar';
import type { SystemConfig } from '../types/solar';
import { defaultBosSelections } from '../utils/priceCalculator';
import configuratorEn from '../content/en/configurator.json';
import configuratorHi from '../content/hi/configurator.json';
import { useContent } from '../i18n/LanguageContext';

const defaultBos = defaultBosSelections('hybrid');

const defaultConfig: SystemConfig = {
  systemType: 'hybrid',
  capacityKw: 5,
  state: '',
  monthlyBill: 3000,
  roofArea: 500,
  panelId: null,
  inverterId: null,
  batteryId: null,
  batteryCount: 1,
  mountingId: null,
  bos: defaultBos,
};

export default function Configurator() {
  const { shell, stepLabels } = useContent(configuratorEn, configuratorHi);
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('zenbright_config_step');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('zenbright_config_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore JSON parse error
      }
    }
    const type = searchParams.get('type');
    if (type === 'on-grid' || type === 'off-grid' || type === 'hybrid') {
      const bos = defaultBosSelections(type);
      return { ...defaultConfig, systemType: type, bos };
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('zenbright_config_step', step.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    localStorage.setItem('zenbright_config_data', JSON.stringify(config));
  }, [config]);

  const handleReset = () => {
    if (window.confirm(shell.resetConfirm)) {
      localStorage.removeItem('zenbright_config_step');
      localStorage.removeItem('zenbright_config_data');
      setStep(0);
      setConfig(defaultConfig);
    }
  };

  const updateConfig = (updates: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return config.state !== '' && config.capacityKw > 0;
      case 1: return true;
      case 2: return config.panelId !== null;
      case 3: return config.inverterId !== null;
      case 4: return config.systemType === 'on-grid' || config.batteryId !== null;
      case 5: return config.mountingId !== null;
      case 6: return true; // BOS has defaults pre-selected
      default: return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <Step1Basics config={config} onChange={updateConfig} />;
      case 1: return <Step2SystemType config={config} onChange={updateConfig} />;
      case 2: return <Step3Panels config={config} onChange={updateConfig} />;
      case 3: return <Step4Inverter config={config} onChange={updateConfig} />;
      case 4: return <Step5Battery config={config} onChange={updateConfig} />;
      case 5: return <Step6Mounting config={config} onChange={updateConfig} />;
      case 6: return <Step7BOS config={config} onChange={updateConfig} />;
      case 7: return <Step8Summary config={config} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20 pb-24 lg:pb-0">
      <div className="bg-gradient-to-b from-solar-500/[0.06] to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1 truncate">{shell.title}</h1>
            <p className="text-foreground-muted text-xs sm:text-sm">
              {shell.stepOf.replace('{n}', String(step + 1)).replace('{total}', String(stepLabels.length))}{' '}
              <span className="text-solar-600 dark:text-solar-400">{stepLabels[step]}</span>
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/10 dark:bg-red-500/15 text-red-500 dark:text-red-400 rounded-xl hover:bg-red-500/20 transition-colors text-xs sm:text-sm font-medium border border-red-500/20 shrink-0"
          >
            <RefreshCw size={16} /> <span className="hidden sm:inline">{shell.resetLabel}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <StepHeader currentStep={step} />

        <div className="grid lg:grid-cols-[1fr_300px] gap-6 lg:gap-8 mt-5 sm:mt-8">
          {/* Main content */}
          <div className="min-w-0">
            <div className="bento p-4 sm:p-5 lg:p-8">
              {renderStep()}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border">
                <button
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 min-h-11 rounded-full border border-border text-foreground-muted hover:bg-surface-alt disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium text-sm sm:text-base"
                >
                  <ChevronLeft size={18} /> {shell.back}
                </button>

                <span className="hidden sm:inline text-foreground-subtle text-sm">{step + 1} / {stepLabels.length}</span>

                {step < stepLabels.length - 1 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-3 min-h-11 rounded-full bg-gradient-to-r from-solar-500 to-solar-600 text-white font-semibold hover:shadow-lg hover:shadow-solar-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                  >
                    {canProceed() ? shell.next : shell.selectToContinue}
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-3 min-h-11 rounded-full bg-gradient-to-r from-leaf-600 to-leaf-500 text-white font-semibold hover:shadow-lg hover:shadow-leaf-500/30 transition-all text-sm sm:text-base">
                    {shell.getFinalQuote} <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Price sidebar (desktop sticky card + mobile sticky bottom bar, handled internally) */}
          <div>
            <LivePriceBar config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}
