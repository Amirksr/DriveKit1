/**
 * Single source of truth mapping each catalogue folder slug (used as the
 * directory name under `public/assets/products-list/`) to its Persian
 * display name.
 *
 * The original project duplicated this object across four different
 * components (`ProductList`, `AllProducts`, `NewProducts`, `SpecialOffers`);
 * consolidating it here keeps the category list consistent and makes it a
 * one-line change if a category is renamed or added.
 */
export const CATEGORY_SLUG_TO_LABEL: Record<string, string> = {
  sarploos: "سرپلوس (پلوس خارجی)",
  "mashali-plloos": "مشعلی پلوس (پلوس داخلی)",
  clutch: "دیسک و صفحه (کلاچ)",
  radiator: "رادیاتور",
  "motor-fan": "موتور فن",
  "propeller-fan": "پروانه فن",
  "bumper-grille": "سپر و جلو پنجره",
  headlight: "چراغ",
  "tire-r13": "کویر تایر رینگ 13",
  "tire-r14": "کویر تایر رینگ 14",
  "tire-r15": "کویر تایر رینگ 15",
  "tire-r16": "کویر تایر رینگ 16",
  "tire-r17": "کویر تایر رینگ 17",
  "tire-bridgestone": "لاستیک بریجستون",
  bearing: "بلبرینگ",
  "shock-absorber": "کمک فنر",
  "brake-pad": "لنت ترمز",
  "engine-mount": "دسته موتور",
  "brake-disc": "دیسک ترمز",
  "axle-parts": "قطعات اکسل",
  "strut-mount": "توپی سر کمک",
  "hydraulic-pump": "پمپ هیدرولیک",
  "brake-pump": "پمپ ترمز",
  "steering-valve": "شیر فرمان",
  "suspension-parts": "قطعات جلوبندی",
  "engine-bearings": "بلبرینگ های موتوری",
  "alternator-belt": "تسمه دینام",
  thermostat: "ترموستات",
  "oil-seal-o-ring": "کاسه نمد و اورینگ",
  "injector-nozzle": "سوزن انژکتور",
  "head-gasket": "واشر سر سیلندر",
  "timing-belt": "تسمه تایم",
  "spark-plug-wire": "شمع و وایر شمع",
  "relay-unit": "رله و یونیت",
  "speed-knock-sensor": "سنسور سرعت و ناک",
  "ignition-coil": "کویل",
  "abs-speed-sensor": "سنسور سرعت چرخ (ABS)",
  "oxygen-sensor": "سنسور اکسیژن",
  "throttle-sensor": "سنسور دریچه گاز",
  "map-sensor": "سنسور منیفولد (مپ سنسور)",
};

export const CATEGORY_SLUGS = Object.keys(CATEGORY_SLUG_TO_LABEL);
export const CATEGORY_LABELS = Object.values(CATEGORY_SLUG_TO_LABEL);

/** Reverse lookup: Persian label -> folder slug. Built once at module load. */
export const CATEGORY_LABEL_TO_SLUG: Record<string, string> = Object.entries(
  CATEGORY_SLUG_TO_LABEL
).reduce((acc, [slug, label]) => {
  acc[label] = slug;
  return acc;
}, {} as Record<string, string>);

/** Top-level navigation used by the header's mega-menu. */
export interface NavCategory {
  name: string;
  sub?: string[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    name: "انتقال نیرو",
    sub: ["سرپلوس (پلوس خارجی)", "مشعلی پلوس (پلوس داخلی)", "دیسک و صفحه (کلاچ)"],
  },
  { name: "سیستم خنک‌کننده", sub: ["رادیاتور", "موتور فن", "پروانه فن"] },
  { name: "قطعات بدنه", sub: ["سپر و جلو پنجره", "چراغ"] },
  {
    name: "لاستیک",
    sub: [
      "کویر تایر رینگ 13",
      "کویر تایر رینگ 14",
      "کویر تایر رینگ 15",
      "کویر تایر رینگ 16",
      "کویر تایر رینگ 17",
      "لاستیک بریجستون",
    ],
  },
  {
    name: "جلوبندی و فرمان",
    sub: [
      "بلبرینگ",
      "کمک فنر",
      "لنت ترمز",
      "دسته موتور",
      "دیسک ترمز",
      "قطعات اکسل",
      "توپی سر کمک",
      "پمپ هیدرولیک",
      "پمپ ترمز",
      "شیر فرمان",
      "قطعات جلوبندی",
    ],
  },
  {
    name: "قطعات موتور",
    sub: [
      "بلبرینگ های موتوری",
      "تسمه دینام",
      "ترموستات",
      "کاسه نمد و اورینگ",
      "سوزن انژکتور",
      "واشر سر سیلندر",
      "تسمه تایم",
      "شمع و وایر شمع",
    ],
  },
  {
    name: "سنسور و الکترونیکی",
    sub: [
      "رله و یونیت",
      "سنسور سرعت و ناک",
      "کویل",
      "سنسور سرعت چرخ (ABS)",
      "سنسور اکسیژن",
      "سنسور دریچه گاز",
      "سنسور منیفولد (مپ سنسور)",
    ],
  },
];

export const CAR_OPTIONS: string[] = [
  "کوئیک", "پراید", "سمند", "پژو 405", "تیبا", "دنا EF7", "پژو 206",
  "پژو پارس", "پژو 207", "ساینا", "رانا", "L 90", "نیسان", "دنا پلاس",
  "دنا پلاس توربو", "تارا", "MVM X22", "MVM X22PRO", "زانتیا", "شاهین",
  "کامیونت", "MVM X33", "لیفان X60", "دانگ فنگ H30 cross", "کیا اپتیما",
  "جک S5", "چری آریزو ۶",
];

export const BRAND_OPTIONS: string[] = [
  "پارت فیدار", "ایساکو", "کروز", "مپنا", "ایران خودرو", "سکو", "والئو",
  "جی آی اس پی", "IREMCO", "پاورگریپ گیتس", "ورنت", "باباپارت", "امیرنیا",
  "رفیع نیا", "روژان صنعت لوتوس", "مشهد واشر", "مدیران خودرو",
  "ویکتور رینز", "ESP", "DENSO", "NGK", "بریجستون", "کویرتایر",
  "کوشش رادیاتور",
];
