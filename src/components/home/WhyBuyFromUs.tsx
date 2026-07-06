"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHY_BUY_FROM_US } from "@/data/whyBuyFromUs";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/** Four trust badges (authenticity, returns, delivery, no middlemen) shown near the footer. */
export default function WhyBuyFromUs() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <h5 className="mb-6 text-lg font-bold text-gray-900">چرا خرید از ما؟</h5>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_BUY_FROM_US.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
          >
            <Image src={item.icon} alt={item.title} width={40} height={40} />
            <div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
