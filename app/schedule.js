import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, ref, set, get } from "../firebase";

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch schedules from Firebase and set up interval for triggering supply
  useEffect(() => {
    const schedulesRef = ref(db, "schedules");
    get(schedulesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setSchedules(Object.values(data));
        }
      })
      .catch((error) => console.error("Error fetching schedules:", error));

    const interval = setInterval(() => {
      const currentTime = new Date();
      schedules.forEach((schedule, index) => {
        const scheduleTime = new Date(schedule);
        if (currentTime >= scheduleTime) {
          triggerSupply();
          const updatedSchedules = [...schedules];
          updatedSchedules.splice(index, 1);
          setSchedules(updatedSchedules);
          updateSchedulesInFirebase(updatedSchedules);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [schedules]);

  // Trigger both water and food supply
  const triggerSupply = () => {
    triggerWaterSupply();
    triggerFoodSupply();
  };

  // Trigger water supply
  const triggerWaterSupply = () => {
    set(ref(db, "supply-water"), true)
      .then(() => {
        alert("Water Supplied!");
        setTimeout(() => {
          set(ref(db, "supply-water"), false);
        }, 10000);
      })
      .catch((error) => console.error("Error triggering water supply:", error));
  };

  // Trigger food supply
  const triggerFoodSupply = () => {
    set(ref(db, "supply-food"), true)
      .then(() => {
        alert("Food Supplied!");
        setTimeout(() => {
          set(ref(db, "supply-food"), false);
        }, 10000);
      })
      .catch((error) => console.error("Error triggering food supply:", error));
  };

  // Update schedules in Firebase
  const updateSchedulesInFirebase = (updatedSchedules) => {
    const schedulesRef = ref(db, "schedules");
    set(schedulesRef, updatedSchedules).catch((error) => console.error("Error updating schedules:", error));
  };

  // Handle date and time selection
  const handleConfirm = (selectedDate) => {
    let updatedSchedules = [...schedules];
    if (editIndex !== null) {
      updatedSchedules[editIndex] = selectedDate.toISOString();
      setEditIndex(null);
    } else {
      updatedSchedules.push(selectedDate.toISOString());
    }
    setSchedules(updatedSchedules);
    updateSchedulesInFirebase(updatedSchedules);
    setShowPicker(false);
  };

  // Delete a schedule
  const handleDelete = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
    updateSchedulesInFirebase(updatedSchedules);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Feeding</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar" size={24} color="#fff" />
        <Text style={styles.buttonText}>Add Schedule</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
      />
      <FlatList
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>{new Date(item).toLocaleString()}</Text>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <Ionicons name="trash" size={24} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  scheduleItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  scheduleText: {
    fontSize: 16,
  },
});
