import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import keffiyehWhite from "@/assets/keffiyeh-white.jpg";
import keffiyehBlack from "@/assets/keffiyeh-black.jpg";
import keffiyehRed from "@/assets/keffiyeh-red.jpg";

const heroImages = [
  { src: keffiyehWhite, textKey: "hero1" },
  { src: keffiyehBlack, textKey: "hero2" },
  { src: keffiyehRed, textKey: "hero3" },
];

export const HeroSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {heroImages.map((hero, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hero.src})`,
              transform: "scale(1.1)",
              animation: "subtle-zoom 20s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-muted/60 via-transparent to-muted/80" />
          </div>
          
          <div className="relative z-10 flex h-full items-center justify-center">
            <h1
              className={`text-center px-8 text-4xl md:text-6xl lg:text-7xl font-bold text-card transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                textShadow: "2px 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {t(hero.textKey)}
            </h1>
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};
