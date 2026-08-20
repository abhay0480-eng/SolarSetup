import { Check, Wrench, Shield, AlertTriangle } from 'lucide-react';
import { mountingStructures } from '../../data/mounting';
import type { SystemConfig } from '../../types/solar';
import { formatINR } from '../../utils/priceCalculator';
import configuratorEn from '../../content/en/configurator.json';
import configuratorHi from '../../content/hi/configurator.json';
import { useContent } from '../../i18n/LanguageContext';

interface Props {
  config: SystemConfig;
  onChange: (updates: Partial<SystemConfig>) => void;
}

export default function Step6Mounting({ config, onChange }: Props) {
  const t = useContent(configuratorEn, configuratorHi).step6;
  const selectedMount = mountingStructures.find(m => m.id === config.mountingId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.heading}</h2>
        <p className="text-foreground-muted">{t.subheading}</p>
      </div>

      {/* Material Guide */}
      <div className="bento p-5">
        <h4 className="text-foreground font-semibold mb-4 flex items-center gap-2">
          <Wrench size={16} className="text-solar-600 dark:text-solar-400" />
          {t.materialGuideTitle}
        </h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-surface-alt rounded-xl p-3">
            <h5 className="text-foreground font-medium mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-solar-400 rounded-full" />
              {t.preGiTitle}
            </h5>
            <p className="text-foreground-muted text-xs">{t.preGiDesc}</p>
          </div>
          <div className="bg-surface-alt rounded-xl p-3">
            <h5 className="text-foreground font-medium mb-1 flex items-center gap-2">
              <Shield size={12} className="text-sky-600 dark:text-sky-400" />
              {t.hdgTitle}
            </h5>
            <p className="text-foreground-muted text-xs">{t.hdgDesc}</p>
          </div>
          <div className="bg-surface-alt rounded-xl p-3">
            <h5 className="text-foreground font-medium mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              {t.alumTitle}
            </h5>
            <p className="text-foreground-muted text-xs">{t.alumDesc}</p>
          </div>
          <div className="bg-surface-alt rounded-xl p-3">
            <h5 className="text-foreground font-medium mb-1 flex items-center gap-2">
              <AlertTriangle size={12} className="text-yellow-600 dark:text-yellow-400" />
              {t.msTitle}
            </h5>
            <p className="text-foreground-muted text-xs">{t.msDesc}</p>
          </div>
        </div>
      </div>

      {selectedMount && (
        <div className="bg-solar-500/10 border border-solar-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-solar-700 dark:text-solar-300 text-xs font-medium uppercase tracking-wide mb-1">{t.selectedStructure}</p>
            <p className="text-foreground font-bold">{selectedMount.type}</p>
            <p className="text-foreground-muted text-sm">{selectedMount.roofType} • {t.windLabel} {selectedMount.windSpeed} {t.kmh} • {selectedMount.warranty}{t.yrWarranty}</p>
          </div>
          <p className="text-foreground font-bold text-lg shrink-0">{formatINR(selectedMount.pricePerKw * config.capacityKw)}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mountingStructures.map((mount) => {
          const isSelected = config.mountingId === mount.id;
          const isHDG = mount.type.includes('Hot Dip');
          const isAlum = mount.type.includes('Aluminum');
          const isMS = mount.type.includes('Mild Steel');

          const iconColor = isHDG ? 'text-sky-600 dark:text-sky-400' : isAlum ? 'text-purple-600 dark:text-purple-400' : isMS ? 'text-yellow-600 dark:text-yellow-400' : 'text-solar-600 dark:text-solar-400';
          const borderColor = isSelected ? 'border-2 border-accent bg-accent-soft ring-2 ring-accent/15' : 'border border-border bg-surface hover:border-border-strong hover:shadow-md';

          return (
            <button
              key={mount.id}
              onClick={() => onChange({ mountingId: mount.id })}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${borderColor}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-foreground font-bold text-sm">{mount.type}</h3>
                    {mount.highlight && (
                      <span className="bg-solar-500/20 text-solar-700 dark:text-solar-300 text-xs px-2 py-0.5 rounded-full border border-solar-500/30">
                        {mount.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground-muted text-xs">{mount.roofType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-foreground font-bold">{formatINR(mount.pricePerKw * config.capacityKw)}</p>
                    <p className="text-foreground-muted text-xs">₹{mount.pricePerKw.toLocaleString('en-IN')}/kW</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-gradient-to-br from-solar-500 to-solar-400 rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-foreground-muted">
                <div className="flex items-center gap-2">
                  <Wrench size={11} className={iconColor} />
                  {mount.material}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground-subtle">{t.thicknessLabel}</span> {mount.thickness}
                </div>
                {mount.galvanizingCoating && (
                  <div className="flex items-center gap-2">
                    <Shield size={11} className="text-sky-600 dark:text-sky-400" />
                    {t.zincCoatingLabel} {mount.galvanizingCoating}
                  </div>
                )}
                <div className="flex gap-4 mt-2">
                  <div>
                    <span className="text-foreground-subtle">{t.windLoadLabel}</span>
                    <span className="text-foreground ml-1 font-medium">{mount.windSpeed} {t.kmh}</span>
                  </div>
                  <div>
                    <span className="text-foreground-subtle">{t.warrantyLabel}</span>
                    <span className="text-foreground ml-1 font-medium">{mount.warranty} {t.yrs}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="bg-solar-400/10 border border-solar-400/20 rounded-xl p-4 text-sm">
        <h4 className="text-solar-700 dark:text-solar-300 font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle size={15} />
          {t.recommendationTitle}
        </h4>
        <ul className="text-foreground-muted space-y-1 text-xs">
          {t.recommendations.map((r) => <li key={r}>• {r}</li>)}
        </ul>
      </div>
    </div>
  );
}
