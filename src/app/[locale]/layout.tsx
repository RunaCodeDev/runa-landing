import { NextIntlClientProvider } from "next-intl";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import FloatingChatbot from "@/components/Chatbot/FloatingChatbot";
import "./globals.css";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale || "en";
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    messages = (await import(`@/messages/en.json`)).default;
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <main className="flex flex-col w-screen ">
        <NavBar />
        {children}
        <Footer />
        <FloatingChatbot />
      </main>
    </NextIntlClientProvider>
  );
}
