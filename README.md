# DriveKit 🚗

**A modern, RTL-first auto-parts e-commerce storefront**, rebuilt from the ground up with Next.js 14 (App Router), TypeScript, Tailwind CSS, Redux Toolkit, and MongoDB.

**یک فروشگاه آنلاین قطعات خودرو، مدرن و راست‌به‌چپ (RTL)**، که با Next.js 14 (App Router)، TypeScript، Tailwind CSS، Redux Toolkit و MongoDB از پایه بازنویسی شده است.

> 🇮🇷 Demo/portfolio project — product data, prices, and store details are illustrative.
> این یک پروژه‌ی نمایشی/نمونه‌کار است — داده‌ها، قیمت‌ها و اطلاعات فروشگاه صرفاً جنبه‌ی نمایشی دارند.

**[English](#english) · [فارسی](#فارسی)**

---
<a id="english"></a>
## 🇬🇧 English

### ✨ Highlights

- **Next.js 14 App Router** — server-rendered catalogue pages, client components only where real interactivity is needed (filters, cart, wishlist, OTP auth).
- **TypeScript throughout**, `strict` mode + `noUncheckedIndexedAccess`, with a single shared `Product`/`CartItem` type vocabulary (`src/types`).
- **Tailwind CSS** end to end — no Bootstrap, no mixed styling systems.
- **MongoDB + Mongoose** as the catalogue's source of truth, with a typed data-access layer (`src/lib/products.ts`) and a `/api/products` route supporting category, multi-category, search, discount, stock, and price filters.
- **Redux Toolkit**, typed end-to-end, for the cart and wishlist.
- **OTP-based login/signup** (`/login`) — a single phone/email flow that unifies sign-in and sign-up, with a 6-digit code input, resend cooldown, and a blurred hero-image backdrop. Authentication itself is mocked (see `src/lib/mockAuth.ts`) — swap in a real provider before production.
- **Content pages**: About (`/about`), Contact (`/contact`, with a working form and embedded map), Track Order (`/track-order`, animated status timeline), and a Blog (`/blog` + `/blog/[slug]`) with sample posts.
- **Product cards** with fixed-height sections so cards always align in a grid regardless of title length or whether a product is discounted; titles that overflow expand on hover without shifting layout.
- **Automated tests** — unit tests (Jest + React Testing Library) for price math, Redux reducers, and component behavior, plus a MongoDB-backed integration suite using `mongodb-memory-server`.
- **CI-ready** — GitHub Actions runs lint, type-check, unit tests, and a production build on every push/PR.

### 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| State | Redux Toolkit + React-Redux |
| Database | MongoDB (via Mongoose) |
| Animation | Framer Motion |
| Carousels | Swiper |
| Testing | Jest, React Testing Library, mongodb-memory-server |
| CI | GitHub Actions |

### 📂 Project structure

```
src/
├── app/
│   ├── page.tsx                # Home
│   ├── all-products/           # Category-name search + full catalogue grid
│   ├── products/list/          # Category page with advanced filters
│   ├── cart/                   # Shopping cart
│   ├── login/                  # OTP login/signup
│   ├── about/                  # About page
│   ├── contact/                # Contact page (form + map)
│   ├── track-order/            # Order tracking demo
│   ├── blog/ + blog/[slug]/    # Blog listing + post detail
│   └── api/products/           # REST endpoint backed by MongoDB
├── components/
│   ├── layout/                 # Header (mega-menu, mobile drawer, search), Footer
│   ├── home/                   # Hero, banners, carousels
│   ├── product/                # Shared <ProductCard />
│   ├── auth/                   # OTP input
│   └── providers/               # Redux <Provider> wrapper
├── redux/                      # store, typed hooks, cart & wishlist slices
├── lib/                        # price.ts, products.ts, mongodb.ts, mockAuth.ts, hooks
├── models/                     # Mongoose schemas
├── data/                       # Static reference data (categories, brands, blog posts…)
└── types/                      # Shared TypeScript types
scripts/
└── seed.ts                     # Imports the JSON catalogue into MongoDB
__tests__/
├── lib/, redux/, components/   # Fast unit tests (no external services)
└── integration/                # MongoDB-backed tests (mongodb-memory-server)
```

### 🚀 Getting started

**1. Install dependencies**
```bash
npm install
```

**2. Configure MongoDB**
```bash
cp .env.example .env.local
```
Then point `MONGODB_URI` at either:
- **Docker**: `docker run -d -p 27017:27017 --name drivekit-mongo mongo:7`
- **MongoDB Atlas** (free tier): create a cluster at https://www.mongodb.com/atlas.

**3. Seed the catalogue**
```bash
npm run seed
```
Idempotent — safe to re-run any time the JSON catalogue changes.

**4. Run the dev server**
```bash
npm run dev
```
Visit http://localhost:3000.

### 🔐 Trying the OTP login

Go to `/login`, enter any valid-looking phone number or email, request a code, then enter **`123456`** — the one fixed "correct" code in the mock auth layer.

### 🧪 Testing

```bash
npm test                 # fast unit tests
npm run test:coverage    # same, with coverage
npm run test:integration # MongoDB-backed tests via mongodb-memory-server
npm run type-check       # tsc --noEmit
npm run lint             # ESLint
```

### ☁️ Deploying

1. Push to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Add `MONGODB_URI` (and optionally `MONGODB_DB`) as environment variables.
4. Run `npm run seed` once, pointed at your production database.

### 📝 Notable design decisions

- **MongoDB instead of static JSON**: a single indexed query per page instead of fetching ~40 separate JSON files client-side, plus server-side filtering/search and room for an admin panel or checkout flow later.
- **One `ProductCard`**: discount styling, wishlist state, and the expandable-title behavior only need to be correct in one place, used by every grid and carousel on the site.
- **Tailwind over Bootstrap**: one styling system instead of two, with responsive behavior (mobile drawer vs. desktop mega-menu) handled declaratively.
- **Mock OTP auth**: demonstrates the full UX (request code → verify → success) without a real backend; `src/lib/mockAuth.ts` is the single place to wire up a real provider.

### 📄 License

MIT — see [LICENSE](./LICENSE).

### 👤 Author

**Amir Kasraeian** — Frontend Developer (React / Next.js)
[GitHub](https://github.com/Amirksr) · [LinkedIn](https://linkedin.com/in/amir-kasraeian) · [Portfolio](https://amirkasraeian.vercel.app)

---
<a id="فارسی"></a>
## 🇮🇷 فارسی

### ✨ ویژگی‌های کلیدی

- **Next.js 14 (App Router)** — صفحات کاتالوگ سمت سرور رندر می‌شوند و کامپوننت‌های کلاینت فقط جایی استفاده شده‌اند که واقعاً تعامل لازم است (فیلترها، سبد خرید، علاقه‌مندی‌ها، احراز هویت با کد یکبار مصرف).
- **TypeScript در سراسر پروژه**، با حالت `strict` و `noUncheckedIndexedAccess`، و یک واژگان تایپی مشترک برای `Product`/`CartItem` (در `src/types`).
- **Tailwind CSS** به‌طور کامل — بدون Bootstrap و بدون قاطی شدن دو سیستم استایل‌دهی.
- **MongoDB + Mongoose** به‌عنوان منبع اصلی داده‌ی کاتالوگ، همراه با یک لایه‌ی دسترسی به داده‌ی تایپ‌شده (`src/lib/products.ts`) و یک روت `/api/products` که فیلتر بر اساس دسته‌بندی، چند دسته‌بندی هم‌زمان، جستجو، تخفیف، موجودی و بازه‌ی قیمت را پشتیبانی می‌کند.
- **Redux Toolkit** با تایپ کامل، برای سبد خرید و علاقه‌مندی‌ها.
- **ورود/ثبت‌نام با رمز یکبار مصرف (OTP)** در مسیر `/login` — یک فرآیند واحد برای هم ورود و هم ثبت‌نام با شماره موبایل یا ایمیل، همراه با ورودی کد ۶ رقمی، تایمر ارسال مجدد، و پس‌زمینه‌ی محو از تصویر هیرو. خودِ احراز هویت شبیه‌سازی‌شده است (`src/lib/mockAuth.ts`) — پیش از انتشار واقعی باید با یک سرویس واقعی جایگزین شود.
- **صفحات محتوایی**: درباره ما (`/about`)، تماس با ما (`/contact`، همراه با فرم کارکردی و نقشه‌ی جاسازی‌شده)، پیگیری سفارش (`/track-order`، با تایم‌لاین وضعیت انیمیشنی)، و بلاگ (`/blog` و `/blog/[slug]`) با چند مقاله‌ی نمونه.
- **کارت‌های محصول** با بخش‌های ارتفاع‌ثابت، به‌گونه‌ای که کارت‌ها همیشه در یک ردیف هم‌تراز می‌مانند — چه عنوان طولانی باشد چه محصول تخفیف نداشته باشد؛ عنوان‌های طولانی با هاور باز می‌شوند بدون اینکه چیدمان صفحه به‌هم بریزد.
- **تست‌های خودکار** — تست‌های واحد (Jest + React Testing Library) برای محاسبات قیمت، ریدیوسرهای Redux و رفتار کامپوننت‌ها، به‌علاوه یک مجموعه تست یکپارچگی متصل به MongoDB با استفاده از `mongodb-memory-server`.
- **آماده برای CI** — گردش‌کار GitHub Actions در هر push/PR، لینت، بررسی تایپ، تست‌های واحد و build نهایی را اجرا می‌کند.

### 🧱 پشته‌ی فنی

| لایه | انتخاب |
|---|---|
| فریم‌ورک | Next.js 14 (App Router) |
| زبان | TypeScript (حالت strict) |
| استایل‌دهی | Tailwind CSS |
| مدیریت وضعیت | Redux Toolkit + React-Redux |
| پایگاه‌داده | MongoDB (از طریق Mongoose) |
| انیمیشن | Framer Motion |
| کاروسل | Swiper |
| تست | Jest، React Testing Library، mongodb-memory-server |
| یکپارچه‌سازی مداوم | GitHub Actions |

### 🚀 راه‌اندازی پروژه

**۱. نصب پکیج‌ها**
```bash
npm install
```

**۲. تنظیم MongoDB**
```bash
cp .env.example .env.local
```
سپس `MONGODB_URI` را به یکی از این‌ها وصل کنید:
- **Docker**: `docker run -d -p 27017:27017 --name drivekit-mongo mongo:7`
- **MongoDB Atlas** (نسخه‌ی رایگان): یک کلاستر در https://www.mongodb.com/atlas بسازید.

**۳. وارد کردن داده‌ی کاتالوگ**
```bash
npm run seed
```
این اسکریپت idempotent است — اجرای مجددش هر زمان که فایل‌های JSON عوض شوند، بی‌خطر است.

**۴. اجرای سرور توسعه**
```bash
npm run dev
```
سپس آدرس http://localhost:3000 را باز کنید.

### 🔐 تست ورود با کد یکبار مصرف

به مسیر `/login` بروید، یک شماره موبایل یا ایمیل معتبر وارد کنید، درخواست کد بدهید، و سپس **`123456`** را وارد کنید — تنها کد «درست» ثابت در لایه‌ی احراز هویت شبیه‌سازی‌شده.

### 🧪 تست‌ها

```bash
npm test                 # تست‌های واحد سریع
npm run test:coverage    # همان، همراه با گزارش پوشش
npm run test:integration # تست‌های متصل به MongoDB با mongodb-memory-server
npm run type-check       # tsc --noEmit
npm run lint             # ESLint
```

### ☁️ استقرار (Deploy)

۱. ریپو را به گیت‌هاب پوش کنید.
۲. آن را در [Vercel](https://vercel.com) ایمپورت کنید.
۳. متغیرهای محیطی `MONGODB_URI` (و در صورت نیاز `MONGODB_DB`) را اضافه کنید.
۴. یک بار `npm run seed` را با اتصال به دیتابیس نهایی اجرا کنید.

### 📝 برخی تصمیمات طراحی

- **چرا MongoDB به‌جای فایل‌های JSON ثابت؟** به‌جای واکشی حدود ۴۰ فایل JSON جداگانه در سمت کلاینت، هر صفحه فقط یک کوئری ایندکس‌شده می‌زند؛ همچنین فیلتر/جستجوی سمت سرور و زمینه‌ای برای پنل مدیریت یا فرایند تسویه حساب در آینده فراهم می‌شود.
- **چرا یک `ProductCard` واحد؟** استایل تخفیف، وضعیت علاقه‌مندی، و رفتار باز شدن عنوان فقط باید در یک‌جا درست باشند و همه‌جای سایت (گریدها و کاروسل‌ها) از همان استفاده می‌کنند.
- **چرا Tailwind به‌جای Bootstrap؟** یک سیستم استایل‌دهی به‌جای دوتا، با رفتار واکنش‌گرا (منوی کشویی موبایل در برابر مگامنوی دسکتاپ) به‌صورت اعلانی.
- **احراز هویت OTP شبیه‌سازی‌شده:** کل تجربه‌ی کاربری (درخواست کد → تایید → موفقیت) را بدون نیاز به بک‌اند واقعی نشان می‌دهد؛ فایل `src/lib/mockAuth.ts` تنها جایی است که باید برای اتصال به یک سرویس واقعی تغییر کند.

### 📄 لایسنس

MIT — به فایل [LICENSE](./LICENSE) مراجعه کنید.

### 👤 نویسنده

**امیر کسرائیان** — توسعه‌دهنده فرانت‌اند (React / Next.js)
[گیت‌هاب](https://github.com/Amirksr) · [لینکدین](https://linkedin.com/in/amir-kasraeian) · [نمونه‌کار](https://amirkasraeian.vercel.app)
