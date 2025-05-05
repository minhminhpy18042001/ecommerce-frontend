import { View, Text, StyleSheet } from "react-native";
import React from "react";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderinfo}>
        <Text>Order ID : {order._id}</Text>
        <Text>Date : {new Date(order.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text>Item Price : {order.itemPrice} $</Text>
      <Text>Shipping Charges : {order.shippingCharges} $</Text>
      <Text>Tax : {order.tax} $</Text>
      <Text>Total Amount : {order.totalAmount} $</Text>
      <Text>Payment Method : {order.paymentMethod}</Text>
      <Text>Order Status : {order.orderStatus}</Text>
      <View style={styles.shippingInfo}>
        <Text>Shipping Address:</Text>
        <Text>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.country}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  orderinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 5,
  },
  shippingInfo: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
});

export default OrderItem;
