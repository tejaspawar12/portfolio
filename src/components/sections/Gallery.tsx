"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gallerySlides } from "@/content/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const totalSlides = gallerySlides.length;

  // Auto-scroll effect
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [isHovering, totalSlides]);

  const handlePrevious = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const currentPhotos = gallerySlides[currentSlide].photos;
  const isDoubleColumn = currentPhotos.length === 2;

  return (
    <section id="gallery" className="section-pad py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Speaking & Conferences"
          subtitle="Conference talks, workshops, and professional events"
        />

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-base-800/50 to-base-900/50 backdrop-blur-sm"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Photos Grid */}
          <div className={`relative min-h-96 w-full ${isDoubleColumn ? "py-8 px-4" : "py-12 px-8"}`}>
            <AnimatePresence mode="wait">
              {isDoubleColumn ? (
                // Two columns layout
                <motion.div
                  key={`slide-${currentSlide}`}
                  className="grid grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: slideDirection === 1 ? 40 : -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: slideDirection === 1 ? -40 : 40 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {currentPhotos.map((photo) => (
                    <div key={photo.id} className="flex flex-col gap-3">
                      <div className="group relative aspect-square w-full overflow-hidden rounded-lg border border-white/20 transition-all hover:border-neon-500/50">
                        <Image
                          src={photo.image}
                          alt={photo.alt}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div>
                        <p className="text-center text-sm font-medium text-white/80 transition-colors group-hover:text-neon-400">
                          {photo.title}
                        </p>
                        {photo.description && (
                          <p className="mt-2 text-center text-xs text-white/60 leading-relaxed">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                // Single column (centered)
                <motion.div
                  key={`slide-${currentSlide}`}
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: slideDirection === 1 ? 40 : -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: slideDirection === 1 ? -40 : 40 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {currentPhotos.map((photo) => (
                    <div key={photo.id} className="w-full max-w-lg">
                      <div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-white/20 transition-all hover:border-neon-500/50">
                        <Image
                          src={photo.image}
                          alt={photo.alt}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 40vw"
                        />
                      </div>
                      <div className="mt-3">
                        <p className="text-center text-sm font-medium text-white/80 transition-colors group-hover:text-neon-400">
                          {photo.title}
                        </p>
                        {photo.description && (
                          <p className="mt-2 text-center text-xs text-white/60 leading-relaxed">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-base-900/70 p-2 backdrop-blur-sm transition-all hover:border-neon-500/50 hover:bg-base-900/90 hover:text-neon-400 focus:outline-none focus:ring-2 focus:ring-neon-500"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-base-900/70 p-2 backdrop-blur-sm transition-all hover:border-neon-500/50 hover:bg-base-900/90 hover:text-neon-400 focus:outline-none focus:ring-2 focus:ring-neon-500"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {gallerySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-neon-400"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <p className="mt-4 text-center text-xs text-white/50">
          Slide {currentSlide + 1} of {totalSlides}
        </p>
      </div>
    </section>
  );
}
