// ✅ Adjusted Layout Page with Sidebar Navigation (React Native)

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const dummyLessons = [
  {
    lesson_index: 0,
    name: 'Lesson 1: Getting Started',
  },
  {
    lesson_index: 1,
    name: 'Lesson 2: Dive Deeper',
  },
  {
    lesson_index: 2,
    name: 'Lesson 3: Final Touches',
  },
];

const Layout = () => {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  const handleNavigate = (index) => {
    router.push(`/course/${slug}/${index}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lessons</Text>
      <FlatList
        data={dummyLessons}
        keyExtractor={(item) => item.lesson_index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.lessonItem}
            onPress={() => handleNavigate(item.lesson_index)}
          >
            <Text style={styles.lessonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  lessonItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  lessonText: {
    fontSize: 16,
    color: '#333',
  },
});
