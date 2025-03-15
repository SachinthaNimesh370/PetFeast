import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState([]); // Store multiple schedules
  const [showPicker, setShowPicker] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track editing index

  const handleConfirm = (selectedDate) => {
    if (selectedDate) {
      if (editIndex !== null) {
        // Edit existing schedule
        const updatedSchedules = [...schedules];
        updatedSchedules[editIndex] = selectedDate;
        setSchedules(updatedSchedules);
        setEditIndex(null);
      } else {
        // Add new schedule
        setSchedules([...schedules, selectedDate]);
      }
    }
    setShowPicker(false);
  };

  const handleDelete = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Feeding</Text>

      {/* Button to Open DateTime Picker */}
      <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar" size={24} color="#fff" />
        <Text style={styles.buttonText}>Add Schedule</Text>
      </TouchableOpacity>

      {/* Modal DateTime Picker */}
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowPicker(false);
          setEditIndex(null);
        }}
      />

      {/* Display Scheduled Dates & Times */}
      {schedules.length > 0 && (
        <FlatList
          data={schedules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleText}>{item.toLocaleString()}</Text>

              {/* Edit & Delete Buttons */}
              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(index)}>
                  <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                  <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 220,
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  scheduleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  actions: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 8,
    borderRadius: 5,
  },
});

