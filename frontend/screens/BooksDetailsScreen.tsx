/* import React from "react";
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
*/
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Book } from "../types/book";
import { ProgressTabContent } from "../components/BookDetails/ProgressTabContent";
import { AboutTabContent } from "../components/BookDetails/AboutTabContent";
import { HeaderBookDetails } from "../components/BookDetails/Header";

interface BookDetailScreenProps {
  route: {
    params: {
      bookDetails: Book;
    };
  };
}


const handleAddToLibrary = async (book: Book) => {
  try {
    await axios.post(`${apiUrl}/personalLibrary/add`, {
      user: userData._id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors && book.volumeInfo.authors.join(", "),
      coverImageUrl:
        book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout à la bibliothèque personnelle",
      error
    );
  }
};

export const BookDetailScreen = ({ route }: BookDetailScreenProps) => {
  const { bookDetails } = route.params;

  const [activeTab, setActiveTab] = useState("About");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBookDetails bookDetails={bookDetails} />
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "About" && styles.activeTab]}
          onPress={() => handleTabChange("About")}
        >
          <Text style={styles.tabText}>À propos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Progress" && styles.activeTab]}
          onPress={() => handleTabChange("Progress")}
        >
          <Text style={styles.tabText}>Progression</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {activeTab === "About" && (
          <View style={styles.tabContent}>
            <AboutTabContent bookDetails={bookDetails} />
          </View>
        )}
        {activeTab === "Progress" && (
          <View style={styles.tabContent}>
            <ProgressTabContent />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  tabContent: {
    marginTop: 20,
  },
});
