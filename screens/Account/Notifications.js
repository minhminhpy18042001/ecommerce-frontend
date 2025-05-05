import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem("notifications");
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Layout>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 20,
          backgroundColor: "#f9f9f9",
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <View
              key={notification.id || index}
              style={{
                backgroundColor: "#ffffff",
                padding: 15,
                marginVertical: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
                width: "100%", // Adjusted to fit the width
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{notification.message}</Text>
              <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>{new Date(notification.date).toLocaleString()}</Text>
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 16, color: "gray" }}>Oops! You don't have any notifications yet.</Text>
        )}
      </View>
    </Layout>
  );
};

export default Notifications;
