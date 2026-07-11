"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaCheck } from "react-icons/fa";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CONTACT_INFO = [
  {
    icon: FaMapMarkerAlt,
    title: "آدرس فروشگاه",
    detail: "تهران، میدان منیریه، خیابان پانزده خرداد، کوچه ملکی، پلاک ۶",
  },
  { icon: FaPhoneAlt, title: "تلفن پشتیبانی", detail: "۰۹۱۲-۸۹۳-۶۶۴۵" },
  { icon: FaEnvelope, title: "ایمیل", detail: "support@adorayadak.example" },
  { icon: FaClock, title: "ساعات پاسخگویی", detail: "همه روزه، ۹:۰۰ الی ۲۱:۰۰" },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Isfahan,Meydan-e-Manirieh&output=embed";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const updateField = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    // No backend endpoint exists yet — this simulates a submit so the
    // form's UX (loading + success states) can be reviewed end-to-end.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    setForm({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />

      <section className="bg-[linear-gradient(135deg,_#1e3a5f_0%,_#0f2038_100%)] py-14 text-center text-white">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-2xl font-extrabold md:text-4xl"
        >
          تماس با <span className="text-brand-400">آدورا یدک</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-3 max-w-lg px-4 text-gray-300"
        >
          سوالی درباره یک قطعه دارید یا نیاز به مشاوره خرید دارید؟ تیم ما آماده پاسخگویی است.
        </motion.p>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 lg:grid-cols-12">
        {/* Info cards + map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col gap-4 lg:col-span-5"
        >
          {CONTACT_INFO.map(({ icon: Icon, title, detail }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                <Icon />
              </span>
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500" dir={title === "تلفن پشتیبانی" ? "ltr" : undefined}>
                  {detail}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            className="mt-2 overflow-hidden rounded-xl border border-gray-100"
          >
            <iframe
              title="نقشه فروشگاه"
              src={MAP_EMBED_SRC}
              className="h-56 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-gray-100 p-6 shadow-card lg:col-span-7"
        >
          {status === "sent" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600"
              >
                <FaCheck size={26} />
              </motion.span>
              <h3 className="mb-1 font-bold text-gray-900">پیام شما ارسال شد</h3>
              <p className="text-sm text-gray-500">تیم پشتیبانی در اسرع وقت با شما تماس می‌گیرد.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm font-medium text-brand-600 hover:underline"
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">شماره تماس</label>
                <input
                  required
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-start focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">موضوع</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">پیام</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="sm:col-span-2 mt-2 rounded-lg bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {status === "sending" ? "در حال ارسال…" : "ارسال پیام"}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
