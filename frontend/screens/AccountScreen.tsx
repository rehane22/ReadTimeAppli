import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


const AccountScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dateOfBirth: user?.dateOfBirth || "",
    country: user?.country || "",
  });

  const handleProfileInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleLogout = async () => {
    try {
      
      await axios.post(`${apiUrl}/auth/logout`);
      logout(); 
      navigation.navigate('Welcome');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
  
    }
  };


  const handleUpdateProfile = async () => {
    try {
  
      const response = await axios.post(`${apiUrl}/auth/update`, profileData);
      console.log("Profil mis à jour avec succès:", response.data);

    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={profileData.firstName}
        onChangeText={(text) => handleProfileInputChange("firstName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de famille"
        value={profileData.lastName}
        onChangeText={(text) => handleProfileInputChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date de naissance"
        value={profileData.dateOfBirth}
        onChangeText={(text) => handleProfileInputChange("dateOfBirth", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pays"
        value={profileData.country}
        onChangeText={(text) => handleProfileInputChange("country", text)}
      />
      <Button title="Mettre à jour le profil" onPress={handleUpdateProfile} />
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AccountScreen;