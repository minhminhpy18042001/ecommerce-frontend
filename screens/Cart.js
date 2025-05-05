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
  const [addresses, setAddresses] = useState([]);
  
  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        const addresses =await AsyncStorage.getItem("addresses");
        const parsedAddresses = addresses ? JSON.parse(addresses) : [];
        setAddresses(parsedAddresses);
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
            {cartItems?.map((item, index) => (
              <Cartitem item={item.product} quantity={item.qty} key={`${item.product.id}-${index}`} />
            ))}
          </ScrollView>
          <View>
            <PriceTable title={"Price"} price={cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)} />
            <PriceTable title={"Tax"} price={cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)/10} />
            <PriceTable title={"Shipping"} price={10} />
            <View style={styles.grandTotal}>
              <PriceTable title={"Total"} price={cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)*110/100 + 10} />
            </View>
            <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }}>
              <TouchableOpacity onPress={() => navigation.navigate('addresses')} style={{ alignItems: 'center' }}>
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", color: '#333' }}>
                  Address:
                </Text>
                <Text style={{ textAlign: "center", fontSize: 16, color: '#555', marginTop: 5 }}>
                  {addresses[0]?.address}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 16, color: '#555' }}>
                  {addresses[0]?.name}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 16, color: '#555' }}>
                  {addresses[0]?.phone}
                </Text>
              </TouchableOpacity>
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
    // marginHorizontal: 20,
    // flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 30,
    // alignItems: "center",
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
