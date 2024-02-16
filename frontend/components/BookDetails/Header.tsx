import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useBooks } from "../../screens/logics/books";

export const HeaderBookDetails = ({ bookDetails }) => {
  const { handleAddToLibrary, checkIfBookInLibrary, removeBookFromLibrary } =
    useBooks();
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const checkIfBookInLibraryResult = await checkIfBookInLibrary(
          bookDetails.id
        );
        setIsFavorite(checkIfBookInLibraryResult.isInLibrary);
        setBookId(checkIfBookInLibraryResult.bookId);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du livre dans la bibliothèque",
          error
        );
      }
    };

    checkFavoriteStatus();
  }, [bookDetails.id]);

  const toggleFavorite = () => {
    if (!isFavorite) {
      handleAddToLibrary(bookDetails);
    } else {
      removeBookFromLibrary(bookId);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ height: 200 }}>
      <TouchableOpacity onPress={() => toggleFavorite()}>
        {!isFavorite ? (
          <MaterialIcons name="library-add" size={24} color="black" />
        ) : (
          <MaterialIcons name="library-add-check" size={24} color="black" />
        )}
      </TouchableOpacity>
      <ImageBackground
        source={{ uri: bookDetails.volumeInfo.imageLinks.thumbnail }}
        style={styles.headerBackground}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{bookDetails.volumeInfo.title}</Text>
          <Text style={styles.author}>{bookDetails.volumeInfo.authors}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: "auto",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    alignItems: "flex-end",
    height: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    color: "white",
  },
});
