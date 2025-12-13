"use client";

import { BookOpen, Heart, Home, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const benefits = [
  {
    icon: Home,
    title: "Aman untuk Jadi Dirimu Sendiri",
    description:
      "Tempat di mana kamu bisa terbuka tanpa perlu menahan atau menyembunyikan apa yang kamu rasakan.",
  },
  {
    icon: Heart,
    title: "Respons Penuh Empati",
    description:
      "Setiap jawaban dirancang untuk terasa seperti ruang aman, bukan sekadar chatbot biasa.",
  },
  {
    icon: BookOpen,
    title: "Dibuat untuk Menenangkan",
    description:
      "Mulai dari journaling, refleksi, dan teknik grounding semua berfokus untuk ketenanganmu.",
  },
  {
    icon: Users,
    title: "Selalu Siap Saat Dibutuhkan",
    description:
      "Kapan pun kamu cemas, overwhelm, atau ingin curhat sebentar, Curhatin AI siap menemani.",
  },
];

export function WaveDividerTop() {
  return (
    <div className="relative h-[80px] w-full bg-[#D9F1F3] lg:h-[120px]">
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 C360,40 720,40 1080,80 C1260,100 1380,120 1440,120 L1440,120 L0,120 Z"
          fill="#A7DEE3"
        />
      </svg>
    </div>
  );
}

export function WaveDividerBottom() {
  return (
    <div className="relative h-[80px] w-full bg-[#D9F1F3] lg:h-[120px]">
      <svg
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C360,80 720,80 1080,40 C1260,20 1380,0 1440,0 L1440,0 L0,0 Z"
          fill="#A7DEE3"
        />
      </svg>
    </div>
  );
}

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function WhyUs() {
  return (
    <section className="relative bg-[#A7DEE3] py-24 lg:py-32" id="why-us">
      {/* Background Overlay */}
      <div className="absolute inset-0">
        <Image
          alt=""
          className="h-full w-full object-cover"
          fill
          sizes="100vw"
          src="/bg-overlay.png"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Title */}
        <motion.h2
          className="mb-16 text-center font-bold font-heading text-3xl text-white lg:mb-20 lg:text-4xl"
          initial="hidden"
          variants={titleVariants}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          Kenapa Harus Pakai Curhatin AI?
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          whileInView="visible"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              className="group relative flex cursor-pointer items-start justify-between gap-6 overflow-hidden rounded-3xl bg-[#25A69259] p-8 transition-all duration-300 hover:bg-[#25A69280] hover:shadow-[0_10px_40px_rgba(37,166,146,0.3)] lg:p-10"
              key={benefit.title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex-1">
                <h3 className="mb-3 font-bold font-heading text-white text-xl lg:text-2xl">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-white/90 leading-relaxed lg:text-base">
                  {benefit.description}
                </p>
              </div>

              {/* Animated icon */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                className="relative z-10"
                transition={{
                  duration: 2.5 + index * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                <benefit.icon
                  className="h-12 w-12 flex-shrink-0 text-white/70 transition-all duration-300 group-hover:scale-110 group-hover:text-white lg:h-14 lg:w-14"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
