"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function HowItWorksWaveTop() {
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

export function HowItWorksWaveBottom() {
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

const steps = [
  {
    title: "Mulai Bercerita",
    description:
      "Ceritakan apa pun yang kamu rasakan, dengan ruang yang aman untuk menjadi diri sendiri.",
    image: "/how/book.png",
    imagePosition: "right" as const,
    step: 1,
  },
  {
    title: "Dapatkan Dukungan yang Menenangkan",
    description:
      "AI akan merespons dengan empati, teknik menenangkan, dan pandangan jujur yang membantu.",
    image: "/how/robot.png",
    imagePosition: "left" as const,
    step: 2,
  },
  {
    title: "Temukan Ruang Aman untuk Bernafas",
    description:
      "Lanjutkan ke latihan mindful atau emotional reflection ketika kamu siap.",
    image: "/how/mirror.png",
    imagePosition: "right" as const,
    step: 3,
  },
];

const headerVariants = {
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

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HowItWorks() {
  return (
    <section className="relative bg-[#A7DEE3] py-24 lg:py-32" id="how-it-works">
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
      <div className="relative z-10 mx-auto max-w-[1216px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-12 flex flex-col items-center gap-3 lg:mb-16"
          initial="hidden"
          variants={headerVariants}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          <h2 className="text-center font-bold font-heading text-3xl text-white lg:text-5xl">
            How It Works
          </h2>
          <p className="text-center font-body font-extrabold text-lg text-white lg:text-2xl">
            Tiga langkah sederhana untuk mendapatkan dukungan yang menenangkan.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col gap-6 lg:gap-4">
          {/* Connecting line (desktop only) */}
          <div className="-translate-x-1/2 pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-[2px] lg:block">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-[#25A692]/30 via-[#25A692]/50 to-[#25A692]/30"
              initial={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ scaleY: 1 }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-[#D9F1F3]"
              initial={
                step.imagePosition === "left" ? "hiddenRight" : "hiddenLeft"
              }
              key={step.title}
              variants={cardVariants}
              viewport={{ once: true, margin: "-50px" }}
              whileInView="visible"
            >
              {/* Step number badge - positioned based on layout */}
              <motion.div
                className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#25A692] font-bold font-heading text-lg text-white shadow-lg lg:top-6 lg:h-12 lg:w-12 lg:text-xl ${
                  step.imagePosition === "right"
                    ? "right-4 lg:right-6"
                    : "left-4 lg:left-6"
                }`}
                initial={{ scale: 0, rotate: -180 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3 + index * 0.1,
                }}
                viewport={{ once: true }}
                whileInView={{ scale: 1, rotate: 0 }}
              >
                {step.step}
              </motion.div>

              {/* Blurred Ellipse Decorations */}
              <div
                className={`pointer-events-none absolute top-[-104px] h-[358px] w-[358px] rounded-full bg-white opacity-[0.88] blur-[300px] ${
                  step.imagePosition === "left"
                    ? "right-[-147px]"
                    : "left-[-147px]"
                }`}
              />
              <div
                className={`pointer-events-none absolute top-[45px] h-[358px] w-[358px] rounded-full bg-[#FFE7FD] opacity-[0.88] blur-[300px] ${
                  step.imagePosition === "left"
                    ? "left-[-100px]"
                    : "right-[-100px]"
                }`}
              />

              {/* Card Content */}
              <div
                className={`relative z-10 flex flex-col items-center gap-6 p-8 pt-16 lg:h-[284px] lg:flex-row lg:items-center lg:gap-[28px] lg:px-14 lg:py-4 lg:pt-4 ${
                  step.imagePosition === "left"
                    ? "lg:flex-row-reverse"
                    : "lg:flex-row"
                }`}
              >
                {/* Text Content */}
                <div
                  className={`flex flex-1 flex-col gap-6 ${
                    step.imagePosition === "left"
                      ? "lg:items-end lg:text-right"
                      : "lg:items-start lg:text-left"
                  }`}
                >
                  <div
                    className={`flex flex-col gap-4 ${
                      step.imagePosition === "left"
                        ? "lg:items-end"
                        : "lg:items-start"
                    }`}
                  >
                    <h3 className="font-heading font-semibold text-2xl text-[#3E4A4F] lg:text-4xl lg:leading-[40px]">
                      {step.title}
                    </h3>
                    <p className="font-heading font-medium text-[#1A2223]/60 text-base lg:text-2xl lg:leading-8">
                      {step.description}
                    </p>
                  </div>

                  {/* Button */}
                  <motion.button
                    className="relative flex h-[50px] w-full max-w-[266px] items-center justify-center overflow-hidden rounded-3xl bg-[rgba(25,111,98,0.3)] px-[10px] font-body font-semibold text-white text-xl shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] transition-colors hover:bg-[rgba(25,111,98,0.4)]"
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Deskripsi Lengkap
                  </motion.button>
                </div>

                {/* Image with float animation */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  className="relative h-[200px] w-[200px] flex-shrink-0 lg:h-[251px] lg:w-[300px]"
                  transition={{
                    duration: 3 + index * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  <Image
                    alt={step.title}
                    className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                    fill
                    sizes="(max-width: 1024px) 200px, 300px"
                    src={step.image}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
