// screens/PersonalLibraryScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LibraryScreen: React.FC = () => {
  const { user } = useAuth();
  const [library, setLibrary] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const User = user.user;
  useEffect(() => {
    if (User) {
      getPersonalLibrary();
    }
  }, [User]);

  const getPersonalLibrary = async () => {
    try {
      const response = await axios.get(`${apiUrl}/personalLibrary/${User._id}`);
      setLibrary(response.data);
      getPersonalLibrary();
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la bibliothèque personnelle",
        error
      );
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      console.log(bookId);
      await axios.delete(`${apiUrl}/personalLibrary/remove/${User._id}/${bookId}`);
      getPersonalLibrary();
    } catch (error) {
      console.error("Erreur lors de la suppression du livre", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ma Bibliothèque Personnelle</Text>
      <FlatList
        data={library}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <TouchableOpacity onPress={() => handleRemoveBook(item._id)}>
              <Text style={styles.removeButton}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  bookItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  removeButton: {
    color: "red",
    marginTop: 5,
  },
});

export default LibraryScreen;
