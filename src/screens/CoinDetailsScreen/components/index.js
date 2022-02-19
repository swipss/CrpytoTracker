import { View, Text, Image, Dimensions, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Coin from "../../../../assets/data/crypto.json";
import CoinDetailHeader from "./CoinDetailHeader";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";

export default function CoinDetails() {
  const {
    image: { small },
    name,
    symbol,
    prices,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = Coin;

  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState(current_price.usd.toString());

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const floatValue = parseFloat(coinValue.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  }, [coinValue]);

  useEffect(() => {
    const floatValue = parseFloat(usdValue.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  }, [usdValue]);

  const formatCurrency = (value) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ChartPathProvider
        data={{
          points: prices.map(([x, y]) => ({ x, y })),
          smoothingStrategy: "bezier",
        }}
      >
        <CoinDetailHeader
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              padding: 5,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color="white"
              style={{ alignSelf: "center", marginRight: 3 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <ChartPath
            strokeWidth={2}
            height={screenWidth / 2}
            stroke={current_price.usd > prices[0][1] ? "#16c784" : "#ea3949"}
            width={screenWidth}
          />
          <ChartDot
            style={{
              backgroundColor:
                current_price.usd > prices[0][1] ? "#16c784" : "#ea3949",
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "#fff", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={setCoinValue}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "#fff", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={setUsdValue}
            />
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
}
