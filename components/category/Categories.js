import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { categoriesData } from "../../data/CategoriesData";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const Categories = () => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {categoriesData?.map((item) => (
          <View key={item._id}>
            <TouchableOpacity
              style={styles.catContainer}
               onPress={() => navigation.navigate("category", { category: item._id })}
            >
              {/* <AntDesign name={item.icon} style={styles.catIcon} /> */
              <Text></Text>}
              <Text style={styles.catTitle}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 5,
    flexDirection: "row",
  },
  catContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  catIcon: {
    fontSize: 53,
    verticalAlign: "top",
  },
  catTitle: {
    fontSize: 21,
  },
});
export default Categories;
