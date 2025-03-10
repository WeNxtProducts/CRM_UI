import type { Metadata } from "next";
import { ThemeProviders } from "./theme-providers";
import { AppProvider } from "./app-provider";
import { fonts } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "./globals.css";

const fontVariables = [...fonts.map((f) => f.variable), 'font-custom'];

export const metadata: Metadata = {
  title: "We CRM",
  description: "We CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AppProvider>
        <body
          className={cn(fontVariables, 'bg-background')}
        >
          <ThemeProviders>
            {children}
            <Toaster richColors/>
          </ThemeProviders>
        </body>
      </AppProvider>
    </html>
  );
}
