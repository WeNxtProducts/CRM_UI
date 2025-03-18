import type { Metadata } from "next";
import { ThemeProviders } from "./theme-providers";
import { fonts } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "./globals.css";
import ReduxProvider from "@/store/redux-provider";

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
      <body
        className={cn(fontVariables, 'bg-background')}
      >
        <ReduxProvider>
          <ThemeProviders>
            {children}
            <Toaster richColors />
          </ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
