import Image from "next/image";

const features = [
  {
    title: "Journaling",
    image: "/features/journaling.png",
    description:
      "Tuangkan pikiran dan emosimu dengan bebas. Curhatin AI membantumu memetakan perasaan dan memberi refleksi lembut agar kamu bisa memahami dirimu dengan lebih tenang.",
  },
  {
    title: "Mood Tracker",
    image: "/features/mood.png",
    description:
      "Catat suasana hati dan peristiwa penting, lalu lihat bagaimana perasaanmu berubah. Mood Tracker membantu kamu mengenali pola dan kebutuhan emosimu dengan lebih jelas.",
  },
  {
    title: "Mindful Moment",
    image: "/features/mindful.png",
    description:
      "Latihan grounding 5-4-3-2-1, mindful breathing, dan momen hening yang membantu tubuh dan pikiranmu kembali stabil.",
  },
];

export function Features() {
  return (
    <section className="relative bg-[#D9F1F3] py-24 lg:py-32" id="features">
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
      <div className="relative z-10 mx-auto max-w-[1276px] px-6 lg:px-12">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-heading text-3xl text-[#25A692] lg:mb-16 lg:text-5xl">
          Fitur yang Menemanimu Lebih Tenang
        </h2>

        {/* Cards Grid */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center lg:gap-[50px]">
          {features.map((feature) => (
            <div
              className="flex w-full max-w-[393px] flex-col items-center gap-5 rounded-[28px] bg-[rgba(37,166,146,0.35)] px-[22px] py-10 shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2),inset_0px_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-[5px] lg:h-[600px]"
              key={feature.title}
            >
              {/* Title */}
              <h3 className="text-center font-bold font-heading text-2xl text-white lg:text-[32px]">
                {feature.title}
              </h3>

              {/* Image */}
              <div className="relative h-[200px] w-[200px] lg:h-[295px] lg:w-[250px]">
                <Image
                  alt={feature.title}
                  className="object-contain"
                  fill
                  sizes="(max-width: 1024px) 200px, 250px"
                  src={feature.image}
                />
              </div>

              {/* Description */}
              <p className="text-center font-body font-semibold text-base text-white leading-[150%] lg:text-xl">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
