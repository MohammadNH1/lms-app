import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Dummy course details - you can replace with real data fetch
const dummyCourseDetails = {
  'react-native-beginners': {
    title: 'React Native for Beginners',
    description:
      'Learn the basics of React Native and build cross-platform mobile apps.',
    elements: ['React', 'Mobile', 'JavaScript', 'Expo'],
  },
  'advanced-react-native': {
    title: 'Advanced React Native',
    description:
      'Master advanced topics like animations, performance optimization, and native modules.',
    elements: ['Animations', 'Performance', 'Native Modules', 'Hooks'],
  },
};

export default function CourseOverview() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  const course = dummyCourseDetails[slug as string] || {
    title: 'Course Not Found',
    description: 'Sorry, we could not find the course you are looking for.',
    elements: [],
  };

  const onGetStarted = () => {
    // Navigate to the first lesson (lesson index 0)
    router.push(`/courses/${slug}/0`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>

      <View style={styles.elementsContainer}>
        {course.elements.map((el) => (
          <View key={el} style={styles.elementBadge}>
            <Text style={styles.elementText}>{el}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  description: { fontSize: 16, marginBottom: 20, color: '#444' },
  elementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  elementBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  elementText: { color: '#3b82f6', fontWeight: '600' },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

