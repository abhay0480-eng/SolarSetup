import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const STEP_LABELS = ['Basics', 'System', 'Panels', 'Inverter', 'Battery', 'Mounting', 'Wiring & BOS', 'Summary'];

export default function Configurator() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<SystemConfig>(() => {
    const type = searchParams.get('type');
    if (type === 'on-grid' || type === 'off-grid' || type === 'hybrid') {
      const bos = defaultBosSelections(type);
      return { ...defaultConfig, systemType: type, bos };
    }
    return defaultConfig;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-white mb-1">Custom Solar Setup Designer</h1>
          <p className="text-gray-400 text-sm">
            Step {step + 1} of {STEP_LABELS.length}:{' '}
            <span className="text-orange-400">{STEP_LABELS[step]}</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepHeader currentStep={step} />

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 mt-8">
          {/* Main content */}
          <div className="min-w-0">
            <div className="glass rounded-3xl p-5 sm:p-8">
              {renderStep()}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                <button
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
                >
                  <ChevronLeft size={18} /> Back
                </button>

                <span className="text-gray-500 text-sm">{step + 1} / {STEP_LABELS.length}</span>

                {step < STEP_LABELS.length - 1 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-400 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20"
                  >
                    {canProceed() ? 'Next' : 'Select to continue'}
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-400 hover:to-emerald-400 transition-all shadow-lg shadow-green-500/20">
                    Get Final Quote <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <LivePriceBar config={config} />
          </div>
        </div>

        {/* Mobile sidebar */}
        <div className="lg:hidden mt-6">
          <LivePriceBar config={config} />
        </div>
      </div>
    </div>
  );
}
