"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactUsSection() {
  const t = useTranslations("contact");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Aquí se implementaría la lógica para enviar el formulario
      // Por ahora, simulamos un envío exitoso después de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      value: "runcode0@gmail.com",
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
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.id}
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
                              group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/10 flex flex-col items-center text-center"
                >
                  {/* Icono con gradiente */}
                  <div
                    className={`bg-gradient-to-r ${item.gradient} p-3 rounded-xl inline-block mb-4 
                                transition-transform duration-300 group-hover:scale-110 ${item.shadowColor}`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Contenido */}
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t(`info.${item.id}.title`)}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Mapa de Google */}
              <div className="relative overflow-hidden h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113289.01765328286!2d-59.07774719974919!3d-27.460484925668005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c62a6f5f70b%3A0xf03ac86511c2cd6d!2sResistencia%2C%20Chaco!5e0!3m2!1ses!2sar!4v1744676873311!5m2!1ses!2sar"
                  className="w-full h-full min-h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Formulario de contacto */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("form.title")}
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col items-center justify-center text-center h-[300px]"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {t("form.success.title")}
                    </h4>
                    <p className="text-gray-600">{t("form.success.message")}</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-primary font-medium"
                    >
                      {t("form.success.button")}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary-950 text-white font-medium py-3 px-6 rounded-lg 
                              hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {t("form.submit")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
