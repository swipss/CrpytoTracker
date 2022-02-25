import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444444",
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  ticker: {
    color: "grey",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
  },
  boughtQuantityContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
  },
  pricePerCoin: {
    color: "grey",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 1,
  },
});
