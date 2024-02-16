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
import { useAboutTabContent } from "./logics";
import { Book } from "../../../types/book";

interface AboutTabContentProps {
  bookDetails: Book;
  bookId : string
}

export const AboutTabContent = ({ bookDetails, bookId }: AboutTabContentProps ) => {
  const {
    apiUrl,
    rating,
    setRating,
    comment,
    setComment,
    averageRating,
    comments,
    userData,
    getCommentsAndRatings
  } = useAboutTabContent();

  useEffect(() => {
   getCommentsAndRatings(bookId);
  }, [averageRating, comment]);

  const handleStarPress = (star : number) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    try {
      if (rating > 0) {
        await axios.post(`${apiUrl}/book/ratings`, {
          user: userData._id,
          book: bookId,
          rating: rating,
        });
        setRating(0);
      }

      if (comment.trim() !== "") {
        await axios.post(`${apiUrl}/book/comments`, {
          user: userData._id,
          book: bookId,
          content: comment,
        });
        setComment("");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notation :</Text>
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
        {comments.map((comment , index) => (
          <Text key={index}>{comment.content}</Text>
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
