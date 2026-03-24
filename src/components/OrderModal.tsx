import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const OrderModal = ({ isOpen, onClose, productName }: OrderModalProps) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: "1",
    address: "",
    city: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim()
    ) {
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول"
          : language === "fr"
          ? "Veuillez remplir tous les champs"
          : "Please fill all fields"
      );
      return;
    }

    const message = `
طلب جديد / New Order:
المنتج / Product: ${productName}
الاسم / Name: ${formData.name}
الهاتف / Phone: ${formData.phone}
الكمية / Quantity: ${formData.quantity}
المدينة / City: ${formData.city}
العنوان / Address: ${formData.address}
    `.trim();

    const whatsappNumber = "212617610928"; // Replace with actual number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    toast.success(
      language === "ar"
        ? "تم إرسال الطلب!"
        : language === "fr"
        ? "Commande envoyée!"
        : "Order sent!"
    );

    setFormData({ name: "", phone: "", quantity: "1", address: "", city: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {t("orderTitle")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              {t("fullName")}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-background border-border"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              {t("phone")}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="bg-background border-border"
              dir="ltr"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-foreground">
              {t("quantity")}
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="bg-background border-border"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-foreground">
              {language === "ar"
                ? "المدينة"
                : language === "fr"
                ? "Ville"
                : "City"}
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="bg-background border-border"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">
              {t("address")}
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="bg-background border-border"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
            >
              {t("submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
