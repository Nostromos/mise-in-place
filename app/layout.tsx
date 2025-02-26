import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RecipeProvider } from "@/context/recipe-context"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Manage your recipes, groceries, pantry, meals, and menus",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RecipeProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </RecipeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

