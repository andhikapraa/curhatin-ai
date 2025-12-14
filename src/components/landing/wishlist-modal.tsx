"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Image from "next/image";
import { type FormEvent, type ReactNode, useRef, useState } from "react";

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

type FormStatus = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(
  name: string,
  email: string,
  turnstileToken: string | null
): string | null {
  if (!(name.trim() && email.trim())) {
    return "Mohon isi semua field";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Format email tidak valid";
  }
  if (!turnstileToken) {
    return "Mohon selesaikan verifikasi keamanan";
  }
  return null;
}

function getErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (message === "Security verification failed") {
    return "Verifikasi keamanan gagal. Silakan coba lagi.";
  }
  return "Gagal mengirim. Silakan coba lagi.";
}

export function WishlistModal({ children }: WishlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateForm(name, email, turnstileToken);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          turnstileToken,
        }),
      });

      const result = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!(response.ok && result.success)) {
        throw new Error(result.error || "Submission failed");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(getErrorMessage(error));
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <Dialog onOpenChange={(open) => !open && resetForm()}>
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

        {/* Modal Content */}
        {status === "success" ? (
          /* Success State - Centered Layout */
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-8 py-12">
            {/* Success Checkmark */}
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-[#5DC998] to-[#25A692] shadow-lg">
              <svg
                aria-label="Berhasil"
                className="h-14 w-14 text-white"
                fill="none"
                role="img"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Success Text */}
            <div className="text-center">
              <DialogTitle className="mb-2 font-bold font-heading text-2xl text-[#3E4A4F] leading-tight">
                Terima Kasih!
              </DialogTitle>
              <DialogDescription className="font-heading font-medium text-[#3E4A4F]/80 text-sm leading-relaxed">
                Data Anda telah tersimpan. Kami akan menghubungi Anda saat
                aplikasi sudah siap!
              </DialogDescription>
            </div>
          </div>
        ) : (
          /* Form State - Two Column Layout */
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
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-body font-bold text-[#3E4A4F] text-base lg:text-lg"
                      htmlFor="name"
                    >
                      Nama
                    </label>
                    <input
                      className="h-[42px] rounded-2xl border border-[#99A1AF]/50 bg-white px-4 py-2 font-body text-[#3E4A4F] text-sm placeholder:text-[#9CA3AF] focus:border-[#25A692] focus:outline-none focus:ring-2 focus:ring-[#25A692]/20 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={status === "loading"}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      type="text"
                      value={name}
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
                      className="h-[42px] rounded-2xl border border-[#99A1AF]/50 bg-white px-4 py-2 font-body text-[#3E4A4F] text-sm placeholder:text-[#9CA3AF] focus:border-[#25A692] focus:outline-none focus:ring-2 focus:ring-[#25A692]/20 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={status === "loading"}
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      type="email"
                      value={email}
                    />
                  </div>

                  {/* Turnstile Widget (Invisible) */}
                  {siteKey ? (
                    <Turnstile
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                      onSuccess={setTurnstileToken}
                      options={{
                        size: "invisible",
                      }}
                      ref={turnstileRef}
                      siteKey={siteKey}
                    />
                  ) : null}

                  {/* Error Message */}
                  {status === "error" && errorMessage && (
                    <p className="font-body text-red-600 text-sm">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    className="mt-2 flex h-[48px] items-center justify-center rounded-3xl bg-[rgba(204,241,235,0.85)] font-body font-semibold text-[#3E4A4F] text-base shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.15),inset_0px_2px_4px_rgba(255,255,255,0.5)] transition-all hover:scale-[1.02] hover:bg-[rgba(204,241,235,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 lg:text-lg"
                    disabled={status === "loading"}
                    type="submit"
                  >
                    {status === "loading" ? "Mengirim..." : "Kirim"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
