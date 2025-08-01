import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { User } from '../types';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

// *** NUEVO ***
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const CODE_VALIDITY_SECONDS = 600; // 10 minutos
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
  const timerIntervalRef = useRef<number | undefined>(undefined);
  const resendIntervalRef = useRef<number | undefined>(undefined);

  const codeExpiredErrorText = t('registration.codeExpiredError');

  // *** NUEVO ***
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        fullName: user.displayName || '',
        email: user.email || ''
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(t('registration.socialLoginError'));
    }
  };

  useEffect(() => {
    if (step === 'code') {
      const focusTimeout = window.setTimeout(() => codeInputRef.current?.focus(), 100);
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
            setError(codeExpiredErrorText);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      resendIntervalRef.current = window.setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            if (resendIntervalRef.current) window.clearInterval(resendIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        window.clearTimeout(focusTimeout);
        if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
        if (resendIntervalRef.current) window.clearInterval(resendIntervalRef.current);
      };
    }
  }, [step, codeExpiredErrorText]);

  const handleEmailSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // … tu lógica actual para envío de código simulado …
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // … tu lógica actual para verificación …
  };

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

        {/* *** NUEVO: botón Google Sign-In solo en el primer paso *** */}
        {step === 'email' && (
          <button
            onClick={handleGoogleLogin}
            className="w-full mb-4 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-200"
          >
            Regístrate / Entra con Google
          </button>
        )}

        {step === 'email' ? (
          /* ——— tu formulario de email → código (igual que antes) ——— */
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            {/* … inputs y botón … */}
          </form>
        ) : (
          /* ——— tu formulario de verificación de código ——— */
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            {/* … inputs y botón … */}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
