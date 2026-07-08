/**
 * Mock OTP (one-time password) authentication.
 *
 * There's no real backend/user database in this project, so this module
 * simulates a typical phone/email OTP flow (request code -> verify code)
 * with realistic network delays. It exists purely to demonstrate the UX
 * pattern end-to-end; wire `requestOtp`/`verifyOtp` up to a real provider
 * (e.g. Auth.js, a custom API route + SMS gateway, Firebase Auth, etc.)
 * before shipping this to production.
 *
 * For demo purposes, the "correct" code is always `123456`.
 */

const DEMO_OTP_CODE = "123456";
const SIMULATED_NETWORK_DELAY_MS = 900;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Basic shape check: either a 10/11-digit Iranian mobile number or a plain email. */
export function isValidIdentifier(value: string): boolean {
  const trimmed = value.trim();
  const phonePattern = /^0?9\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return phonePattern.test(trimmed) || emailPattern.test(trimmed);
}

/** Simulates sending a 6-digit OTP code to the given phone number or email. */
export async function requestOtp(identifier: string): Promise<{ success: boolean }> {
  await delay(SIMULATED_NETWORK_DELAY_MS);
  if (!isValidIdentifier(identifier)) {
    return { success: false };
  }
  // In a real implementation: generate a random code, persist it
  // server-side with an expiry, and dispatch it via SMS/email provider.
  return { success: true };
}

/** Simulates verifying the OTP code the user typed in. */
export async function verifyOtp(
  identifier: string,
  code: string
): Promise<{ success: boolean }> {
  await delay(SIMULATED_NETWORK_DELAY_MS);
  return { success: code === DEMO_OTP_CODE };
}
