import { useLanguage } from "@/contexts/LanguageContext";
import galleryAqsa from "@/assets/gallery-aqsa-1.jpg";
import galleryOliveTree from "@/assets/gallery-olive-tree.jpg";
import galleryFlag from "@/assets/gallery-flag.jpg";
import galleryEmbroidery from "@/assets/gallery-embroidery.jpg";

export const GallerySection = () => {
  const { t } = useLanguage();

  const galleryItems = [
    {
      image: galleryAqsa,
      quote: t("galleryQuote1"),
    },
    {
      image: galleryOliveTree,
      quote: t("galleryQuote2"),
    },
    {
      image: galleryFlag,
      quote: t("galleryQuote3"),
    },
    {
      image: galleryEmbroidery,
      quote: t("galleryQuote4"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground animate-fade-up">
          {t("galleryTitle")}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-16 rounded-full" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-[var(--shadow-card)] transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.quote}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed drop-shadow-lg">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
