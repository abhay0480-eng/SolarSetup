import { useState } from 'react';
import { BatteryFull, Check, ChevronDown, ChevronUp, Info, Minus, Plus } from 'lucide-react';
import { batteries } from '../../data/batteries';
import type { SystemConfig, Tier } from '../../types/solar';
import { formatINR, estimateBatteryCount } from '../../utils/priceCalculator';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

const batteryImages = import.meta.glob('../../assets/products/batteries/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const batteryImageById: Record<string, string> = {};
for (const path in batteryImages) {
  const id = path.split('/').pop()!.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  batteryImageById[id] = batteryImages[path];
}

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

type ChemFilter = 'All' | 'Lithium' | 'Lead-Acid';

export default function Step5Battery({ config, onChange }: Props) {
  const { step5: t, tierLabels } = useContent(configuratorEn, configuratorHi);
  const [tierFilter, setTierFilter] = useState<'All' | Tier>('All');
  const [chemFilter, setChemFilter] = useState<ChemFilter>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 60/30/10 tier system: budget=sky (entry), standard=solar (recommended/primary), premium=leaf (top-tier/eco)
  const TIER_CONFIG: Record<string, { label: string; cls: string; activeCls: string }> = {
    All: {
      label: tierLabels.All,
      cls: 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken',
      activeCls: 'bg-surface-sunken border-border-strong text-foreground',
    },
    budget: {
      label: tierLabels.budget,
      cls: 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/25 text-sky-700 dark:text-sky-300 hover:text-foreground',
      activeCls: 'bg-sky-100 dark:bg-sky-500/25 border-sky-400 dark:border-sky-400/60 text-sky-800 dark:text-sky-200',
    },
    standard: {
      label: tierLabels.standard,
      cls: 'bg-solar-50 dark:bg-solar-500/10 border-solar-200 dark:border-solar-500/25 text-solar-700 dark:text-solar-300 hover:text-foreground',
      activeCls: 'bg-solar-100 dark:bg-solar-500/25 border-solar-400 dark:border-solar-400/60 text-solar-800 dark:text-solar-200',
    },
    premium: {
      label: tierLabels.premium,
      cls: 'bg-leaf-50 dark:bg-leaf-500/10 border-leaf-200 dark:border-leaf-500/25 text-leaf-700 dark:text-leaf-300 hover:text-foreground',
      activeCls: 'bg-leaf-100 dark:bg-leaf-500/25 border-leaf-400 dark:border-leaf-400/60 text-leaf-800 dark:text-leaf-200',
    },
  };

  const TIER_BADGE: Record<Tier, string> = {
    budget: 'bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-500/30',
    standard: 'bg-solar-100 dark:bg-solar-500/15 text-solar-700 dark:text-solar-300 border-solar-300 dark:border-solar-500/30',
    premium: 'bg-leaf-100 dark:bg-leaf-500/15 text-leaf-700 dark:text-leaf-300 border-leaf-300 dark:border-leaf-500/30',
  };

  const chemLabel: Record<ChemFilter, string> = { All: tierLabels.All, Lithium: t.chemLithium, 'Lead-Acid': t.chemLeadAcid };

  if (config.systemType === 'on-grid') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t.onGridHeading}</h2>
        </div>
        <div className="bento p-10 text-center">
          <BatteryFull size={48} className="text-foreground-subtle mx-auto mb-4" />
          <h3 className="text-foreground font-bold text-xl mb-2">{t.onGridTitle}</h3>
          <p className="text-foreground-muted max-w-md mx-auto leading-relaxed">
            {t.onGridDescription}
          </p>
          <div className="mt-6 bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 inline-block">
            <p className="text-sky-700 dark:text-sky-300 text-sm">{t.onGridUpgradeHint} <strong>{t.onGridUpgradeSystem}</strong> {t.onGridUpgradeSuffix}</p>
          </div>
        </div>
      </div>
    );
  }

  const compatible = batteries.filter(b => b.compatible.includes(config.systemType));
  const selectedBatt = batteries.find(b => b.id === config.batteryId);

  const filtered = compatible.filter(b => {
    if (tierFilter !== 'All' && b.tier !== tierFilter) return false;
    if (chemFilter === 'Lithium' && !b.type.includes('Lithium')) return false;
    if (chemFilter === 'Lead-Acid' && b.type.includes('Lithium')) return false;
    return true;
  });

  const handleSelect = (battId: string) => {
    const batt = batteries.find(b => b.id === battId);
    const suggestedCount = batt ? estimateBatteryCount(config.capacityKw, batt) : 2;
    onChange({ batteryId: battId, batteryCount: suggestedCount });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">
          {t.subheadingPrefix}{' '}
          <span className="text-solar-600 dark:text-solar-400 font-medium capitalize">{config.systemType.replace('-', ' ')}</span> {t.subheadingSuffix}
        </p>
      </div>

      {/* Chemistry Filter */}
      <div className="space-y-2">
        <p className="text-foreground-subtle text-xs font-medium uppercase tracking-wide">{t.chemistry}</p>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'Lithium', 'Lead-Acid'] as ChemFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setChemFilter(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                chemFilter === c
                  ? c === 'Lithium'
                    ? 'bg-leaf-500/30 border-leaf-400/50 text-foreground'
                    : c === 'Lead-Acid'
                    ? 'bg-solar-400/30 border-solar-300/50 text-foreground'
                    : 'bg-surface-sunken border-border-strong text-foreground'
                  : c === 'Lithium'
                  ? 'bg-leaf-500/10 border-leaf-500/20 text-leaf-700 dark:text-leaf-300 hover:text-foreground'
                  : c === 'Lead-Acid'
                  ? 'bg-solar-400/10 border-solar-400/20 text-solar-700 dark:text-solar-300 hover:text-foreground'
                  : 'bg-surface-alt border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken'
              }`}
            >
              {chemLabel[c]}
              <span className="ml-2 text-xs opacity-60">
                ({c === 'All'
                  ? compatible.length
                  : c === 'Lithium'
                  ? compatible.filter(b => b.type.includes('Lithium')).length
                  : compatible.filter(b => !b.type.includes('Lithium')).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tier Filter */}
      <div className="space-y-2">
        <p className="text-foreground-subtle text-xs font-medium uppercase tracking-wide">{t.budgetRange}</p>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'budget', 'standard', 'premium'] as const).map((tk) => {
            const cfg = TIER_CONFIG[tk];
            const isActive = tierFilter === tk;
            const count = tk === 'All' ? compatible.length : compatible.filter(b => b.tier === tk).length;
            return (
              <button
                key={tk}
                onClick={() => setTierFilter(tk)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${isActive ? cfg.activeCls : cfg.cls}`}
              >
                {cfg.label}
                <span className="ml-2 text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chemistry Info */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bento p-4">
          <h4 className="text-foreground font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-solar-300 rounded-full" />
            {t.tubularTitle}
          </h4>
          <ul className="text-foreground-muted text-xs space-y-1">
            {t.tubularPoints.map((p) => <li key={p}>• {p}</li>)}
          </ul>
        </div>
        <div className="bento p-4">
          <h4 className="text-foreground font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-leaf-500 rounded-full" />
            {t.lithiumTitle}
          </h4>
          <ul className="text-foreground-muted text-xs space-y-1">
            {t.lithiumPoints.map((p) => <li key={p}>• {p}</li>)}
          </ul>
        </div>
      </div>

      {selectedBatt && (
        <div className="bg-solar-500/10 border border-solar-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-solar-700 dark:text-solar-300 text-xs font-medium uppercase tracking-wide mb-1">{t.selectedBattery}</p>
              <p className="text-foreground font-bold">{selectedBatt.brand} — {selectedBatt.model}</p>
              <p className="text-foreground-muted text-sm">{selectedBatt.capacity}Ah / {selectedBatt.voltage}V • {selectedBatt.type}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onChange({ batteryCount: Math.max(1, config.batteryCount - 1) })}
                  className="w-8 h-8 bg-surface-alt hover:bg-surface-sunken rounded-lg flex items-center justify-center text-foreground transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-foreground font-bold w-8 text-center">{config.batteryCount}</span>
                <button
                  onClick={() => onChange({ batteryCount: Math.min(12, config.batteryCount + 1) })}
                  className="w-8 h-8 bg-surface-alt hover:bg-surface-sunken rounded-lg flex items-center justify-center text-foreground transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-foreground font-bold">{formatINR(selectedBatt.price * config.batteryCount)}</p>
                <p className="text-foreground-muted text-xs">{config.batteryCount} × {formatINR(selectedBatt.price)}</p>
              </div>
            </div>
          </div>
          {(() => {
            const usableKwh = (selectedBatt.capacity * selectedBatt.voltage * (selectedBatt.dod / 100) / 1000) * config.batteryCount;
            const avgLoadKw = 0.5;
            const backupHrs = Math.round(usableKwh / avgLoadKw);
            return (
              <div className="flex items-center gap-2 mt-3 text-xs text-leaf-600 dark:text-leaf-400 bg-leaf-500/10 border border-leaf-500/20 rounded-lg px-3 py-2">
                <Info size={12} />
                {usableKwh.toFixed(1)} {t.backupInfo.replace('{hrs}', String(backupHrs))}
              </div>
            );
          })()}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-8 text-foreground-subtle">{t.noMatch}</div>
      )}

      <div className="space-y-3">
        {filtered.map((batt) => {
          const isSelected = config.batteryId === batt.id;
          const isExpanded = expandedId === batt.id;
          const isLithium = batt.type.includes('Lithium');

          return (
            <div
              key={batt.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected ? 'border-2 border-accent bg-accent-soft ring-2 ring-accent/15' : 'border border-border bg-surface hover:border-border-strong hover:shadow-md'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {batteryImageById[batt.id] ? (
                    <div className={`w-16 h-16 bg-surface rounded-xl border shrink-0 overflow-hidden p-1 ${isLithium ? 'border-leaf-500/20' : 'border-solar-400/20'}`}>
                      <img src={batteryImageById[batt.id]} alt={`${batt.brand} ${batt.model}`} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center border shrink-0 ${isLithium ? 'bg-leaf-500/15 border-leaf-500/20' : 'bg-solar-400/15 border-solar-400/20'}`}>
                      <BatteryFull size={18} className={isLithium ? 'text-leaf-600 dark:text-leaf-400' : 'text-solar-600 dark:text-solar-400'} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-foreground font-bold">{batt.brand}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_BADGE[batt.tier]}`}>
                            {batt.tier.charAt(0).toUpperCase() + batt.tier.slice(1)}
                          </span>
                          {batt.highlight && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${isLithium ? 'bg-leaf-500/20 text-leaf-700 dark:text-leaf-300 border-leaf-500/30' : 'bg-solar-400/20 text-solar-700 dark:text-solar-300 border-solar-400/30'}`}>
                              {batt.highlight}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isLithium ? 'bg-leaf-500/10 text-leaf-600 dark:text-leaf-400' : 'bg-solar-400/10 text-solar-600 dark:text-solar-400'}`}>
                            {isLithium ? t.lithiumBadge : t.leadAcidBadge}
                          </span>
                        </div>
                        <p className="text-foreground-muted text-sm">{batt.model}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-foreground font-bold text-lg">{formatINR(batt.price)}</p>
                        <p className="text-foreground-muted text-xs">{t.perUnit} • {batt.warranty}{t.yrWarranty}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        { label: t.specLabels.capacity, value: `${batt.capacity}Ah` },
                        { label: t.specLabels.voltage, value: `${batt.voltage}V` },
                        { label: t.specLabels.dod, value: `${batt.dod}%` },
                        { label: t.specLabels.cycles, value: `${batt.cycleLife.toLocaleString()}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-surface-alt rounded-lg px-3 py-1.5 text-center">
                          <p className="text-foreground-muted text-xs">{label}</p>
                          <p className="text-foreground text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleSelect(batt.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-solar-500 to-solar-400 text-white shadow-lg shadow-solar-500/20'
                        : 'bg-surface-alt text-foreground-muted hover:bg-surface-sunken hover:text-foreground'
                    }`}
                  >
                    {isSelected ? <><Check size={15} /> {t.selected}</> : t.selectBattery}
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : batt.id)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-surface-alt hover:bg-surface-alt text-foreground-muted hover:text-foreground text-sm transition-all"
                  >
                    {t.fullSpecs} {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border p-4 bg-surface-alt">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <SpecRow label={t.specLabels.batteryType} value={batt.type} />
                    <SpecRow label={t.specLabels.capacity} value={`${batt.capacity} Ah`} />
                    <SpecRow label={t.specLabels.voltage} value={`${batt.voltage} V`} />
                    <SpecRow label={t.specLabels.energy} value={`${((batt.capacity * batt.voltage) / 1000).toFixed(1)} kWh`} />
                    <SpecRow label={t.specLabels.depthOfDischarge} value={`${batt.dod}%`} />
                    <SpecRow label={t.specLabels.usableEnergy} value={`${((batt.capacity * batt.voltage * batt.dod) / 100000).toFixed(1)} kWh`} />
                    <SpecRow label={t.specLabels.cycleLife} value={`${batt.cycleLife.toLocaleString()} ${t.specLabels.cyclesSuffix}`} />
                    <SpecRow label={t.specLabels.chargeTime} value={`~${batt.chargingTime} hrs`} />
                    <SpecRow label={t.specLabels.warranty} value={`${batt.warranty} ${t.specLabels.years}`} />
                    <SpecRow label={t.specLabels.weight} value={`${batt.weight} kg`} />
                    <SpecRow label={t.specLabels.dimensions} value={batt.dimensions} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-alt rounded-lg p-2.5">
      <p className="text-foreground-subtle text-xs mb-0.5">{label}</p>
      <p className="text-foreground text-sm font-medium">{value}</p>
    </div>
  );
}
