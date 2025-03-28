import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, ref, set, get } from "../firebase";

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch schedules from Firebase
  useEffect(() => {
    const schedulesRef = ref(db, "schedules");
    get(schedulesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const sortedSchedules = Object.values(data).sort((a, b) => new Date(a) - new Date(b));
          setSchedules(sortedSchedules);
        }
      })
      .catch((error) => console.error("Error fetching schedules:", error));
  }, []);

  // Add or Edit a schedule
  const handleConfirm = (date) => {
    let updatedSchedules = [...schedules];
    if (editIndex !== null) {
      updatedSchedules[editIndex] = date.toISOString();
      setEditIndex(null);
    } else {
      updatedSchedules.push(date.toISOString());
    }
    updatedSchedules.sort((a, b) => new Date(a) - new Date(b));
    setSchedules(updatedSchedules);
    updateSchedulesInFirebase(updatedSchedules);
    setShowPicker(false);
  };

  // Update schedules in Firebase
  const updateSchedulesInFirebase = (updatedSchedules) => {
    const schedulesRef = ref(db, "schedules");
    set(schedulesRef, updatedSchedules).catch((error) => console.error("Error updating schedules:", error));
  };

  // Delete a schedule
  const handleDelete = (index) => {
    Alert.alert("Delete Schedule", "Are you sure you want to delete this schedule?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => {
        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
        updateSchedulesInFirebase(updatedSchedules);
      }, style: "destructive" },
    ]);
  };

  // Open the date picker for editing
  const handleEdit = (index) => {
    setEditIndex(index);
    setSelectedDate(new Date(schedules[index]));
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feeding Schedule</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowPicker(true)}>
        <Ionicons name="add-circle" size={30} color="#fff" />
        <Text style={styles.addButtonText}>Add New Schedule</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        date={selectedDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
      />
      <FlatList
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer} // Center the list horizontally
        renderItem={({ item, index }) => (
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>{new Date(item).toLocaleString()}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <Ionicons name="pencil" size={24} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={{ marginLeft: 15 }}>
                <Ionicons name="trash" size={24} color="#d9534f" />
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#3CAD45",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffff",
    fontSize: 18,
    marginLeft: 10,
  },
  listContainer: {
    alignItems: "center", // Centers the list horizontally
    justifyContent: "center", // Optional: ensures that the list is centered vertically if the list is small
    width: "100%", // Ensures the list takes up the full width
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
    elevation: 2,
  },
  scheduleText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
