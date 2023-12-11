import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../components/auth/LoginScreen";
import SignupScreen from "../components/auth/SignUpScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";


const AuthStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

export const MainBottomTabNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Library" component={LibraryScreen} />
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Account" component={AccountScreen} />
    </BottomTab.Navigator>
  );
};