"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock } from "react-icons/fa";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBlogPostBySlug } from "@/data/blogPosts";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="mb-3 text-xl font-bold text-gray-900">مقاله‌ای یافت نشد</h1>
          <Link href="/blog" className="text-brand-600 hover:underline">
            بازگشت به بلاگ
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600"
        >
          بازگشت به بلاگ <FaArrowRight size={12} />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
            {post.category}
          </span>
          <h1 className="mb-3 text-2xl font-extrabold leading-relaxed text-gray-900 md:text-3xl">
            {post.title}
          </h1>
          <div className="mb-6 flex items-center gap-4 text-xs text-gray-400">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <FaClock /> {post.readTimeMinutes} دقیقه مطالعه
            </span>
          </div>

          <div className="relative mb-8 h-56 w-full overflow-hidden rounded-2xl md:h-80">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
          </div>

          <div className="flex flex-col gap-4 text-[15px] leading-loose text-gray-700">
            {post.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </article>

      <Footer />
    </>
  );
}
