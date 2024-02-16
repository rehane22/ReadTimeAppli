import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const AboutTabContent = ({ bookDetails }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const userData = user?.user;

  useEffect(() => {
    axios
      .get(`${apiUrl}/book/${bookDetails._id}/average-rating`)
      .then((response) => {
        setAverageRating(response.data.averageRating);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la moyenne des notes :",
          error
        );
      });

    axios
      .get(`${apiUrl}/book/${bookDetails._id}/comments`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        );
      });
  }, []);

  const handleStarPress = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${apiUrl}/book/ratings`, {
        user: userData._id,
        book: bookDetails._id,
        rating: rating,
      });

      await axios.post(`${apiUrl}/book/comments`, {
        user: userData._id,
        book: bookDetails._id,
        content: comment,
      });

      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notation :</Text>
      {/* Afficher la moyenne des notes */}
      <Text style={styles.rating}>{averageRating}</Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <AntDesign
              name={star <= rating ? "star" : "staro"}
              size={24}
              color="orange"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Commentaires :</Text>
      <View>
        {comments.map((comment, index) => (
          <Text key={index}>{comment}</Text>
        ))}
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Ajouter un commentaire..."
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      <Button title="Soumettre" onPress={handleSubmit} />

      <Text style={styles.description}>
        {bookDetails?.volumeInfo?.description}
      </Text>
      {bookDetails?.volumeInfo?.authors && (
        <Text style={styles.authors}>
          Auteur(s): {bookDetails.volumeInfo.authors.join(", ")}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  authors: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
});
