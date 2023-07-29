import React from "react"

// fundamentals
import { StyleSheet, View } from "react-native"

// store
import categoryStore from "../../stores/categoryStore"

// ui
import { Picker } from "@react-native-picker/picker"

const CategoryPicker = (): JSX.Element => {
  const { category, setCategory } = categoryStore()
  return (
    <View style={style.mainContainer}>
      <Picker
        selectedValue={category}
        onValueChange={currentCategory => setCategory(currentCategory)}
        mode="dropdown"
        style={style.pickerView}
      >
        <Picker.Item
          label="Food and Drink"
          value="Food and Drink"
          style={style.pickerItem}
        />
        <Picker.Item
          label="Entertainment"
          value="Entertainment"
          style={style.pickerItem}
        />
        <Picker.Item
          label="Clothes and Shoes"
          value="Clothes and Shoes"
          style={style.pickerItem}
        />
        <Picker.Item
          label="Education"
          value="Education"
          style={style.pickerItem}
        />
        <Picker.Item label="Health" value="Health" style={style.pickerItem} />
      </Picker>
    </View>
  )
}
const style = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    backgroundColor: "black"
  },
  pickerItem: { fontSize: 20 },
  pickerView: {
    color: "white",
    textAlign: "center"
  }
})
export default CategoryPicker
