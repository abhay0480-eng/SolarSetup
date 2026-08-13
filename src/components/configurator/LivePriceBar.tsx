import { solarPanels } from '../../data/panels';
import { inverters } from '../../data/inverters';
import { batteries } from '../../data/batteries';
import { mountingStructures } from '../../data/mounting';
import { stateSubsidies } from '../../data/subsidies';
import type { SystemConfig } from '../../types/solar';
import { calculatePrice, formatINR } from '../../utils/priceCalculator';
import { TrendingUp, IndianRupee, Zap } from 'lucide-react';

interface Props {
  config: SystemConfig;
}

export default function LivePriceBar({ config }: Props) {
  const panel = solarPanels.find(p => p.id === config.panelId) ?? null;
  const inverter = inverters.find(i => i.id === config.inverterId) ?? null;
  const battery = batteries.find(b => b.id === config.batteryId) ?? null;
  const mounting = mountingStructures.find(m => m.id === config.mountingId) ?? null;
  const subsidy = stateSubsidies.find(s => s.code === config.state) ?? null;

  const breakdown = calculatePrice(config, panel, inverter, battery, mounting, subsidy);
  const totalSubsidy = breakdown.centralSubsidy + breakdown.stateSubsidy;
  const hasAny = panel || inverter || battery || mounting;

  return (
    <div className="glass rounded-2xl p-4 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-white font-semibold text-sm">Live Price Estimate</span>
      </div>

      {/* System info */}
      <div className="bg-white/5 rounded-xl p-3 mb-4 space-y-1">
        <Row label="System" value={config.systemType.replace('-', ' ')} cls="capitalize text-orange-400" />
        <Row label="Capacity" value={`${config.capacityKw} kW`} />
        {config.state && <Row label="State" value={subsidy?.state ?? config.state} />}
      </div>

      {/* Component costs */}
      {hasAny && (
        <div className="space-y-1.5 mb-4">
          {panel && <CostRow label="Panels" value={formatINR(breakdown.panels.total)} />}
          {inverter && <CostRow label="Inverter" value={formatINR(breakdown.inverter.total)} />}
          {battery && config.systemType !== 'on-grid' && (
            <CostRow label={`Battery ×${config.batteryCount}`} value={formatINR(breakdown.batteries.total)} />
          )}
          {mounting && <CostRow label="Mounting" value={formatINR(breakdown.mounting.total)} />}
          {breakdown.bos.total > 0 && <CostRow label="Wiring & BOS" value={formatINR(breakdown.bos.total)} />}
          <CostRow label="Installation" value={formatINR(breakdown.installation)} muted />
          <div className="border-t border-white/10 pt-1.5">
            <CostRow label="Before Subsidy" value={formatINR(breakdown.grossTotal)} />
          </div>
        </div>
      )}

      {/* Subsidy */}
      {totalSubsidy > 0 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IndianRupee size={12} className="text-green-400" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">Subsidies</span>
          </div>
          {breakdown.centralSubsidy > 0 && (
            <CostRow label="Central" value={`–${formatINR(breakdown.centralSubsidy)}`} green />
          )}
          {breakdown.stateSubsidy > 0 && (
            <CostRow label="State" value={`–${formatINR(breakdown.stateSubsidy)}`} green />
          )}
        </div>
      )}

      {/* Net price */}
      <div className="bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/25 rounded-xl p-4 text-center mb-4">
        <p className="text-gray-400 text-xs mb-1">Estimated Net Cost</p>
        <p className="text-3xl font-black text-white">
          {hasAny ? formatINR(breakdown.netTotal) : '—'}
        </p>
        {totalSubsidy > 0 && (
          <p className="text-green-400 text-xs mt-1">After {formatINR(totalSubsidy)} subsidy</p>
        )}
      </div>

      {config.monthlyBill > 0 && breakdown.netTotal > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <TrendingUp size={12} className="text-green-400" />
            Monthly savings: <span className="text-green-400 font-semibold">{formatINR(Math.round(config.monthlyBill * 0.85))}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Zap size={12} className="text-orange-400" />
            Est. payback: <span className="text-orange-400 font-semibold">
              {Math.round(breakdown.netTotal / (config.monthlyBill * 0.85 * 12))} yrs
            </span>
          </div>
        </div>
      )}

      {!hasAny && (
        <p className="text-gray-500 text-xs text-center">Select components to see live pricing</p>
      )}
    </div>
  );
}

function Row({ label, value, cls = 'text-white' }: { label: string; value: string; cls?: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-400">{label}</span>
      <span className={`font-medium ${cls}`}>{value}</span>
    </div>
  );
}

function CostRow({ label, value, muted, green }: { label: string; value: string; muted?: boolean; green?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={muted ? 'text-gray-500' : 'text-gray-400'}>{label}</span>
      <span className={green ? 'text-green-400 font-semibold' : muted ? 'text-gray-500' : 'text-white font-semibold'}>{value}</span>
    </div>
  );
}
