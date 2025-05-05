import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductsCard = ({ p }) => {
  const navigation = useNavigation();

  //more detaisl btn
  const handleMoreButton = (id) => {
    navigation.navigate("productDetails", { _id: id });
  };

  //ADD TO CART
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
    <View>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={{ uri: p?.images[0]?.url || "https://montagnedellaluna.coffee/wp-content/uploads/2025/03/1882-29-.webp" }}
        />
        <Text style={styles.cardTitle}>{p?.name}</Text>
        <Text style={styles.cardDesc}>
          {p?.description.substring(0, 30)} ...more
        </Text>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleMoreButton(p._id)}
          >
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={()=>{saveToStorage(p._id, 1);alert(`1 items added to cart`);}}>
            <Text style={styles.btnText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginVertical: 5,
    marginHorizontal: 8,
    width: "100%",
    height: 200,
    padding: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  cardImage: {
    height: 120,
    width: "100%",
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 12,
    textAlign: "left",
  },
  BtnContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000000",
    height: 20,
    width: 75,
    borderRadius: 5,
    justifyContent: "center",
  },
  btnCart: {
    backgroundColor: "orange",
    height: 20,
    width: 75,
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default ProductsCard;
