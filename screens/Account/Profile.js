import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { userData } from "../../data/userData";
import InputBox from "../../components/Form/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/features/auth/userActions";
import axios from "axios";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  //state
  const [email, setEamil] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [contact, setContact] = useState(user?.phone || "");

  //   update profile
  const handleUpdate = async () => {
    if (!email || !name || !address || !city || !contact) {
      return alert("Please provide all fields");
    }

    try {
      const response = await axios.put(
        "https://ecommerce-v1-wswg.onrender.com/api/v1/user/profile-update",
        {
          name,
          email,
          address,
          city,
          country: "VN", // Add country if needed
          phone: contact,
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        navigation.navigate("account");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: profilePic }} />
            <Pressable onPress={() => alert("profile dailogbox")}>
              <Text style={{ color: "red" }}>update your profile pic</Text>
            </Pressable>
          </View>
          <InputBox
            value={name}
            setValue={setName}
            placeholder={"enter you name"}
            autoComplete={"name"}
          />
          <InputBox
            value={email}
            setValue={setEamil}
            placeholder={"enter you email"}
            autoComplete={"email"}
          />
          <InputBox
            value={address}
            setValue={setAddress}
            placeholder={"enter you address"}
            autoComplete={"address-line1"}
          />
          <InputBox
            value={city}
            setValue={setCity}
            placeholder={"enter you city"}
            autoComplete={"country"}
          />
          <InputBox
            value={contact}
            setValue={setContact}
            placeholder={"enter you contact no"}
            autoComplete={"tel"}
          />
          <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
            <Text style={styles.btnUpdateText}>UPDATE PROFILE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  btnUpdate: {
    backgroundColor: "#000000",
    height: 40,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  btnUpdateText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
export default Profile;
