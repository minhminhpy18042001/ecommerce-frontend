import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/features/auth/userActions";
import AntDesign from "react-native-vector-icons/AntDesign";

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Layout>
      <View style={styles.container}>
        <Image source={{ uri: user?.profilePic ||'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.image} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.name}>
            Hi
            <Text style={{ color: "green" }}> {user?.name}</Text>
            👋
          </Text>
          <Text>email : {user?.email}</Text>
          <Text>contact : {user?.phone}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.heading}>Account Setting</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("profile", { id: user?._id })}
          >
            <AntDesign style={styles.btnText} name="edit" />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("myorders", { id: user?._id })
            }
          >
            <AntDesign style={styles.btnText} name="bars" />
            <Text style={styles.btnText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("notifications")}
          >
            <AntDesign style={styles.btnText} name="bells" />
            <Text style={styles.btnText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("addresses")}
          >
            <AntDesign style={styles.btnText} name="edit" />
            <Text style={styles.btnText}>Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("wishlist")}
          >
            <AntDesign style={styles.btnText} name="heart" />
            <Text style={styles.btnText}>Wishlist</Text>
          </TouchableOpacity>
          {user?.role === "admin" && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate("adminPanel", { id: user?._id })
              }
            >
              <AntDesign style={styles.btnText} name="windows" />
              <Text style={styles.btnText}>Admin Panel</Text>
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  name: {
    marginTop: 10,
    fontSize: 20,
  },
  btnContainer: {
    padding: 10,
    backgroundColor: "#ffffff",
    margin: 10,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
  },
  btnText: {
    fontSize: 15,
    marginRight: 10,
  },
});
export default Account;
