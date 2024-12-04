import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockchain Streaming",
  description: "A blockchain-based streaming service",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const { locale = "en-us" } = await params;

  const messages = (await import(`../../dictionaries/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider attribute="class">
              <ModalProvider />
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar locale={locale} />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    {children}
                  </main>
                </div>
              </div>
              <Toaster />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
