import React, { useState } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import useGetFilmList from '../hooks/useGetFilmList';
import FilmCard from '../components/FilmCard';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text
} from 'react-native';
import useFonts from '../hooks/useFonst';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#181a20'
  },
  scrollView: { paddingHorizontal: 20 },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Poppins-ExtraBold',
    margin: 62,
  },
  input: {
    borderRadius: 12,
    height: 40,
    borderWidth: 1,
    margin: 12,
    padding: 5,
    color: '#fff'
  },
  lottie: {
    width: 100,
    height: 100,
  },
  trending: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Poppins-Bold'
  }
});

export default function MainScreen() {
  useFonts()
  const { films, loading } = useGetFilmList();

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
      <Text style={styles.text}>Baskino</Text>
      <Text style={styles.trending}>Trending now</Text>
        {loading ? (
          <AnimatedLoader
            visible={true}
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
