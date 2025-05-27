import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { OpenOrders } from "./Orders/OpenOrders";
import { CompletedOrders } from "./Orders/CompletedOrders";

export const OrderScreen = () => {
  const [filter, setFilter] = useState<"open" | "completed">("open");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Orders</Text>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={
            filter === "open" ? styles.filterButtonActive : styles.filterButton
          }
          onPress={() => setFilter("open")}
        >
          <Text
            style={[
              styles.filterButtonText,
              { color: filter === "open" ? "#1D2939" : "#98A2B3" },
            ]}
          >
            Open orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            filter === "completed"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.filterButtonText,
              { color: filter === "completed" ? "#1D2939" : "#98A2B3" },
            ]}
          >
            Completed orders
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {filter === "open" ? <OpenOrders /> : <CompletedOrders />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black,
  },
  content: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 10,
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    height: 38,
  },
  filterButtonActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.seaGreen,
    height: 38,
  },
  filterButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },
});
