import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Book } from "../../types/book";
import { ProgressTabContent } from "../../components/BookDetails/ProgressTabContent";
import { AboutTabContent } from "../../components/BookDetails/AboutTabContent";
import { HeaderBookDetails } from "../../components/BookDetails/Header";

interface BookDetailScreenProps {
  route: {
    params: {
      bookDetails: Book;
      bookId :  string;
    };
  };
}

export const BookDetailScreen = ({ route }: BookDetailScreenProps) => {
  const { bookDetails, bookId } = route.params;

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
            <AboutTabContent bookDetails={bookDetails} bookId={bookId}/>
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
