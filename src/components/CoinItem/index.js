import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CoinItem({ marketCoin }) {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  const navigation = useNavigation();

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1000000000000) {
      return `${(marketCap / 1000000000000).toFixed(3)} T`;
    }
    if (marketCap > 1000000000) {
      return `${(marketCap / 1000000000).toFixed(3)} B`;
    }
    if (marketCap > 1000000) {
      return `${(marketCap / 1000000).toFixed(3)} M`;
    }
    if (marketCap > 1000) {
      return `${(marketCap / 1000).toFixed(3)} K`;
    }
    return 10;
  };
  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailsScreen", { coinId: id })}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          height: 50,
          width: 50,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 3 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>${current_price}</Text>
        <Text style={{ color: "#fff" }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
}
