import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "ar" as const, label: "عربي" },
    { code: "en" as const, label: "EN" },
    { code: "fr" as const, label: "FR" },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-[var(--shadow-elegant)] border border-border">
      <Languages className="h-4 w-4 text-primary" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${
            language === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};
