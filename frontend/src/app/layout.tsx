import { Geist, Geist_Mono, Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import './globals.css';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kyanite | Joyería Artesanal",
  description: "Piezas únicas creadas a mano con gemas naturales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="es" className={cn("font-sans", figtree.variable)}>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "bg-white text-zinc-900 flex flex-col min-h-screen"
        )}
      >
     
        <Header /> 

      
        <main className="flex-grow">
          {children}
        </main>

        
        <Footer />
      </body>
    </html>
  );
}