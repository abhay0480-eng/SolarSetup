import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`relative inline-flex items-center w-14 h-8 rounded-full border border-border bg-surface-alt transition-colors ${className}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-solar-400 to-solar-600 dark:from-solar-300 dark:to-solar-500 shadow-sm flex items-center justify-center transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? <Moon size={14} className="text-ink-950" /> : <Sun size={14} className="text-white" />}
      </span>
    </button>
  );
}
