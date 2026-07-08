"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

import carImage from "@/assets/images/car/bmw.png";
import OtpInput from "@/components/auth/OtpInput";
import { isValidIdentifier, requestOtp, verifyOtp } from "@/lib/mockAuth";

type Step = "identifier" | "otp" | "success";

const RESEND_COOLDOWN_SECONDS = 60;

const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
};

/**
 * Login / sign-up page using a phone or email one-time-password flow —
 * one form handles both cases, since OTP-based auth naturally unifies
 * "login" and "sign up" (a new number just gets an account created for
 * it behind the scenes). Authentication itself is mocked; see
 * `@/lib/mockAuth` for what a real integration would replace.
 */
export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (step !== "success") return;
    const timeout = setTimeout(() => router.push("/"), 1800);
    return () => clearTimeout(timeout);
  }, [step, router]);

  const handleRequestOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!isValidIdentifier(identifier)) {
      setError("لطفاً یک شماره موبایل یا ایمیل معتبر وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    const result = await requestOtp(identifier);
    setIsSubmitting(false);

    if (result.success) {
      setStep("otp");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } else {
      setError("ارسال کد با مشکل مواجه شد. دوباره تلاش کنید.");
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (code.length < 6) {
      setError("کد ۶ رقمی را کامل وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    const result = await verifyOtp(identifier, code);
    setIsSubmitting(false);

    if (result.success) {
      setStep("success");
    } else {
      setError("کد وارد شده صحیح نیست. (کد آزمایشی: ۱۲۳۴۵۶)");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setIsSubmitting(true);
    await requestOtp(identifier);
    setIsSubmitting(false);
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surmeh px-4 py-10">
      {/* Blurred backdrop reusing the hero's car + tire-mark imagery */}
      <div className="absolute inset-0 z-0">
        <Image
          src={carImage}
          alt=""
          aria-hidden
          fill
          priority
          className="scale-125 object-cover opacity-30 blur-md"
        />
        <img
          src="/images/tire-mark.png"
          alt=""
          aria-hidden
          className="absolute right-[20%] top-1/2 w-3/5 -translate-y-1/2 opacity-10 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surmeh/90 via-surmeh/80 to-surmeh/95" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-6 text-center">
          <Link href="/" className="text-xl font-extrabold text-brand-600">
            ADORA YADAK
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            ورود یا ثبت‌نام سریع، فقط با یک کد یک‌بار مصرف
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "identifier" && (
            <motion.form
              key="identifier"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onSubmit={handleRequestOtp}
            >
              <label className="mb-1 block text-sm font-medium text-gray-700">
                شماره موبایل یا ایمیل
              </label>
              <div className="relative mb-1">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="09xxxxxxxxx یا you@email.com"
                  dir="ltr"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-start focus:border-brand-400 focus:outline-none"
                />
                <FaPhoneAlt className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>

              {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-lg bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? "در حال ارسال کد…" : "دریافت کد ورود"}
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
                با ورود، شرایط استفاده از خدمات و حریم خصوصی آدورا یدک را می‌پذیرید.
              </p>
            </motion.form>
          )}

          {step === "otp" && (
            <motion.form
              key="otp"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onSubmit={handleVerifyOtp}
            >
              <div className="mb-4 flex flex-col items-center text-center">
                <span className="mb-2 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-500">
                  <FaShieldAlt size={20} />
                </span>
                <p className="text-sm text-gray-600">
                  کد ۶ رقمی ارسال‌شده به
                  <span className="mx-1 font-semibold text-gray-900" dir="ltr">
                    {identifier}
                  </span>
                  را وارد کنید
                </p>
              </div>

              <OtpInput value={code} onChange={setCode} disabled={isSubmitting} />

              {error && <p className="mt-3 text-center text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full rounded-lg bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? "در حال بررسی…" : "تایید و ورود"}
              </button>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => {
                    setStep("identifier");
                    setCode("");
                    setError(null);
                  }}
                  className="hover:text-brand-600"
                >
                  ویرایش شماره
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || isSubmitting}
                  className="disabled:text-gray-300"
                >
                  {cooldown > 0 ? `ارسال مجدد تا ${cooldown} ثانیه دیگر` : "ارسال مجدد کد"}
                </button>
              </div>
            </motion.form>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center py-6 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600"
              >
                <FaCheck size={26} />
              </motion.span>
              <h2 className="mb-1 text-lg font-bold text-gray-900">ورود موفقیت‌آمیز بود</h2>
              <p className="text-sm text-gray-500">در حال انتقال به فروشگاه…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
