import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Carousel from "react-native-x-carousel";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const PaginationLight = ({ data = [], renderItem = () => null, loop = false, autoplay = false }) => {
  // ...existing implementation of PaginationLight...
};

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get("https://ecommerce-v1-wswg.onrender.com/api/v1/product/top");
        setBannerData(response.data.products);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  const renderItem = (data) => (
    <View key={data._id} style={styles.cardContainer}>
      <Pressable onPress={() => navigation.navigate("productDetails", { _id: data._id })}>
        <View style={styles.cardWrapper}>
          <Image style={styles.card} source={{ uri: data?.images[0]?.url || "https://montagnedellaluna.coffee/wp-content/uploads/2025/03/1882-29-.webp"}} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Top 3 Product</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={bannerData}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  cardWrapper: {
    overflow: "hidden",
  },
  card: {
    width: width * 0.9, // Adjusted to prevent overflow
    height: width * 0.4,
    resizeMode: "contain", // Ensures the image fits within the frame
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
    borderRadius: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Banner;
