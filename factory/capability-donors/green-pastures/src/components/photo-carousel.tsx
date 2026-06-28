"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  image: string;
};

type PhotoCarouselProps = {
  slides: Slide[];
};

export function PhotoCarousel({ slides }: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    const timer = window.setInterval(() => emblaApi.scrollNext(), 4200);

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      window.clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="space-y-5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide.title} className="min-w-0 flex-[0_0_88%] pr-4 md:flex-[0_0_52%]">
              <motion.div
                initial={{ opacity: 0.72, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative h-[21rem] overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900 md:h-[31rem]"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 88vw, 52vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-display text-2xl text-white md:text-4xl">{slide.title}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition ${
              activeIndex === index ? "w-16 bg-amber-300" : "w-7 bg-white/20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
