// pages/RegistrationPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

// ——— IMPORTS FIREBASE CORREGIDOS ———
import { auth, googleProvider } from '../firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';

const CODE_VALIDITY_SECONDS = 600; // 10 min
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

  // ——— NUEVO: Google Sign-In ———
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        fullName: user.displayName || '',
        email: user.email || '',
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(t('registration.socialLoginError'));
    } finally {
      setIsLoading(false);
    }
  };

  // … aquí sigue tu lógica de envío/verificación de código (igual que antes) …

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-animik-sky to-animik-pink p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl">
        {/* ——— BOTÓN GOOGLE ——— */}
        {step === 'email' && (
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mb-4 flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-200"
          >
            {isLoading
              ? <Loader2 className="animate-spin h-5 w-5" />
              : t('registration.withGoogle')}
          </button>
        )}

        {/* ——— RESTO DEL FORMULARIO (EMAIL → CÓDIGO) ——— */}
        {step === 'email' ? (
          <form onSubmit={/* tu handleEmailSubmit */} className="space-y-6">
            {/* … inputs y botón … */}
          </form>
        ) : (
          <form onSubmit={/* tu handleCodeSubmit */} className="space-y-6">
            {/* … inputs y botón de verificación … */}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
