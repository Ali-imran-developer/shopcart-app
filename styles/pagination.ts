import { StyleSheet } from "react-native";

export const paginationStyles = StyleSheet.create({
  paginationContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  paginationBtn: { flexDirection: "row", backgroundColor: "#e0e0e0ff", alignItems: "center", padding: 8, borderRadius: 50 },
  paginationBtnDisabled: { opacity: 0.5 },
  paginationBtnText: { fontSize: 14, fontWeight: "600", color: "#2563eb", marginHorizontal: 4 },
  paginationBtnTextDisabled: { color: "#9ca3af" },
  pageInfoContainer: { alignItems: "center" },
  pageInfo: { fontSize: 14, fontWeight: "600", color: "#111827" },
  totalInfo: { fontSize: 12, color: "#6b7280", marginTop: 2 },
});
