import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const productStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  createBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 5,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderColor: "#ccccccff",
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 140,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "600",
    color: "#575757ff",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 6,
    fontWeight: "700",
    color: "black",
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  limitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    // marginBottom: 12,
  },
  limitLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 10,
  },
  picker: {
    height: 60,
    width: 100,
    paddingBottom: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 40,
  },
  pageBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  disabledBtn: {
    backgroundColor: "#9ca3af",
  },
  pageBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default productStyles;