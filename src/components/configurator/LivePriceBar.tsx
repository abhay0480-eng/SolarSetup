import { useState } from 'react';
import { solarPanels } from '../../data/panels';
import { inverters } from '../../data/inverters';
import { batteries } from '../../data/batteries';
import { mountingStructures } from '../../data/mounting';
import { stateSubsidies } from '../../data/subsidies';
import type { SystemConfig } from '../../types/solar';
import { calculatePrice, formatINR } from '../../utils/priceCalculator';
import { TrendingUp, IndianRupee, Zap, ChevronUp, ChevronDown } from 'lucide-react';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  config: SystemConfig;
}

export default function LivePriceBar({ config }: Props) {
  const t = useContent(configuratorEn, configuratorHi).livePriceBar;
  const [expanded, setExpanded] = useState(false);
  const panel = solarPanels.find(p => p.id === config.panelId) ?? null;
  const inverter = inverters.find(i => i.id === config.inverterId) ?? null;
  const battery = batteries.find(b => b.id === config.batteryId) ?? null;
  const mounting = mountingStructures.find(m => m.id === config.mountingId) ?? null;
  const subsidy = stateSubsidies.find(s => s.code === config.state) ?? null;

  const breakdown = calculatePrice(config, panel, inverter, battery, mounting, subsidy);
  const totalSubsidy = breakdown.centralSubsidy + breakdown.stateSubsidy;
  const hasAny = panel || inverter || battery || mounting;

  const breakdownBody = (
    <>
      {/* System info */}
      <div className="bg-surface-alt rounded-xl p-3 mb-4 space-y-1">
        <Row label={t.system} value={config.systemType.replace('-', ' ')} cls="capitalize text-solar-600 dark:text-solar-400" />
        <Row label={t.capacity} value={`${config.capacityKw} kW`} />
        {config.state && <Row label={t.state} value={subsidy?.state ?? config.state} />}
      </div>

      {/* Component costs */}
      {hasAny && (
        <div className="space-y-1.5 mb-4">
          {panel && <CostRow label={t.panels} value={formatINR(breakdown.panels.total)} />}
          {inverter && <CostRow label={t.inverter} value={formatINR(breakdown.inverter.total)} />}
          {battery && config.systemType !== 'on-grid' && (
            <CostRow label={`${t.battery} ×${config.batteryCount}`} value={formatINR(breakdown.batteries.total)} />
          )}
          {mounting && <CostRow label={t.mounting} value={formatINR(breakdown.mounting.total)} />}
          {breakdown.bos.total > 0 && <CostRow label={t.wiringBos} value={formatINR(breakdown.bos.total)} />}
          <CostRow label={t.installation} value={formatINR(breakdown.installation)} muted />
          <div className="border-t border-border pt-1.5">
            <CostRow label={t.beforeSubsidy} value={formatINR(breakdown.grossTotal)} />
          </div>
        </div>
      )}

      {/* Subsidy */}
      {totalSubsidy > 0 && (
        <div className="bg-accent-2-soft border border-leaf-500/20 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IndianRupee size={12} className="text-leaf-600 dark:text-leaf-400" />
            <span className="text-leaf-700 dark:text-leaf-300 text-xs font-semibold uppercase tracking-wide">{t.subsidies}</span>
          </div>
          {breakdown.centralSubsidy > 0 && (
            <CostRow label={t.central} value={`–${formatINR(breakdown.centralSubsidy)}`} green />
          )}
          {breakdown.stateSubsidy > 0 && (
            <CostRow label={t.state} value={`–${formatINR(breakdown.stateSubsidy)}`} green />
          )}
        </div>
      )}

      {config.monthlyBill > 0 && breakdown.netTotal > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <TrendingUp size={12} className="text-leaf-600 dark:text-leaf-400" />
            {t.monthlySavings} <span className="text-leaf-600 dark:text-leaf-400 font-semibold">{formatINR(Math.round(config.monthlyBill * 0.85))}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Zap size={12} className="text-solar-600 dark:text-solar-400" />
            {t.estPayback} <span className="text-solar-600 dark:text-solar-400 font-semibold">
              {Math.round(breakdown.netTotal / (config.monthlyBill * 0.85 * 12))} {t.years}
            </span>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop — persistent sidebar */}
      <div className="hidden lg:block bento p-4 sticky top-24">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-leaf-500 rounded-full animate-pulse" />
          <span className="text-foreground font-semibold text-sm">{t.title}</span>
        </div>

        {breakdownBody}

        <div className="bg-gradient-to-br from-solar-50 to-solar-100/60 dark:from-solar-500/15 dark:to-solar-500/5 border border-solar-200 dark:border-solar-500/25 rounded-2xl p-4 text-center mb-1">
          <p className="text-foreground-muted text-xs mb-1">{t.estimatedNetCost}</p>
          <p className="text-3xl font-black text-gradient">
            {hasAny ? formatINR(breakdown.netTotal) : '—'}
          </p>
          {totalSubsidy > 0 && (
            <p className="text-leaf-600 dark:text-leaf-400 text-xs mt-1">{t.afterSubsidy.replace('{amount}', formatINR(totalSubsidy))}</p>
          )}
        </div>

        {!hasAny && (
          <p className="text-foreground-subtle text-xs text-center mt-3">{t.selectToSeePricing}</p>
        )}
      </div>

      {/* Mobile — compact sticky bar, tap to expand the breakdown (keeps the step flow scroll-free) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        {expanded && (
          <div className="max-h-[60svh] overflow-y-auto px-4 pt-4 border-b border-border">
            {breakdownBody}
          </div>
        )}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3"
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-2 text-left">
            <span className="w-2 h-2 bg-leaf-500 rounded-full animate-pulse shrink-0" />
            <span className="text-foreground-muted text-xs">{hasAny ? t.estimatedNetCost : t.title}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-lg font-black text-gradient">{hasAny ? formatINR(breakdown.netTotal) : '—'}</span>
            {expanded ? <ChevronDown size={18} className="text-foreground-subtle" /> : <ChevronUp size={18} className="text-foreground-subtle" />}
          </span>
        </button>
      </div>
    </>
  );
}

function Row({ label, value, cls = 'text-foreground' }: { label: string; value: string; cls?: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-foreground-muted">{label}</span>
      <span className={`font-medium ${cls}`}>{value}</span>
    </div>
  );
}

function CostRow({ label, value, muted, green }: { label: string; value: string; muted?: boolean; green?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={muted ? 'text-foreground-subtle' : 'text-foreground-muted'}>{label}</span>
      <span className={green ? 'text-leaf-600 dark:text-leaf-400 font-semibold' : muted ? 'text-foreground-subtle' : 'text-foreground font-semibold'}>{value}</span>
    </div>
  );
}
