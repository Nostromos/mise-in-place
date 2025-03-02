"use client"

import { useRecipe } from "@/context/recipe-context"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export default function MealsPage() {
  const { recipes, mealPlans } = useRecipe() // TODO: Add addMealPlan() to this when that functionality is built
  const [date, setDate] = useState<Date | undefined>(new Date())

  const getMealsForDate = (date: Date | undefined) => {
    if (!date) return []

    return mealPlans.filter((plan) => plan.date.toDateString() === date.toDateString())
  }

  const currentMeals = getMealsForDate(date)

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Meal Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {date
                  ? date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
                  : "Select a date"}
              </CardTitle>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Meal
              </Button>
            </CardHeader>
            <CardContent>
              {currentMeals.length === 0 ? (
                <div className="text-center p-8">
                  <h3 className="text-lg font-medium mb-2">No meals planned for this day</h3>
                  <p className="text-muted-foreground mb-4">Add a meal to start planning</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {["breakfast", "lunch", "dinner", "snack"].map((mealType) => (
                    <div key={mealType} className="border-b pb-4 last:border-0">
                      <h3 className="font-medium capitalize mb-2">{mealType}</h3>
                      {currentMeals.some((meal) => meal.recipes.some((r) => r.mealType === mealType)) ? (
                        <div className="space-y-2">
                          {currentMeals.flatMap((meal) =>
                            meal.recipes
                              .filter((r) => r.mealType === mealType)
                              .map((r) => {
                                const recipe = recipes.find((rec) => rec.id === r.recipeId)
                                return recipe ? (
                                  <div
                                    key={r.recipeId}
                                    className="flex justify-between items-center p-2 bg-muted/50 rounded"
                                  >
                                    <span>{recipe.title}</span>
                                    <span className="text-sm text-muted-foreground">{recipe.servings} servings</span>
                                  </div>
                                ) : null
                              }),
                          )}
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          <PlusCircle className="mr-2 h-3 w-3" />
                          Add {mealType}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

