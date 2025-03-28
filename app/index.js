import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";  // Added StyleSheet import
import { Card } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, set, push } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function HomeScreen() {
  const [waterCount, setWaterCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);

  useEffect(() => {
    fetchTodayHistory();
  }, []);

  const fetchTodayHistory = () => {
    const historyRef = ref(db, "history");
    const today = new Date().toLocaleDateString();

    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyArray = Object.values(data);
        const todayHistory = historyArray.filter((item) => item.date === today);

        const waterCount = todayHistory.filter((item) => item.action === "Water").length;
        const foodCount = todayHistory.filter((item) => item.action === "Food").length;

        setWaterCount(waterCount);
        setFoodCount(foodCount);
      }
    });
  };

  const handleFeed = (action) => {
    set(ref(db, `supply-${action.toLowerCase()}`), true)
      .then(() => {
        alert(`${action} Supplied!`);
        addToHistory(action);

        setTimeout(() => {
          set(ref(db, `supply-${action.toLowerCase()}`), false);
        }, 10000);
      })
      .catch((error) => console.error(`Error setting ${action} supply:`, error));
  };

  const addToHistory = (action) => {
    const currentDate = new Date();
    const historyRef = ref(db, "history");

    const newHistory = {
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
      action: action,
    };

    push(historyRef, newHistory)
      .then(() => fetchTodayHistory()) // Update count after adding
      .catch((error) => console.error("Error updating history:", error));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Today's Summary</Text>

      <View style={styles.summaryContainer}>
        <Card style={[styles.cardL, { borderLeftColor: "#0288D1" }]}>
          <Card.Content>
            <View style={styles.summaryItem}>
              <Ionicons name="water" size={50} color="#0288D1" />
              <Text style={styles.summaryText}>Water Supplied</Text>
              <Text style={styles.valueText}>{waterCount} times</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.cardR, { borderLeftColor: "#FF5722" }]}>
          <Card.Content>
            <View style={styles.summaryItem}>
              <Ionicons name="fast-food" size={50} color="#FF5722" />
              <Text style={styles.summaryText}>Food Supplied</Text>
              <Text style={styles.valueText}>{foodCount} times</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWater} onPress={() => handleFeed("Water")}>
          <Ionicons name="water" size={24} color="#fff" />
          <Text style={styles.buttonText}>Supply Water</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonFood} onPress={() => handleFeed("Food")}>
          <Ionicons name="fast-food" size={24} color="#fff" />
          <Text style={styles.buttonText}>Supply Food</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardL: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  cardR: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  summaryItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  valueText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonWater: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0288D1',  // Blue button for water
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    justifyContent: 'center',
  },
  buttonFood: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5722',  // Red-orange button for food
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
