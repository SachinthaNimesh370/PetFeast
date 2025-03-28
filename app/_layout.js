import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor;

          // Set icon color using color codes based on focus state
          if (focused) {
            iconColor = "#0A102B"; // Orange color for active tab
          } else {
            iconColor = "#607D8B"; // Blue-grey color for inactive tab
          }

          // Determine the icon name based on the route
          if (route.name === "index") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "history") {
            iconName = focused ? "time" : "time-outline";
          }

          // Return the icon with the dynamic color
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: "#0A102B",   // Active tab color (orange)
        tabBarInactiveTintColor: "#607D8B", // Inactive tab color (blue-grey)
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Manual Feed" }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule Feed" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
    </Tabs>
  );
}
