import React, { useState } from "react"

// fundamentals
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable
} from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

// UI
import AntDesign from "react-native-vector-icons/AntDesign"
import SpentMoney from "./components/ui/SpentMoney"
import CategoryPicker from "./components/ui/CategoryPicker"
import MappingSpendings from "./components/ui/MappingSpendings"

// stores
import spendingStore from "./stores/spendingStore"
import categoryStore from "./stores/categoryStore"

const App = (): JSX.Element => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [currentMoneySpentOnSpending, setCurrentMoneySpentOnSpending] =
    useState<string>("")
  const { addSpending } = spendingStore()
  const { category, setCategory } = categoryStore()
  const moneySpentOnSpending: number = Number(currentMoneySpentOnSpending)
  const date = new Date()
  const dateSpend =
    date.getFullYear().toString() +
    "-" +
    (date.getMonth() + 1).toString() +
    "-" +
    date.getDate().toString() // getting date yyyy-mm-dd

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          {isAdding ? (
            <>
              <Text style={styles.iconContainer}>
                <AntDesign
                  onPress={() => {
                    setIsAdding(!isAdding)
                  }}
                  name="closecircle"
                  style={styles.icon}
                />
              </Text>
              <Text style={styles.textSpentMoneyAndCategory}>Spent money:</Text>
              <View>
                <Text style={styles.tenge}>₸</Text>
                <TextInput
                  style={styles.moneySpentInput}
                  defaultValue="Amount of money spent"
                  value={currentMoneySpentOnSpending}
                  onChangeText={(money: string) => {
                    if (!isNaN(Number(money))) {
                      setCurrentMoneySpentOnSpending(money)
                    }
                  }}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ marginTop: 45 }}>
                <Text style={styles.textSpentMoneyAndCategory}>Category:</Text>
                <CategoryPicker />
              </View>
              <View style={{ marginTop: 60, alignItems: "center" }}>
                <Pressable
                  style={styles.addSpendingPressable}
                  android_disableSound
                  onPress={() => {
                    if (moneySpentOnSpending > 0) {
                      addSpending({
                        category,
                        moneySpentOnSpending,
                        date: dateSpend
                      }) // add new spending to store and async storage
                      setCurrentMoneySpentOnSpending("") // set money value to default
                      setCategory("Food and Drink") // set category value to default
                      setIsAdding(!isAdding) // changing
                    }
                  }}
                >
                  <Text style={styles.addSpendingText}>Add</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.iconContainer}>
                <AntDesign
                  onPress={() => {
                    setIsAdding(!isAdding)
                  }}
                  name="pluscircle"
                  style={styles.icon}
                />
              </Text>
              <SpentMoney />
              <MappingSpendings />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  iconContainer: { textAlign: "right" },
  icon: { fontSize: 30, color: "black" },
  textSpentMoneyAndCategory: {
    color: "rgb(191, 90, 242)",
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold"
  },
  tenge: {
    position: "absolute",
    top: 25,
    left: 15,
    fontSize: 20,
    zIndex: 9999,
    color: "rgb(137, 68, 171)",
    fontFamily: "Montserrat-SemiBold"
  },
  moneySpentInput: {
    backgroundColor: "black",
    color: "white",
    marginTop: 15,
    borderRadius: 10,
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
    zIndex: 1
  },
  addSpendingText: {
    color: "rgb(191, 90, 242)",
    fontFamily: "Montserrat-Medium",
    fontSize: 20
  },
  addSpendingPressable: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 200
  }
})

export default App
