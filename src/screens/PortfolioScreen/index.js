import { View, Text, FlatList } from "react-native";
import React, { Suspense } from "react";
import PortfolioAssetsList from "./components/PortfolioAssetsList";

export default function PortfolioScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={<Text style={{ color: "#fff" }}>Loading Please Wait</Text>}
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
}
