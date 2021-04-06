import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useGenres from '../hooks/useGenres';
import useFonts from '../hooks/useFonts';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 200,
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
    borderRadius: 36,
  },
  rating: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: '70%',
  },
  genres: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: 16,
  },
});

const { container, rating, textContainer, genres, image, text } = styles;

export default function FilmCard({ film, navigate, component }) {
  useFonts();

  return (
    <TouchableOpacity
      onPress={() => navigate(component, { id: film.id, name: film.title })}
      style={container}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
          method: 'POST',
          headers: {
            Pragma: 'no-cache',
          },
          body: 'Your Body goes here',
        }}
        style={image}
      />
      <View style={textContainer}>
        <Text style={text}>{film.title}</Text>
        <Text style={genres}>{useGenres(film.genre_ids)}</Text>
        <Text style={rating}>
          <MaterialCommunityIcons name="star" color={'yellow'} size={20} />
          {film.vote_average}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
