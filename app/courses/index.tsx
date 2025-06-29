import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const dummyCourses = [
  {
    title: 'React Native for Beginners',
    slug: 'react-native-beginners',
    description: 'A complete introduction to React Native.',
  },
  {
    title: 'Advanced React Native',
    slug: 'advanced-react-native',
    description: 'Deep dive into animations and performance.',
  },
];

export default function CourseList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <FlatList
        data={dummyCourses}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => router.push(`/courses/${item.slug}`)}
          >
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  courseDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
});
