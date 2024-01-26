import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export const HeaderBookDetails = ({ bookDetails }) => {
  const handleAddToLibrary = async (book: Book) => {
    const { user } = useAuth();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const userData = user?.user;
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
  const toggleFavorite = (/* {bookDetails} */) => {
    ///handleAddToLibrary(bookDetails )
    setIsFavorite(!isFavorite);
  };
  const [isFavorite, setIsFavorite] = useState(false);


  return (
    <View style={{ height: 200 }}>
      <TouchableOpacity onPress={() => toggleFavorite()}>
        {isFavorite ? (
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
