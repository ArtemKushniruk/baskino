import React, { useState } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import useGetFilmList from '../hooks/useGetFilmList';
import FilmCard from '../components/FilmCard';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: { paddingHorizontal: 20 },
  text: {
    fontSize: 26,
  },
  input: {
    borderRadius: 12,
    height: 40,
    borderWidth: 1,
    margin: 12,
    padding: 5,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default function MainScreen() {
  const { films, loading } = useGetFilmList();
  const [text, onChangeText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search..."
      />
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../assets/loader.json')}
            animationStyle={styles.lottie}
            speed={1}
          />
        ) : (
          films.results.map((film) => <FilmCard film={film} key={film.id} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
