import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

export default function History() {
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      const historyRef = ref(db, 'history');
      onValue(historyRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const historyArray = Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .reverse(); // Reverse to show new data at the top
          setHistory(historyArray);
        }
      });
    }, []);
  
    const renderItem = ({ item }) => (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.date}</Text>
        <Text style={styles.cell}>{item.time}</Text>
        <Text style={styles.cell}>{item.action}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Time</Text>
          <Text style={styles.headerText}>Action</Text>
        </View>
        <FlatList data={history} keyExtractor={(item) => item.id} renderItem={renderItem} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#0288D1',
      padding: 10,
      borderRadius: 5,
    },
    headerText: {
      fontWeight: 'bold',
      color: 'white',
      flex: 1,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    cell: {
      flex: 1,
      textAlign: 'center',
    },
  });
  