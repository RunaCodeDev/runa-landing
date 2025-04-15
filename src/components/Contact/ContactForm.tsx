"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || t("error"));
      }

      setIsSubmitted(true);
      reset();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setServerError(err instanceof Error ? err.message : t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {t("form.success.title")}
        </h3>
        <p className="text-gray-600 mb-6">{t("form.success.message")}</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-primary font-medium"
        >
          {t("form.success.button")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("form.name")}
        </label>
        <input
          id="name"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name ? "border-red-500" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
          placeholder={t("form.namePlaceholder")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("form.email")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? "border-red-500" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
          placeholder={t("form.emailPlaceholder")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
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
          {...register("message")}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message ? "border-red-500" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
          placeholder={t("form.messagePlaceholder")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {serverError && <div className="text-red-500 text-sm">{serverError}</div>}

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
  );
}
