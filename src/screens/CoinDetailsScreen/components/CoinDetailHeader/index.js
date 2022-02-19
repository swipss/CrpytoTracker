import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Ionicons, EvilIcons } from "@expo/vector-icons";

export default function CoinDetailHeader(props) {
  const { image, symbol, marketCapRank } = props;

  return (
    <View style={styles.headerContainer}>
      <Ionicons name="chevron-back-sharp" size={30} color="white" />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <EvilIcons name="user" size={30} color="white" />
    </View>
  );
}
