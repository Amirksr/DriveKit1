# DriveKit 🚗

**A modern, RTL-first auto-parts e-commerce storefront**, rebuilt from the ground up with Next.js 14 (App Router), TypeScript, Tailwind CSS, Redux Toolkit, and MongoDB.

This is a from-scratch rewrite of an earlier React + Vite prototype. The UI, feature set, and Persian-language catalogue are preserved, but the architecture, styling approach, data layer, and tooling have all been redesigned for production quality, type-safety, and testability.

> 🇮🇷 This is a demo/portfolio project. Product data, prices, and store details are illustrative.

---

## ✨ Highlights

- **Next.js 14 App Router** — server components for the initial catalogue render, client components only where interactivity is needed (filters, cart, wishlist).
- **TypeScript throughout**, including `strict` mode and `noUncheckedIndexedAccess`, with a single shared `Product`/`CartItem` type vocabulary (`src/types`).
- **Tailwind CSS** replaces Bootstrap/react-bootstrap entirely — no more mixing two styling systems.
- **MongoDB + Mongoose** as the product catalogue's source of truth, with a typed data-access layer (`src/lib/products.ts`) and a `/api/products` route for client-side filtering.
- **Redux Toolkit**, typed end-to-end (`RootState`/`AppDispatch` inferred from the store, pre-typed hooks) for the cart and wishlist.
- **Deduplicated business logic** — price parsing/formatting, the category map, and product-card rendering used to be copy-pasted across 3–4 components in the original codebase; they're now single, tested modules.
- **Automated tests** — 34 unit tests (Jest + React Testing Library) covering price math, Redux reducers, and component behavior, plus a MongoDB-backed integration test suite using `mongodb-memory-server`.
- **CI-ready** — GitHub Actions workflow runs lint, type-check, unit tests, and a production build on every push/PR.

---

## 🧱 Tech stack

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

---

## 📂 Project structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── page.tsx            # Home
│   ├── all-products/       # Search + category grid
│   ├── products/list/      # Category page with advanced filters
│   ├── cart/                # Shopping cart
│   └── api/products/        # REST endpoint backed by MongoDB
├── components/
│   ├── layout/              # Header, Footer
│   ├── home/                 # Hero, banners, carousels, etc.
│   ├── product/              # Shared <ProductCard />
│   └── providers/            # Redux <Provider> wrapper
├── redux/                   # store, typed hooks, cart & wishlist slices
├── lib/                     # price.ts, products.ts, mongodb.ts, hooks
├── models/                  # Mongoose schemas
├── data/                    # Static reference data (categories, brands…)
└── types/                   # Shared TypeScript types
scripts/
└── seed.ts                  # Imports the original JSON catalogue into MongoDB
__tests__/
├── lib/, redux/, components/ # Fast unit tests (no external services)
└── integration/              # MongoDB-backed tests (mongodb-memory-server)
```

---

## 🚀 Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure MongoDB

Copy the example environment file and point it at a MongoDB instance:

```bash
cp .env.example .env.local
```

Any of these work for local development:

- **Docker**: `docker run -d -p 27017:27017 --name drivekit-mongo mongo:7`
- **MongoDB Atlas** (free tier): create a cluster at https://www.mongodb.com/atlas and paste the connection string into `MONGODB_URI`.

### 3. Seed the catalogue

The original product photos and metadata (`public/assets/products-list/**/data.json`) are imported into MongoDB with:

```bash
npm run seed
```

This is idempotent — safe to re-run any time the JSON catalogue changes.

### 4. Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000.

---

## 🧪 Testing

```bash
npm test                 # fast unit tests (price math, Redux, components)
npm run test:coverage    # same, with a coverage report
npm run test:integration # MongoDB-backed tests via mongodb-memory-server
npm run type-check       # tsc --noEmit
npm run lint             # ESLint (next/core-web-vitals)
```

The integration suite is kept separate from `npm test` because
`mongodb-memory-server` downloads a `mongod` binary on first run — it's not
meant to slow down the everyday test loop, but it's there to prove the
MongoDB data layer (filtering, search, discount math, category mapping)
actually works against a real database engine.

---

## ☁️ Deploying

The app deploys to [Vercel](https://vercel.com) like any Next.js project:

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the `MONGODB_URI` (and optionally `MONGODB_DB`) environment variable in the Vercel project settings — a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works well here.
4. Run `npm run seed` locally once, pointed at your Atlas cluster, to populate production data.

---

## 📝 Notable design decisions

- **Why MongoDB instead of the static JSON files?** The original prototype fetched ~40 separate `data.json` files on the client for every page load. Moving that into MongoDB means: a single indexed query per page, server-side filtering/search, and a foundation for an admin panel or checkout flow later — without changing the shape of the data the UI already expects.
- **Why a single `ProductCard`?** The original had near-duplicate `ProductCard` and `OfferCard` components. They're merged into one, parameterized by the `product` prop, so discount styling and wishlist behavior only need to be right in one place.
- **Why Tailwind over Bootstrap?** The original mixed `react-bootstrap` with hand-written CSS files per component. Tailwind's utility classes collapse that into one system and make responsive behavior (mobile drawer vs. desktop mega-menu, swiper vs. grid) declarative instead of `window.innerWidth` listeners.

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 👤 Author

**Amir Kasraeian** — Frontend Developer (React / Next.js)
[GitHub](https://github.com/Amirksr) · [LinkedIn](https://linkedin.com/in/amir-kasraeian) · [Portfolio](https://amirkasraeian.vercel.app)
