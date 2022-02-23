import { View, Text } from "react-native";
import React from "react";
import SearchableDropDown from "react-native-searchable-dropdown";
import { styles } from "./styles";

export default function AddNewAssetScreen() {
  return (
    <View>
      <SearchableDropDown
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "#fff" }}
        items={[]}
        onItemSelect={(item) => console.log(item)}
        resetValue={false}
        placeholder={"Select a coin..."}
        placeholderTextColor="#fff"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: styles.textInput,
        }}
      />
    </View>
  );
}
