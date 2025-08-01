// pages/RegistrationPage.tsx
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

// Firebase imports
import { auth, googleProvider } from '../firebase';
import {
  signInWithPopup
} from 'firebase/auth';

// reCAPTCHA helper
import { getRecaptchaToken } from '../recaptcha';

const CODE_VALIDITY_SECONDS = 600; // 10 minutes
const RESEND_COOLDOWN_SECONDS = 60;

const RegistrationPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [timer, setTimer] = useState(CODE_VALIDITY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<number>();
  const resendIntervalRef = useRef<number>();

  // Send code via backend with reCAPTCHA validation
  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const token = await getRecaptchaToken('registration');
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, recaptchaToken: token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || t('registration.sendCodeError'));
      } else {
        setSuccess(t('registration.codeSent'));
        setStep('code');
      }
    } catch (err) {
      console.error('Error sending code:', err);
      setError(t('registration.sendCodeError'));
    } finally {
      setIsLoading(false);
    }
  };

  // Verify code via backend with reCAPTCHA
  const handleCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const token = await getRecaptchaToken('verifyCode');
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, recaptchaToken: token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || t('registration.verifyCodeError'));
      } else {
        setUser({ fullName: data.fullName, email: data.email });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error verifying code:', err);
      setError(t('registration.verifyCodeError'));
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In handler
  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({ fullName: user.displayName || '', email: user.email || '' });
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError(t('registration.socialLoginError'));
    } finally {
      setIsLoading(false);
    }
  };

  // Timer and resend cooldown for code step
  useEffect(() => {
    if (step === 'code') {
      const focusTimeout = window.setTimeout(() => codeInputRef.current?.focus(), 100);
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            window.clearInterval(timerIntervalRef.current);
            setError(t('registration.codeExpiredError'));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      resendIntervalRef.current = window.setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            window.clearInterval(resendIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        window.clearTimeout(focusTimeout);
        window.clearInterval(timerIntervalRef.current);
        window.clearInterval(resendIntervalRef.current);
      };
    }
  }, [step, t]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-animik-sky to-animik-pink p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center">
          <img src="/logo-animik.png" alt={t('common.appName')} className="w-28 h-28 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-animik-dark">{t('registration.title')}</h1>
          <p className="text-gray-600 mt-2">{t('registration.subtitle')}</p>
        </div>

        <div aria-live="polite" className="h-6 text-center text-sm font-medium">
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>

        {/* Google Sign-In button */}
        {step === 'email' && (
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mb-4 flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-200"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : t('registration.withGoogle')}
          </button>
        )}

        {/* Email form or Code form */}
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('registration.emailPlaceholder') || 'Email'}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-animik-blue text-white font-semibold"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : t('registration.sendCode')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <input
              ref={codeInputRef}
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder={t('registration.codePlaceholder') || 'Código'}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-animik-blue text-white font-semibold"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : t('registration.verifyCode')}
            </button>
            <p className="text-sm text-gray-500">{`${t('registration.resendIn')} ${resendCooldown}s`}</p>
            <p className="text-sm text-gray-500">{`${t('registration.expiresIn')} ${timer}s`}</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
