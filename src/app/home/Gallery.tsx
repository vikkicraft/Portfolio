import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useEffect, useRef, useState, useCallback } from "react";
import slideOne from "../../asset/images/dog.jpg";
import slideTwo from "../../asset/images/bridge.jpg";
import slideThree from "../../asset/images/mountains.jpg";
import slideFour from "../../asset/images/tokoyo.jpg";
import sliderTrackImg from "../../imports/image-3.png";

const slides = [
  {
    id: 1,
    image: slideOne,
    alt: "Golden Retriever",
  },
  {
    id: 2,
    image: slideTwo,
    alt: "Golden Gate Bridge",
  },
  {
    id: 3,
    image: slideThree,
    alt: "Yosemite Mountains",
  },
  {
    id: 4,
    image: slideFour,
    alt: "Tokyo Street",
  },
];

const duplicatedSlides = [...slides, ...slides, ...slides];
const SET_COUNT = 3;

export function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(0); // 0 to 100
  const isUserInteractingRef = useRef(false);

  // Sync gallery scroll position to slider value
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isUserInteractingRef.current) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      const currentScroll = container.scrollLeft;
      const percentage = (currentScroll / maxScroll) * 100;
      setSliderValue(percentage);
    }
  }, []);

  // When user drags the custom physical slider knob
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSliderValue(value);

    const container = scrollContainerRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = (value / 100) * maxScroll;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let isInitialized = false;
    let cachedSlideWidth = 0;

    const autoScroll = () => {
      if (!scrollContainer) return;

      if (!isInitialized && scrollContainer.scrollWidth > 0) {
        cachedSlideWidth = scrollContainer.scrollWidth / SET_COUNT;
        scrollContainer.scrollLeft = cachedSlideWidth;
        isInitialized = true;
      }

      if (!isUserInteractingRef.current) {
        scrollContainer.scrollLeft += 0.8;

        if (scrollContainer.scrollLeft >= cachedSlideWidth * 2) {
          scrollContainer.scrollLeft = cachedSlideWidth;
        }

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (maxScroll > 0) {
          setSliderValue((scrollContainer.scrollLeft / maxScroll) * 100);
        }
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
        className="overflow-x-auto pt-10 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onPointerDown={() => { isUserInteractingRef.current = true; }}
        onPointerUp={() => { isUserInteractingRef.current = false; }}
      >
        <div className="flex gap-4 min-w-max pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100%-80rem)/2))]">
          {duplicatedSlides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="flex-none w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] group overflow-hidden rounded-xl cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-8"
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="w-full h-[320px] sm:h-[360px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
