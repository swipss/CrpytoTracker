import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#121212",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  ticker: {
    color: "grey",
    fontWeight: "600",
  },
  quantityContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
});
