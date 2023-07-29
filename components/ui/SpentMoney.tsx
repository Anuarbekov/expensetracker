import React from "react"

// fundamentals
import { StyleSheet, View, Text } from "react-native"
// hook

import useMoneySpent from "../../hooks/useMoneySpent"

const SpentMoney = (): JSX.Element => {
  const { wholePart, remainder } = useMoneySpent()
  return (
    <View>
      <Text style={styles.spentText}>Spent this week</Text>
      <View style={styles.dollars}>
        <Text style={styles.dollarSign}>₸ </Text>
        <Text style={styles.wholePart}>{wholePart}</Text>
        <Text style={styles.remainder}>.{remainder}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  spentText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 80,
    color: "gray",
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold"
  },
  dollars: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto"
  },
  dollarSign: {
    fontFamily: "Montserrat-Regular",
    color: "grey",
    fontSize: 35,
    marginTop: 5
  },
  wholePart: {
    color: "black",
    fontSize: 58,
    fontFamily: "Montserrat-Medium"
  },
  remainder: {
    color: "black",
    fontSize: 32,
    fontFamily: "Montserrat-Medium",
    marginTop: 7
  }
})

export default SpentMoney
