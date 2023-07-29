export interface Category {
  category: string
  setCategory: (newCategory: string) => void
}

export interface ISpending {
  moneySpentOnSpending: number
  category: string
  date: string
}

export interface Spendings {
  spendings: ISpending[]
  addSpending: (addingSpending: ISpending) => void
  deleteSpending: (deletingSpending: ISpending) => void
}

export interface IUseMoneySpent {
  wholePart: number
  remainder: string
}
