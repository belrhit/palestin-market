import React, { createContext, useContext, useState } from "react";

type Language = "ar" | "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    hero1: "الكوفية رمز العزة والهوية 🇵🇸",
    hero2: "فلسطين ليست قضية، فلسطين هُوية",
    hero3: "كن جزءاً من المقاومة بالهوية",
    
    productsTitle: "منتجاتنا",
    whiteKeffiyeh: "الكوفية البيضاء",
    blackKeffiyeh: "الكوفية السوداء",
    greyKeffiyeh: "الكوفية الرمادية", 
    redKeffiyeh: "الكوفية الحمراء",
    greenKeffiyeh: "الكوفية الخضراء", 
    brownKeffiyeh: "الكوفية البنية", 
    darkGreyScarf: "وشاح رمادي داكن", // NEW
    saudiShemagh: "شماغ سعودي أبيض",    // NEW
    
    // Pricing
    casaJadida: "الدار البيضاء والجديدة: 99 درهم",
    otherCities: "باقي المدن المغربية: 129 درهم",
    
    buyNow: "اشتر الآن",
    
    orderTitle: "اطلب الآن",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    quantity: "الكمية",
    address: "المدينة / العنوان",
    submit: "إرسال الطلب",
    cancel: "إلغاء",
    
    contactTitle: "تواصل معنا",
    contactDesc: "نحن هنا للإجابة على أسئلتك",
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    send: "إرسال",
    
    footerText: "الكوفية الفلسطينية — هوية لا تموت",
    
    galleryTitle: "فلسطين في القلب",
    galleryQuote1: "القدس... مهد الحضارات ونبض القلوب",
    galleryQuote2: "شجرة الزيتون... رمز الصمود والجذور",
    galleryQuote3: "العلم الفلسطيني... فخرنا وهويتنا",
    galleryQuote4: "التطريز الفلسطيني... فن يحكي قصة شعب",
  },
  en: {
    hero1: "Palestine is not a cause, it’s an identity 🇵🇸",
    hero2: "Every stone in Jerusalem tells a story of resistance",
    hero3: "Be Part of the Resistance Through Identity",
    
    productsTitle: "Our Products",
    whiteKeffiyeh: "White Keffiyeh",
    blackKeffiyeh: "Black Keffiyeh",
    greyKeffiyeh: "Grey Keffiyeh", 
    redKeffiyeh: "Red Keffiyeh",
    greenKeffiyeh: "Green Keffiyeh", 
    brownKeffiyeh: "Brown Keffiyeh", 
    darkGreyScarf: "Dark Grey Scarf",   // NEW
    saudiShemagh: "White Saudi Shemagh",// NEW
    
    // Pricing
    casaJadida: "Casablanca & El Jadida: 99 MAD",
    otherCities: "Other Cities: 129 MAD",
    
    buyNow: "Buy Now",
    
    orderTitle: "Order Now",
    fullName: "Full Name",
    phone: "Phone Number",
    quantity: "Quantity",
    address: "City / Address",
    submit: "Submit Order",
    cancel: "Cancel",
    
    contactTitle: "Contact Us",
    contactDesc: "We're here to answer your questions",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    
    footerText: "Palestinian Keffiyeh — An Identity That Never Dies",
    
    galleryTitle: "Palestine in Our Hearts",
    galleryQuote1: "Jerusalem... Cradle of civilizations and heartbeat of souls",
    galleryQuote2: "The olive tree... Symbol of resilience and deep roots",
    galleryQuote3: "Palestinian flag... Our pride and identity",
    galleryQuote4: "Palestinian embroidery... Art that tells a people's story",
  },
  fr: {
    hero1: "Le Keffieh: Symbole de Fierté et d'Identité 🇵🇸",
    hero2: "La Palestine n’est pas une cause, c’est une identité.",
    hero3: "La liberté de la Palestine est la liberté de l’humanité",
    
    productsTitle: "Nos Produits",
    whiteKeffiyeh: "Keffieh Blanc",
    blackKeffiyeh: "Keffieh Noir",
    greyKeffiyeh: "Keffieh Gris", 
    redKeffiyeh: "Keffieh Rouge",
    greenKeffiyeh: "Keffieh Vert", 
    brownKeffiyeh: "Keffieh Marron", 
    darkGreyScarf: "Écharpe Gris Foncé",  // NEW
    saudiShemagh: "Shemagh Saoudien Blanc", // NEW
    
    // Pricing
    casaJadida: "Casablanca & El Jadida: 99 DH",
    otherCities: "Autres Villes: 129 DH",
    
    buyNow: "Acheter",
    
    orderTitle: "Commander",
    fullName: "Nom Complet",
    phone: "Numéro de Téléphone",
    quantity: "Quantité",
    address: "Ville / Adresse",
    submit: "Envoyer la Commande",
    cancel: "Annuler",
    
    contactTitle: "Contactez-nous",
    contactDesc: "Nous sommes là pour répondre à vos questions",
    name: "Nom",
    email: "Email",
    message: "Message",
    send: "Envoyer",
    
    footerText: "Keffieh Palestinien — Une Identité Immortelle",
    
    galleryTitle: "Palestine dans nos cœurs",
    galleryQuote1: "Jérusalem... Berceau des civilisations et cœur battant des âmes",
    galleryQuote2: "L'olivier... Symbole de résilience et de racines profondes",
    galleryQuote3: "Drapeau palestinien... Notre fierté et identité",
    galleryQuote4: "Broderie palestinienne... Art qui raconte l'histoire d'un peuple",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("ar");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};