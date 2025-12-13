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
        className="h-auto max-w-[883px] overflow-hidden rounded-3xl border-0 bg-[#FAFCFD] p-0 lg:h-[440px]"
        showCloseButton
      >
        {/* Background Pattern - Cloud overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <Image
            alt=""
            className="h-full w-full object-cover opacity-10"
            fill
            sizes="883px"
            src="/bg-overlay.png"
          />
        </div>

        {/* Robot Mascot - Positioned at bottom-left, cropped at bottom */}
        <div className="pointer-events-none absolute bottom-[-84px] left-[53px] hidden h-[359px] w-[270px] lg:block">
          <Image
            alt="Curhatin AI Robot Mascot"
            className="object-contain"
            fill
            sizes="270px"
            src="/robot-mascot.png"
          />
        </div>

        {/* Modal Content */}
        <div className="relative flex h-full flex-col gap-6 p-6 pt-10 lg:flex-row lg:items-start lg:justify-end lg:gap-10 lg:p-[45px_45px_45px_45px]">
          {/* Left Column - Text (positioned to avoid robot) */}
          <div className="flex flex-col gap-2 lg:absolute lg:top-[50px] lg:left-[45px] lg:w-[335px]">
            <DialogTitle className="font-bold font-heading text-[#3E4A4F] text-xl leading-[30px]">
              Masukkan ke Wishlist
            </DialogTitle>
            <DialogDescription className="font-heading font-medium text-[#3E4A4F] text-base leading-6">
              Simpan aplikasi ini ke wishlist Anda agar tidak ketinggalan kabar
              terbaru
            </DialogDescription>

            {/* Mobile Robot */}
            <div className="relative mx-auto mt-4 h-[200px] w-[200px] lg:hidden">
              <Image
                alt="Curhatin AI Robot Mascot"
                className="object-contain"
                fill
                sizes="200px"
                src="/robot-mascot.png"
              />
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="w-full rounded-3xl bg-gradient-to-b from-[#D9F1F3] to-[#A7DEE3] p-6 shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(184,230,254,0.4)] backdrop-blur-[5px] lg:h-[306px] lg:w-[418px] lg:p-[43px_39px]">
            <form className="flex h-full flex-col gap-[10px]">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label
                  className="font-body font-extrabold text-[#3E4A4F] text-xl leading-[120%]"
                  htmlFor="name"
                >
                  Nama
                </label>
                <input
                  className="h-[38px] rounded-2xl border border-[#99A1AF] bg-[#F9FAFB] px-4 py-2.5 font-body font-semibold text-[#3E4A4F] text-xs placeholder:text-[#D1D5DC] focus:outline-none focus:ring-2 focus:ring-[#25A692]"
                  id="name"
                  placeholder="Masukkan nama Anda"
                  type="text"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  className="font-body font-extrabold text-[#3E4A4F] text-xl leading-[120%]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="h-[38px] rounded-2xl border border-[#99A1AF] bg-[#F9FAFB] px-4 py-2.5 font-body font-semibold text-[#3E4A4F] text-xs placeholder:text-[#D1D5DC] focus:outline-none focus:ring-2 focus:ring-[#25A692]"
                  id="email"
                  placeholder="Masukkan email Anda"
                  type="email"
                />
              </div>

              {/* Submit Button */}
              <button
                className="mt-auto flex h-[50px] items-center justify-center rounded-3xl bg-[rgba(204,241,235,0.75)] font-body font-semibold text-[#3E4A4F] text-xl leading-[150%] shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.25),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] transition-all hover:scale-[1.02] hover:bg-[rgba(204,241,235,0.9)] active:scale-[0.98]"
                type="submit"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
