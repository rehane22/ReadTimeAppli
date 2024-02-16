import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

import { useBooks } from "./logics/books";

const HomeScreen = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    handleSearch,
    handleGetBookDetails,
    handleAddToLibrary,
    checkIfBookInLibrary,
  } = useBooks();

  const [buttonLabel, setButtonLabel] = useState("Ajouter à la bibliothèque");
  const isInLibrary = async (bookId) => {
    const result = await checkIfBookInLibrary(bookId);
    return result.isInLibrary;
  };

  useEffect(() => {
    searchResults.forEach(async (item) => {
      const isInLib = await isInLibrary(item.id);
      setButtonLabel((prevLabels) => ({
        ...prevLabels,
        [item.id]: isInLib ? "Ajouté" : "Ajouter à la bibliothèque",
      }));
    });
  }, [searchResults]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur TonApp !</Text>
      <TextInput
        style={styles.input}
        placeholder="Rechercher des livres par titre, auteur ou genre"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Card>
              <Card.Cover
                source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
              />
              <Card.Content>
                <Text variant="titleLarge">{item.volumeInfo.title}</Text>
                <Text variant="bodyMedium">
                  {item.volumeInfo.authors &&
                    item.volumeInfo.authors.join(", ")}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleGetBookDetails(item.id)}>
                  Voir les détails du livre
                </Button>

                <Button
                  onPress={async () => {
                    const isInLib = await isInLibrary(item.id);
                    if (!isInLib) {
                      handleAddToLibrary(item);
                    }
                  }}
                >
                  {buttonLabel[item.id]}
                </Button>
              </Card.Actions>
            </Card>
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
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  resultItem: {
    width: "100%",
    padding: 10,
  },
});

export default HomeScreen;
