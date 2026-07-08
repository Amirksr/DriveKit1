export interface StatItem {
  label: string;
  value: string;
}

export const ABOUT_STATS: StatItem[] = [
  { value: "+۸", label: "سال تجربه در بازار قطعات خودرو" },
  { value: "+۱۲,۰۰۰", label: "قطعه فعال در انبار" },
  { value: "+۴۰", label: "برند معتبر داخلی و خارجی" },
  { value: "+۲۵,۰۰۰", label: "مشتری راضی" },
];

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const ABOUT_TIMELINE: TimelineItem[] = [
  {
    year: "۱۳۹۶",
    title: "شروع کار به‌صورت فروش حضوری",
    description: "فعالیت آدورا یدک با یک فروشگاه کوچک در میدان منیریه آغاز شد.",
  },
  {
    year: "۱۳۹۹",
    title: "راه‌اندازی فروش تلفنی و ارسال به سراسر کشور",
    description: "با گسترش انبار، امکان ارسال قطعات به تمام شهرهای ایران فراهم شد.",
  },
  {
    year: "۱۴۰۱",
    title: "ورود رسمی به فروش آنلاین",
    description: "اولین نسخه فروشگاه اینترنتی آدورا یدک راه‌اندازی شد.",
  },
  {
    year: "۱۴۰۴",
    title: "بازطراحی کامل تجربه خرید آنلاین",
    description: "فروشگاه با زیرساخت جدید و تجربه کاربری سریع‌تر از نو ساخته شد.",
  },
];

export interface ValueItem {
  title: string;
  description: string;
}

export const ABOUT_VALUES: ValueItem[] = [
  {
    title: "اصالت کالا",
    description: "تمام قطعات پیش از عرضه از نظر اصالت و کیفیت بررسی می‌شوند.",
  },
  {
    title: "شفافیت قیمت",
    description: "قیمت‌گذاری منصفانه و بدون واسطه‌های غیرضروری.",
  },
  {
    title: "پشتیبانی واقعی",
    description: "تیم پشتیبانی پاسخگوی سوالات فنی شما پیش و پس از خرید است.",
  },
];
