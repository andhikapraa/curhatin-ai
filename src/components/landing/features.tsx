"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";

const features = [
  {
    title: "Journaling",
    image: "/features/journaling.png",
    description:
      "Tuangkan pikiran dan emosimu dengan bebas. Curhatin AI membantumu memetakan perasaan dan memberi refleksi lembut agar kamu bisa memahami dirimu dengan lebih tenang.",
  },
  {
    title: "Mood Tracker",
    image: "/features/mood.png",
    description:
      "Catat suasana hati dan peristiwa penting, lalu lihat bagaimana perasaanmu berubah. Mood Tracker membantu kamu mengenali pola dan kebutuhan emosimu dengan lebih jelas.",
  },
  {
    title: "Mindful Moment",
    image: "/features/mindful.png",
    description:
      "Latihan grounding 5-4-3-2-1, mindful breathing, dan momen hening yang membantu tubuh dan pikiranmu kembali stabil.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleVariants: Variants = {
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

export function Features() {
  return (
    <section className="relative bg-[#D9F1F3] py-24 lg:py-32" id="features">
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
      <div className="relative z-10 mx-auto max-w-[1276px] px-6 lg:px-12">
        {/* Title */}
        <motion.h2
          className="mb-12 text-center font-bold font-heading text-3xl text-[#25A692] lg:mb-16 lg:text-5xl"
          initial="hidden"
          variants={titleVariants}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          Fitur yang Menemanimu Lebih Tenang
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center lg:gap-[50px]"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          whileInView="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              className="group relative flex w-full max-w-[393px] cursor-pointer flex-col items-center gap-5 rounded-[28px] bg-[rgba(37,166,146,0.35)] px-[22px] py-10 shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] transition-all duration-300 hover:bg-[rgba(37,166,146,0.45)] hover:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4),0_20px_40px_rgba(37,166,146,0.2)] lg:h-[600px]"
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Title */}
              <h3 className="relative z-10 text-center font-bold font-heading text-2xl text-white lg:text-[32px]">
                {feature.title}
              </h3>

              {/* Image with subtle float animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                className="relative z-10 h-[200px] w-[200px] lg:h-[295px] lg:w-[250px]"
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
              >
                <Image
                  alt={feature.title}
                  className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 200px, 250px"
                  src={feature.image}
                />
              </motion.div>

              {/* Description */}
              <p className="relative z-10 text-center font-body font-semibold text-base text-white leading-[150%] lg:text-xl">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
