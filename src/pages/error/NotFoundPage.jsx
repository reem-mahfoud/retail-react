import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { useTranslations } from 'i18n/I18nProvider';
import ErrorPageLayout from 'components/error/ErrorPageLayout';
import { getAppHomePath } from 'lib/authRoutes';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const t = useTranslations('errors');
  const homeTo = getAppHomePath({ isAuthenticated, user });

  return (
    <ErrorPageLayout
      code="404"
      title={t('notFoundTitle')}
      description={t('notFoundDescription')}
      primaryAction={{
        to: homeTo,
        label: isAuthenticated ? t('goDashboard') : t('goLogin'),
      }}
      secondaryAction={{
        label: t('goBack'),
        onClick: () => navigate(-1),
      }}
    />
  );
}
