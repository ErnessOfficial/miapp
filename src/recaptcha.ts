// src/recaptcha.ts
export function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const grecaptcha = (window as any).grecaptcha;
    const siteKey = (window as any).RECAPTCHA_SITE_KEY;

    if (!grecaptcha) return reject(new Error('reCAPTCHA not loaded'));
    if (!siteKey) return reject(new Error('Site key not found'));

    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action })
        .then((token: string) => resolve(token))
        .catch((err: any) => reject(err));
    });
  });
}
