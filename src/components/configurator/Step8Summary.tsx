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
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  config: SystemConfig;
}

export default function Step8Summary({ config }: Props) {
  const t = useContent(configuratorEn, configuratorHi).step8;
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
  if (!panel) missingItems.push(t.missing.panel);
  if (!inverter) missingItems.push(t.missing.inverter);
  if (config.systemType !== 'on-grid' && !battery) missingItems.push(t.missing.battery);
  if (!mounting) missingItems.push(t.missing.mounting);
  if (!config.state) missingItems.push(t.missing.state);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">{t.subheading}</p>
      </div>

      {missingItems.length > 0 && (
        <div className="bg-solar-400/10 border border-solar-400/20 rounded-xl p-4 flex gap-3">
          <AlertCircle size={18} className="text-solar-600 dark:text-solar-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-solar-700 dark:text-solar-300 font-medium text-sm">{t.incompleteTitle}</p>
            <p className="text-foreground-muted text-xs mt-1">{t.incompleteHint} {missingItems.join(', ')}</p>
          </div>
        </div>
      )}

      {/* Bento summary grid — price shown first on mobile (order-1) so the answer
          the user actually wants isn't buried below a long scroll; desktop keeps
          the visual hierarchy (system overview leads, price is the tall sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* System overview */}
      <div className="bento p-4 sm:p-5 order-2 lg:order-1 lg:col-span-2 lg:row-span-2">
        <h3 className="text-foreground font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-leaf-600 dark:text-leaf-400" />
          {t.systemConfigTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: t.systemType, value: config.systemType.replace('-', ' '), cls: 'capitalize' },
            { label: t.capacity, value: `${config.capacityKw} kW`, cls: 'text-solar-600 dark:text-solar-400' },
            { label: t.state, value: subsidy?.state ?? config.state, cls: '' },
            { label: t.netMetering, value: subsidy?.netMeteringAvailable ? t.available : t.notApplicable, cls: subsidy?.netMeteringAvailable ? 'text-leaf-600 dark:text-leaf-400' : 'text-red-500 dark:text-red-400' },
          ].map(({ label, value, cls }) => (
            <div key={label} className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-foreground-muted text-xs mb-1">{label}</p>
              <p className={`font-bold text-sm ${cls || 'text-foreground'}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Component rows */}
        <div className="space-y-0 divide-y divide-border">
          {panel && <CR label={t.solarPanels} value={`${panel.brand} ${panel.model}`} detail={`${panelCount} × ${panel.wattage}W · ${panel.type}`} cost={formatINR(breakdown.panels.total)} />}
          {inverter && <CR label={t.inverter} value={`${inverter.brand} ${inverter.model}`} detail={`${inverter.capacity}kW ${inverter.type}`} cost={formatINR(breakdown.inverter.total)} />}
          {battery && config.systemType !== 'on-grid' && (
            <CR label={t.battery} value={`${battery.brand} ${battery.model}`} detail={`${config.batteryCount} × ${battery.capacity}Ah · ${battery.type}`} cost={formatINR(breakdown.batteries.total)} />
          )}
          {mounting && <CR label={t.mountingStructure} value={mounting.type} detail={mounting.roofType} cost={formatINR(breakdown.mounting.total)} />}

          {/* BOS summary row with expand */}
          <div className="py-2.5">
            <button
              onClick={() => setBosExpanded(v => !v)}
              className="w-full flex items-start justify-between gap-4 text-left"
            >
              <div className="flex-1">
                <p className="text-foreground-muted text-xs mb-0.5">{t.wiringBos}</p>
                <p className="text-foreground text-sm font-medium">{t.wiringBosDetail}</p>
                <p className="text-foreground-subtle text-xs">{t.clickToSeeBreakdown.replace('{count}', String(breakdown.bos.breakdown.length))}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <p className="text-foreground font-semibold text-sm">{formatINR(breakdown.bos.total)}</p>
                {bosExpanded ? <ChevronUp size={14} className="text-foreground-muted" /> : <ChevronDown size={14} className="text-foreground-muted" />}
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
                    <div key={cat} className="flex justify-between text-xs px-3 py-1.5 bg-surface-alt rounded-lg">
                      <span className="text-foreground-muted">{bosCategoryConfig[cat].shortLabel} — {comp.brand} {comp.model.slice(0, 35)}{comp.model.length > 35 ? '…' : ''}</span>
                      <span className="text-foreground font-medium shrink-0 ml-3">
                        {item ? formatINR(item.cost) : '—'}
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-between text-xs px-3 py-1.5 font-semibold border-t border-border mt-1">
                  <span className="text-foreground-muted">{t.bosSubtotal}</span>
                  <span className="text-foreground">{formatINR(breakdown.bos.total)}</span>
                </div>
              </div>
            )}
          </div>

          <CR label={t.installationLabel} value={t.installationValue} detail={t.installationDetail} cost={formatINR(breakdown.installation)} />
        </div>
      </div>

      {/* Price Breakdown — first on mobile, tall sidebar on desktop */}
      <div className="bento p-4 sm:p-5 order-1 lg:order-2 lg:col-span-1 lg:row-span-2 flex flex-col">
        <h3 className="text-foreground font-bold mb-4 flex items-center gap-2">
          <IndianRupee size={18} className="text-solar-600 dark:text-solar-400" />
          {t.priceBreakdownTitle}
        </h3>
        <div className="space-y-1.5">
          <PL label={t.panels} amount={formatINR(breakdown.panels.total)} />
          <PL label={t.inverter} amount={formatINR(breakdown.inverter.total)} />
          {breakdown.batteries.total > 0 && <PL label={`${t.battery} ×${config.batteryCount}`} amount={formatINR(breakdown.batteries.total)} />}
          <PL label={t.mounting} amount={formatINR(breakdown.mounting.total)} />
          <PL label={t.wiringBos} amount={formatINR(breakdown.bos.total)} />
          <PL label={t.installation} amount={formatINR(breakdown.installation)} muted />
          <div className="border-t border-border my-2" />
          <PL label={t.grossTotal} amount={formatINR(breakdown.grossTotal)} bold />
          <PL label={t.centralSubsidy} amount={`– ${formatINR(breakdown.centralSubsidy)}`} green />
          {breakdown.stateSubsidy > 0 && (
            <PL label={`${subsidy?.state ?? t.stateSubsidyFallback} ${t.stateSubsidySuffix}`} amount={`– ${formatINR(breakdown.stateSubsidy)}`} green />
          )}
          <div className="border-t border-solar-500/30 my-2" />
          <div className="flex items-center justify-between bg-gradient-to-r from-solar-500/10 to-solar-400/5 rounded-xl px-4 py-3">
            <span className="text-foreground font-bold text-lg">{t.netPayable}</span>
            <span className="text-solar-600 dark:text-solar-400 font-black text-2xl">{formatINR(breakdown.netTotal)}</span>
          </div>
          {totalSubsidy > 0 && (
            <p className="text-center text-leaf-600 dark:text-leaf-400 text-sm font-medium pt-1">
              {t.youSave.replace('{amount}', formatINR(totalSubsidy))}
            </p>
          )}
        </div>
      </div>

      {/* ROI */}
      <div className="bento p-4 sm:p-5 order-3 lg:col-span-2">
        <h3 className="text-foreground font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-leaf-600 dark:text-leaf-400" />
          {t.returnsTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: t.monthlySavings, value: formatINR(Math.round(config.monthlyBill * 0.85)), cls: 'text-leaf-600 dark:text-leaf-400', bg: 'bg-leaf-500/10 border-leaf-500/20' },
            { label: t.annualSavings, value: formatINR(Math.round(config.monthlyBill * 0.85 * 12)), cls: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
            { label: t.paybackPeriod, value: roi > 0 ? `${roi} yrs` : t.notApplicable, cls: 'text-solar-600 dark:text-solar-400', bg: 'bg-solar-500/10 border-solar-500/20' },
            { label: t.netSavings25yr, value: formatINR(Math.max(0, Math.round(config.monthlyBill * 0.85 * 12 * 25 - breakdown.netTotal))), cls: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
          ].map(({ label, value, cls, bg }) => (
            <div key={label} className={`border rounded-xl p-4 text-center ${bg}`}>
              <p className="text-foreground-muted text-xs mb-1">{label}</p>
              <p className={`font-bold text-xl ${cls}`}>{value}</p>
            </div>
          ))}
        </div>

        {subsidy && (
          <div className="mt-4 bg-surface-alt rounded-xl p-4 text-xs text-foreground-muted space-y-1">
            <p className="text-foreground font-medium text-sm mb-2">{t.stateInfoTitle} {subsidy.state}</p>
            <p>• {t.discom} {subsidy.discom}</p>
            <p>• {t.netMetering}: {subsidy.netMeteringAvailable ? t.netMeteringAvailableText : t.netMeteringNotAvailable}</p>
            {subsidy.additionalInfo && <p>• {subsidy.additionalInfo}</p>}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="bento p-4 sm:p-5 order-4 lg:col-span-3">
        <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
          <Calendar size={18} className="text-sky-600 dark:text-sky-400" />
          {t.timelineTitle}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
          {t.timeline.map(item => (
            <div key={item.day} className="flex gap-4">
              <span className="text-solar-600 dark:text-solar-400 font-medium shrink-0 w-20 text-xs">{item.day}</span>
              <span className="text-foreground-muted text-sm">{item.task}</span>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-solar-500 to-solar-400 text-white font-bold px-6 py-4 rounded-2xl hover:from-solar-400 hover:to-solar-300 transition-all shadow-xl shadow-solar-500/25">
          {t.getFinalQuote}
        </button>
        <button className="flex items-center gap-2 bg-surface-alt hover:bg-surface-sunken text-foreground font-semibold px-5 py-4 rounded-2xl transition-all">
          <Download size={18} /> {t.pdf}
        </button>
        <button className="flex items-center gap-2 bg-surface-alt hover:bg-surface-sunken text-foreground font-semibold px-5 py-4 rounded-2xl transition-all">
          <Share2 size={18} /> {t.share}
        </button>
      </div>

      <p className="text-foreground-subtle text-xs text-center">
        {t.footnote}
      </p>
    </div>
  );
}

function CR({ label, value, detail, cost }: { label: string; value: string; detail: string; cost: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="flex-1 min-w-0">
        <p className="text-foreground-muted text-xs mb-0.5">{label}</p>
        <p className="text-foreground text-sm font-medium">{value}</p>
        <p className="text-foreground-subtle text-xs">{detail}</p>
      </div>
      <p className="text-foreground font-semibold text-sm shrink-0">{cost}</p>
    </div>
  );
}

function PL({ label, amount, bold, green, muted }: { label: string; amount: string; bold?: boolean; green?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${bold ? 'text-foreground font-semibold' : muted ? 'text-foreground-subtle' : 'text-foreground-muted'}`}>{label}</span>
      <span className={`text-sm font-semibold ${green ? 'text-leaf-600 dark:text-leaf-400' : bold ? 'text-foreground' : muted ? 'text-foreground-subtle' : 'text-foreground-muted'}`}>{amount}</span>
    </div>
  );
}
