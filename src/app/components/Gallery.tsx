import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzcyMDk0MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Golden Retriever",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MjA0Nzc4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Golden Gate Bridge",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1610241211891-12adc05f5a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3NlbWl0ZSUyMG1vdW50YWlucyUyMGZvcmVzdHxlbnwxfHx8fDE3NzIxMTI4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Yosemite Mountains",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600137430184-21a17a68ace5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMHRheGl8ZW58MXx8fHwxNzcyMTEyODM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Tokyo Street",
  },
];

// Pre-compute duplicated slides (3x for seamless infinite scroll)
const duplicatedSlides = [...slides, ...slides, ...slides];

const SCROLL_SPEED = 1; // pixels per frame
const SET_COUNT = 3; // number of duplicated sets

export function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let isInitialized = false;
    let cachedSlideWidth = 0;

    const autoScroll = () => {
      if (!scrollContainer) return;

      // Initialize scroll position and cache slideWidth on first frame
      if (!isInitialized && scrollContainer.scrollWidth > 0) {
        cachedSlideWidth = scrollContainer.scrollWidth / SET_COUNT;
        scrollContainer.scrollLeft = cachedSlideWidth;
        isInitialized = true;
      }

      scrollContainer.scrollLeft += SCROLL_SPEED;

      // Reset to middle section when reaching the end of second set
      if (scrollContainer.scrollLeft >= cachedSlideWidth * 2) {
        scrollContainer.scrollLeft = cachedSlideWidth;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="py-20 bg-vc-light-bg dark:bg-vc-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text">
          Gallery
        </h2>
      </div>

      {/* Horizontal scrollable gallery */}
      <div
        className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        ref={scrollContainerRef}
      >
        <div className="flex gap-4 min-w-max pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100%-80rem)/2))]">
          {duplicatedSlides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="flex-none w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px]"
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="w-full h-[320px] sm:h-[360px] md:h-[400px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint on mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:hidden">
          Swipe to see more →
        </div>
      </div>
    </section>
  );
}
