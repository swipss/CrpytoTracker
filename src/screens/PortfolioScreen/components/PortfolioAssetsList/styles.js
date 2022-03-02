import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  currentBalance: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  currentBalanceValue: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
  },
  valueChange: {
    fontWeight: "600",
    fontSize: 16,
  },
  percentageChange: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 17,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  priceChangePercentageContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
  },
  assetsLabel: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#4169e1",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
