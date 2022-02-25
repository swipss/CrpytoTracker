import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";

export default function PortfolioAssetsItem({ assetItem }) {
  // console.log(assetItem);
  const {
    currentPrice,
    image,
    name,
    priceBought,
    priceChangePercentage,
    quantityBought,
    ticker,
  } = assetItem;

  const isChangePositive = () => priceChangePercentage >= 0;

  const renderHoldings = () => (quantityBought * currentPrice).toFixed(2);

  return (
    <View style={styles.coinContainer}>
      <Image
        source={{ uri: image }}
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
          alignSelf: "center",
          borderRadius: 20,
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.title}>${currentPrice}</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown"}
            size={12}
            color={isChangePositive() ? "#16c784" : "#ea3943"}
            style={{ alignSelf: "center", marginRight: 3 }}
          />
          <Text
            style={{
              color: isChangePositive() ? "#16c784" : "#ea3943",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.title}>${renderHoldings()}</Text>
        <Text style={styles.ticker}>
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
}
