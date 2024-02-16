// useBooks.tsx

import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Book } from "../../types/book";
import { useAuth } from "../../context/AuthContext";


export const useBooks = () => {
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

      navigation.navigate('BookDetail', { bookDetails: response.data, bookId: bookId });
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
        googleBookId: book.id,
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

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    handleSearch,
    handleGetBookDetails,
    handleAddToLibrary
  };
};


