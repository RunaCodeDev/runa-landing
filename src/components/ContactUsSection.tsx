"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./Contact/ContactForm";

export default function ContactUsSection() {
  const t = useTranslations("contact");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      value: "runacode@runa-code.com",
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "group-hover:shadow-blue-500/20",
    },
    {
      id: "phone",
      icon: Phone,
      value: "+54 9 11 59803273",
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "group-hover:shadow-purple-500/20",
    },
    {
      id: "address",
      icon: MapPin,
      value: "Resistencia, Chaco",
      gradient: "from-primary to-blue-500",
      shadowColor: "group-hover:shadow-primary/20",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden min-h-screen"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.03) 2%, transparent 0%)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Círculos decorativos animados */}
      <motion.div
        style={{ y }}
        className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/5 to-blue-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        className="absolute -bottom-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/5 to-pink-500/5 blur-3xl"
      />

      {/* Círculos splash */}
      <div
        className="absolute top-[15%] left-[25%] w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute top-[45%] right-[15%] w-24 h-24 rounded-full bg-primary/15 blur-xl animate-pulse"
        style={{ animationDuration: "10s" }}
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full bg-primary/10 blur-xl animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-15">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("info.title")}
            </h3>
            <p className="text-gray-600 mb-8">{t("info.description")}</p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 group">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg ${item.shadowColor} transition-all duration-200`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                      {t(`info.${item.id}.title`)}
                    </h4>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t("form.title")}
            </h3>
            <div className="bg-white rounded-xl">
              <div className="p-1">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
