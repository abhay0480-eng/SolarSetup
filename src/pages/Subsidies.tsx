import { useState } from 'react';
import { IndianRupee, Search, Info, MapPin } from 'lucide-react';
import { stateSubsidies } from '../data/subsidies';
import { formatINR } from '../utils/priceCalculator';
import subsidiesPageEn from '../content/en/subsidiesPage.json';
import subsidiesPageHi from '../content/hi/subsidiesPage.json';
import { useContent } from '../i18n/LanguageContext';

function calcSubsidy(kw: number, state: typeof stateSubsidies[0]) {
  const capped = Math.min(kw, 10);
  let central = capped <= 2
    ? capped * state.centralSubsidy.upTo2kw
    : 2 * state.centralSubsidy.upTo2kw + Math.min(capped - 2, 1) * state.centralSubsidy.per2to3kw;

  let stateAmt = 0;
  const s = state.stateSubsidy;
  if (s.type === 'flat') stateAmt = s.amount;
  else if (s.type === 'per_kw') {
    const kwS = s.maxKw ? Math.min(capped, s.maxKw) : capped;
    stateAmt = kwS * s.amount;
    if (s.maxAmount) stateAmt = Math.min(stateAmt, s.maxAmount);
  } else if (s.type === 'percentage') {
    const gross = kw * 60000;
    stateAmt = Math.round((gross * s.amount) / 100);
    if (s.maxAmount) stateAmt = Math.min(stateAmt, s.maxAmount);
  }

  return { central: Math.round(central), state: stateAmt, total: Math.round(central) + stateAmt };
}

export default function Subsidies() {
  const t = useContent(subsidiesPageEn, subsidiesPageHi);
  const [search, setSearch] = useState('');
  const [capacity, setCapacity] = useState(3);

  const filtered = stateSubsidies.filter(s => s.state.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-16 sm:pb-20 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-2-soft border border-leaf-200 dark:border-leaf-800/40 rounded-full px-4 py-1.5 mb-4">
            <IndianRupee size={14} className="text-accent-2" />
            <span className="text-accent-2 text-sm font-medium">{t.badgeText}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t.heading} <span className="text-gradient-leaf">{t.headingHighlight}</span>
          </h1>
          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        {/* Central Subsidy Info */}
        <div className="bento bento-hover p-5 sm:p-6 mb-4 sm:mb-5">
          <h2 className="text-foreground font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
            <Info size={20} className="text-accent-strong dark:text-accent" />
            {t.centralTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-accent-soft border border-solar-200 dark:border-solar-800/40 rounded-2xl p-5 text-center">
              <p className="text-foreground-muted text-sm mb-1">{t.for1kw}</p>
              <p className="text-foreground font-black text-2xl sm:text-3xl">₹30,000</p>
              <p className="text-accent-strong dark:text-accent text-sm mt-1">{t.centralSubsidyLabel}</p>
            </div>
            <div className="bg-accent-soft border border-solar-200 dark:border-solar-800/40 rounded-2xl p-5 text-center">
              <p className="text-foreground-muted text-sm mb-1">{t.for2kw}</p>
              <p className="text-foreground font-black text-2xl sm:text-3xl">₹60,000</p>
              <p className="text-accent-strong dark:text-accent text-sm mt-1">₹30,000 × 2kW</p>
            </div>
            <div className="bg-solar-100 dark:bg-solar-500/20 border border-solar-300 dark:border-solar-700/50 rounded-2xl p-5 text-center">
              <p className="text-foreground-muted text-sm mb-1">{t.for3kwPlus}</p>
              <p className="text-foreground font-black text-2xl sm:text-3xl">₹78,000</p>
              <p className="text-accent-strong dark:text-accent text-sm mt-1">{t.maxCentralSubsidyLabel}</p>
            </div>
          </div>
          <p className="text-foreground-muted text-sm mt-4 flex items-center gap-2">
            <Info size={14} className="text-accent-strong dark:text-accent shrink-0" />
            {t.centralFootnote}
          </p>
        </div>

        {/* Calculator */}
        <div className="bento bento-hover p-5 mb-4 sm:mb-5">
          <h3 className="text-foreground font-semibold mb-4">{t.calculatorTitle}</h3>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <label className="text-foreground-muted text-sm shrink-0">{t.systemSizeLabel}</label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 5, 7, 10].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setCapacity(kw)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all min-h-[2.25rem] ${
                    capacity === kw
                      ? 'bg-solar-500 text-white'
                      : 'bg-surface-alt text-foreground-muted hover:text-foreground hover:bg-surface-sunken'
                  }`}
                >
                  {kw}kW
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-surface border border-border text-foreground rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-solar-400 focus:ring-2 focus:ring-solar-100 dark:focus:ring-solar-500/20 transition-all placeholder:text-foreground-subtle shadow-[var(--shadow-bento)]"
          />
        </div>

        {/* State Table */}
        <div className="bento overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="bg-surface-alt border-b border-border px-6 py-3 grid grid-cols-5 gap-4 text-xs font-medium text-foreground-subtle uppercase tracking-wide">
                <div className="col-span-2">{t.tableStateHeader}</div>
                <div className="text-right">{t.tableCentralHeader.replace('{kw}', String(capacity))}</div>
                <div className="text-right">{t.tableStateSubsidyHeader}</div>
                <div className="text-right">{t.tableTotalHeader}</div>
              </div>

              <div className="divide-y divide-border">
                {filtered.map((state) => {
                  const sub = calcSubsidy(capacity, state);
                  return (
                    <div key={state.code} className="px-6 py-4 grid grid-cols-5 gap-4 hover:bg-surface-alt transition-colors">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-foreground-subtle shrink-0" />
                          <div>
                            <p className="text-foreground font-medium text-sm">{state.state}</p>
                            <p className="text-foreground-subtle text-xs">{state.discom}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-solar-600 dark:text-solar-400 font-semibold text-sm">{formatINR(sub.central)}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-sm ${sub.state > 0 ? 'text-sky-600 dark:text-sky-400' : 'text-foreground-subtle'}`}>
                          {sub.state > 0 ? formatINR(sub.state) : '—'}
                        </p>
                        <p className="text-foreground-subtle text-xs capitalize">{state.stateSubsidy.type.replace('_', ' ')}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${sub.total > 90000 ? 'text-leaf-600 dark:text-leaf-400' : sub.total > 60000 ? 'text-solar-600 dark:text-solar-400' : 'text-foreground'}`}>
                          {formatINR(sub.total)}
                        </p>
                        {state.netMeteringAvailable && (
                          <p className="text-leaf-600 dark:text-leaf-400 text-xs">{t.netMeteringAvailable}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="text-foreground-subtle text-xs text-center mt-6">
          {t.footnote}
        </p>
      </div>
    </div>
  );
}
