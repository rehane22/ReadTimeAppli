import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Book } from "../types/book";

interface BookDetailScreenProps {
  route: {
    params: {
      bookDetails: Book;
    };
  };
}

export const BookDetailScreen = ({ route }: BookDetailScreenProps) => {
  const { bookDetails } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: bookDetails.volumeInfo.imageLinks.thumbnail }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{bookDetails.volumeInfo.title}</Text>
        {bookDetails.volumeInfo.authors && (
          <Text style={styles.author}>
            Autheur(s):{" "}
            {bookDetails.volumeInfo.authors &&
              bookDetails.volumeInfo.authors.join(", ")}
          </Text>
        )}
        <Text style={styles.description}>
          {bookDetails.volumeInfo.description}
        </Text>
        {bookDetails.volumeInfo.publisher && (
        <Text style={styles.publisher}>
          Publié par: {bookDetails.volumeInfo.publisher}
        </Text>)}
        <Text style={styles.publishedDate}>
          Date de publication: {bookDetails.volumeInfo.publishedDate}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  publisher: {
    fontSize: 16,
    marginBottom: 5,
  },
  publishedDate: {
    fontSize: 16,
    marginBottom: 5,
  },
});
