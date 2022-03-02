import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  currentPrice: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
  name: {
    color: "#fff",
    fontSize: 15,
  },
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceChange: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    width: 130,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    padding: 10,
    fontSize: 16,
    color: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2b2b2b",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
});
