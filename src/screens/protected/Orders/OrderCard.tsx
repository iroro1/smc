import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export interface Order {
  id: string | number;
  image: any;
  title?: string; // for OpenOrders
  mainItem?: string; // for CompletedOrders
  otherItems?: number; // for CompletedOrders
  date: string;
  time: string;
  location: string;
  price: number;
  isCompleted?: boolean;
  restaurant: {
    logo: string;
    name: string;
    address: string;
  };
  status: "pending" | "confirmed" | "dispatched" | "completed";
}

const OrderCard = ({
  order,
  onPress,
}: {
  order: Order;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
    <Image source={order.image} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.mainItem}>
        {order.mainItem || order.title}
        {order.otherItems && order.otherItems > 0 && (
          <Text style={styles.otherItems}>
            {" "}
            +{order.otherItems} other item{order.otherItems > 1 ? "s" : ""}
          </Text>
        )}
      </Text>
      <Text style={styles.dateTime}>
        {order.date} • {order.time}
      </Text>
      <Text style={styles.location}>{order.location}</Text>
      <Text style={styles.price}>₦{order.price.toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  infoContainer: {
    flex: 1,
  },
  mainItem: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  otherItems: {
    fontWeight: "normal",
    color: "#888",
    fontSize: 15,
  },
  dateTime: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  location: {
    color: "#444",
    fontSize: 14,
    marginTop: 2,
  },
  price: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
});

export default OrderCard;
