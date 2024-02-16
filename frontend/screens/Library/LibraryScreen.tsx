import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useLibrary } from "./logics";
import { useBooks } from "../logics/books";
import { Book } from "../../types/book";

const LibraryScreen = ({ navigation }) => {
  const { library, removeBookFromLibrary } = useLibrary();
  const { handleGetBookDetails } = useBooks();

  const handleRemoveBook = async (bookId) => {
    await removeBookFromLibrary(bookId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ma Bibliothèque Personnelle</Text>
      <FlatList
        data={library}
        keyExtractor={(item : Book) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <TouchableOpacity
              onPress={() => handleGetBookDetails(item.googleBookId)}
            >
              <Text>Voir les détails du livre</Text>
            </TouchableOpacity>
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
