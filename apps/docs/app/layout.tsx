import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KISA Design System",
  description: "Component and token library for umichkisa.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Add sidebar + topbar layout shell */}
        {children}
      </body>
    </html>
  );
}
