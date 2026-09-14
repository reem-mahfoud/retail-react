import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslations } from 'i18n/I18nProvider';
import 'styles/auth/login-core.css';
import CradleLogo from 'components/login/CradleLogo';
import { formatMaskedPhoneFromInput } from 'lib/formatMaskedPhone';

/**
 * Verify SMS code after a reset request.
 * Route: /reset-password/confirm
 */
export default function ResetPasswordVerifyCodePage() {
  const t = useTranslations('auth');
  const tc = useTranslations('common');
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [code, setCode] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const phoneLine = useMemo(() => {
    return formatMaskedPhoneFromInput(username) ?? t('confirmPhoneMaskedExample');
  }, [username, t]);

  useEffect(() => {
    if (!username) {
      navigate('/reset-password', { replace: true });
    }
  }, [username, navigate]);

  function handleNext(e) {
    e.preventDefault();
    setFormError('');
    const c = code.trim();
    if (!c) {
      setFormError(t('smsCodeRequired'));
      return;
    }
    setSubmitting(true);
    try {
      navigate('/reset-password/new-password', {
        replace: true,
        state: { username },
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (!username) {
    return null;
  }

  return (
    <div className="login-page" dir="ltr">
      <div className="login-page-inner login-page-inner--confirm">
        <div className="login-reset-frame">
          <div className="login-reset-container login-reset-container--confirm">
            <section
              className="login-form-panel login-form-panel--reset"
              aria-labelledby="reset-confirm-heading"
            >
              <div className="login-form-panel-main">
                <div className="login-form-body login-form-body--confirm w-full max-w-[360px]">
                  <header className="login-form-header login-form-header--confirm w-full">
                    <div className="login-form-logo-wrap">
                      <div className="login-brand-logo">
                        <CradleLogo className="login-brand-logo-svg" />
                      </div>
                    </div>

                    <div className="login-heading-block login-heading-block--confirm">
                      <h1
                        id="reset-confirm-heading"
                        className="login-welcome-title"
                      >
                        {t('confirmTitle')}
                      </h1>
                      <div className="login-confirm-supporting">
                        <p className="login-confirm-supporting-line">
                          {t('confirmSmsSubtitle')}
                        </p>
                        <p className="login-confirm-supporting-line login-confirm-supporting-line--phone">
                          {phoneLine}
                        </p>
                      </div>
                    </div>
                  </header>

                  <div className="login-form-content--confirm">
                    <div className="login-confirm-card">
                      <form
                        id="reset-confirm-form"
                        onSubmit={handleNext}
                        className="login-form login-form--confirm"
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
                        <div className="login-field login-field--confirm">
                          <label
                            htmlFor="reset-sms-code"
                            className="login-field-label"
                          >
                            <span className="login-label-wrapper">
                              {t('smsCodeLabel')}
                            </span>
                          </label>
                          <div className="login-input-with-help login-input-with-help--confirm">
                            <input
                              id="reset-sms-code"
                              name="smsCode"
                              type="text"
                              inputMode="text"
                              autoComplete="username"
                              value={code}
                              onChange={(e) => {
                                setCode(e.target.value);
                                if (formError) setFormError('');
                              }}
                              placeholder={t('smsCodePlaceholderConfirm')}
                              className="login-input--confirm"
                            />
                            <button
                              type="button"
                              className="login-sms-help login-sms-help--confirm"
                              aria-label={t('smsCodeHelp')}
                              title={t('smsCodeHelp')}
                            >
                              ?
                            </button>
                          </div>
                        </div>
                      </form>

                      <div className="login-confirm-actions">
                        <button
                          type="button"
                          className="login-confirm-back"
                          onClick={() =>
                            navigate('/reset-password', {
                              state: { username },
                            })
                          }
                        >
                          {tc('back')}
                        </button>
                        <button
                          type="submit"
                          form="reset-confirm-form"
                          disabled={submitting}
                          className="login-confirm-next"
                        >
                          <span className="login-confirm-next-text">
                            {submitting ? tc('loading') : t('next')}
                          </span>
                        </button>
                      </div>
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
