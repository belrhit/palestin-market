import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { OrderModal } from "@/components/OrderModal";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GallerySection } from "@/components/GallerySection";
import { useLanguage } from "@/contexts/LanguageContext";

// Make sure ALL of these images exist in your assets folder!
import keffiyehWhite from "@/assets/keffiyeh-white.jpg";
import keffiyehBlack from "@/assets/keffiyeh-black.jpg";
import keffiyehRed from "@/assets/keffiyeh-red.jpg";
import keffiyehGreen from "@/assets/keffiyeh-green.jpg"; 
import keffiyehBrown from "@/assets/keffiyeh-brown.jpg";
import scarfDarkGrey from "@/assets/scarf-dark-grey.png"; // NEW
import saudiShemagh from "@/assets/saudi-shemagh.png";   // NEW

const Index = () => {
  const { t, language } = useLanguage();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const products = [
    {
      id: "white",
      name: t("whiteKeffiyeh"),
      images: [keffiyehWhite],
    },
    {
      id: "black",
      name: t("blackKeffiyeh"),
      images: [keffiyehBlack],
    },
   
    {
      id: "red",
      name: t("redKeffiyeh"),
      images: [keffiyehRed],
    },
    {
      id: "green",
      name: t("greenKeffiyeh"),
      images: [keffiyehGreen],
    },
    {
      id: "brown",
      name: t("brownKeffiyeh"),
      images: [keffiyehBrown],
    },
    {
      id: "dark-grey-scarf", // NEW
      name: t("darkGreyScarf"),
      images: [scarfDarkGrey],
    },
    {
      id: "saudi-shemagh",  // NEW
      name: t("saudiShemagh"),
      images: [saudiShemagh],
    },
  ];

  const handleBuyClick = (productName: string) => {
    setSelectedProduct(productName);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      <LanguageSwitcher />
      
      <HeroSection />
      
      <section id="products" className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground animate-fade-up">
            {t("productsTitle")}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-16 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }} // Adjusted timing slightly for a smoother cascade with 8 items
              >
                <ProductCard
                  name={product.name}
                  images={product.images}
                  onBuyClick={() => handleBuyClick(product.name)}
                  buyText={t("buyNow")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <GallerySection />
      
      <ContactSection />
      
      <Footer />
      
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
};

export default Index;