import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Poppins",
            fontSize: 25,
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingBottom: 5,
          }}
        >
          Cryptoassets
        </Text>
        <Text
          style={{ color: "lightgrey", fontSize: 12, paddingHorizontal: 10 }}
        >
          Powered by CoinGecko
        </Text>
      </View>

      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
}
