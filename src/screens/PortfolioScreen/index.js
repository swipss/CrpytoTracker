import { View, Text, FlatList } from "react-native";
import React from "react";
import PortfolioAssetsList from "./components/PortfolioAssetsList";

export default function PortfolioScreen() {
  return (
    <View>
      <PortfolioAssetsList />
    </View>
  );
}
