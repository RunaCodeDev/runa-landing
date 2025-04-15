"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Github, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}#home`, label: t("nav.home") },
    { href: `/${locale}#services`, label: t("nav.services") },
    { href: `/${locale}#about`, label: t("nav.about") },
    { href: `/${locale}#contact`, label: t("nav.contact") },
  ];

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      value: "runacode0@gmail.com",
    },
    {
      id: "phone",
      icon: Phone,
      value: "+54 9 11 59803273",
    },
    {
      id: "address",
      icon: MapPin,
      value: "Resistencia, Chaco",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/RunaCodeDev",
    },
    {
      name: "LinkedIn",
      icon: Instagram,
      href: "https://www.instagram.com/runacode_/",
    },
  ];

  return (
    <footer className="relative bg-gray-50 pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.03) 2%, transparent 0%)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Decorative circles */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute -top-[10%] -right-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/5 to-blue-500/5 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute -bottom-[10%] -left-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-purple-500/5 to-pink-500/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-1"
          >
            <div className="mb-4">
              <Link href={`/${locale}`} className="inline-block">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Runa Code
                </span>
              </Link>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              {t("aboutUs.description").split(".")[0] + "."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full cursor-pointer bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-lg transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t("nav.home")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t("services.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}#services`}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("services.webDev.title")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#services`}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("services.mobileDev.title")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#services`}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("services.cloudSolutions.title")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#services`}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t("services.consulting.title")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t("contact.info.title")}
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {t(`contact.info.${item.id}.title`)}
                    </h4>
                    <p className="text-sm text-gray-600">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom section with copyright and language switcher */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              {currentYear} Runa Code. {t("contact.info.address.title")}:{" "}
              {contactInfo[2].value}
            </p>
            <div className="flex space-x-4">
              <Link
                href="/es"
                className={`text-sm ${
                  locale === "es"
                    ? "text-primary font-medium"
                    : "text-gray-500 hover:text-primary"
                } transition-colors duration-200`}
              >
                Español
              </Link>
              <Link
                href="/en"
                className={`text-sm ${
                  locale === "en"
                    ? "text-primary font-medium"
                    : "text-gray-500 hover:text-primary"
                } transition-colors duration-200`}
              >
                English
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
