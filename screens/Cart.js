import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartData } from "../data/CartData";
import PriceTable from "../components/cart/PriceTable";
import Layout from "../components/Layout/Layout";
import Cartitem from "../components/cart/CartItem";

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
          const detailedCart = await Promise.all(
            parsedCart.map(async (item) => {
              const response = await fetch(`https://ecommerce-v1-wswg.onrender.com/api/v1/product/${item.id}`);
              const product = await response.json();
              return { ...product, qty: item.qty };
            })
          );
          const result = detailedCart.map(({ product, qty }) => ({ product, qty }));
          console.log(result);
          setCartItems(result);
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error);
      }
    };

    loadCartFromStorage();
  }, []);

  const addNotification = async (message) => {
    try {
      const notifications = await AsyncStorage.getItem('notifications');
      const parsedNotifications = notifications ? JSON.parse(notifications) : [];
      const updatedNotifications = [...parsedNotifications, { message, date: new Date().toISOString() }];
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const navigateToCheckout = () => {
    navigation.navigate('checkout', { cartItems });
    setCartItems([]);
    addNotification('You have successfully checked out your cart.');
  };

  return (
    <Layout>
      <Text style={styles.heading}>
        {cartItems?.length > 0
          ? `You Have ${cartItems?.length} Item Left In Your Cart`
          : "OOPS Your Cart Is EMPTY !"}
      </Text>
      {cartItems?.length > 0 && (
        <>
          <ScrollView>
            {cartItems?.map((item) => (
              <Cartitem item={item.product} quantity={item.qty} key={item.product.id} />
            ))}
          </ScrollView>
          <View>
            <PriceTable title={"Price"} price={cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)} />
            <PriceTable title={"Tax"} price={cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)/10} />
            <PriceTable title={"Shipping"} price={10} />
            <View style={styles.grandTotal}>
              <PriceTable title={"Grand Total"} price={cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)*110/100 + 10} />
            </View>
            <TouchableOpacity
              style={styles.btnCheckout}
              onPress={navigateToCheckout}
            >
              <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#000000",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckoutText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default Cart;
