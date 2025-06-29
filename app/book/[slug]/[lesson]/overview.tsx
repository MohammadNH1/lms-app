// ✅ Adjusted overview page (no TailwindCSS, uses dummy data)

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router, useGlobalSearchParams } from 'expo-router';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  FadeIn,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import RichtTextContent from '@/components/RichtTextContent';

const HEADER_HEIGHT = 200;
const HEADER_SCALE = 1.8;

// ✅ Dummy course and description
const dummyCourse = {
  title: 'React Native for Beginners',
  slug: 'react-native-beginners',
  image: 'https://reactnative.dev/img/header_logo.svg',
  description: [
    { type: 'paragraph', children: [{ text: 'Welcome to this beginner-friendly React Native course!' }] },
  ],
};

const Page = () => {
  const { slug } = useGlobalSearchParams();
  const { width: windowWidth } = useWindowDimensions();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [HEADER_SCALE, 1, 1]
    );

    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
    );

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  return (
    <Animated.ScrollView
      entering={FadeIn}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: 'white' }}
    >
      <View style={{ height: HEADER_HEIGHT }}>
        <Animated.Image
          source={{ uri: dummyCourse.image }}
          style={[imageAnimatedStyle, styles.headerImage, { width: windowWidth }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{dummyCourse.title}</Text>
        <View style={styles.descriptionWrapper}>
          <RichtTextContent blockContent={dummyCourse.description} />
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push(`/course/${dummyCourse.slug}/0`)}
        >
          <Text style={styles.startButtonText}>Start Course</Text>
          <Ionicons name="arrow-forward" size={24} color="white" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerImage: {
    height: HEADER_HEIGHT,
    position: 'absolute',
  },
  contentWrapper: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionWrapper: {
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#0d6c9a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
