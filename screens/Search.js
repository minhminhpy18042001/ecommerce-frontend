import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet,ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/products/productsActions";
import ProductsCard from "../components/Products/ProductsCard";
import Layout from "../components/Layout/Layout";
const SearchScreen = ({ route }) => {
  const { searchText } = route.params;
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log("products", products[0]);
  console.log("searchText", searchText);
  const filteredProducts = products?.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category?.type?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.price?.toString().includes(searchText.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return <Text>No products found </Text>;
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Layout>
    <ScrollView>
      {filteredProducts.map((p) => (
        <ProductsCard key={p._id} p={p}/>
      ))}
    </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  productCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
  },
});

export default SearchScreen;