import { useLanguage } from '../../i18n/LanguageContext';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full p-0.5 text-xs font-semibold bg-surface-alt border border-border ${className}`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          language === 'en' ? 'bg-accent text-white' : 'text-foreground-subtle hover:text-foreground'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          language === 'hi' ? 'bg-accent text-white' : 'text-foreground-subtle hover:text-foreground'
        }`}
        aria-pressed={language === 'hi'}
      >
        हिं
      </button>
    </div>
  );
}
