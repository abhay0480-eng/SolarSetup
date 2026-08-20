import { MapPin, Zap, Maximize2, TrendingUp } from 'lucide-react';
import { stateSubsidies } from '../../data/subsidies';
import type { SystemConfig } from '../../types/solar';
import { estimateCapacityFromBill } from '../../utils/priceCalculator';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

export default function Step1Basics({ config, onChange }: Props) {
  const t = useContent(configuratorEn, configuratorHi).step1;

  const handleBillChange = (bill: number) => {
    const estimated = estimateCapacityFromBill(bill);
    onChange({ monthlyBill: bill, capacityKw: estimated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">{t.subheading}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* State Selection */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground-muted mb-2">
            <MapPin size={15} className="text-solar-600 dark:text-solar-400" />
            {t.stateLabel}
          </label>
          <select
            value={config.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className="w-full bg-surface-alt border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:border-solar-500/50 focus:bg-surface-sunken transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-surface text-foreground">{t.statePlaceholder}</option>
            {stateSubsidies.map((s) => (
              <option key={s.code} value={s.code} className="bg-surface text-foreground">
                {s.state}
              </option>
            ))}
          </select>
          {config.state && (() => {
            const sub = stateSubsidies.find(s => s.code === config.state);
            return sub ? (
              <div className="mt-2 flex items-center gap-2 text-xs text-leaf-600 dark:text-leaf-400 bg-leaf-500/10 border border-leaf-500/20 rounded-lg px-3 py-2">
                <span className="font-medium">{t.discomLabel}</span> {sub.discom} •
                {sub.netMeteringAvailable ? ` ${t.netMeteringYes}` : ` ${t.netMeteringNo}`}
              </div>
            ) : null;
          })()}
        </div>

        {/* Monthly Bill */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground-muted mb-2">
            <Zap size={15} className="text-solar-600 dark:text-solar-400" />
            {t.billLabel}
          </label>
          <input
            type="number"
            value={config.monthlyBill || ''}
            onChange={(e) => handleBillChange(Number(e.target.value))}
            placeholder={t.billPlaceholder}
            className="w-full bg-surface-alt border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:border-solar-500/50 transition-all placeholder:text-foreground-subtle"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {[1500, 2500, 4000, 6000, 10000].map((b) => (
              <button
                key={b}
                onClick={() => handleBillChange(b)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  config.monthlyBill === b
                    ? 'bg-solar-500/20 border-solar-500/40 text-solar-700 dark:text-solar-300'
                    : 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken'
                }`}
              >
                ₹{b.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* System Capacity */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground-muted mb-2">
            <TrendingUp size={15} className="text-solar-600 dark:text-solar-400" />
            {t.capacityLabel}
          </label>
          <input
            type="number"
            value={config.capacityKw}
            onChange={(e) => onChange({ capacityKw: Math.max(0.5, Math.min(10, Number(e.target.value))) })}
            step={0.5}
            min={0.5}
            max={10}
            className="w-full bg-surface-alt border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:border-solar-500/50 transition-all"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {[1, 2, 3, 5, 7, 10].map((kw) => (
              <button
                key={kw}
                onClick={() => onChange({ capacityKw: kw })}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  config.capacityKw === kw
                    ? 'bg-solar-500/20 border-solar-500/40 text-solar-700 dark:text-solar-300'
                    : 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken'
                }`}
              >
                {kw} kW
              </button>
            ))}
          </div>
        </div>

        {/* Roof Area */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground-muted mb-2">
            <Maximize2 size={15} className="text-solar-600 dark:text-solar-400" />
            {t.roofAreaLabel}
          </label>
          <input
            type="number"
            value={config.roofArea || ''}
            onChange={(e) => onChange({ roofArea: Number(e.target.value) })}
            placeholder={t.roofAreaPlaceholder}
            className="w-full bg-surface-alt border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:border-solar-500/50 transition-all placeholder:text-foreground-subtle"
          />
          <p className="mt-2 text-foreground-subtle text-xs">{t.roofAreaHint}</p>
        </div>
      </div>

      {/* Quick Insight */}
      {config.monthlyBill > 0 && (
        <div className="bg-gradient-to-r from-solar-500/10 to-solar-400/5 border border-solar-500/20 rounded-2xl p-5">
          <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-solar-600 dark:text-solar-400" />
            {t.quickEstimateTitle}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-foreground-muted text-xs mb-1">{t.monthlyUnits}</p>
              <p className="text-foreground font-bold">{Math.round(config.monthlyBill / 8)} kWh</p>
            </div>
            <div>
              <p className="text-foreground-muted text-xs mb-1">{t.suggestedSize}</p>
              <p className="text-solar-600 dark:text-solar-400 font-bold">{config.capacityKw} kW</p>
            </div>
            <div>
              <p className="text-foreground-muted text-xs mb-1">{t.roofNeeded}</p>
              <p className="text-foreground font-bold">~{config.capacityKw * 100} sq ft</p>
            </div>
            <div>
              <p className="text-foreground-muted text-xs mb-1">{t.annualSavings}</p>
              <p className="text-leaf-600 dark:text-leaf-400 font-bold">₹{(config.monthlyBill * 12 * 0.85).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
