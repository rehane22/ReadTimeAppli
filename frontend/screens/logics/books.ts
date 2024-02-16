// useBooks.tsx

import { useEffect, useState } from "react";
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
  const [library, setLibrary] = useState([]);
  


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

  const checkIfBookInLibrary = async (bookId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/personalLibrary/check/${userData?._id}/${bookId}`);
      return { isInLibrary: response.data.isInLibrary, bookId: response.data.bookId };
    } catch (error) {
      console.error("Erreur lors de la vérification du livre dans la bibliothèque", error);
      return { isInLibrary: false, bookId: null };
    }
  };

 

  useEffect(() => {
    if (userData) {
      getPersonalLibrary();
    }
  }, [library]);

  const getPersonalLibrary = async () => {
    try {
      const response = await axios.get(`${apiUrl}/personalLibrary/${userData._id}`);
      setLibrary(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la bibliothèque personnelle",
        error
      );
    }
  };


  const removeBookFromLibrary = async (bookId: string) => {
    try {
      await axios.delete(
        `${apiUrl}/personalLibrary/remove/${userData._id}/${bookId}`
      );
      getPersonalLibrary();
    } catch (error) {
      console.error("Erreur lors de la suppression du livre", error);
    }
  };

  return {
    library,
    searchTerm,
    setSearchTerm,
    searchResults,
    handleSearch,
    handleGetBookDetails,
    handleAddToLibrary,
    checkIfBookInLibrary,
    removeBookFromLibrary
  };
};


