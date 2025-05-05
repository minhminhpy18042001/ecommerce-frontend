import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/features/auth/userActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from "../components/Layout/Layout";

const Checkout = ({ navigation, route }) => {
  const { cartItems } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleCOD = () => {
    alert("Your Order Has Been Placed Successfully");
  };

  const handleOnline = () => {
    alert("Your Redirecting to payment gateway");
    navigation.navigate("payment");
  };
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

  const handleCheckout = async () => {
    try {
      const response = await fetch('https://ecommerce-v1-wswg.onrender.com/api/v1/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingInfo: {
            address: '123 Main St',
            city: 'New York',
            country: 'USA',
          },
          orderItems: cartItems.map(item => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.qty,
            image: item.product.images[0]?.url || 'https://montagnedellaluna.coffee/wp-content/uploads/2025/03/1882-29-.webp',
            product: item.product._id,
          })),
          paymentMethod: 'COD',
          user: user?._id, // Replace with actual user ID
          itemPrice: cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0),
          tax: cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)/105, // Example tax value
          shippingCharges: 10, // Example shipping charge
          totalAmount: cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)*110/100 + 10,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        await AsyncStorage.removeItem('cart');
        addNotification('Your order has been placed successfully.');
        navigation.navigate('myorders');
      } else {
        console.error('Error placing order:', data);
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <Layout>
      <View style={Styles.container}>
        <Text style={Styles.heading}>Payment Options</Text>
        <Text style={Styles.price}>Total Amount : {cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)*110/100 + 10}$</Text>
        <View style={Styles.paymentCard}>
          <Text style={Styles.paymentHeading}>Select your Payment Mode</Text>
          <TouchableOpacity style={Styles.paymentBtn} onPress={handleCheckout}>
            <Text style={Styles.paymentBtnText}>Cash On Devlivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.paymentBtn} onPress={handleOnline}>
            <Text style={Styles.paymentBtnText}>
              Online (CREDIT | DEBIT CARD)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "gray",
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
  },
  paymentHeading: {
    color: "gray",
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  paymentBtnText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Checkout;
