"use client";

import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  to: string;
}

export default function NavBar() {
  const t = useTranslations("nav");
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: t("home"), to: "home" },
    { label: t("services"), to: "services" },
    { label: t("about"), to: "about" },
    { label: t("contact"), to: "contact" },
  ];

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Image
            src="/logos/runa-logo.png"
            width={80}
            height={50}
            alt="Runa Logo"
            className="cursor-pointer"
          />
          <div className="flex justify-center flex-1 space-x-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                className="cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors border-transparent text-gray-500 hover:text-primary hover:border-primary"
                activeClass="border-primary-500 text-primary-700"
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>
          <div className="flex items-center space-x-2 ">
            <button
              onClick={() => changeLanguage("en")}
              className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
