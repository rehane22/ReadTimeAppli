import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MainStackNavigator } from "./navigation";
import { BookDetailScreen } from "./screens/BooksDetailsScreen";

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user && (
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
      )}
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
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
