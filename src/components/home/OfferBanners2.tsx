"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import banner4 from "@/assets/images/banners/banner4.jpg";
import banner5 from "@/assets/images/banners/banner5.jpg";
import banner6 from "@/assets/images/banners/banner6.jpg";

const smallBanners = [
  { src: banner4, title: "جلوبندی و تعلیق", desc: "راحتی بیشتر از این؟", delay: 0.1 },
  { src: banner5, title: "تسمه تایم و کیت تایم", desc: "به موقع تعویض کن!", delay: 0.3 },
];

/** Shared button style so the "buy" button is the exact same size across all three banners. */
const buyButtonClass =
  "mt-1 w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-md transition-transform hover:scale-105";

/** Shared caption-text style: white with a drop-shadow for legibility directly over the photo — no dark backdrop behind it. */
const captionTextClass = "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]";

/**
 * Secondary banner row: two stacked small banners + one large feature
 * banner. Each banner's caption (title + description + button) sits
 * directly over the image with no dark backdrop — legibility comes from
 * a text-shadow instead of a matte/glass panel — and is anchored to the
 * bottom-LEFT, using `dir="ltr"` so the button/text lean left regardless
 * of the page's overall RTL direction.
 */
export default function OfferBanners2() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          {smallBanners.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="relative h-48 overflow-hidden rounded-2xl sm:h-56 lg:h-[190px]"
            >
              <Image src={item.src} alt={item.title} fill className="object-cover" />
              <div
                dir="ltr"
                className="absolute bottom-0 start-0 flex max-w-[70%] flex-col items-start gap-0.5 p-4"
              >
                <h5 className={`font-bold ${captionTextClass}`}>{item.title}</h5>
                <p className={`text-sm ${captionTextClass}`}>{item.desc}</p>
                <button className={buyButtonClass}>خرید</button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative h-48 overflow-hidden rounded-2xl sm:h-56 lg:col-span-8 lg:h-[400px]"
        >
          <Image src={banner6} alt="دیسک و لنت" fill className="object-cover" />
          <div
            dir="ltr"
            className="absolute bottom-0 start-0 flex max-w-[70%] flex-col items-start gap-1 p-6"
          >
            <h5 className={`text-lg font-bold ${captionTextClass}`}>دیسک و لنت</h5>
            <p className={captionTextClass}>دنبال بهترین برندهایی؟</p>
            <button className={buyButtonClass}>خرید</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
