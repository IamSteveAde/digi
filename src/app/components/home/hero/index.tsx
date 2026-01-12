"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Wifi,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { getImgPath } from "@/utils/pathUtils";

const BRAND = {
  teal: "#61abbb",
  purple: "#5f3b86",
};

const slides = [
  {
    title: "Digital Access",
    headline: "Technology for everyone.",
    description:
      "We work to ensure communities are not excluded from the digital world because of location, income, or circumstance.",
    image: "/images/hero/every.png",
    icon: Wifi,
    accent: BRAND.teal,
    cta: { label: "Our Work", href: "/about" },
  },
  {
    title: "Digital Skills",
    headline: "Skills that unlock futures.",
    description:
      "Through mentorship, training, and education, we empower people with skills needed to thrive in a digital economy.",
    image: "/images/hero/tutor.png",
    icon: GraduationCap,
    accent: BRAND.purple,
    cta: { label: "Explore Programmes", href: "/programmes" },
  },
  {
    title: "Digital Opportunity",
    headline: "Inclusion creates opportunity.",
    description:
      "Access and skills lead to jobs, innovation, and economic participation across Africa.",
    image: "/images/hero/access.png",
    icon: Briefcase,
    accent: BRAND.teal,
    cta: { label: "Learn More", href: "/about" },
  },
  {
    title: "Global Learning Access",
    headline: "World-class skills. Real opportunity.",
    description:
      "Through DII’s Coursera onboarding, women and underserved learners access globally recognised courses that build job-ready skills and open doors to work.",
    image: "/images/hero/coursera.png",
    icon: Briefcase,
    accent: BRAND.purple,
    cta: { label: "Coursera Onboarding", href: "/coursera" },
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const Icon = slide.icon;

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () =>
    setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={getImgPath(slide.image)}
          alt={slide.title}
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              120deg,
              rgba(0,0,0,0.78),
              ${slide.accent}55
            )`,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 lg:max-w-screen-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl space-y-7"
            >
              <div className="flex items-center gap-3 text-white/80">
                <Icon size={20} />
                <span className="text-[11px] tracking-[0.45em] uppercase font-semibold text-[#d9c8ff]">
                  {slide.title}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-light leading-tight">
                <span className="text-white">
                  {slide.headline.split(" ")[0]}
                </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff, ${BRAND.purple})`,
                  }}
                >
                  {" " + slide.headline.split(" ").slice(1).join(" ")}
                </span>
              </h1>

              <p className="text-white/80 max-w-lg leading-relaxed">
                {slide.description}
              </p>

              {/* CTA — NOW 100% CLICKABLE */}
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-xs tracking-[0.25em] uppercase transition hover:opacity-90 cursor-pointer"
                style={{
                  backgroundColor: slide.accent,
                  color: "#fff",
                }}
              >
                {slide.cta.label}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DESKTOP ARROWS (FIXED) */}
      <div className="absolute inset-y-0 w-full hidden md:flex items-center justify-between px-6 z-30 pointer-events-none">
        <button
          onClick={prev}
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition pointer-events-auto cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={next}
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition pointer-events-auto cursor-pointer"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
