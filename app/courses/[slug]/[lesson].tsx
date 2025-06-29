import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';

const dummyLessons = [
  {
    lesson_index: 0,
    name: 'Lesson 1: Getting Started',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    lesson_index: 1,
    name: 'Lesson 2: Dive Deeper',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    lesson_index: 2,
    name: 'Lesson 3: Final Touches',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
];

const CourseDetailPage = () => {
  const { slug } = useLocalSearchParams();
  const [selectedLesson, setSelectedLesson] = useState(dummyLessons[0]);
  const player = useVideoPlayer(null);
  player.replace(selectedLesson.video);
 
  const router = useRouter()
  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>{'< Back to Course'}</Text>
       </TouchableOpacity>
      <Text style={styles.title}>Course: {slug}</Text>
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        style={{ width: '100%', height: Platform.OS === 'web' ? 300 : 200 }}
        contentFit="contain"
      />

      <Text style={styles.lessonHeader}>Lessons</Text>
      <FlatList
        data={dummyLessons}
        keyExtractor={(item) => item.lesson_index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.lessonItem}
            onPress={() => setSelectedLesson(item)}
          >
            <Text style={styles.lessonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default CourseDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
    backButton: {
    marginBottom: 8,
  },
  backText: {
    color: '#007aff',
    fontSize: 16,
  },
  lessonHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  lessonItem: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  lessonText: {
    fontSize: 16,
  },
  
});
