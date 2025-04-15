"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-primary/5 to-blue-500/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-500/5 to-primary/5 blur-3xl" />
      </div>

      {/* Grid decorativo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10"
            >
              <span className="bg-gradient-to-r from-primary to-primary-950 text-transparent bg-clip-text">
                Runa Code
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <ScrollLink
                className="px-8 cursor-pointer py-3 rounded-lg text-lg font-medium bg-gradient-to-r from-primary to-primary-950 text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                to="contact"
              >
                {t("cta")}
              </ScrollLink>
              <ScrollLink
                to="about"
                className="px-8 py-3 cursor-pointer rounded-lg text-lg font-medium bg-white text-primary hover:bg-gray-50 transition-all duration-300 shadow-md"
              >
                {t("secondary_cta")}
              </ScrollLink>
            </motion.div>
          </motion.div>

          {/* Imagen/Ilustración */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-500/10 rounded-full blur-3xl" />
              <Image
                src="/logos/runa-logo.png"
                alt="Hero Illustration"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
