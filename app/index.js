import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const handleFeedWater = () => {
    alert("Water Supplied!");
  };

  const handleFeedFood = () => {
    alert("Food Supplied!");
  };

  return (
    <View style={styles.container}>
      

      <TouchableOpacity style={styles.buttonWater} onPress={handleFeedWater}>
        <Ionicons name="water" size={24} color="#fff" />
        <Text style={styles.buttonText}>Supply Water</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonFood} onPress={handleFeedFood}>
        <Ionicons name="fast-food" size={24} color="#fff" />
        <Text style={styles.buttonText}>Supply Food</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  buttonWater: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0077b6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    justifyContent: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonFood: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e76f51",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
