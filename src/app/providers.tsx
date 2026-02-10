"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111522",
            color: "#f5f7ff",
            border: "1px solid rgba(124,247,255,0.2)",
          },
        }}
      />
    </ThemeProvider>
  );
}
