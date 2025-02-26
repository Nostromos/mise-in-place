"use client"

import { useRecipe } from "@/context/recipe-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RecipesPage() {
  const { recipes } = useRecipe()

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Recipe
        </Button>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No recipes yet</h3>
          <p className="text-muted-foreground mb-4">Add your first recipe to get started</p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="h-full">
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {recipe.prepTime + recipe.cookTime} min
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {recipe.servings} servings
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Recipe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

