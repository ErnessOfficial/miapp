import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { User } from '../types';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

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
  const timerIntervalRef = useRef<number | undefined>(undefined);
  const resendIntervalRef = useRef<number | undefined>(undefined);

  const codeExpiredErrorText = t('registration.codeExpiredError');

  useEffect(() => {
    // This effect handles the timers for the code verification step.
    if (step === 'code') {
      const focusTimeout = window.setTimeout(() => codeInputRef.current?.focus(), 100);
      
      timerIntervalRef.current = window.setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current !== undefined) window.clearInterval(timerIntervalRef.current);
            setError(codeExpiredErrorText);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      resendIntervalRef.current = window.setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            if (resendIntervalRef.current !== undefined) window.clearInterval(resendIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup function for this effect.
      return () => {
        window.clearTimeout(focusTimeout);
        if (timerIntervalRef.current !== undefined) window.clearInterval(timerIntervalRef.current);
        if (resendIntervalRef.current !== undefined) window.clearInterval(resendIntervalRef.current);
      };
    }
  }, [step, codeExpiredErrorText]);
  
  const handleEmailSubmit = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(t('registration.fillFieldsError'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Simulate API call to send code
    setTimeout(() => {
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      const expiration = Date.now() + CODE_VALIDITY_SECONDS * 1000;
      console.log(`Generated code for ${email}: ${generatedCode}`);
      localStorage.setItem('authCode', JSON.stringify({ email, code: generatedCode, expiration }));

      setIsLoading(false);
      setSuccess(t('registration.codeSentSuccess'));
      setStep('code');
      setTimer(CODE_VALIDITY_SECONDS);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    }, 1500);
  };
  
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedAuth = localStorage.getItem('authCode');
    if (!storedAuth) {
      setError(t('registration.codeExpiredError'));
      return;
    }

    const { email: storedEmail, code: storedCode, expiration } = JSON.parse(storedAuth);

    if (Date.now() > expiration) {
      setError(t('registration.codeExpiredError'));
      localStorage.removeItem('authCode');
      return;
    }

    if (code === storedCode && email === storedEmail) {
      const newUser: User = {
        fullName: email.split('@')[0],
        age: '',
        gender: '',
        country: '',
      };
      setUser(newUser);
      localStorage.removeItem('authCode');
      navigate('/dashboard');
    } else {
      setError(t('registration.invalidCodeError'));
      setSuccess(null);
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

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

        {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('registration.emailLabel')}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  placeholder={t('registration.emailPlaceholder')}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-animik-lilac focus:border-animik-lilac text-gray-900"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-animik-lilac hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                      <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('registration.sendingCode')}
                      </>
                  ) : (
                      t('registration.submitButton')
                  )}
                </button>
              </div>
            </form>
        ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="text-center text-sm text-gray-600">
                  {t('registration.codeValidityInfo', { time: formatTime(timer) })}
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">{t('registration.codeLabel')}</label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    ref={codeInputRef}
                    required
                    value={code}
                    placeholder={t('registration.codePlaceholder')}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-animik-lilac focus:border-animik-lilac text-gray-900"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-animik-lilac hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
                  >
                    {t('registration.verifyButton')}
                  </button>
                </div>
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => handleEmailSubmit()}
                        disabled={resendCooldown > 0}
                        className="text-sm font-medium text-animik-lilac hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {resendCooldown > 0 ? t('registration.resendCountdown', { seconds: resendCooldown }) : t('registration.resendCode')}
                    </button>
                </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;