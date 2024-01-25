import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export const handleGetBookDetails = async (bookId: string) => {
  const navigation = useNavigation();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
  
      navigation.navigate('BookDetail', { bookDetails: response.data });
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du livre", error);
    }
  };
