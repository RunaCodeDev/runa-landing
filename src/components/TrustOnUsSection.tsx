"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

interface Company {
  id: number;
  name: string;
  logoUrl: string;
  description: string;
  points: string[];
  projectImageUrls: string[];
  instagramUrl: string;
}

const TrustOnUsSection = () => {
  const t = useTranslations("TrustOnUsSection");

  // Debug logs
  console.log(
    "[TrustOnUsSection] Locale being used (from a simple key):",
    t("title")
  );
  const rawCompanies = t.raw("companies");
  console.log("[TrustOnUsSection] Raw companies data:", rawCompanies);

  const companies: Company[] = rawCompanies as Company[];

  return (
    <section
      id="trust-us"
      className="py-16 md:py-20 lg:py-28 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div
          className="wow fadeInUp mb-12 text-center lg:mb-20"
          data-wow-delay=".1s"
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            {t("title")}
          </h2>
          <p className="text-base !leading-relaxed text-body-color md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {companies.map((company) => (
            <div
              key={company.id}
              className="rounded-xl bg-white p-6 sm:p-8 shadow-md transition-all duration-300 ease-in-out hover:shadow-2xl dark:bg-dark-2 dark:shadow-gray-700/40 border border-gray-200 dark:border-gray-700"
              data-wow-delay=".15s"
            >
              <div className="mb-5 flex items-center space-x-4">
                <div
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-16 ${
                    company.id === 1 ? "bg-black" : ""
                  }`}
                >
                  <Image
                    src={company.logoUrl}
                    alt={t("companyLogoAlt", { companyName: company.name })}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <div className="flex items-center w-full justify-between">
                  <h3 className="text-xl font-semibold text-dark dark:text-white">
                    {company.name}
                  </h3>
                  <Link href={company.instagramUrl}>
                    <Instagram width={24} height={24} />
                  </Link>
                </div>
              </div>
              <p className="mb-5 text-base text-body-color dark:text-gray-300">
                <span
                  dangerouslySetInnerHTML={{
                    __html: company.description.replace(/\n/g, "<br />"),
                  }}
                />
              </p>

              <ul className="mb-6 space-y-2 text-base text-body-color dark:text-gray-300">
                {company.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>

              {company.projectImageUrls &&
                company.projectImageUrls.length > 0 && (
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full max-w-full mx-auto rounded-lg overflow-hidden"
                  >
                    <CarouselContent>
                      {company.projectImageUrls.map((imageUrl, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/1 lg:basis-1/1"
                        >
                          <div className="p-1">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                              <Image
                                src={imageUrl}
                                alt={t("projectScreenshotAlt", {
                                  index: index + 1,
                                  companyName: company.name,
                                })}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 ease-in-out hover:scale-105"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {company.projectImageUrls.length > 1 && (
                      <>
                        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-dark shadow-md transition hover:bg-white dark:bg-dark-2/70 dark:text-white dark:hover:bg-dark-2 sm:flex" />
                        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-dark shadow-md transition hover:bg-white dark:bg-dark-2/70 dark:text-white dark:hover:bg-dark-2 sm:flex" />
                      </>
                    )}
                  </Carousel>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustOnUsSection;
