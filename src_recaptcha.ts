// src/recaptcha.ts

/**
 * Helper to get a reCAPTCHA token for a given action.
 * Assumes the reCAPTCHA script has been loaded in index.html
 * and window.RECAPTCHA_SITE_KEY is set.
 */
export function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const grecaptcha = (window as any).grecaptcha;
    const siteKey = (window as any).RECAPTCHA_SITE_KEY;

    if (!grecaptcha) {
      return reject(new Error('reCAPTCHA not loaded'));
    }
    if (!siteKey) {
      return reject(new Error('reCAPTCHA site key not available'));
    }

    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action })
        .then((token: string) => resolve(token))
        .catch((err: any) => reject(err));
    });
  });
}
