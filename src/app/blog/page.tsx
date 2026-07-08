"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function BlogPage() {
  return (
    <>
      <Header />

      <section className="bg-[linear-gradient(135deg,_#1e3a5f_0%,_#0f2038_100%)] py-14 text-center text-white">
        <h1 className="text-2xl font-extrabold md:text-4xl">
          بلاگ <span className="text-brand-400">آدورا یدک</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg px-4 text-gray-300">
          راهنمای خرید، نگهداری و عیب‌یابی خودرو — نوشته‌شده توسط کارشناسان فنی ما.
        </p>
      </section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BLOG_POSTS.map((post) => (
          <motion.article
            key={post.slug}
            variants={fadeUp}
            className="group overflow-hidden rounded-2xl border border-gray-100 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute start-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-600">
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <h2 className="mb-2 line-clamp-2 font-bold text-gray-900 group-hover:text-brand-600">
                  {post.title}
                </h2>
                <p className="mb-3 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {post.readTimeMinutes} دقیقه مطالعه
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      <Footer />
    </>
  );
}
