"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ABOUT_STATS, ABOUT_TIMELINE, ABOUT_VALUES } from "@/data/about";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,_#1e3a5f_0%,_#0f2038_100%)] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-4 text-2xl font-extrabold md:text-4xl"
          >
            درباره <span className="text-brand-400">آدورا یدک</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-gray-300"
          >
            از یک فروشگاه کوچک محلی تا یک فروشگاه آنلاین قابل‌اعتماد برای هزاران راننده در سراسر
            ایران — داستان ما همیشه درباره‌ی یک چیز بوده: قطعه‌ی درست، با قیمت درست، به‌موقع.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4"
      >
        {ABOUT_STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center">
            <p className="text-2xl font-extrabold text-brand-500 md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Values */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-xl font-bold text-gray-900">ارزش‌های ما</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {ABOUT_VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <h3 className="mb-2 font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="mb-10 text-center text-xl font-bold text-gray-900">مسیر ما تا امروز</h2>
        <div className="relative border-e-2 border-brand-100 pe-6">
          {ABOUT_TIMELINE.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -end-[31px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-brand-100" />
              <p className="mb-1 text-sm font-bold text-brand-600">{item.year}</p>
              <h3 className="mb-1 font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mb-14 max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 rounded-2xl bg-surmeh px-6 py-10 text-center text-white md:flex-row md:justify-between md:text-start"
        >
          <div>
            <h3 className="mb-1 text-lg font-bold">آماده‌اید بهترین قطعه رو پیدا کنید؟</h3>
            <p className="text-sm text-gray-300">هزاران قطعه اورجینال، فقط چند کلیک با شما فاصله دارد.</p>
          </div>
          <Link
            href="/all-products"
            className="shrink-0 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
          >
            مشاهده محصولات
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
