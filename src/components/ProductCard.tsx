import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react"; // Added for the location pins!

interface ProductCardProps {
  name: string;
  images: string[];
  onBuyClick: () => void;
  buyText: string;
}

export const ProductCard = ({
  name,
  images,
  onBuyClick,
  buyText,
}: ProductCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="group overflow-hidden border-border hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-[1.02] bg-card">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-80 overflow-hidden">
                <img
                  src={image}
                  alt={`${name} - ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-muted/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CardContent className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">{name}</h3>
        
        {/* New Dual Pricing Design based on your image */}
        <div className="flex flex-col gap-2 font-bold text-sm md:text-base">
          <div className="flex items-center justify-center gap-2 text-emerald-700 bg-emerald-50 py-2 px-3 rounded-md border border-emerald-100">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            <span>{t("casaJadida")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-red-700 bg-red-50 py-2 px-3 rounded-md border border-red-100">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            <span>{t("otherCities")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={onBuyClick}
          className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold transition-all duration-300"
          size="lg"
        >
          {buyText}
        </Button>
      </CardFooter>
    </Card>
  );
};