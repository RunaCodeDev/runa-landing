"use client";

import { scroller } from "react-scroll";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  to: string;
}

export default function NavBar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cerrar el menú móvil cuando se cambia el tamaño de la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: NavItem[] = [
    { label: t("home"), to: "home" },
    { label: t("services"), to: "services" },
    { label: t("about"), to: "about" },
    { label: t("contact"), to: "contact" },
  ];

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}`);
  };

  const scrollToSection = (to: string) => {
    if (!mounted) return;

    // Cerrar el menú móvil al hacer clic en un enlace
    setIsMenuOpen(false);

    // Usar scroller de react-scroll
    scroller.scrollTo(to, {
      duration: 600,
      delay: 50,
      smooth: true,
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/logos/runa-logo.png"
              width={80}
              height={50}
              alt="Runa Logo"
            />
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:flex justify-center flex-1 space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                onClick={() => scrollToSection(item.to)}
                className="cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors border-transparent text-gray-500 hover:text-primary hover:border-primary"
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Selector de idioma para escritorio */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1 rounded-md text-sm font-medium  hover:bg-gray-100 ${
                pathname === "/en" ? "text-primary" : "text-gray-700"
              }`}
              disabled={pathname === "/en"}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className={`px-3 py-1 rounded-md text-sm font-medium  hover:bg-gray-100 ${
                pathname === "/es" ? "text-primary" : "text-gray-700"
              }`}
              disabled={pathname === "/es"}
            >
              ES
            </button>
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                onClick={() => scrollToSection(item.to)}
                className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {item.label}
              </div>
            ))}
            <div className="flex items-center space-x-2 px-3 py-2">
              <button
                onClick={() => {
                  changeLanguage("en");
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-md text-sm font-medium  hover:bg-gray-100 ${
                  pathname === "/en" ? "text-primary" : "text-gray-700"
                }`}
                disabled={pathname === "/en"}
              >
                EN
              </button>
              <button
                onClick={() => {
                  changeLanguage("es");
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-md  text-sm font-medium  hover:bg-gray-100 ${
                  pathname === "/es" ? "text-primary" : "text-gray-700"
                }`}
                disabled={pathname === "/es"}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
