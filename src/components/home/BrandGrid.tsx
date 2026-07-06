"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS } from "@/data/brands";

const brandVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
};

/** Grid of supplier/brand logos shown on the homepage. */
export default function BrandGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h4 className="mb-6 text-lg font-bold text-gray-900">برترین برندهای آدورا</h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {BRANDS.map((brand, index) => (
          <motion.div
            key={brand.name}
            className="flex h-24 items-center justify-center rounded-lg bg-white p-3 shadow-card transition-transform hover:-translate-y-1 hover:shadow-card-hover"
            variants={brandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              className="max-h-16 w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
