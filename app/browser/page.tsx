"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BookmarkPlus, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useRecipe } from "@/context/recipe-context"

export default function BrowserPage() {
  const { addRecipe } = useRecipe()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Mock search results for demonstration
  const mockResults = [
    {
      id: "1",
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper",
      image: "/placeholder.svg?height=200&width=300",
      source: "Italian Cuisine Blog",
      url: "#",
    },
    {
      id: "2",
      title: "Chicken Tikka Masala",
      description: "Grilled chicken chunks in a creamy spiced tomato sauce",
      image: "/placeholder.svg?height=200&width=300",
      source: "Indian Recipes",
      url: "#",
    },
    {
      id: "3",
      title: "Avocado Toast",
      description: "Simple and nutritious breakfast with mashed avocado on toasted bread",
      image: "/placeholder.svg?height=200&width=300",
      source: "Healthy Breakfast Ideas",
      url: "#",
    },
  ]

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true)
      // In a real app, you would fetch results from an API here
      // For now, we'll just simulate a search delay
      setTimeout(() => {
        setIsSearching(false)
      }, 1000)
    }
  }

  const handleSaveRecipe = (result: any) => {
    // In a real app, you would parse the recipe data from the webpage
    addRecipe({
      title: result.title,
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Sample instructions for this recipe.",
      tags: ["sample", "browser"],
      servings: 4,
      prepTime: 15,
      cookTime: 30,
      image: result.image,
    })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recipe Browser</h1>

      <div className="flex gap-2 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for recipes online"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {searchTerm && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{result.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                <p className="text-xs">Source: {result.source}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </a>
                </Button>
                <Button size="sm" onClick={() => handleSaveRecipe(result)}>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!searchTerm && (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">Search for recipes</h3>
          <p className="text-muted-foreground mb-4">
            Enter a recipe name, ingredient, or cuisine to find recipes online
          </p>
        </div>
      )}

      {isSearching && (
        <div className="text-center p-12">
          <p>Searching for recipes...</p>
        </div>
      )}
    </div>
  )
}

