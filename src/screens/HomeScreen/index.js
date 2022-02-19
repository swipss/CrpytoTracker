import { View, Text, FlatList } from "react-native";
import React from "react";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";
import CoinItem from "../../components/CoinItem";

export default function Home() {
  return (
    <View>
      <FlatList
        data={cryptocurrencies}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
      />
    </View>
  );
}
