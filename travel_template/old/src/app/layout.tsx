
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
