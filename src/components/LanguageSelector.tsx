import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import type { Language } from '../types';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm text-gray-600">
        {t.languageSelector}
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-2 py-1 text-sm border rounded-md bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
} 