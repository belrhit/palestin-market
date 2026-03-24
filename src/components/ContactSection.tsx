import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول"
          : language === "fr"
          ? "Veuillez remplir tous les champs"
          : "Please fill all fields"
      );
      return;
    }

    // ✅ Create WhatsApp message
    const message = `
${t("contactTitle")} 📩
-----------------------------
${t("name")}: ${formData.name}
${t("email")}: ${formData.email}
${t("message")}: ${formData.message}
-----------------------------
🌍 Sent from the Keffiyeh Website
    `;

    // ✅ WhatsApp number (without leading 0, with country code)
    const phone = "212653233814";

    // ✅ Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // ✅ WhatsApp URL (works on mobile & desktop)
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    // ✅ Open WhatsApp in new tab (or app on mobile)
    window.location.href = whatsappURL; // <-- Use location.href instead of window.open

    // ✅ Reset form (optional, can also wait until user sends)
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("contactTitle")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("contactDesc")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-foreground">
              {t("name")}
            </Label>
            <Input
              id="contact-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-card border-border"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-foreground">
              {t("email")}
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card border-border"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message" className="text-foreground">
              {t("message")}
            </Label>
            <Textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-card border-border min-h-[150px]"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold"
            size="lg"
          >
            {t("send")}
          </Button>
        </form>
      </div>
    </section>
  );
};
