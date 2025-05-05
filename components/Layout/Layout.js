import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 60, // Ensures content does not overlap with the footer
  },
  footer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    zIndex: 100,
    borderTopWidth: 1,
    borderColor: "lightgray",
    position: "absolute",
    bottom: 0,
    padding: 10,
  },
});
export default Layout;
