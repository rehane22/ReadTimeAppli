// screens/HomeScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet , TextInput, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.error("Erreur lors de la recherche", error);
    }
  };

  const handleAddToLibrary = async (book) => {
    try {
      await axios.post(`${apiUrl}/personal-library/add-book`, {
        userId: user._id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors && book.volumeInfo.authors.join(", "),
        coverImageUrl: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
      });

      console.log("Livre ajouté à la bibliothèque personnelle");
    } catch (error) {
      console.error("Erreur lors de l'ajout à la bibliothèque personnelle", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur TonApp !</Text>
      <TextInput 
        style={styles.input}
        placeholder="Rechercher des livres par titre, auteur ou genre"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>{item.volumeInfo.title}</Text>
            <Text>{item.volumeInfo.authors && item.volumeInfo.authors.join(", ")}</Text>
            <TouchableOpacity onPress={() => handleAddToLibrary(item)}>
              <Text>Ajouter à la bibliothèque</Text>
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
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  resultItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default HomeScreen;
