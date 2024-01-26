import React from "react";
import { View, Text } from "react-native";

export const AboutTabContent = ({ bookDetails }) => {
  return (
    <View>
      <Text>{bookDetails.volumeInfo.description}</Text>
      {bookDetails.volumeInfo.authors && (
        <Text>
          Autheur(s):{" "}
          {bookDetails.volumeInfo.authors &&
            bookDetails.volumeInfo.authors.join(", ")}
        </Text>
      )}
      
    </View>
  );
};
