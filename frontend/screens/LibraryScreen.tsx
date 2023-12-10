// screens/PersonalLibraryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LibraryScreen: React.FC = () => {
  const { user } = useAuth();
  const [library, setLibrary] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (user) {
      getPersonalLibrary();
    }
  }, [user]);

  const getPersonalLibrary = async () => {
    try {
      const response = await axios.get(`${apiUrl}/personal-library/${user._id}`);
      setLibrary(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la bibliothèque personnelle', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ma Bibliothèque Personnelle</Text>
      <FlatList
        data={library}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            {/* Ajoute d'autres détails du livre ici */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  bookItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default LibraryScreen;
