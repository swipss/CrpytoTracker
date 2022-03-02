import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CoinDetailHeader from "./CoinDetailHeader";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { CandlestickChart, LineChart } from "react-native-wagmi-charts";
import {
  getCandleChartData,
  getCoinData,
  getCoinMarketChart,
} from "../../../services/requests";
import FilterComponent from "./FilterComponent";

export default function CoinDetails() {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  // console.log(coinId);

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getCoinData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRange
    );
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleChartData = await getCandleChartData(
      coinId,
      selectedRangeValue
    );
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleStickChartData();
  }, []);

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };
  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    // prices,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;
  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <CoinDetailHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <LineChart.PriceText
              style={styles.currentPrice}
              format={formatCurrency}
            />
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
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.filterContainer}>
            <FilterComponent
              filterDay="1"
              filterText="24h"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <FilterComponent
              filterDay="7"
              filterText="7d"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <FilterComponent
              filterDay="30"
              filterText="30d"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <FilterComponent
              filterDay="365"
              filterText="1y"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <FilterComponent
              filterDay="max"
              filterText="All"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            {isCandleChartVisible ? (
              <MaterialIcons
                name="show-chart"
                size={24}
                color="#16c784"
                onPress={() => setIsCandleChartVisible(false)}
              />
            ) : (
              <MaterialIcons
                name="waterfall-chart"
                size={24}
                color="#16c784"
                onPress={() => setIsCandleChartVisible(true)}
              />
            )}
          </View>
        </View>
        {isCandleChartVisible ? (
          <CandlestickChart.Provider
            data={coinCandleChartData.map(
              ([timestamp, open, high, low, close]) => ({
                timestamp,
                open,
                high,
                low,
                close,
              })
            )}
          >
            <CandlestickChart height={screenWidth / 2} width={screenWidth}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            </CandlestickChart>
            {/* <View style={{ flexDirection: "row" }}>
                  <CandlestickChart.PriceText
                    style={{ color: "#fff", fontWeight: "700" }}
                    type="open"
                  />
                  <CandlestickChart.PriceText
                    style={{ color: "#fff", fontWeight: "700" }}
                    type="height"
                  />
                  <CandlestickChart.PriceText
                    style={{ color: "#fff", fontWeight: "700" }}
                    type="low"
                  />
                  <CandlestickChart.PriceText
                    style={{ color: "#fff", fontWeight: "700" }}
                    type="close"
                  />
                  <CandlestickChart.PriceText
                    style={{ color: "#fff", fontWeight: "700" }}
                  />
                </View> */}
          </CandlestickChart.Provider>
        ) : (
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        )}

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "#fff", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "#fff", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
}
