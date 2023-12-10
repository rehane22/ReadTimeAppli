// App.js
import { NavigationContainer } from "@react-navigation/native";
import { MainBottomTabNavigator, AuthStackNavigator } from "./navigation";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StyleSheet } from "react-native";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const RootNavigator: React.FC = () => {
  const { user } = useAuth();

  return user ? <MainBottomTabNavigator /> : <AuthStackNavigator />;
};

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: "white",
    },
  });
  
  export default App;