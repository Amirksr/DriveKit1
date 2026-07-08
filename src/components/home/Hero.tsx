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

/** Faint blurred tire skid mark that sits behind the car illustration. */
const tireVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.15, transition: { duration: 1.2, ease: "easeOut" } },
};

const carVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const socialIconVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const socialIcons = [FaFacebookF, FaInstagram, FaLinkedinIn];

/**
 * Homepage hero banner. The image column has a hard-edged navy/white
 * split background (`linear-gradient(to right, #1e3a5f 50%, #ffffff 50%)`)
 * so its white half visually merges with the text column next to it,
 * giving the illustration a subtle sense of depth. A faint tire-mark
 * image sits behind the car, and the car + social icons animate in with
 * a staggered fade/slide on load.
 */
export default function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="flex flex-col-reverse items-stretch md:flex-row">
        <div className="flex w-full flex-col justify-center gap-6 bg-white p-8 md:w-1/2 md:p-12">
          <motion.h1
            className="text-2xl font-bold leading-relaxed text-gray-900 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={textVariants}
            custom={0}
          >
            خرید لوازم <span className="text-brand-500">یدکی اورجینال</span> با
            <br />
            <span className="font-bold text-gray-900">ضمانت مرجوعی</span>
          </motion.h1>

          <motion.p
            className="text-gray-500"
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
              className="inline-block rounded-md bg-[#406696] px-6 py-3 font-medium text-white transition-colors hover:bg-[#2c4566]"
            >
              مشاهده محصولات
            </Link>
          </motion.div>
        </div>

        <div className="relative flex min-h-[300px] w-full items-center justify-center bg-white md:min-h-[400px] md:w-1/2 md:bg-[linear-gradient(to_right,_#1e3a5f_50%,_#ffffff_50%)]">
          {/* Social icons, anchored near the right edge like the original */}
          <div className="absolute end-2 top-[35%] z-[5] hidden -translate-y-1/2 flex-col md:flex">
            {socialIcons.map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                aria-label="social link"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3, once: true }}
                variants={socialIconVariants}
                custom={index}
                className="mb-5 text-white transition-colors hover:text-brand-400"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          <div className="relative w-full">
            <motion.img
              src="/images/tire-mark.png"
              alt=""
              aria-hidden
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: true }}
              variants={tireVariants}
              className="pointer-events-none absolute end-[35%] top-1/2 z-0 w-4/5 -translate-y-1/2 blur-[0.5px]"
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: true }}
              variants={carVariants}
              className="relative z-[1]"
            >
              <Image src={carImage} alt="خودروی نمایشی" priority className="w-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
