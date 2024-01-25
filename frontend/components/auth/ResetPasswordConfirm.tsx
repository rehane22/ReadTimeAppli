// ResetPasswordConfirm.js

import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const ResetPasswordConfirm = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPasswordConfirm = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/resetPasswordConfirm`, {
        email,
        verificationCode,
        newPassword,
      });

      const data = response.data;

      if (response.status === 200) {
        Alert.alert(
          "Password Reset",
          "Your password has been successfully reset."
        );
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
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Reset Password Confirmation
      </Text>
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
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="New Password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry={true}
      />
      <Button
        title="Confirm Reset Password"
        onPress={handleResetPasswordConfirm}
      />
    </View>
  );
};

export default ResetPasswordConfirm;
