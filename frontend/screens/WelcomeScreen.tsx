import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const WelcomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("connexion");
  const { login } = useAuth();
  const navigation = useNavigation();
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginInputChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
  };

  const handleSignupInputChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
  };

 
  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginData);
      setLoginData({ username: "", password: "" });
      setModalVisible(false);
      login(response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Erreur de connexion:", error);
  
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, signupData);

      setSignupData({ username: "", email: "", password: "" });
      setModalVisible(false);
      login(response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Erreur d'inscription:", error);
     
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Button
        title="Se connecter"
        onPress={() => {
          setModalVisible(true);
          handleTabChange("connexion");
        }}
      />
      <Button
        title="S'inscrire"
        onPress={() => {
          setModalVisible(true);
          handleTabChange("inscription");
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.closeButtonContainer}>
              <Button title="X" onPress={() => setModalVisible(false)} />
            </View>
            <View style={styles.tabContainer}>
              <Button
                title="Connexion"
                onPress={() => handleTabChange("connexion")}
              />
              <Button
                title="Inscription"
                onPress={() => handleTabChange("inscription")}
              />
            </View>
            {activeTab === "connexion" && (
              <>
                <Text style={styles.modalTitle}>Se connecter</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nom d'utilisateur"
                  value={loginData.username}
                  onChangeText={(text) =>
                    handleLoginInputChange("username", text)
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  secureTextEntry={true}
                  value={loginData.password}
                  onChangeText={(text) =>
                    handleLoginInputChange("password", text)
                  }
                />
                <Button title="Se connecter" onPress={handleLoginSubmit} />
              </>
            )}
            {activeTab === "inscription" && (
              <>
                <Text style={styles.modalTitle}>S'inscrire</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nom d'utilisateur"
                  value={signupData.username}
                  onChangeText={(text) =>
                    handleSignupInputChange("username", text)
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Adresse e-mail"
                  value={signupData.email}
                  onChangeText={(text) =>
                    handleSignupInputChange("email", text)
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  secureTextEntry={true}
                  value={signupData.password}
                  onChangeText={(text) =>
                    handleSignupInputChange("password", text)
                  }
                />
                <Button title="S'inscrire" onPress={handleSignupSubmit} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default WelcomeScreen;
