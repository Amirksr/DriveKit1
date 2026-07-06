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

/** Secondary banner row: two stacked small banners + one large feature banner. */
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
              className="relative overflow-hidden rounded-2xl"
            >
              <Image src={item.src} alt={item.title} className="w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <h5 className="font-bold">{item.title}</h5>
                <p className="text-sm">{item.desc}</p>
                <button className="mt-2 w-fit rounded-lg bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                  خرید
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative overflow-hidden rounded-2xl lg:col-span-8"
        >
          <Image src={banner6} alt="دیسک و لنت" className="w-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <h5 className="text-lg font-bold">دیسک و لنت</h5>
            <p>دنبال بهترین برندهایی؟</p>
            <button className="mt-3 w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900">
              خرید
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
