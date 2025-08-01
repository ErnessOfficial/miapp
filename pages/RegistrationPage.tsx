// pages/RegistrationPage.tsx
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

// Firebase imports
import { auth, googleProvider } from '../firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';

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

  // --- Stub: email registration logic to replace existing localStorage simulation ---
  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement email-based code send via backend or Firebase
    // e.g., call your /send-code endpoint or Firebase Auth API
  };

  const handleCodeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement code verification logic
    // e.g., verify code in your backend or sign in with Firebase
  };

  // --- Google Sign-In handler ---
  const handleGoogleLogin = async () => {
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
          {error   && <p className="text-red-600">{error}</p>}
        </div>

        {/* Google Sign-In button shown only in email step */}
        {step === 'email' && (
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mb-4 flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-200"
          >
            {isLoading
              ? <Loader2 className="animate-spin h-5 w-5" />
              : t('registration.withGoogle')
            }
          </button>
        )}

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">            
            {/* Inputs for email and submit button here */}
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('registration.emailPlaceholder') || 'Email'}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button type="submit" className="w-full py-3 rounded-lg bg-animik-blue text-white font-semibold">
              {t('registration.sendCode')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            {/* Input for code verification */}
            <input
              ref={codeInputRef}
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder={t('registration.codePlaceholder') || 'Código'}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button type="submit" className="w-full py-3 rounded-lg bg-animik-blue text-white font-semibold">
              {t('registration.verifyCode')}
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
