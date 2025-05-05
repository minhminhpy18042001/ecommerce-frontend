import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetails = ({ route }) => {
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);
  const { params } = route;

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://ecommerce-v1-wswg.onrender.com/api/v1/product/${params?._id}`);
        setPDetails(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [params?._id]);

  // Handle function for + -
  const handleAddQty = () => {
    if (qty === 10) return alert("you can't add more than 10 quantity");
    setQty((prev) => prev + 1);
  };
  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  const saveToStorage = async (id, qty) => {
    try {
      
      const cartData = await AsyncStorage.getItem('cart');
      const cart = cartData ? JSON.parse(cartData) : [];
      console.log(cart);

      // Check if the item already exists in the cart
      const existingItemIndex = cart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        cart[existingItemIndex].qty += qty;
      } else {
        // Add the new item to the cart
        cart.push({ id, qty });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  return (
    <Layout>
      <Image source={{ uri: Array.isArray(pDetails?.images) && pDetails.images[0]?.url || "https://montagnedellaluna.coffee/wp-content/uploads/2025/03/1882-29-.webp" }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{pDetails?.name}</Text>
        <Text style={styles.title}>Price : {pDetails?.price} $</Text>
        <Text style={styles.desc}>Description : {pDetails?.description} </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={() => {
              saveToStorage(params?._id, qty);
              alert(`${qty} items added to cart`);
            }}
            disabled={pDetails?.stock <= 0}
          >
            <Text style={styles.btnCartText}>
              {pDetails?.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  desc: {
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "justify",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnCart: {
    width: 180,
    backgroundColor: "#000000",
    // marginVertical: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
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
});
export default ProductDetails;
