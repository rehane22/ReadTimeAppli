// screens/HomeScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Book } from "../types/book";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const { user } = useAuth();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const userData = user?.user;
  const navigation = useNavigation();
  
  const handleGetBookDetails = async (bookId: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
  
    
      navigation.navigate('BookDetail', { bookDetails: response.data });
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du livre", error);
    }
  };

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

  const handleAddToLibrary = async (book: Book) => {
    try {
      await axios.post(`${apiUrl}/personalLibrary/add`, {
        user: userData._id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors && book.volumeInfo.authors.join(", "),
        coverImageUrl:
          book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
      });
      console.log("Livre ajouté à la bibliothèque personnelle");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout à la bibliothèque personnelle",
        error
      );
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
            <Text>
              {item.volumeInfo.authors && item.volumeInfo.authors.join(", ")}
            </Text>
            <TouchableOpacity onPress={() => handleGetBookDetails(item.id)}>
              <Text>Voir les détails du livre</Text>
            </TouchableOpacity>
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
