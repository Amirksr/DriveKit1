import type { Metadata } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "آدورا یدک | فروشگاه آنلاین لوازم یدکی خودرو",
  description:
    "خرید آنلاین لوازم یدکی اورجینال خودرو با ضمانت اصالت کالا، ارسال سریع و امکان بازگشت کالا.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
