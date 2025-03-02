"use client"

import { useRecipe } from "@/context/recipe-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GroceriesPage() {
  const { groceryList, addToGroceryList, toggleGroceryItem } = useRecipe()
  const [newItem, setNewItem] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [unit, setUnit] = useState("item")

  const handleAddItem = () => {
    if (newItem.trim()) {
      addToGroceryList({
        name: newItem.trim(),
        quantity: Number(quantity),
        unit,
        checked: false,
      })
      setNewItem("")
      setQuantity("1")
      setUnit("item")
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Grocery List</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Add item"
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
          <Button onClick={handleAddItem}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {groceryList.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">Your grocery list is empty</h3>
          <p className="text-muted-foreground">Add items to your grocery list</p>
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {groceryList.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Checkbox id={item.id} checked={item.checked} onCheckedChange={() => toggleGroceryItem(item.id)} />
                <Label
                  htmlFor={item.id}
                  className={`font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`}
                >
                  {item.name}
                </Label>
                <span className="text-sm text-muted-foreground">
                  {item.quantity} {item.unit}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

