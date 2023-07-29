import spendingStore from "../stores/spendingStore"
import { IUseMoneySpent } from "../types"
import { remainderFromFloat, wholePartFromFloat } from "../utils"

const useMoneySpent = (): IUseMoneySpent => {
  // const { moneySpent } = moneyStore()
  const { spendings } = spendingStore()

  const moneySpent: number = spendings.reduce(
    (total, object) => total + object.moneySpentOnSpending,
    0
  )
  const wholePart: number = wholePartFromFloat(moneySpent)
  const remainder: string = remainderFromFloat(moneySpent)

  return { wholePart, remainder }
}
export default useMoneySpent
