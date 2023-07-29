import React, { useEffect } from "react"

// fundamentals
import { Image, Text, View, StyleSheet } from "react-native"

// using store
import spendingStore from "../../stores/spendingStore"

// utils
import {
  dateString,
  getSpendingsByDate,
  getTotalMoneyOnSpending
} from "../../utils"

// ui
const DoubleClick = require("rn-double-click") // using require because this module not using ts

const MappingSpendings = (): JSX.Element => {
  const { spendings, deleteSpending } = spendingStore()
  const uniqueDates = [...new Set(spendings.map(spending => spending.date))]

  useEffect(() => {
    spendings.sort(
      (first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )
  }, [spendings])

  return (
    <View style={{ marginTop: 50 }}>
      {uniqueDates.map(date => (
        <View key={date} style={{ marginTop: 20 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.date}>{dateString(date)}</Text>
            <Text style={styles.totalMoneyForDate}>
              {" "}
              ₸ {getTotalMoneyOnSpending(getSpendingsByDate(date, spendings))}
            </Text>
          </View>

          <View style={styles.hairline} />
          {getSpendingsByDate(date, spendings).map((spending, id) => (
            <DoubleClick key={id} onClick={() => deleteSpending(spending)}>
              <View style={styles.eachSpendingView}>
                {spending.category === "Clothes and Shoes" && (
                  <Image
                    source={require("../../assets/images/shirt.png")}
                    style={styles.icons}
                  />
                )}
                {spending.category === "Health" && (
                  <Image
                    source={require("../../assets/images/hospital.png")}
                    style={styles.icons}
                  />
                )}
                {spending.category === "Entertainment" && (
                  <Image
                    source={require("../../assets/images/party.png")}
                    style={styles.icons}
                  />
                )}
                {spending.category === "Food and Drink" && (
                  <Image
                    source={require("../../assets/images/burger.png")}
                    style={styles.icons}
                  />
                )}
                {spending.category === "Education" && (
                  <Image
                    source={require("../../assets/images/book.png")}
                    style={styles.icons}
                  />
                )}
                <Text style={styles.category}> {spending.category}</Text>
                <Text style={styles.moneySpentOnSpending}>
                  ₸ {spending.moneySpentOnSpending}
                </Text>
              </View>
            </DoubleClick>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat-Medium"
  },
  hairline: {
    marginTop: 2,
    backgroundColor: "#A2A2A2",
    marginLeft: 60,
    height: 1,
    width: "auto"
  },
  icons: { width: 35, height: 35, resizeMode: "contain" },
  category: {
    color: "black",
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    marginLeft: 20
  },
  moneySpentOnSpending: {
    color: "black",
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginRight: 0,
    marginLeft: "auto"
  },
  date: {
    color: "gray",
    fontFamily: "Montserrat-Medium",
    marginLeft: 60
  },
  totalMoneyForDate: {
    color: "gray",
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    marginRight: 0,
    marginLeft: "auto"
  },
  eachSpendingView: {
    marginTop: 15,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
})
export default MappingSpendings
