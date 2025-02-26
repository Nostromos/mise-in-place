"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Recipe = {
  id: string
  title: string
  ingredients: string[]
  instructions: string
  image?: string
  tags: string[]
  servings: number
  prepTime: number
  cookTime: number
}

type GroceryItem = {
  id: string
  name: string
  quantity: number
  unit: string
  checked: boolean
}

type PantryItem = {
  id: string
  name: string
  quantity: number
  unit: string
  expiryDate?: Date
}

type MealPlan = {
  id: string
  date: Date
  recipes: { recipeId: string; mealType: "breakfast" | "lunch" | "dinner" | "snack" }[]
}

type Menu = {
  id: string
  name: string
  recipes: string[]
}

type RecipeContextType = {
  recipes: Recipe[]
  groceryList: GroceryItem[]
  pantryItems: PantryItem[]
  mealPlans: MealPlan[]
  menus: Menu[]
  addRecipe: (recipe: Omit<Recipe, "id">) => void
  addToGroceryList: (item: Omit<GroceryItem, "id">) => void
  addToPantry: (item: Omit<PantryItem, "id">) => void
  addMealPlan: (mealPlan: Omit<MealPlan, "id">) => void
  addMenu: (menu: Omit<Menu, "id">) => void
  toggleGroceryItem: (id: string) => void
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([])
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([])
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [menus, setMenus] = useState<Menu[]>([])

  const addRecipe = (recipe: Omit<Recipe, "id">) => {
    const newRecipe = { ...recipe, id: crypto.randomUUID() }
    setRecipes([...recipes, newRecipe])
  }

  const addToGroceryList = (item: Omit<GroceryItem, "id">) => {
    const newItem = { ...item, id: crypto.randomUUID(), checked: false }
    setGroceryList([...groceryList, newItem])
  }

  const addToPantry = (item: Omit<PantryItem, "id">) => {
    const newItem = { ...item, id: crypto.randomUUID() }
    setPantryItems([...pantryItems, newItem])
  }

  const addMealPlan = (mealPlan: Omit<MealPlan, "id">) => {
    const newMealPlan = { ...mealPlan, id: crypto.randomUUID() }
    setMealPlans([...mealPlans, newMealPlan])
  }

  const addMenu = (menu: Omit<Menu, "id">) => {
    const newMenu = { ...menu, id: crypto.randomUUID() }
    setMenus([...menus, newMenu])
  }

  const toggleGroceryItem = (id: string) => {
    setGroceryList(groceryList.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        groceryList,
        pantryItems,
        mealPlans,
        menus,
        addRecipe,
        addToGroceryList,
        addToPantry,
        addMealPlan,
        addMenu,
        toggleGroceryItem,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipe() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipe must be used within a RecipeProvider")
  }
  return context
}

