import "../globals.css";
import type { ReactNode } from "react";
import { vazirmatn } from "@/app/fonts";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={vazirmatn.variable}>{children}</body>
    </html>
  );
}
