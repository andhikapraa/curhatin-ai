"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
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
        <h2 className="mb-12 text-center font-bold font-heading text-3xl text-[#25A692] lg:mb-16 lg:text-5xl">
          FAQ
        </h2>

        {/* Accordion */}
        <Accordion className="flex flex-col gap-6" collapsible type="single">
          {faqs.map((faq) => (
            <AccordionItem
              className="group data-[state=open]:!bg-[#8EBDC1] rounded-2xl border-0 border-none bg-[rgba(25,111,98,0.3)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-colors"
              key={faq.question}
              value={faq.question}
            >
              <AccordionTrigger
                className="flex w-full items-center justify-between gap-4 px-6 py-3 text-left font-heading font-semibold text-sm text-white no-underline hover:no-underline lg:text-base [&[data-state=closed]>.chevron-down]:block [&[data-state=closed]>.chevron-up]:hidden [&[data-state=open]>.chevron-down]:hidden [&[data-state=open]>.chevron-up]:block [&[data-state=open]>svg]:hidden"
                showArrow={false}
              >
                {faq.question}
                <ChevronDown className="chevron-down h-6 w-6 shrink-0 text-white transition-transform" />
                <ChevronUp className="chevron-up h-6 w-6 shrink-0 text-white transition-transform" />
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-0 pb-6 font-heading font-medium text-sm text-white lg:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
