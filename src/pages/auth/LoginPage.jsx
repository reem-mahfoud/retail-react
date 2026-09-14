import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { getApiErrorMessage } from 'api/errors';
import { persistRememberedUsername, readRememberedUsername } from 'lib/rememberUsernameStorage';
import { useTranslations } from 'i18n/I18nProvider';
import 'styles/auth/login-core.css';
import CradleLogo from 'components/login/CradleLogo';
import LoginHeroPanel from 'components/login/LoginHeroPanel';

/** Login — form column, footer, spacing 32/24/20. */
export default function LoginPage() {
  const t = useTranslations('auth');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/dashboard';

  const [role, setRole] = useState('device');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const saved = readRememberedUsername();
    if (saved) {
      setUsername(saved);
      setRemember(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const u = username.trim();
    if (!u || !password) {
      setFormError(t('fillAllFields'));
      return;
    }
    setSubmitting(true);
    try {
      persistRememberedUsername(remember ? u : '');
      await login({ username: u, password, role });
      const target =
        role === 'university' ? '/dashboard/organizations' : from;
      navigate(target, { replace: true });
    } catch (err) {
      setFormError(getApiErrorMessage(err, t('fillAllFields')));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page" dir="ltr">
      <div className="login-page-inner login-page-inner--with-hero">
        <div className="login-page-inner-row">
          <section
            className="login-form-panel"
            aria-labelledby="login-welcome-heading"
          >
            <div className="login-form-panel-main">
              <div className="login-form-body w-full max-w-[360px]">
                <header className="login-form-header w-full">
                  <div className="login-form-logo-wrap">
                    <div className="login-brand-logo">
                      <CradleLogo className="login-brand-logo-svg" />
                    </div>
                  </div>

                  <div className="login-heading-block">
                    <h1
                      id="login-welcome-heading"
                      className="login-welcome-title"
                    >
                      {t('welcomeTitle')}
                    </h1>
                    <p className="login-welcome-subtitle">
                      {t('welcomeSubtitle')}
                    </p>
                  </div>
                </header>

                <form
                  onSubmit={handleSubmit}
                  className="login-form login-form--login-page w-full"
                  noValidate
                >
                  <div className="login-form-fields-group">
                    <div className="login-role-row">
                      <button
                        type="button"
                        onClick={() => setRole('device')}
                        aria-pressed={role === 'device'}
                        className={`login-role-tab login-role-tab--device ${
                          role === 'device'
                            ? 'login-role-tab--active'
                            : 'login-role-tab--inactive'
                        }`}
                      >
                        <span className="login-role-tab-text">
                          {t('deviceAdmin')}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('university')}
                        aria-pressed={role === 'university'}
                        className={`login-role-tab login-role-tab--university ${
                          role === 'university'
                            ? 'login-role-tab--active'
                            : 'login-role-tab--inactive'
                        }`}
                      >
                        <span className="login-role-tab-text">
                          {t('universityAdmin')}
                        </span>
                      </button>
                    </div>

                    {formError ? (
                      <p
                        className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                        role="alert"
                      >
                        {formError}
                      </p>
                    ) : null}

                    <div className="login-field">
                      <label
                        htmlFor="login-username"
                        className="login-field-label"
                      >
                        <span className="login-label-wrapper">
                          {t('loginFieldLabel')}
                        </span>
                      </label>
                      <input
                        id="login-username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={t('enterUsernameOrPhone')}
                        className="login-input"
                      />
                    </div>
                    <div className="login-field">
                      <label
                        htmlFor="login-password"
                        className="login-field-label"
                      >
                        <span className="login-label-wrapper">
                          {t('password')}
                        </span>
                      </label>
                      <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={t('enterPassword')}
                        className="login-input"
                      />
                    </div>
                  </div>

                  <div className="login-form-content-row">
                    <label className="login-remember-label">
                      <span className="login-checkbox-wrap">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="login-checkbox"
                        />
                      </span>
                      <span className="login-remember-text">
                        {t('rememberMe')}
                      </span>
                    </label>
                    <Link to="/reset-password" className="login-forgot-link">
                      {t('forgotPassword')}
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="login-form-submit"
                  >
                    <span className="login-form-submit-text">
                      {submitting ? t('loggingIn') : t('signIn')}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <footer className="login-footer login-footer--in-panel">
              <p className="login-footer-copy">{t('copyrightCradle')}</p>
            </footer>
          </section>

          <LoginHeroPanel />
        </div>
      </div>
    </div>
  );
}
