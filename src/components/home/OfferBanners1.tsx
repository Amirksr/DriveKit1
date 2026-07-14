"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import banner1 from "@/assets/images/banners/banner1.png";
import banner2 from "@/assets/images/banners/banner2.png";
import banner3 from "@/assets/images/banners/banner3.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Shared button style — kept identical across every banner on the homepage. */
const buyButtonClass =
  "absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-md transition-transform hover:scale-105";

const stackedBanners = [
  { src: banner2, delay: 0.2 },
  { src: banner3, delay: 0.35 },
];

/**
 * Three promotional banners between the special offers and new-arrivals
 * sections: one large feature banner plus two smaller ones stacked
 * beside it — `banner2`, previously an unused leftover asset from the
 * original project, now fills the second small slot alongside `banner3`.
 */
export default function OfferBanners1() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="group relative h-48 overflow-hidden rounded-2xl sm:h-56 lg:col-span-8 lg:h-[400px]"
        >
          <Image src={banner1} alt="بنر تبلیغاتی ۱" fill className="object-cover" />
          <button className={buyButtonClass}>خرید</button>
        </motion.div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          {stackedBanners.map((banner, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: banner.delay }}
              className="group relative h-48 overflow-hidden rounded-2xl sm:h-56 lg:h-[190px]"
            >
              <Image
                src={banner.src}
                alt={`بنر تبلیغاتی ${index + 2}`}
                fill
                className="object-cover"
              />
              <button className={buyButtonClass}>خرید</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
