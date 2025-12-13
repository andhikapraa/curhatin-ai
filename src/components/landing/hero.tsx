"use client";

import Image from "next/image";

import { WishlistModal } from "@/components/landing/wishlist-modal";

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

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-109px)] max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        {/* Text Section */}
        <div className="flex w-full max-w-[589px] flex-col items-center gap-8 lg:gap-[30px]">
          <div className="flex flex-col items-center gap-4 lg:gap-7">
            <h1 className="text-center font-bold font-heading text-2xl text-[#3E4A4F] leading-[120%] lg:text-[32px]">
              Tempat Aman untuk Menenangkan Pikiranmu, Kapan Pun Kamu Butuh
            </h1>
            <p className="text-center font-heading font-medium text-[#3E4A4F] text-base leading-6 lg:text-2xl lg:leading-8">
              Curhatin AI membantu kamu melewati momen berat dengan respons
              cepat, empati yang tulus, dan perspektif lembut tanpa menghakimi.
            </p>
          </div>

          {/* CTA Button */}
          <WishlistModal>
            <button
              className="flex h-12 w-full items-center justify-center rounded-3xl bg-[rgba(25,111,98,0.3)] px-[10px] font-body font-semibold text-base text-white shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] transition-all hover:scale-[1.02] hover:bg-[rgba(25,111,98,0.4)] active:scale-[0.98] lg:h-[50px] lg:text-xl"
              type="button"
            >
              Mulai Curhat Sekarang
            </button>
          </WishlistModal>
        </div>

        {/* Robot Mascot */}
        <div className="hidden flex-shrink-0 lg:block">
          <Image
            alt="Curhatin AI Robot Mascot"
            className="h-auto w-[400px] xl:w-[500px]"
            height={600}
            priority
            src="/robot-mascot.png"
            width={500}
          />
        </div>
      </div>
    </section>
  );
}
