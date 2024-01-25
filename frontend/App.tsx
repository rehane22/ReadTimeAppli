import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import { AuthProvider } from "./context/AuthContext";
import { MainStackNavigator } from "./navigation";
import { BookDetailScreen } from "./screens/BooksDetailsScreen";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookDetail"
            component={BookDetailScreen}
            options={{ title: "Book Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
