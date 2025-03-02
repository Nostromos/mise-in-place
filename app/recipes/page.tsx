"use client"

import type React from "react"

import { useState } from "react"
import { useRecipe } from "@/context/recipe-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RecipesPage() {
  const { recipes, addRecipe } = useRecipe()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    tags: "",
    servings: 1,
    prepTime: 0,
    cookTime: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewRecipe((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addRecipe({
      ...newRecipe,
      ingredients: newRecipe.ingredients.split(",").map((i) => i.trim()),
      tags: newRecipe.tags.split(",").map((t) => t.trim()),
      servings: Number(newRecipe.servings),
      prepTime: Number(newRecipe.prepTime),
      cookTime: Number(newRecipe.cookTime),
    })
    setIsDialogOpen(false)
    setNewRecipe({
      title: "",
      ingredients: "",
      instructions: "",
      tags: "",
      servings: 1,
      prepTime: 0,
      cookTime: 0,
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Recipe</DialogTitle>
              <DialogDescription>Create a new recipe to add to your collection.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={newRecipe.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ingredients" className="text-right">
                    Ingredients
                  </Label>
                  <Textarea
                    id="ingredients"
                    name="ingredients"
                    value={newRecipe.ingredients}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Enter ingredients separated by commas"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructions" className="text-right">
                    Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    value={newRecipe.instructions}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tags" className="text-right">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={newRecipe.tags}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="servings" className="text-right">
                    Servings
                  </Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    value={newRecipe.servings}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prepTime" className="text-right">
                    Prep Time (min)
                  </Label>
                  <Input
                    id="prepTime"
                    name="prepTime"
                    type="number"
                    value={newRecipe.prepTime}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cookTime" className="text-right">
                    Cook Time (min)
                  </Label>
                  <Input
                    id="cookTime"
                    name="cookTime"
                    type="number"
                    value={newRecipe.cookTime}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Recipe</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No recipes yet</h3>
          <p className="text-muted-foreground mb-4">Add your first recipe to get started</p>
          <Button onClick={() => setIsDialogOpen(true)}>
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

