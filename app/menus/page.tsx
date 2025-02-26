"use client"

import { useRecipe } from "@/context/recipe-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Calendar, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MenusPage() {
  const { menus, recipes } = useRecipe()

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menus</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Menu
        </Button>
      </div>

      {menus.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No menus yet</h3>
          <p className="text-muted-foreground mb-4">Create your first menu to get started</p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Menu
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <Card key={menu.id} className="h-full">
              <CardHeader>
                <CardTitle>{menu.name}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {menu.recipes.length} recipes
                </Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {menu.recipes.slice(0, 3).map((recipeId) => {
                    const recipe = recipes.find((r) => r.id === recipeId)
                    return (
                      <li key={recipeId} className="text-sm">
                        {recipe ? recipe.title : "Unknown recipe"}
                      </li>
                    )
                  })}
                  {menu.recipes.length > 3 && (
                    <li className="text-sm text-muted-foreground">+{menu.recipes.length - 3} more recipes</li>
                  )}
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Groceries
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

