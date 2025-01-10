import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chat Dummy - Sign In",
  description: "Root layout without sidebar",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col">
            {/* Minimal Top Navigation (no sidebar) */}
            <nav className="w-full border-b border-b-foreground/10 h-16 flex justify-center items-center">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex flex-row items-center gap-5 font-semibold">
                  <Link href="/">Chat Dummy</Link>
                  <DeployButton />
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>

            {/* Main Content: Only sign-in at root */}
            <div className="flex-1 flex flex-col w-full max-w-md mx-auto p-5">
              {children}
            </div>

            {/* Footer */}
            <footer className="flex items-center justify-center border-t text-center text-xs py-6 gap-8">
              <p>
                Powered by{" "}
                <a
                  href="https://supabase.com/"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Supabase
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
