import * as React from "react";
import {  Button, Card, Text } from "react-native-paper";
import { useBooks } from "../../screens/logics/books";


const { handleGetBookDetails, handleAddToLibrary } = useBooks();
export const BookCard = (bookItem) => (
  <Card>
    nnnnn
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
    
    />
    <Card.Content>
      <Text variant="titleLarge">{bookItem.volumeInfo.title}</Text>
    </Card.Content>
    <Card.Cover
      source={{ uri: bookItem.volumeInfo.imageLinks.smallThumbnail }}
    />
    <Card.Actions>
      <Button onPress={() => handleGetBookDetails(bookItem.id)}>
        Voir les détails du livre
      </Button>
      <Button onPress={() => handleAddToLibrary(bookItem)}>
        Ajouter à la bibliothèque
      </Button>
    </Card.Actions>
  </Card>
);
