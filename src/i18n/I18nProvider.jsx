import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import en from '../messages/en.json';
import uz from '../messages/uz.json';
import ru from '../messages/ru.json';
import { readStorageItem, writeStorageItem } from 'lib/safeStorage';

const catalogs = { en, uz, ru };

const LOCALE_STORAGE_KEY = 'retail_locale';

function readStoredLocale() {
  const raw = readStorageItem(localStorage, LOCALE_STORAGE_KEY);
  if (raw && catalogs[raw]) return raw;
  return 'en';
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    writeStorageItem(localStorage, LOCALE_STORAGE_KEY, next);
  }, []);

  const messages = catalogs[locale] || catalogs.en;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, messages }),
    [locale, messages, setLocale],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}

/** Mirrors next-intl `useTranslations(namespace)` → `t(key)` */
export function useTranslations(namespace) {
  const { messages } = useI18n();
  return useCallback(
    (key) => {
      const ns = messages[namespace];
      if (ns && typeof ns === 'object' && key in ns) return ns[key];
      return key;
    },
    [messages, namespace],
  );
}
