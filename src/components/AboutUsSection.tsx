"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Users, Code, Heart, Zap } from "lucide-react";

// Datos del equipo (pueden ser reemplazados con datos reales)
const teamMembers = [
  {
    id: 1,
    name: "Irala Damian Agustin",
    role: "Full Stack Developer",
    bio: "member1.bio",
    gradient: "from-primary to-primary-950",
    shadowColor: "group-hover:shadow-blue-500/20",
    image: "/members/i.png",
  },
  {
    id: 2,
    name: "Coschiza Enzo",
    role: "Full Stack Developer",
    bio: "member2.bio",
    gradient: "from-primary to-white",
    shadowColor: "group-hover:shadow-purple-500/20",
    image: "/members/enzo.png",
  },
];

// Valores de la empresa
const companyValues = [
  {
    id: "innovation",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "group-hover:shadow-blue-500/20",
  },
  {
    id: "quality",
    icon: Code,
    gradient: "from-purple-500 to-pink-500",
    shadowColor: "group-hover:shadow-purple-500/20",
  },
  {
    id: "teamwork",
    icon: Users,
    gradient: "from-primary to-blue-500",
    shadowColor: "group-hover:shadow-primary/20",
  },
  {
    id: "passion",
    icon: Heart,
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "group-hover:shadow-amber-500/20",
  },
];

export default function AboutUsSection() {
  const t = useTranslations("aboutUs");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" className="relative py-32 overflow-hidden min-h-screen">
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

        {/* Círculos splash  */}
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
        <div
          className="absolute top-[65%] right-[30%] w-12 h-12 rounded-full bg-primary/25 blur-xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute top-[10%] right-[10%] w-28 h-28 rounded-full bg-primary/10 blur-xl animate-pulse"
          style={{ animationDuration: "9s" }}
        />

        {/* Salpicaduras más pequeñas */}
        <div className="absolute top-[30%] left-[40%] w-8 h-8 rounded-full bg-primary/20 blur-lg" />
        <div className="absolute bottom-[40%] right-[25%] w-6 h-6 rounded-full bg-primary/15 blur-lg" />
        <div className="absolute top-[80%] left-[30%] w-10 h-10 rounded-full bg-primary/10 blur-lg" />

        {/* Splash adicionales */}
        <div
          className="absolute top-[5%] left-[50%] w-14 h-14 rounded-full bg-primary/15 blur-xl animate-pulse"
          style={{ animationDuration: "11s" }}
        />
        <div
          className="absolute top-[70%] left-[60%] w-18 h-18 rounded-full bg-primary/20 blur-xl animate-pulse"
          style={{ animationDuration: "9.5s" }}
        />
        <div className="absolute top-[25%] right-[45%] w-10 h-10 rounded-full bg-primary/10 blur-lg" />
        <div
          className="absolute bottom-[10%] right-[10%] w-16 h-16 rounded-full bg-primary/25 blur-xl animate-pulse"
          style={{ animationDuration: "8.5s" }}
        />
        <div className="absolute bottom-[30%] left-[25%] w-7 h-7 rounded-full bg-primary/15 blur-lg" />

        {/* Formas irregulares para variedad visual */}
        <div className="absolute top-[40%] left-[5%] w-20 h-12 rounded-[40%] bg-primary/10 blur-xl rotate-45" />
        <div className="absolute bottom-[15%] right-[40%] w-12 h-20 rounded-[40%] bg-primary/15 blur-xl -rotate-12" />
        <div className="absolute top-[55%] right-[5%] w-16 h-16 rounded-[30%] bg-primary/10 blur-xl rotate-12" />
      </div>

      {/* Círculos decorativos animados */}
      <motion.div
        style={{ y }}
        className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary to-primary-950 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        className="absolute -bottom-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/5 to-pink-500/5 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-20">
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Historia y Misión */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Imagen de la empresa */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="aspect-video relative">
              {/* Placeholder para la imagen de la empresa */}
              <Image
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center"
                src="/quienesSomos.png"
                alt="Imagen de la empresa"
                fill
              />
            </div>
          </motion.div>

          {/* Contenido de historia y misión */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold text-gray-900"
            >
              {t("story.title")}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              {t("story.content")}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 pt-4"
            >
              {t("mission.title")}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-600"
            >
              {t("mission.content")}
            </motion.p>
          </motion.div>
        </div>

        {/* Valores de la empresa */}
        <div className="w-full mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            {t("values.title")}
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.id}
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
                    className="relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 h-full border border-gray-100
                              group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/10"
                  >
                    {/* Icono con gradiente */}
                    <div
                      className={`bg-gradient-to-r ${value.gradient} p-3 rounded-xl inline-block mb-4 
                                transition-transform duration-300 group-hover:scale-110 ${value.shadowColor}`}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Contenido */}
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {t(`values.${value.id}.title`)}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t(`values.${value.id}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div className="w-full">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            {t("team.title")}
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
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
                    className="relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 h-full border border-gray-100
                              group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/10"
                  >
                    {/* Imagen del miembro del equipo */}
                    <div className="mb-4 overflow-hidden rounded-xl aspect-square relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-10`}
                      />
                      <Image
                        className="absolute inset-0"
                        src={member.image}
                        alt="Foto"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                      />
                    </div>

                    {/* Información del miembro */}
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p
                      className={`text-sm font-medium bg-gradient-to-r ${member.gradient} text-transparent bg-clip-text mb-3`}
                    >
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t(`team.${member.bio}`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
