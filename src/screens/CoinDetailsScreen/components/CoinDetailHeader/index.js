import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWatchlist } from "../../../../Contexts/WatchlistContext";

export default function CoinDetailHeader(props) {
  const { coinId, image, symbol, marketCapRank } = props;

  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } =
    useWatchlist();
  // console.log(watchlistCoinIds);

  const checkIfCoinWatchlisted = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);
  // console.log(checkIfCoinWatchlisted());

  const handleWatchlistCoin = () => {
    if (checkIfCoinWatchlisted()) {
      return removeWatchlistCoinId(coinId);
    }
    return storeWatchlistCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinWatchlisted() ? "star" : "star-o"}
        size={25}
        color={checkIfCoinWatchlisted() ? "#ffbf00" : "white"}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
}
