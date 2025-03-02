"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChefHat, Calendar, ShoppingCart, BookOpen, Search, List, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      name: "Recipes",
      path: "/recipes",
      icon: <ChefHat className="h-5 w-5" />,
    },
    {
      name: "Browser",
      path: "/browser",
      icon: <Search className="h-5 w-5" />,
    },
    {
      name: "Groceries",
      path: "/groceries",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Pantry",
      path: "/pantry",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Meals",
      path: "/meals",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Menus",
      path: "/menus",
      icon: <List className="h-5 w-5" />,
    },
  ]

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <ChefHat className="h-6 w-6" />
              <h1 className="text-xl font-bold">Mise-in-place</h1>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {routes.map((route) => (
              <Link key={route.path} href={route.path} onClick={() => setIsOpen(false)}>
                <Button variant={pathname === route.path ? "default" : "ghost"} className="w-full justify-start">
                  {route.icon}
                  <span className="ml-2">{route.name}</span>
                </Button>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <ModeToggle />
          </div>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}

