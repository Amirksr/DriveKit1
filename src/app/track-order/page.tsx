"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaCheckCircle, FaShippingFast, FaClipboardCheck, FaSearch } from "react-icons/fa";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TRACKING_STEPS = [
  { key: "placed", label: "ثبت سفارش", icon: FaClipboardCheck },
  { key: "processing", label: "آماده‌سازی سفارش", icon: FaBoxOpen },
  { key: "shipped", label: "ارسال شده", icon: FaShippingFast },
  { key: "delivered", label: "تحویل داده شده", icon: FaCheckCircle },
] as const;

/**
 * There's no real order database to query, so submitting the form derives
 * a deterministic "current step" from the order number itself (its
 * length modulo the number of steps). This keeps the result stable for a
 * given input — good enough to demo the tracking UI convincingly — while
 * being clearly not real order data.
 */
function deriveStepIndex(orderNumber: string): number {
  const digitsOnly = orderNumber.replace(/\D/g, "");
  if (!digitsOnly) return 0;
  const sum = digitsOnly.split("").reduce((total, digit) => total + Number(digit), 0);
  return sum % TRACKING_STEPS.length;
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<{ stepIndex: number; orderNumber: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setResult({ stepIndex: deriveStepIndex(orderNumber), orderNumber: orderNumber.trim() });
  };

  return (
    <>
      <Header />

      <section className="bg-[linear-gradient(135deg,_#1e3a5f_0%,_#0f2038_100%)] py-14 text-center text-white">
        <h1 className="text-2xl font-extrabold md:text-4xl">
          پیگیری <span className="text-brand-400">سفارش</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg px-4 text-gray-300">
          شماره سفارش و شماره تماسی که هنگام ثبت سفارش وارد کرده‌اید را وارد کنید.
        </p>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-14">
        <form
          onSubmit={handleSubmit}
          className="mb-10 flex flex-col gap-4 rounded-2xl border border-gray-100 p-6 shadow-card sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">شماره سفارش</label>
            <input
              required
              dir="ltr"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="مثال: 10245"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-start focus:border-brand-400 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">شماره موبایل</label>
            <input
              required
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xxxxxxxxx"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-start focus:border-brand-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FaSearch /> {isSubmitting ? "در حال بررسی…" : "پیگیری"}
          </button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-100 p-6 shadow-card"
          >
            <p className="mb-6 text-sm text-gray-500">
              وضعیت سفارش <span className="font-bold text-gray-900" dir="ltr">#{result.orderNumber}</span>
            </p>

            <div className="relative flex justify-between">
              <div className="absolute inset-x-0 top-5 h-1 rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(result.stepIndex / (TRACKING_STEPS.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-1 rounded-full bg-brand-500"
                />
              </div>

              {TRACKING_STEPS.map((step, index) => {
                const isDone = index <= result.stepIndex;
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.15, duration: 0.4 }}
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 text-sm ${
                        isDone
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-gray-200 bg-white text-gray-300"
                      }`}
                    >
                      <step.icon />
                    </motion.span>
                    <span
                      className={`max-w-[70px] text-center text-xs ${
                        isDone ? "font-semibold text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  );
}
