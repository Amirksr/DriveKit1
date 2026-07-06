"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import banner1 from "@/assets/images/banners/banner1.png";
import banner3 from "@/assets/images/banners/banner3.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Pair of large promotional banners shown between the special offers and new-arrivals sections. */
export default function OfferBanners1() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="group relative overflow-hidden rounded-2xl lg:col-span-8"
        >
          <Image src={banner1} alt="بنر تبلیغاتی ۱" className="w-full object-cover" />
          <button className="absolute bottom-4 start-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-md transition-transform group-hover:scale-105">
            خرید
          </button>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="group relative overflow-hidden rounded-2xl lg:col-span-4"
        >
          <Image src={banner3} alt="بنر تبلیغاتی ۲" className="w-full object-cover" />
          <button className="absolute bottom-4 start-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-md transition-transform group-hover:scale-105">
            خرید
          </button>
        </motion.div>
      </div>
    </section>
  );
}
