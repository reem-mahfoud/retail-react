import { useAuth } from 'context/AuthContext';
import { useTranslations } from 'i18n/I18nProvider';
import ErrorPageLayout from 'components/error/ErrorPageLayout';
import { getAppHomePath } from 'lib/authRoutes';

export default function ErrorFallbackPage({ onRetry }) {
  const { isAuthenticated, user } = useAuth();
  const t = useTranslations('errors');
  const homeTo = getAppHomePath({ isAuthenticated, user });

  return (
    <ErrorPageLayout
      title={t('unexpectedTitle')}
      description={t('unexpectedDescription')}
      primaryAction={{
        to: homeTo,
        label: isAuthenticated ? t('goDashboard') : t('goLogin'),
      }}
      secondaryAction={
        onRetry
          ? {
              label: t('tryAgain'),
              onClick: onRetry,
            }
          : null
      }
    />
  );
}
