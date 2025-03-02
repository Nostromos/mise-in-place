import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChefHat, Calendar, ShoppingCart, BookOpen, Search, List } from "lucide-react"

export default function Home() {
  const sections = [
    {
      title: "Recipes",
      description: "View and manage your saved recipes",
      icon: <ChefHat className="h-6 w-6" />,
      href: "/recipes",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Browser",
      description: "Find and save new recipes",
      icon: <Search className="h-6 w-6" />,
      href: "/browser",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Groceries",
      description: "Manage your grocery list",
      icon: <ShoppingCart className="h-6 w-6" />,
      href: "/groceries",
      color: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      title: "Pantry",
      description: "Track items in your pantry",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/pantry",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Meals",
      description: "Plan your meals on a calendar",
      icon: <Calendar className="h-6 w-6" />,
      href: "/meals",
      color: "bg-pink-100 dark:bg-pink-900",
    },
    {
      title: "Menus",
      description: "Create and manage menus",
      icon: <List className="h-6 w-6" />,
      href: "/menus",
      color: "bg-orange-100 dark:bg-orange-900",
    },
  ]

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to Mise-in-place</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link href={section.href} key={section.title}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className={`${section.color} rounded-t-lg`}>
                <div className="flex items-center gap-2">
                  {section.icon}
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Open {section.title}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

