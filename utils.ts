// storage
import AsyncStorage from "@react-native-async-storage/async-storage"

// types
import { ISpending } from "./types"

export const wholePartFromFloat = (value: number): number => {
  return value | 0 // getting whole part of the number(float)
}
export const remainderFromFloat = (value: number): string => {
  let remainderCent: number = Number(
    (Number((value - wholePartFromFloat(value)).toFixed(2)) * 100).toFixed(2)
  )
  if (remainderCent == 0) {
    return "00" // if our number is whole by itself
  } else if (remainderCent < 10) {
    return "0" + remainderCent // if our number's remainder less than 10
  }
  return remainderCent.toString()
}

export const getData = async (): Promise<string> => {
  return (await AsyncStorage.getItem("spendings")) || "[]" // getting spendings array from async storage
}

export const getSpendingsArrayFromPromise = (): ISpending[] => {
  let arrayOfSpendings: ISpending[] = []
  getData().then((spendings: string) => {
    arrayOfSpendings = JSON.parse(spendings) // parsing array that we habe from getData
  })
  return arrayOfSpendings
}

export const dateString = (date: string) => {
  return new Date(date).toDateString()
}
export const getSpendingsByDate = (date: string, spendings: ISpending[]) =>
  spendings.filter(spending => spending.date === date)
  
export const getTotalMoneyOnSpending = (arr: ISpending[]): number =>
  arr.reduce(
    (accumulator: number, currentSpending) =>
      accumulator + currentSpending.moneySpentOnSpending, // adding for previous sum and so on
    0
  )
