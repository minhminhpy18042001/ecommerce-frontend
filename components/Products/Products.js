import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsCard from "./ProductsCard";
import { fetchProducts } from "../../redux/features/products/productsActions";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      {products.map((p) => (
        <ProductsCard key={p._id} p={p}/>
      ))}
    </ScrollView>
  );
};

export default Products;
