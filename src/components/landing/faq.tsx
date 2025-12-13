"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";

const faqs = [
  {
    question: "Apa itu Curhatin AI?",
    answer:
      "Curhatin AI adalah teman curhat berbasis AI yang siap mendengar dan memahami perasaanmu kapan saja, tanpa menghakimi.",
  },
  {
    question: "Apakah Curhatin AI aman?",
    answer:
      "Ya, Curhatin AI dirancang dengan privasi sebagai prioritas utama. Semua percakapanmu bersifat rahasia dan tidak dibagikan kepada pihak manapun.",
  },
  {
    question: "Fitur apa saja yang tersedia?",
    answer:
      "Curhatin AI menyediakan Journaling, Mood Tracker, Fast Calm Mode, dan Mindful Moment untuk membantu kamu mengenali perasaan dan kembali tenang secara bertahap.",
  },
  {
    question: "Bagaimana cara memulai sesi?",
    answer:
      "Cukup klik tombol 'Mulai Curhat Sekarang' dan kamu bisa langsung mulai bercerita. Tidak perlu registrasi yang rumit.",
  },
  {
    question: "Apakah percakapan saya akan dinilai atau dihakimi?",
    answer:
      "Tidak. Curhatin AI dirancang untuk memberikan ruang aman, tanpa penilaian, tanpa tekanan, hanya tempat untuk bernapas dan memahami diri.",
  },
];

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function FAQ() {
  return (
    <section className="relative bg-[#D9F1F3] py-24 lg:py-32" id="faq">
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
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Title */}
        <motion.h2
          className="mb-12 text-center font-bold font-heading text-3xl text-[#25A692] lg:mb-16 lg:text-5xl"
          initial="hidden"
          variants={titleVariants}
          viewport={{ once: true, margin: "-100px" }}
          whileInView="visible"
        >
          FAQ
        </motion.h2>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          whileInView="visible"
        >
          <Accordion className="flex flex-col gap-6" collapsible type="single">
            {faqs.map((faq, index) => (
              <motion.div key={faq.question} variants={itemVariants}>
                <AccordionItem
                  className="group data-[state=open]:!bg-[#8EBDC1] rounded-2xl border-0 border-none bg-[rgba(25,111,98,0.3)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.2)] data-[state=open]:shadow-[0px_8px_20px_rgba(0,0,0,0.15)]"
                  value={faq.question}
                >
                  <AccordionTrigger
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-heading font-semibold text-sm text-white no-underline transition-all hover:no-underline lg:py-5 lg:text-base [&[data-state=closed]>.chevron-down]:block [&[data-state=closed]>.chevron-down]:rotate-0 [&[data-state=closed]>.chevron-up]:hidden [&[data-state=open]>.chevron-down]:hidden [&[data-state=open]>.chevron-up]:block [&[data-state=open]>.chevron-up]:rotate-0"
                    showArrow={false}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20 font-bold text-xs lg:h-8 lg:w-8 lg:text-sm">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown className="chevron-down h-5 w-5 shrink-0 text-white transition-transform duration-300 lg:h-6 lg:w-6" />
                    <ChevronUp className="chevron-up h-5 w-5 shrink-0 text-white transition-transform duration-300 lg:h-6 lg:w-6" />
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-6 font-heading font-medium text-sm text-white/90 leading-relaxed lg:pl-[70px] lg:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
