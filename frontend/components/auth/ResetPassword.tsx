// ResetPassword.js

import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { ResetPasswordScreenNavigationProp } from "../../types/navigation";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


interface ResetPasswordProps {
  navigation: ResetPasswordScreenNavigationProp;
}

const ResetPassword  = ({ navigation }: ResetPasswordProps) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/resetPassword`, {
        email,
      });

      const data = response.data;

      if (response.status === 200) {
        Alert.alert(
          "Email Sent",
          "Check your email for instructions to reset your password."
        );

        navigation.navigate("ResetPasswordConfirm");
      } else {
        Alert.alert(
          "Error",
          data.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Reset Password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
