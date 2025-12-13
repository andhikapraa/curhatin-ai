import { BookOpen, Heart, Home, Users } from "lucide-react";
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

export function WhyUs() {
  return (
    <section className="relative bg-[#A7DEE3] py-24 lg:py-32" id="why-us">
      {/* Background Overlay */}
      <div className="absolute inset-0">
        <Image
          alt=""
          className="h-full w-full object-cover opacity-50"
          fill
          sizes="100vw"
          src="/bg-overlay.png"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Title */}
        <h2 className="mb-16 text-center font-bold font-heading text-3xl text-white lg:mb-20 lg:text-4xl">
          Kenapa Harus Pakai Curhatin AI?
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              className="flex items-start justify-between gap-6 rounded-3xl bg-[#25A69259] p-8 lg:p-10"
              key={benefit.title}
            >
              <div className="flex-1">
                <h3 className="mb-3 font-bold font-heading text-white text-xl lg:text-2xl">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-white/90 leading-relaxed lg:text-base">
                  {benefit.description}
                </p>
              </div>
              <benefit.icon
                className="h-12 w-12 flex-shrink-0 text-white/70 lg:h-14 lg:w-14"
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
