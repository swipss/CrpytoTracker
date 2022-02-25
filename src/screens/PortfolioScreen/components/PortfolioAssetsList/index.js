import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import PortfolioAssetsItem from "../PortfolioAssetItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortfolioAssets } from "../../../../atoms/PortfolioAssets";

export default function PortfolioAssetsList() {
  const navigation = useNavigation();
  const assets = useRecoilState(allPortfolioAssets);

  const getCurrentBalance = () =>
    assets[0].reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets[0].reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets[0].reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };

  return (
    <FlatList
      data={assets[0]}
      renderItem={({ item }) => <PortfolioAssetsItem assetItem={item} />}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${getCurrentBalance().toFixed(2)}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: getCurrentValueChange() >= 0 ? "green" : "red",
                }}
              >
                ${getCurrentValueChange()} (All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangePercentageContainer,
                backgroundColor:
                  getCurrentValueChange() >= 0 ? "#16c784" : "red",
              }}
            >
              <AntDesign
                name={getCurrentValueChange() >= 0 ? "caretup" : "caretdown"}
                size={12}
                color={"white"}
                style={{ alignSelf: "center", marginRight: 3 }}
              />
              <Text style={styles.percentageChange}>
                {getCurrentPercentageChange()}%
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.assetsLabel}>Your Assets</Text>
          </View>
        </>
      }
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AddNewAssetsScreen")}
        >
          <Text style={styles.buttonText}>Add New Assets</Text>
        </Pressable>
      }
    />
  );
}
