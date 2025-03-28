import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, ref, set, push } from "../firebase"; // Correctly import push for adding data with auto ID

export default function HomeScreen() {
  // Function to set supply-water to true and reset to false after 10 seconds
  const handleFeedWater = () => {
    console.log("history");
    // Set 'supply-water' to true in Firebase Realtime Database
    set(ref(db, "supply-water"), true)
      .then(() => {
        alert("Water Supplied!");

        // Add the action to the history
        addToHistory("Water");

        // Reset to false after 10 seconds
        setTimeout(() => {
          set(ref(db, "supply-water"), false)
            .then(() => {
              console.log("Water supply reset to false");
            })
            .catch((error) => {
              console.error("Error resetting water supply:", error);
            });
        }, 10000); // 10000 milliseconds = 10 seconds
      })
      .catch((error) => {
        console.error("Error setting water supply:", error);
      });
  };

  // Function to set supply-food to true and reset to false after 10 seconds
  const handleFeedFood = () => {
    // Set 'supply-food' to true in Firebase Realtime Database
    set(ref(db, "supply-food"), true)
      .then(() => {
        console.log("history");
        alert("Food Supplied!");
        console.log("history");

        // Add the action to the history
        addToHistory("Food");

        // Reset to false after 10 seconds
        setTimeout(() => {
          set(ref(db, "supply-food"), false)
            .then(() => {
              console.log("Food supply reset to false");
            })
            .catch((error) => {
              console.error("Error resetting food supply:", error);
            });
        }, 10000); // 10000 milliseconds = 10 seconds
      })
      .catch((error) => {
        console.error("Error setting food supply:", error);
      });
  };

  // Function to add the supply action to the history in the database
  const addToHistory = (action) => {
    const currentDate = new Date();
    const historyRef = ref(db, "history");
    console.log("history");

    // Create a new record for the action
    const newHistory = {
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
      action: action,
    };

    // Print the reference and the data being pushed
    console.log("Pushing to history with data:", newHistory);

    // Use push to automatically generate a unique ID for each new history entry
    push(historyRef, newHistory)
      .then(() => {
        console.log("History updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating history:", error);
      });
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
    elevation: 5,
    shadowColor: "#000",
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
