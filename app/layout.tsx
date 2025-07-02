import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Impactra",
  description: "Platform Sosial Berdampak",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
