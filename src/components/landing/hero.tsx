"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";

import { LiquidButton } from "@/components/animate-ui/primitives/buttons/liquid";
import {
  Particles,
  ParticlesEffect,
} from "@/components/animate-ui/primitives/effects/particles";
import {
  TypingText,
  TypingTextCursor,
} from "@/components/animate-ui/primitives/texts/typing";
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
        opacity: 1,
        scale: [1, 1.1, 1],
        y: [0, -100, 0],
        x: [0, 20, -20, 0],
      }}
      className="absolute rounded-full"
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      style={{
        width: size,
        height: size,
        left,
        bottom: "10%",
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(77,208,201,${opacity}))`,
        boxShadow:
          "inset 0 0 20px rgba(255,255,255,0.6), 0 4px 15px rgba(77,208,201,0.3)",
        border: "1px solid rgba(255,255,255,0.5)",
      }}
      transition={{
        opacity: { duration: 0.8, delay: delay * 0.3 },
        scale: {
          duration,
          delay: delay * 0.3 + 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
        y: {
          duration,
          delay: delay * 0.3 + 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
        x: {
          duration,
          delay: delay * 0.3 + 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
    />
  );
}

const bubbles = [
  { size: 75, delay: 0, duration: 8, left: "10%", opacity: 0.65 },
  { size: 55, delay: 1.5, duration: 10, left: "25%", opacity: 0.55 },
  { size: 95, delay: 0.5, duration: 12, left: "70%", opacity: 0.6 },
  { size: 50, delay: 2, duration: 9, left: "85%", opacity: 0.5 },
  { size: 65, delay: 3, duration: 11, left: "50%", opacity: 0.55 },
  { size: 40, delay: 1, duration: 7, left: "15%", opacity: 0.65 },
  { size: 60, delay: 2.5, duration: 13, left: "90%", opacity: 0.45 },
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
            <h1 className="text-center font-bold font-heading text-[#3E4A4F] text-[26px] leading-[120%] lg:text-[38px]">
              <TypingText
                duration={50}
                text="Tempat aman untuk curhat dan menenangkan pikiran, kapanpun kamu butuh"
              >
                <TypingTextCursor className="ml-1 h-[26px] w-[3px] lg:h-[38px] lg:w-1" />
              </TypingText>
            </h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-center font-heading font-medium text-[#3E4A4F] text-base leading-6 lg:text-2xl lg:leading-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 3.5 }}
            >
              Curhatin AI membantu kamu melewati momen berat dengan respons
              cepat, empati yang tulus, dan perspektif lembut tanpa menghakimi.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 4 }}
          >
            {/* Primary: Open Chatbot */}
            <Particles className="flex-1">
              <LiquidButton
                className="relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-[rgba(25,111,98,0.5)] px-[10px] font-body font-semibold text-base text-white shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] lg:h-[50px] lg:text-xl"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openCurhatinChatbot"));
                }}
                style={
                  {
                    "--liquid-button-color": "rgba(25,111,98,0.7)",
                    "--liquid-button-background-color": "rgba(25,111,98,0.5)",
                  } as React.CSSProperties
                }
                type="button"
              >
                Mulai Curhat Sekarang
              </LiquidButton>
              <ParticlesEffect
                className="h-2 w-2 rounded-full bg-[#4dd0c9]"
                count={8}
                radius={40}
                spread={360}
              />
            </Particles>

            {/* Secondary: Join Waitlist */}
            <WishlistModal>
              <Particles className="flex-1">
                <LiquidButton
                  className="relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[rgba(25,111,98,0.4)] bg-white/30 px-[10px] font-body font-semibold text-[#196F62] text-base shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.1),inset_0px_2px_4px_rgba(255,255,255,0.6)] backdrop-blur-[5px] lg:h-[50px] lg:text-xl"
                  style={
                    {
                      "--liquid-button-color": "rgba(25,111,98,0.2)",
                      "--liquid-button-background-color":
                        "rgba(255,255,255,0.3)",
                    } as React.CSSProperties
                  }
                  type="button"
                >
                  Gabung Waitlist
                </LiquidButton>
                <ParticlesEffect
                  className="h-2 w-2 rounded-full bg-[#196F62]"
                  count={6}
                  radius={35}
                  spread={360}
                />
              </Particles>
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
