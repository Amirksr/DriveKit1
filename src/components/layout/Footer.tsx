"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import eNamad from "@/assets/images/logo/eNamad.png";
import eMalz from "@/assets/images/logo/eMalz.svg";
import Mojavez from "@/assets/images/logo/Mojavez.webp";

const footerColumns = [
  {
    title: "دسته بندی مقالات",
    items: ["مقاله اول", "مقاله دوم", "مقاله سوم", "مقاله چهارم", "مقاله پنجم"],
  },
  {
    title: "خدمات مشتریان",
    items: [
      "پیگیری سفارش",
      "دستورالعمل خرید",
      "ارسال سفارشات برای تهران",
      "ارسال سفارشات برای سایر شهرها",
      "رویه مرجوعی کالا",
    ],
  },
  {
    title: "دسترسی سریع",
    items: ["قوانین و مقررات", "فروشنده شو", "سوالات متداول", "ارتباط با ما", "اهداف و تعهدات آدورا یدک"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/** Site-wide footer: link columns, support info, and trust-seal logos. */
export default function Footer() {
  return (
    <motion.footer
      className="mt-10 bg-surmeh pb-6 pt-10 text-gray-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-5">
        {footerColumns.map((col) => (
          <motion.div key={col.title} variants={fadeUp}>
            <h5 className="mb-3 font-bold text-white">{col.title}</h5>
            <ul className="space-y-2 text-sm">
              {col.items.map((item) => (
                <li key={item} className="cursor-pointer hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-2">
          <h5 className="mb-3 font-bold text-white">فروشگاه لوازم یدکی آدورا یدک</h5>
          <p className="mb-2 text-sm">
            پشتیبانی آدورا یدک: ۷ روز هفته از ساعت ۹:۰۰ الی ۲۱:۰۰ پاسخگوی شما هستیم
          </p>
          <span className="text-sm text-gray-400">تلفن همراه پشتیبانی:</span>
          <div className="my-2 w-fit rounded-md bg-white/10 px-3 py-1 font-mono">
            ۰۹۱۲-۸۹۳-۶۶۴۵
          </div>
          <p className="text-sm">
            آدرس خرید حضوری: میدان منیریه، خیابان پانزده خرداد، کوچه ملکی، پلاک ۶، واحد ۲
          </p>
        </motion.div>
      </div>

      <div className="mx-auto my-6 max-w-7xl border-t border-white/10 px-4" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 lg:flex-row lg:justify-between">
        <motion.div variants={fadeUp} className="lg:max-w-2xl">
          <h6 className="mb-1 font-semibold text-white">
            فروشگاه آنلاین آدورا یدک، تامین کالا از برندهای معتبر قطعات خودرو
          </h6>
          <p className="text-sm leading-relaxed text-gray-400">
            فروشگاه آنلاین لوازم یدکی آدورا یدک با هدف ایجاد بستری مناسب برای تامین قطعات خودرو
            شکل گرفت. این فروشگاه جهت برآورده کردن خواسته‌های مشتریان از نظر کیفیت و اصالت،
            همواره در تلاش است تا بهترین قیمت را برای برندهای مطرح بازار ارائه دهد.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <Image src={eNamad} alt="نماد اعتماد الکترونیکی" className="h-12 w-auto" />
          <Image src={eMalz} alt="نماد اعتماد" className="h-12 w-auto" />
          <Image src={Mojavez} alt="نماد اعتماد" className="h-12 w-auto" />
        </motion.div>
      </div>
    </motion.footer>
  );
}
