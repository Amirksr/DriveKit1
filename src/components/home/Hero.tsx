"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import carImage from "@/assets/images/car/bmw.png";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

const carVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const socialIcons = [FaFacebookF, FaInstagram, FaLinkedinIn];

/** Homepage hero banner: headline, CTA button, and the featured car illustration. */
export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-4 py-12 md:flex-row">
        <div className="w-full md:w-1/2">
          <motion.h1
            className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={textVariants}
            custom={0}
          >
            خرید لوازم <span className="text-brand-500">یدکی اورجینال</span> با
            <br />
            <span>ضمانت مرجوعی</span>
          </motion.h1>

          <motion.p
            className="mb-6 text-gray-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={textVariants}
            custom={1}
          >
            هزاران قطعه اصل و باکیفیت برای انواع خودروهای داخلی و خارجی، با ارسال سریع
            و امکان بازگشت کالا.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={textVariants}
            custom={2}
          >
            <Link
              href="/all-products"
              className="inline-block rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
            >
              مشاهده محصولات
            </Link>
          </motion.div>
        </div>

        <div className="relative flex w-full items-center justify-center md:w-1/2">
          <div className="hidden flex-col gap-3 self-start pt-6 md:absolute md:end-2 md:flex">
            {socialIcons.map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                aria-label="social link"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3, once: true }}
                variants={textVariants}
                custom={index + 3}
                className="text-gray-400 hover:text-brand-500"
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={carVariants}
            className="relative w-full max-w-md"
          >
            <Image src={carImage} alt="خودروی نمایشی" priority className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
