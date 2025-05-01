"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Smartphone,
  Cloud,
  Lightbulb,
  ArrowRight,
  Bot,
} from "lucide-react";
import TecnologyPopUp from "./Services/TecnologyPopUp";

const services = [
  {
    id: "webDev",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "group-hover:shadow-blue-500/20",
  },
  {
    id: "automation",
    icon: Bot,
    gradient: "from-emerald-500 to-teal-500",
    shadowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    id: "mobileDev",
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-500",
    shadowColor: "group-hover:shadow-purple-500/20",
  },
  {
    id: "cloudSolutions",
    icon: Cloud,
    gradient: "from-primary to-blue-500",
    shadowColor: "group-hover:shadow-primary/20",
  },
  {
    id: "consulting",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "group-hover:shadow-amber-500/20",
  },
];

export default function ServicesSection() {
  const t = useTranslations("services");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // State for controlling the technology popup
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to handle "Learn more" click
  const handleLearnMoreClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section
      className="relative py-32 overflow-hidden min-h-screen"
      id="services"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.05) 2%, transparent 0%)",
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-5">
        <div className="text-center max-w-3xl mx-auto mb-20 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10"
          >
            <span className="bg-gradient-to-r from-primary to-primary-950 text-transparent bg-clip-text font-medium">
              {t("subtitle")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text mb-6"
          >
            {t("title")}
          </motion.h2>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 
        "
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full">
                {/* Efecto de brillo en hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500" />

                {/* Card principal */}
                <div
                  className="relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 h-full border border-gray-100
                              group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:border-primary/10"
                >
                  {/* Icono con gradiente */}
                  <div
                    className={`bg-gradient-to-r ${service.gradient} p-4 rounded-xl inline-block mb-6 
                                transition-transform duration-300 group-hover:scale-110 ${service.shadowColor}`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t(`${service.id}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {t(`${service.id}.description`)}
                  </p>

                  {/* Botón "Learn more" */}
                  {service.id !== "automation" && (
                    <div className="absolute bottom-8 left-8 right-8">
                      <div
                        className="flex items-center text-primary font-medium group/link cursor-pointer"
                        onClick={() => handleLearnMoreClick(service.id)}
                      >
                        <span className="group-hover/link:mr-2 transition-all duration-300">
                          {t("learnMore")}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-1 transition-all duration-300" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology Popup */}
      <TecnologyPopUp
        serviceId={selectedService}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </section>
  );
}
