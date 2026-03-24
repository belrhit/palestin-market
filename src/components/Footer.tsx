import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Music2, MessageCircle } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/kuffiyeh_eljadida/", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/212617610928", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-muted text-card py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={social.label}
              >
                <div className="bg-card text-muted rounded-full p-3 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110">
                  <social.icon className="h-6 w-6" />
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold flex items-center justify-center gap-2">
              ❤️ {t("footerText")} 🇵🇸
            </p>
          </div>
          <div className="text-sm text-muted-foreground/80 text-center">
  <p>
    © 2025 Palestinian Keffiyeh. All rights reserved. — Created by{" "}
    <a
  href="https://aymanwebgenius.space"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500 hover:underline"
>
  AYMAN BELRHIT
</a>

  </p>
</div>

  </div>
      </div>
    </footer>
  );
};
