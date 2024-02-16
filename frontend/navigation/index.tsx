import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LibraryScreen from "../screens/Library/LibraryScreen";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const MainStackNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};
