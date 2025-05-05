import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/Layout/Layout";

const Address = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "" });
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(0);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem("addresses");
        if (storedAddresses) {
          const parsedAddresses = JSON.parse(storedAddresses);
          setAddresses(parsedAddresses);
          setDefaultAddressIndex(0); // Set the first address as default
          console.log(parsedAddresses);
        }
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleGoBack = () => {
    navigation.navigate("cart", { refresh: true });
    navigation.goBack({ refresh: true });
  };

  const addAddress = async () => {
    if (!newAddress.name.trim() || !newAddress.phone.trim() || !newAddress.address.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    setNewAddress({ name: "", phone: "", address: "" });
    await AsyncStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const deleteAddress = async (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (defaultAddressIndex === index) {
      setDefaultAddressIndex(0); // Reset default to the first address
    }
    await AsyncStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const setDefaultAddress = async (index) => {
    try {
      const updatedAddresses = [...addresses];
      const [selectedAddress] = updatedAddresses.splice(index, 1); // Remove the selected address
      const reorderedAddresses = [selectedAddress, ...updatedAddresses]; // Push it to the first index
      setAddresses(reorderedAddresses);
      await AsyncStorage.setItem("addresses", JSON.stringify(reorderedAddresses));
    } catch (error) {
      console.error("Error setting default address", error);
    }
  };;

  const renderAddress = ({ item, index }) => (
    <View style={styles.addressItem}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.phone}</Text>
        <Text>{item.address}</Text>
        {index === defaultAddressIndex && <Text style={styles.defaultText}>(Default)</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setDefaultAddress(index)}>
          <Text style={styles.setDefaultText}>Set Default</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteAddress(index)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Your Addresses</Text>
      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newAddress.name}
        onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={newAddress.phone}
        onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={newAddress.address}
        onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addAddress}>
        <Text style={styles.addButtonText}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontWeight: "bold",
  },
  defaultText: {
    color: "green",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  setDefaultText: {
    color: "blue",
    marginRight: 10,
  },
  deleteText: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Address;