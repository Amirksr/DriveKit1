import type { StaticImageData } from "next/image";

import like from "@/assets/images/buyFromUs/like.svg";
import truck from "@/assets/images/buyFromUs/truck.svg";
import returnProduct from "@/assets/images/buyFromUs/returnProduct.svg";
import original from "@/assets/images/buyFromUs/original.svg";

export interface ValueProposition {
  icon: StaticImageData;
  title: string;
  desc: string;
}

/** The four trust/value propositions shown in the "Why buy from us" section. */
export const WHY_BUY_FROM_US: ValueProposition[] = [
  {
    icon: original,
    title: "ضمانت اصل بودن کالا",
    desc: "محصولات اورجینال با بهترین کیفیت",
  },
  {
    icon: returnProduct,
    title: "ضمانت ۷ روزه بازگشت کالا",
    desc: "گارانتی بی قید و شرط محصول",
  },
  {
    icon: truck,
    title: "خرید آسان و ارسال سریع",
    desc: "صرفه‌جویی در وقت و سادگی خرید",
  },
  {
    icon: like,
    title: "حذف واسطه‌ها",
    desc: "خرید مستقیم از وارد‌کننده قطعات",
  },
];
