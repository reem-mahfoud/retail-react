import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslations } from 'i18n/I18nProvider';
import 'styles/auth/login-core.css';
import CradleLogo from 'components/login/CradleLogo';

/**
 * Set a new password after SMS verification.
 * Route: /reset-password/new-password
 */
export default function ResetPasswordNewPasswordPage() {
  const t = useTranslations('auth');
  const tc = useTranslations('common');
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate('/reset-password/confirm', { replace: true });
    }
  }, [username, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const p = password.trim();
    const c = confirmPassword.trim();
    if (!p || !c) {
      setFormError(t('newPasswordFillAll'));
      return;
    }
    if (p !== c) {
      setFormError(t('newPasswordMismatch'));
      return;
    }
    if (p.length < 8) {
      setFormError(t('newPasswordTooShort'));
      return;
    }
    setSubmitting(true);
    try {
      navigate('/login', { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  if (!username) {
    return null;
  }

  return (
    <div className="login-page" dir="ltr">
      <div className="login-page-inner login-page-inner--reset">
        <div className="login-reset-frame">
          <div className="login-reset-container">
            <section
              className="login-form-panel login-form-panel--reset"
              aria-labelledby="new-password-heading"
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
                        id="new-password-heading"
                        className="login-welcome-title"
                      >
                        {t('newPasswordTitle')}
                      </h1>
                      <p className="login-reset-subtitle">
                        {t('newPasswordSubtitle')}
                      </p>
                    </div>
                  </header>

                  <div className="login-form-content--new-password">
                    <form
                      id="reset-new-password-form"
                      onSubmit={handleSubmit}
                      className="login-form login-form--new-password"
                      noValidate
                    >
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
                          htmlFor="new-password"
                          className="login-field-label"
                        >
                          <span className="login-label-wrapper">
                            {t('newPasswordFieldLabel')}
                          </span>
                        </label>
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          autoComplete="new-password"
                          spellCheck={false}
                          autoCapitalize="off"
                          autoCorrect="off"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (formError) setFormError('');
                          }}
                          placeholder={t('enterNewPassword')}
                          className="login-input"
                        />
                      </div>
                      <div className="login-field">
                        <label
                          htmlFor="confirm-new-password"
                          className="login-field-label"
                        >
                          <span className="login-label-wrapper">
                            {t('repeatPasswordLabel')}
                          </span>
                        </label>
                        <input
                          id="confirm-new-password"
                          name="confirm-new-password"
                          type="password"
                          autoComplete="new-password"
                          spellCheck={false}
                          autoCapitalize="off"
                          autoCorrect="off"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (formError) setFormError('');
                          }}
                          placeholder={t('repeatPasswordPlaceholder')}
                          className="login-input"
                        />
                      </div>
                    </form>

                    <div className="login-reset-actions">
                      <button
                        type="button"
                        className="login-reset-cancel"
                        onClick={() =>
                          navigate('/reset-password/confirm', {
                            state: { username },
                          })
                        }
                      >
                        {tc('cancel')}
                      </button>
                      <button
                        type="submit"
                        form="reset-new-password-form"
                        disabled={submitting}
                        className="login-reset-next"
                      >
                        <span className="login-form-submit-text">
                          {submitting ? tc('loading') : tc('save')}
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
