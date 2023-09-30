import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata: Metadata = {
//   title: "TradeDons",
//   description: "TradeDons",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${poppins.className} bg-zinc-50 dark:bg-zinc-900`}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
