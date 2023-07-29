// for using storage
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

// zustand
import { create } from "zustand"

// getting additional function
import { getSpendingsArrayFromPromise } from "../utils"
import { ISpending, Spendings } from "../types"

const spendingStore = create(
  persist<Spendings>(
    (set, get) => ({
      spendings: getSpendingsArrayFromPromise(),
      addSpending: async (addingSpending: ISpending) => {
        await AsyncStorage.setItem(
          "spendings",
          JSON.stringify([addingSpending, ...getSpendingsArrayFromPromise()])
        ) // setting new spendings to async storage
        set((state: { spendings: ISpending[] }) => ({
          spendings: [addingSpending, ...state.spendings]
        }))
      },
      deleteSpending: async (deletingSpending: ISpending) => {
        const spendings: ISpending[] = get().spendings
        const newSpendings: ISpending[] = spendings.filter(
          // choosing: not the spending that clicked
          oneSpending =>
            oneSpending.date !== deletingSpending.date ||
            oneSpending.category !== deletingSpending.category ||
            oneSpending.moneySpentOnSpending !==
              deletingSpending.moneySpentOnSpending
        )
        set(() => ({
          spendings: newSpendings
        }))
        await AsyncStorage.setItem("spendings", JSON.stringify(newSpendings)) // setting new spendings to async storage
      }
    }),
    { name: "spending-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
)
export default spendingStore
