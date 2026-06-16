import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import slideOne from "../../asset/images/dog.jpg";
import slideTwo from "../../asset/images/bridge.jpg";
import slideThree from "../../asset/images/mountains.jpg";
import slideFour from "../../asset/images/tokoyo.jpg";

const slides = [
  {
    id: 1,
    image:
      slideOne,
    alt: "Golden Retriever",
  },
  {
    id: 2,
    image:
      slideTwo,
    alt: "Golden Gate Bridge",
  },
  {
    id: 3,
    image:
      slideThree,
    alt: "Yosemite Mountains",
  },
  {
    id: 4,
    image:
      slideFour,
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
