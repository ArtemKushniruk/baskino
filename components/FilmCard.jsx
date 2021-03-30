import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
  },
});

export default function FilmCard({film}) {
  return (
    <View style={{ maxHeight: 400 }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
          method: 'POST',
          headers: {
            Pragma: 'no-cache',
          },
          body: 'Your Body goes here',
        }}
        style={{ width: '100%', height: '80%' }}
      />
      <Text style={styles.text}>{film.title}</Text>
    </View>
  );
}
