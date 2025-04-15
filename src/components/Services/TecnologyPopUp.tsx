"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Technology icons/logos for each service
const technologies = {
  webDev: [
    { name: "React", icon: "/logos/tech/react.svg" },
    { name: "Next.js", icon: "/logos/tech/nextjs.svg" },
    { name: "TypeScript", icon: "/logos/tech/typescript.svg" },
    { name: "Tailwind CSS", icon: "/logos/tech/tailwind.svg" },
    { name: "Node.js", icon: "/logos/tech/nodejs.svg" },
  ],
  mobileDev: [
    { name: "React Native", icon: "/logos/tech/react-native.svg" },
    { name: "Flutter", icon: "/logos/tech/flutter.svg" },
    { name: "Swift", icon: "/logos/tech/swift.svg" },
    { name: "Kotlin", icon: "/logos/tech/kotlin.svg" },
    { name: "Firebase", icon: "/logos/tech/firebase.svg" },
  ],
  cloudSolutions: [
    { name: "AWS", icon: "/logos/tech/aws.svg" },
    { name: "Azure", icon: "/logos/tech/azure.svg" },
    { name: "Google Cloud", icon: "/logos/tech/gcp.svg" },
    { name: "Docker", icon: "/logos/tech/docker.svg" },
    { name: "Kubernetes", icon: "/logos/tech/kubernetes.svg" },
  ],
  consulting: [
    { name: "Agile", icon: "/logos/tech/agile.svg" },
    { name: "DevOps", icon: "/logos/tech/devops.svg" },
    { name: "CI/CD", icon: "/logos/tech/cicd.svg" },
    { name: "Data Analytics", icon: "/logos/tech/analytics.svg" },
    { name: "Security", icon: "/logos/tech/security.svg" },
  ],
};

interface TecnologyPopUpProps {
  serviceId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TecnologyPopUp({
  serviceId,
  isOpen,
  onClose,
}: TecnologyPopUpProps) {
  const t = useTranslations("services");

  // If no service is selected, don't render anything
  if (!serviceId) return null;

  const serviceTechnologies =
    technologies[serviceId as keyof typeof technologies] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text">
            {t(`${serviceId}.title`)} - {t("technologies")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {t("technologiesDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-16 h-16 mb-3 p-3 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  {/* Gradient border effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-500" />

                  <div className="relative">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/tech/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">{t("contactForMore")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
