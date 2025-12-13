"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";

type WishlistModalProps = {
  children: ReactNode;
};

export function WishlistModal({ children }: WishlistModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-[680px] gap-0 overflow-visible rounded-3xl border-0 bg-[#FAFCFD] p-0 sm:max-w-[680px]"
        showCloseButton
      >
        {/* Background Pattern - Cloud overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <Image
            alt=""
            className="h-full w-full object-cover opacity-60"
            fill
            sizes="850px"
            src="/bg-overlay.png"
          />
        </div>

        {/* Modal Content - Responsive Flex Layout */}
        <div className="relative z-10 flex flex-col gap-4 overflow-visible p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
          {/* Left Column - Text + Robot */}
          <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
            {/* Text Content */}
            <div className="text-center sm:text-left">
              <DialogTitle className="mb-2 font-bold font-heading text-2xl text-[#3E4A4F] leading-tight">
                Masukkan ke Wishlist
              </DialogTitle>
              <DialogDescription className="font-heading font-medium text-[#3E4A4F]/80 text-sm leading-relaxed">
                Simpan aplikasi ini ke wishlist Anda agar tidak ketinggalan
                kabar terbaru
              </DialogDescription>
            </div>

            {/* Robot Image - Full width */}
            <div className="relative h-[180px] w-full sm:h-[200px]">
              <Image
                alt="Curhatin AI Robot Mascot"
                className="object-contain"
                fill
                sizes="240px"
                src="/robot-mascot.png"
              />
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="w-full sm:w-[290px] sm:flex-shrink-0">
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#D9F1F3] to-[#A7DEE3] p-5 shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(184,230,254,0.4)]">
              <form className="flex flex-col gap-4">
                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-body font-bold text-[#3E4A4F] text-base lg:text-lg"
                    htmlFor="name"
                  >
                    Nama
                  </label>
                  <input
                    className="h-[42px] rounded-2xl border border-[#99A1AF]/50 bg-white px-4 py-2 font-body text-[#3E4A4F] text-sm placeholder:text-[#9CA3AF] focus:border-[#25A692] focus:outline-none focus:ring-2 focus:ring-[#25A692]/20"
                    id="name"
                    placeholder="Masukkan nama Anda"
                    type="text"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-body font-bold text-[#3E4A4F] text-base lg:text-lg"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="h-[42px] rounded-2xl border border-[#99A1AF]/50 bg-white px-4 py-2 font-body text-[#3E4A4F] text-sm placeholder:text-[#9CA3AF] focus:border-[#25A692] focus:outline-none focus:ring-2 focus:ring-[#25A692]/20"
                    id="email"
                    placeholder="Masukkan email Anda"
                    type="email"
                  />
                </div>

                {/* Submit Button */}
                <button
                  className="mt-2 flex h-[48px] items-center justify-center rounded-3xl bg-[rgba(204,241,235,0.85)] font-body font-semibold text-[#3E4A4F] text-base shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.15),inset_0px_2px_4px_rgba(255,255,255,0.5)] transition-all hover:scale-[1.02] hover:bg-[rgba(204,241,235,1)] active:scale-[0.98] lg:text-lg"
                  type="submit"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
