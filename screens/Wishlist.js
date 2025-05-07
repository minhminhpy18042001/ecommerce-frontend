import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator,ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ProductsCard from "../components/Products/ProductsCard";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem("wishlist");
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.error("Failed to fetch wishlist from AsyncStorage", error);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlist.length === 0) return;

      setLoading(true);
      try {
        const fetchedProducts = await Promise.all(
          wishlist.map(async (id) => {
            const response = await axios.get(`https://ecommerce-v1-wswg.onrender.com/api/v1/product/${id}`);
            return response.data;
          })
        );
        setProducts(fetchedProducts);
        console.log("Fetched products:", fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [wishlist]);

  return (
    <ScrollView>
      {products.map((p) => (
        <ProductsCard key={p.product._id} p={p.product}/>
      ))}
    </ScrollView>
  );
};

export default Wishlist;