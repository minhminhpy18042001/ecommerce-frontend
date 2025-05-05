import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cartitem = ({ item, quantity }) => {
  const [qty, setQty] = useState(quantity);
  const navigation = useNavigation();

  // Handle function for + -
  const handleAddQty = () => {
    if (qty === 10) return alert("you cant add more than 10 quantity");
    setQty((prev) => prev + 1);
  };
  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  const handleImagePress = () => {
    navigation.navigate("productDetails", { _id: item._id });
  };

  const handleRemoveItem = async () => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      const cartItems = cart ? JSON.parse(cart) : [];
      const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item._id);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      alert("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{
            uri:
              (Array.isArray(item?.images) && item.images[0]?.url) ||
              "https://montagnedellaluna.coffee/wp-content/uploads/2025/03/1882-29-.webp",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.name}> {item?.name}</Text>
        <Text style={styles.name}> Price : {item?.price} $</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text>{qty}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={handleRemoveItem}>
        <Text style={styles.removeBtnText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flexDirection: "column", // Changed from "row" to "column"
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
  },
  image: {
    height: 100, // Increased height
    width: 100, // Increased width
    resizeMode: "contain",
  },
  name: {
    fontSize: 16, // Increased font size for better visibility
    fontWeight: "bold", // Added bold font weight
    textAlign: "center", // Centered text
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
  },
  removeBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default Cartitem;
