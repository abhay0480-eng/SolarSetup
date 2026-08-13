import { useState } from 'react';
import { Download, Share2, CheckCircle2, AlertCircle, TrendingUp, IndianRupee, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { solarPanels } from '../../data/panels';
import { inverters } from '../../data/inverters';
import { batteries } from '../../data/batteries';
import { mountingStructures } from '../../data/mounting';
import { stateSubsidies } from '../../data/subsidies';
import { bosComponents, bosCategoryConfig } from '../../data/bos';
import type { SystemConfig } from '../../types/solar';
import { calculatePrice, calculatePanelCount, formatINR, roiYears } from '../../utils/priceCalculator';

interface Props {
  config: SystemConfig;
}

export default function Step8Summary({ config }: Props) {
  const [bosExpanded, setBosExpanded] = useState(false);

  const panel = solarPanels.find(p => p.id === config.panelId) ?? null;
  const inverter = inverters.find(i => i.id === config.inverterId) ?? null;
  const battery = batteries.find(b => b.id === config.batteryId) ?? null;
  const mounting = mountingStructures.find(m => m.id === config.mountingId) ?? null;
  const subsidy = stateSubsidies.find(s => s.code === config.state) ?? null;

  const breakdown = calculatePrice(config, panel, inverter, battery, mounting, subsidy);
  const panelCount = panel ? calculatePanelCount(config.capacityKw, panel) : 0;
  const roi = roiYears(breakdown.netTotal, config.monthlyBill);
  const totalSubsidy = breakdown.centralSubsidy + breakdown.stateSubsidy;

  // BOS selected components list
  const bosEntries = [
    { cat: 'dc-cable', id: config.bos.dcCableId },
    { cat: 'ac-cable', id: config.bos.acCableId },
    { cat: 'dcdb', id: config.bos.dcdbId },
    { cat: 'acdb', id: config.bos.acdbId },
    { cat: 'spd', id: config.bos.spdId },
    { cat: 'earthing', id: config.bos.earthingId },
    { cat: 'mc4', id: config.bos.mc4Id },
    { cat: 'net-meter-kit', id: config.bos.netMeterKitId },
  ] as const;

  const missingItems: string[] = [];
  if (!panel) missingItems.push('Solar Panel');
  if (!inverter) missingItems.push('Inverter');
  if (config.systemType !== 'on-grid' && !battery) missingItems.push('Battery');
  if (!mounting) missingItems.push('Mounting Structure');
  if (!config.state) missingItems.push('State (for subsidy)');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Solar System Summary</h2>
        <p className="text-gray-400">Complete custom solar setup with full BOS, pricing and subsidy breakdown.</p>
      </div>

      {missingItems.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
          <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-medium text-sm">Incomplete Configuration</p>
            <p className="text-gray-400 text-xs mt-1">Please go back and select: {missingItems.join(', ')}</p>
          </div>
        </div>
      )}

      {/* System overview */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-400" />
          System Configuration
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'System Type', value: config.systemType.replace('-', ' '), cls: 'capitalize' },
            { label: 'Capacity', value: `${config.capacityKw} kW`, cls: 'text-orange-400' },
            { label: 'State', value: subsidy?.state ?? config.state, cls: '' },
            { label: 'Net Metering', value: subsidy?.netMeteringAvailable ? 'Available' : 'N/A', cls: subsidy?.netMeteringAvailable ? 'text-green-400' : 'text-red-400' },
          ].map(({ label, value, cls }) => (
            <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className={`font-bold text-sm ${cls || 'text-white'}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Component rows */}
        <div className="space-y-0 divide-y divide-white/5">
          {panel && <CR label="Solar Panels" value={`${panel.brand} ${panel.model}`} detail={`${panelCount} × ${panel.wattage}W · ${panel.type}`} cost={formatINR(breakdown.panels.total)} />}
          {inverter && <CR label="Inverter" value={`${inverter.brand} ${inverter.model}`} detail={`${inverter.capacity}kW ${inverter.type}`} cost={formatINR(breakdown.inverter.total)} />}
          {battery && config.systemType !== 'on-grid' && (
            <CR label="Battery" value={`${battery.brand} ${battery.model}`} detail={`${config.batteryCount} × ${battery.capacity}Ah · ${battery.type}`} cost={formatINR(breakdown.batteries.total)} />
          )}
          {mounting && <CR label="Mounting Structure" value={mounting.type} detail={mounting.roofType} cost={formatINR(breakdown.mounting.total)} />}

          {/* BOS summary row with expand */}
          <div className="py-2.5">
            <button
              onClick={() => setBosExpanded(v => !v)}
              className="w-full flex items-start justify-between gap-4 text-left"
            >
              <div className="flex-1">
                <p className="text-gray-400 text-xs mb-0.5">Wiring & BOS</p>
                <p className="text-white text-sm font-medium">DC/AC Cables, DCDB, ACDB, SPD, Earthing, MC4, Net Meter</p>
                <p className="text-gray-500 text-xs">Click to see breakdown ({breakdown.bos.breakdown.length} components)</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <p className="text-white font-semibold text-sm">{formatINR(breakdown.bos.total)}</p>
                {bosExpanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </div>
            </button>

            {bosExpanded && (
              <div className="mt-3 space-y-1">
                {bosEntries.map(({ cat, id }) => {
                  if (!id) return null;
                  const comp = bosComponents.find(b => b.id === id);
                  if (!comp) return null;
                  const item = breakdown.bos.breakdown.find(i => i.label.toLowerCase().startsWith(bosCategoryConfig[cat].shortLabel.toLowerCase()));
                  return (
                    <div key={cat} className="flex justify-between text-xs px-3 py-1.5 bg-white/3 rounded-lg">
                      <span className="text-gray-400">{bosCategoryConfig[cat].shortLabel} — {comp.brand} {comp.model.slice(0, 35)}{comp.model.length > 35 ? '…' : ''}</span>
                      <span className="text-white font-medium shrink-0 ml-3">
                        {item ? formatINR(item.cost) : '—'}
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-between text-xs px-3 py-1.5 font-semibold border-t border-white/10 mt-1">
                  <span className="text-gray-300">BOS Subtotal</span>
                  <span className="text-white">{formatINR(breakdown.bos.total)}</span>
                </div>
              </div>
            )}
          </div>

          <CR label="Installation (7%)" value="MNRE-certified technicians" detail="Includes DISCOM net metering registration" cost={formatINR(breakdown.installation)} />
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <IndianRupee size={18} className="text-orange-400" />
          Price Breakdown
        </h3>
        <div className="space-y-1.5">
          <PL label="Panels" amount={formatINR(breakdown.panels.total)} />
          <PL label="Inverter" amount={formatINR(breakdown.inverter.total)} />
          {breakdown.batteries.total > 0 && <PL label={`Battery ×${config.batteryCount}`} amount={formatINR(breakdown.batteries.total)} />}
          <PL label="Mounting Structure" amount={formatINR(breakdown.mounting.total)} />
          <PL label="Wiring & BOS" amount={formatINR(breakdown.bos.total)} />
          <PL label="Installation (7%)" amount={formatINR(breakdown.installation)} muted />
          <div className="border-t border-white/10 my-2" />
          <PL label="Gross Total (Before Subsidy)" amount={formatINR(breakdown.grossTotal)} bold />
          <PL label="Central Subsidy (PM Surya Ghar)" amount={`– ${formatINR(breakdown.centralSubsidy)}`} green />
          {breakdown.stateSubsidy > 0 && (
            <PL label={`${subsidy?.state ?? 'State'} Subsidy`} amount={`– ${formatINR(breakdown.stateSubsidy)}`} green />
          )}
          <div className="border-t border-orange-500/30 my-2" />
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-amber-500/5 rounded-xl px-4 py-3">
            <span className="text-white font-bold text-lg">Net Payable</span>
            <span className="text-orange-400 font-black text-2xl">{formatINR(breakdown.netTotal)}</span>
          </div>
          {totalSubsidy > 0 && (
            <p className="text-center text-green-400 text-sm font-medium pt-1">
              You save {formatINR(totalSubsidy)} in government subsidies!
            </p>
          )}
        </div>
      </div>

      {/* ROI */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-green-400" />
          Returns & Savings
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Monthly Savings', value: formatINR(Math.round(config.monthlyBill * 0.85)), cls: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
            { label: 'Annual Savings', value: formatINR(Math.round(config.monthlyBill * 0.85 * 12)), cls: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Payback Period', value: roi > 0 ? `${roi} yrs` : 'N/A', cls: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
            { label: '25-yr Net Savings', value: formatINR(Math.max(0, Math.round(config.monthlyBill * 0.85 * 12 * 25 - breakdown.netTotal))), cls: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
          ].map(({ label, value, cls, bg }) => (
            <div key={label} className={`border rounded-xl p-4 text-center ${bg}`}>
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className={`font-bold text-xl ${cls}`}>{value}</p>
            </div>
          ))}
        </div>

        {subsidy && (
          <div className="mt-4 bg-white/5 rounded-xl p-4 text-xs text-gray-400 space-y-1">
            <p className="text-white font-medium text-sm mb-2">State Info — {subsidy.state}</p>
            <p>• DISCOM: {subsidy.discom}</p>
            <p>• Net Metering: {subsidy.netMeteringAvailable ? 'Available — export surplus to grid' : 'Not available'}</p>
            {subsidy.additionalInfo && <p>• {subsidy.additionalInfo}</p>}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Calendar size={18} className="text-blue-400" />
          Project Timeline
        </h3>
        <div className="space-y-2">
          {[
            { day: 'Day 1–2', task: 'Site survey, shading analysis, structural assessment' },
            { day: 'Day 3–5', task: 'Material procurement and delivery to site' },
            { day: 'Day 6–10', task: 'Installation by MNRE-certified team' },
            { day: 'Day 10–15', task: 'DISCOM inspection and net metering application' },
            { day: 'Day 20–45', task: 'Subsidy processing and bank transfer (govt. timeline)' },
          ].map(item => (
            <div key={item.day} className="flex gap-4">
              <span className="text-orange-400 font-medium shrink-0 w-20 text-xs">{item.day}</span>
              <span className="text-gray-300 text-sm">{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-6 py-4 rounded-2xl hover:from-orange-400 hover:to-amber-400 transition-all shadow-xl shadow-orange-500/25">
          Get Final Quote
        </button>
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-5 py-4 rounded-2xl transition-all">
          <Download size={18} /> PDF
        </button>
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-5 py-4 rounded-2xl transition-all">
          <Share2 size={18} /> Share
        </button>
      </div>

      <p className="text-gray-500 text-xs text-center">
        * Indicative pricing, subject to site survey. Subsidy amounts per PM Surya Ghar Muft Bijli Yojana (2024-25).
      </p>
    </div>
  );
}

function CR({ label, value, detail, cost }: { label: string; value: string; detail: string; cost: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium">{value}</p>
        <p className="text-gray-500 text-xs">{detail}</p>
      </div>
      <p className="text-white font-semibold text-sm shrink-0">{cost}</p>
    </div>
  );
}

function PL({ label, amount, bold, green, muted }: { label: string; amount: string; bold?: boolean; green?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${bold ? 'text-white font-semibold' : muted ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
      <span className={`text-sm font-semibold ${green ? 'text-green-400' : bold ? 'text-white' : muted ? 'text-gray-500' : 'text-gray-300'}`}>{amount}</span>
    </div>
  );
}
