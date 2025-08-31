import { paginationStyles } from "@/styles/pagination";
import { PaginationProps } from "@/types/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <View style={paginationStyles.paginationContainer}>
      <TouchableOpacity disabled={page === 1} onPress={() => setPage((prev: any) => Math.max(prev - 1, 1))}
        style={[ paginationStyles.paginationBtn, page === 1 && paginationStyles.paginationBtnDisabled ]}>
        <Feather name="arrow-left" size={20} color={page === 1 ? "#9ca3af" : "#000000ff"} />
      </TouchableOpacity>

      <View style={paginationStyles.pageInfoContainer}>
        <Text style={paginationStyles.pageInfo}>
          Page {page} of {totalPages}
        </Text>
      </View>

      <TouchableOpacity disabled={page >= totalPages} onPress={() => setPage((prev: any) => prev + 1)}
        style={[ paginationStyles.paginationBtn, page >= totalPages && paginationStyles.paginationBtnDisabled ]}>
        <Feather name="arrow-right" size={20} color={page >= totalPages ? "#9ca3af" : "#000000ff"} />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;