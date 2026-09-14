import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from 'i18n/I18nProvider';
import 'styles/auth/login-core.css';
import CradleLogo from 'components/login/CradleLogo';

/**
 * Reset password request — enter username, then proceed to SMS confirmation.
 * Route: /reset-password
 */
export default function ResetPasswordRequestPage() {
  const t = useTranslations('auth');
  const tc = useTranslations('common');
  const navigate = useNavigate();

  const [role, setRole] = useState('device');
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleNext(e) {
    e.preventDefault();
    setFormError('');
    const u = username.trim();
    if (!u) {
      setFormError(t('resetUsernameRequired'));
      return;
    }
    setSubmitting(true);
    try {
      navigate('/reset-password/confirm', { state: { username: u } });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page" dir="ltr">
      <div className="login-page-inner login-page-inner--reset">
        <div className="login-reset-frame">
          <div className="login-reset-container">
            <section
              className="login-form-panel login-form-panel--reset"
              aria-labelledby="reset-password-heading"
            >
              <div className="login-form-panel-main">
                <div className="login-form-body w-full max-w-[360px]">
                  <header className="login-form-header w-full">
                    <div className="login-form-logo-wrap">
                      <div className="login-brand-logo">
                        <CradleLogo className="login-brand-logo-svg" />
                      </div>
                    </div>

                    <div className="login-heading-block login-heading-block--reset">
                      <h1
                        id="reset-password-heading"
                        className="login-welcome-title"
                      >
                        {t('resetPasswordTitle')}
                      </h1>
                      <p className="login-reset-subtitle login-reset-subtitle--wide">
                        {t('resetPasswordSubtitle')}
                      </p>
                    </div>
                  </header>

                  <div className="login-form-content--reset">
                    <form
                      id="reset-password-request-form"
                      onSubmit={handleNext}
                      className="login-form login-form--reset"
                      noValidate
                    >
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
                          htmlFor="reset-username"
                          className="login-field-label"
                        >
                          <span className="login-label-wrapper">
                            {t('loginFieldLabel')}
                          </span>
                        </label>
                        <input
                          id="reset-username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            if (formError) setFormError('');
                          }}
                          placeholder={t('enterAccountUsername')}
                          className="login-input"
                        />
                      </div>
                    </form>

                    <div className="login-reset-actions">
                      <button
                        type="button"
                        className="login-reset-cancel"
                        onClick={() => navigate('/login')}
                      >
                        {tc('cancel')}
                      </button>
                      <button
                        type="submit"
                        form="reset-password-request-form"
                        disabled={submitting}
                        className="login-reset-next"
                      >
                        <span className="login-form-submit-text">
                          {submitting ? tc('loading') : t('next')}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="login-footer login-footer--in-panel">
                <p className="login-footer-copy">{t('copyrightCradle')}</p>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
