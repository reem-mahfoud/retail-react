import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import QueryProvider from 'providers/QueryProvider';
import { I18nProvider } from 'i18n/I18nProvider';
import { AuthProvider } from 'context/AuthContext';
import ErrorBoundary from 'components/error/ErrorBoundary';
import AppRoutes from 'routes/AppRoutes';

const antdTheme = {
  token: {
    colorBgContainer: '#ffffff',
    colorBorderSecondary: '#f3f4f6',
    borderRadiusLG: 12,
  },
};

export default function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <QueryProvider>
          <I18nProvider>
            <AuthProvider>
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </AuthProvider>
          </I18nProvider>
        </QueryProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}
