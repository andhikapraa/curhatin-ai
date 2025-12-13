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
  },
  {
    title: "Dapatkan Dukungan yang Menenangkan",
    description:
      "AI akan merespons dengan empati, teknik menenangkan, dan pandangan jujur yang membantu.",
    image: "/how/robot.png",
    imagePosition: "left" as const,
  },
  {
    title: "Temukan Ruang Aman untuk Bernafas",
    description:
      "Lanjutkan ke latihan mindful atau emotional reflection ketika kamu siap.",
    image: "/how/mirror.png",
    imagePosition: "right" as const,
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-[#A7DEE3] py-24 lg:py-32" id="how-it-works">
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
      <div className="relative z-10 mx-auto max-w-[1216px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-3 lg:mb-16">
          <h2 className="text-center font-bold font-heading text-3xl text-white lg:text-5xl">
            How It Works
          </h2>
          <p className="text-center font-body font-extrabold text-lg text-white lg:text-2xl">
            Tiga langkah sederhana untuk mendapatkan dukungan yang menenangkan.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6 lg:gap-4">
          {steps.map((step) => (
            <div
              className="relative overflow-hidden rounded-3xl bg-[#D9F1F3]"
              key={step.title}
            >
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
                className={`relative z-10 flex flex-col items-center gap-6 p-8 lg:h-[284px] lg:flex-row lg:items-center lg:gap-[28px] lg:px-14 lg:py-4 ${
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
                  <button
                    className="flex h-[50px] w-full max-w-[266px] items-center justify-center rounded-3xl bg-[rgba(25,111,98,0.3)] px-[10px] font-body font-semibold text-white text-xl shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] transition-all hover:scale-[1.02] hover:bg-[rgba(25,111,98,0.4)] active:scale-[0.98]"
                    type="button"
                  >
                    Deskripsi Lengkap
                  </button>
                </div>

                {/* Image */}
                <div className="relative h-[200px] w-[200px] flex-shrink-0 lg:h-[251px] lg:w-[300px]">
                  <Image
                    alt={step.title}
                    className="object-contain"
                    fill
                    sizes="(max-width: 1024px) 200px, 300px"
                    src={step.image}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
