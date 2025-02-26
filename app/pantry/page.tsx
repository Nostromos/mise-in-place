"use client"

import { useRecipe } from "@/context/recipe-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PantryPage() {
  const { pantryItems, addToPantry } = useRecipe()
  const [searchTerm, setSearchTerm] = useState("")
  const [newItem, setNewItem] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [unit, setUnit] = useState("item")

  const handleAddItem = () => {
    if (newItem.trim()) {
      addToPantry({
        name: newItem.trim(),
        quantity: Number(quantity),
        unit,
      })
      setNewItem("")
      setQuantity("1")
      setUnit("item")
    }
  }

  const filteredItems = pantryItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pantry</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pantry items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Item name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-grow"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddItem()
              }}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20"
              />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item">item</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="l">l</SelectItem>
                  <SelectItem value="tbsp">tbsp</SelectItem>
                  <SelectItem value="tsp">tsp</SelectItem>
                  <SelectItem value="cup">cup</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddItem}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredItems.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No items in your pantry</h3>
          <p className="text-muted-foreground mb-4">Add items to keep track of what you have</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit}
                    </p>
                    {item.expiryDate && (
                      <p className="text-xs text-muted-foreground">Expires: {item.expiryDate.toLocaleDateString()}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

