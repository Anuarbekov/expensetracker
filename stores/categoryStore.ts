// zustand
import { create } from "zustand"

// types
import { Category } from "../types"

const categoryStore = create<Category>(set => ({
  category: "Food and Drink",
  setCategory: (newCategory: string) => {
    if (
      newCategory === "Entertainment" ||
      newCategory === "Food and Drink" ||
      newCategory === "Clothes and Shoes" ||
      newCategory === "Education" ||
      newCategory === "Health"
    )
      // checking if new category is right
      set(() => ({
        category: newCategory
      }))
  }
}))
export default categoryStore
