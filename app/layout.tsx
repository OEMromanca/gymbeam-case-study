import "./globals.css";
import { ReactNode } from "react";
import NavBar from "./components/NavBar";
import SessionProviderWrapper from "./Providers/providers";

export const metadata = {
  title: "GymBeam Store",
  description: "Obchod s produktmi GymBeam",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body>
        <SessionProviderWrapper>
          <div className="flex flex-col h-screen">
            <NavBar />
            <main className="flex-grow overflow-auto">{children}</main>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
