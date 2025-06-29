import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Confetti, ConfettiMethods } from 'react-native-fast-confetti';
import { useEventListener } from 'expo';

// Dummy lessons
const dummyLessons = [
  {
    lesson_index: 0,
    name: 'Lesson 1: Getting Started',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    notes: [{ type: 'paragraph', children: [{ text: 'Welcome to the course!' }] }],
    documentId: 'lesson1',
    course: { documentId: 'course1' },
  },
  {
    lesson_index: 1,
    name: 'Lesson 2: Dive Deeper',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    notes: [{ type: 'paragraph', children: [{ text: 'Let’s go deeper into the topic.' }] }],
    documentId: 'lesson2',
    course: { documentId: 'course1' },
  },
];

// Dummy RichText renderer
const RichtTextContent = ({ blockContent }: any) => (
  <View>
    {blockContent?.map((block: any, index: number) => (
      <Text key={index} style={styles.noteText}>
        {block.children?.map((child: any) => child.text).join(' ')}
      </Text>
    ))}
  </View>
);

const Page = () => {
  const { slug = 'demo-course', lesson: lessonIndex = '0' } = useLocalSearchParams<{
    slug: string;
    lesson: string;
  }>();
  const router = useRouter();
  const player = useVideoPlayer(null);
  const confettiRef = useRef<ConfettiMethods>(null);

  const lesson = dummyLessons.find(l => l.lesson_index === parseInt(lessonIndex));
  const lessons = dummyLessons;
  const hasNextLesson = lessons.find(l => l.lesson_index === parseInt(lessonIndex) + 1);

  useEventListener(player, 'playToEnd', () => {
    onHandleCompleteLesson();
  });

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#0d6c9a" />
      </View>
    );
  }

  player.replace(lesson.video);

  const onHandleCompleteLesson = () => {
    const progress = Math.floor((parseInt(lessonIndex) / lessons.length) * 100);
    Alert.alert('Lesson Completed', `Progress: ${progress}%`);

    if (hasNextLesson) {
      router.push(`/course/${slug}/${parseInt(lessonIndex) + 1}`);
    } else {
      onEndCourse();
    }
  };

  const onEndCourse = () => {
    confettiRef.current?.restart();
    Alert.alert('Course Completed', '🎉 Congratulations!');

    setTimeout(() => {
      router.replace('/my-content');
    }, 4000);
  };

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && (
        <Confetti
          ref={confettiRef}
          autoplay={false}
          fallDuration={8000}
          verticalSpacing={20}
          fadeOutOnEnd
        />
      )}

      <Stack.Screen options={{ title: lesson.name }} />

      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        style={styles.video}
        contentFit="contain"
      />

      <View style={styles.notesContainer}>
        <RichtTextContent blockContent={lesson.notes} />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: hasNextLesson ? '#007AFF' : '#28a745' },
        ]}
        onPress={hasNextLesson ? onHandleCompleteLesson : onEndCourse}
      >
        <Text style={styles.buttonText}>
          {hasNextLesson ? 'Complete & Next Lesson' : 'Complete Course'}
        </Text>
        <Ionicons
          name={hasNextLesson ? 'arrow-forward' : 'checkmark-circle-outline'}
          size={24}
          color="white"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    width: '100%',
    height: Platform.OS === 'web' ? '40%' : '30%',
  },
  notesContainer: {
    flex: 1,
    padding: 16,
    minHeight: 100,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 30 : 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

