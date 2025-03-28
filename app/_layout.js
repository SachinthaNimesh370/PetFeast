import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "index") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "history") {
            iconName = focused ? "time" : "time-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Manual Feed" }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule Feed" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
    </Tabs>
  );
}
