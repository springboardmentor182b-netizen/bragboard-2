import { useMemo, useState } from 'react';
import './Login.css';

const MODES = {
  LOGIN: 'login',
  FORGOT: 'forgot',
  OTP: 'otp',
};

const INITIAL_STATE = {
  email: '',
  password: '',
  rememberMe: false,
  otp: '',
};

const COPY = {
  [MODES.LOGIN]: {
    title: 'Sign in to Bragboard',
    subtitle: 'Celebrate your career wins and keep your brag list fresh.',
    cta: 'Sign in',
  },
  [MODES.FORGOT]: {
    title: 'Reset your password',
    subtitle:
      'Enter the email linked to your workspace. We’ll email you a one-time code.',
    cta: 'Send OTP',
  },
  [MODES.OTP]: {
    title: 'Verify email with OTP',
    subtitle:
      'Check your inbox for a 6-digit code. Enter it below to continue.',
    cta: 'Verify & Continue',
  },
};

function LoginPage() {
  const [mode, setMode] = useState(MODES.LOGIN);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetStatus = () => setStatus(null);

  const handleModeChange = (nextMode) => {
    if (mode === nextMode) return;
    setMode(nextMode);
    resetStatus();
    if (nextMode !== MODES.OTP) {
      setFormState((prev) => ({ ...prev, otp: '' }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetStatus();
    setIsSubmitting(true);

    setTimeout(() => {
      switch (mode) {
        case MODES.LOGIN: {
          if (!formState.email || !formState.password) {
            setStatus({
              type: 'error',
              text: 'Please add both email and password to continue.',
            });
            break;
          }
          setStatus({
            type: 'success',
            text: `Welcome back, ${formState.email}!`,
          });
          break;
        }
        case MODES.FORGOT: {
          if (!formState.email) {
            setStatus({
              type: 'warning',
              text: 'Add the email associated with your account first.',
            });
            break;
          }
          setStatus({
            type: 'success',
            text: `OTP sent to ${formState.email}. Check your inbox.`,
          });
          setMode(MODES.OTP);
          setFormState((prev) => ({ ...prev, otp: '' }));
          break;
        }
        case MODES.OTP: {
          if (!formState.otp || formState.otp.length < 6) {
            setStatus({
              type: 'error',
              text: 'Enter the 6-digit OTP from your email.',
            });
            break;
          }
          setStatus({
            type: 'success',
            text: 'OTP verified! You can now set a new password.',
          });
          setMode(MODES.LOGIN);
          setFormState((prev) => ({
            ...prev,
            password: '',
            otp: '',
          }));
          break;
        }
        default:
          break;
      }
      setIsSubmitting(false);
    }, 500);
  };

  const statusClassName = useMemo(() => {
    if (!status) return 'status-message';
    return `status-message status-${status.type}`;
  }, [status]);

  const otpHelperText = formState.email
    ? `We just sent a verification code to ${formState.email}.`
    : 'We just sent a verification code to your email address.';

  return (
    <main className="login-wrapper">
      <section className="login-card" aria-live="polite">
        <header className="login-header">
          <p className="login-badge">Bragboard</p>
          <h1 id="login-heading">{COPY[mode].title}</h1>
          <p className="login-subtitle">{COPY[mode].subtitle}</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          {(mode === MODES.LOGIN || mode === MODES.FORGOT) && (
            <>
              <label className="login-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                required={mode === MODES.LOGIN}
              />
            </>
          )}

          {mode === MODES.LOGIN && (
            <>
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
                required
              />
              <div className="login-actions">
                <label className="remember-toggle">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formState.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <div className="action-links">
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => handleModeChange(MODES.FORGOT)}
                  >
                    Forgot password?
                  </button>
                  <button
                    type="button"
                    className="link-button subtle"
                    onClick={() => handleModeChange(MODES.OTP)}
                  >
                    Use email OTP
                  </button>
                </div>
              </div>
            </>
          )}

          {mode === MODES.FORGOT && (
            <p className="forgot-help">
              Tap below to send a one-time password to your inbox. You can use
              it to get back into your account.
            </p>
          )}

          {mode === MODES.OTP && (
            <>
              <p className="otp-help">{otpHelperText}</p>
              <label className="login-label" htmlFor="otp">
                6-digit OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="••••••"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={formState.otp}
                onChange={handleChange}
                autoComplete="one-time-code"
              />
            </>
          )}

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait…' : COPY[mode].cta}
          </button>

          {mode === MODES.OTP && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => handleModeChange(MODES.FORGOT)}
            >
              Resend OTP
            </button>
          )}
        </form>

        <footer className="login-footer">
          {status && (
            <p role="status" className={statusClassName}>
              {status.text}
            </p>
          )}
        </footer>
      </section>
    </main>
  );
}

export default LoginPage;

