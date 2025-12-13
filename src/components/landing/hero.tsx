"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";

import { WishlistModal } from "@/components/landing/wishlist-modal";

function FloatingBubble({
  size,
  delay,
  duration,
  left,
  opacity,
}: {
  size: number;
  delay: number;
  duration: number;
  left: string;
  opacity: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -100, 0],
        x: [0, 20, -20, 0],
        scale: [1, 1.1, 1],
      }}
      className="absolute rounded-full"
      initial={{ y: 0 }}
      style={{
        width: size,
        height: size,
        left,
        bottom: "10%",
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(167,222,227,${opacity}))`,
        boxShadow: "inset 0 0 20px rgba(255,255,255,0.5)",
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

const bubbles = [
  { size: 60, delay: 0, duration: 8, left: "10%", opacity: 0.4 },
  { size: 40, delay: 1.5, duration: 10, left: "25%", opacity: 0.3 },
  { size: 80, delay: 0.5, duration: 12, left: "70%", opacity: 0.35 },
  { size: 35, delay: 2, duration: 9, left: "85%", opacity: 0.25 },
  { size: 50, delay: 3, duration: 11, left: "50%", opacity: 0.3 },
  { size: 25, delay: 1, duration: 7, left: "15%", opacity: 0.4 },
  { size: 45, delay: 2.5, duration: 13, left: "90%", opacity: 0.2 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#D9F1F3] pt-[109px]">
      {/* Background Overlay */}
      <div className="absolute inset-0">
        <Image
          alt=""
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src="/bg-overlay.png"
        />
      </div>

      {/* Floating Bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, index) => (
          <FloatingBubble key={`bubble-${index}-${bubble.left}`} {...bubble} />
        ))}
      </div>

      {/* Subtle gradient orbs for depth */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        className="pointer-events-none absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#A7DEE3] to-transparent blur-[100px]"
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        className="pointer-events-none absolute top-[40%] right-[-5%] h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-[#FFE7FD] to-transparent blur-[120px]"
        transition={{
          duration: 10,
          delay: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-109px)] max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        {/* Text Section */}
        <motion.div
          animate="visible"
          className="flex w-full max-w-[589px] flex-col items-center gap-8 lg:gap-[30px]"
          initial="hidden"
          variants={containerVariants}
        >
          <div className="flex flex-col items-center gap-4 lg:gap-7">
            <motion.h1
              className="text-center font-bold font-heading text-2xl text-[#3E4A4F] leading-[120%] lg:text-[32px]"
              variants={itemVariants}
            >
              Tempat Aman untuk Menenangkan Pikiranmu, Kapan Pun Kamu Butuh
            </motion.h1>
            <motion.p
              className="text-center font-heading font-medium text-[#3E4A4F] text-base leading-6 lg:text-2xl lg:leading-8"
              variants={itemVariants}
            >
              Curhatin AI membantu kamu melewati momen berat dengan respons
              cepat, empati yang tulus, dan perspektif lembut tanpa menghakimi.
            </motion.p>
          </div>

          {/* CTA Button with breathing animation */}
          <motion.div className="w-full" variants={itemVariants}>
            <WishlistModal>
              <motion.button
                className="relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-[rgba(25,111,98,0.3)] px-[10px] font-body font-semibold text-base text-white shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] transition-colors hover:bg-[rgba(25,111,98,0.4)] lg:h-[50px] lg:text-xl"
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
                Mulai Curhat Sekarang
              </motion.button>
            </WishlistModal>
          </motion.div>
        </motion.div>

        {/* Robot Mascot with float animation */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          className="hidden flex-shrink-0 lg:block"
          initial={{ opacity: 0, x: 50 }}
          transition={{
            y: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            opacity: { duration: 0.8, delay: 0.5 },
            x: { duration: 0.8, delay: 0.5 },
          }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <Image
            alt="Curhatin AI Robot Mascot"
            className="h-auto w-[400px] drop-shadow-2xl xl:w-[500px]"
            height={600}
            priority
            src="/robot-mascot.png"
            width={500}
          />
        </motion.div>
      </div>
    </section>
  );
}
