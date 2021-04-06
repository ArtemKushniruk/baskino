import React, { useRef, useState } from 'react';
import useSearchFilms from '../hooks/useSearchFilms';
import FilmCard from '../components/FilmCard';
import {
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  View,
  Pressable,
  Text,
} from 'react-native';
import useFonts from '../hooks/useFonts';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#181a20',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Poppins-ExtraBold',
    marginTop: 32,
    marginBottom: 24,
  },
  trending: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
    borderWidth: 1,
    borderColor: '#4150bd',
    padding: 12,
    borderRadius: 24,
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#4150bd',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  foundText: {
    color: '#5d5f64',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Poppins-ExtraBold',
    marginTop: 32,
    marginBottom: 24,
  },
  foundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const { container, text, trending, button, foundContainer, foundText } = styles;

export default function SearchScreen({navigation}) {
  const { loaded } = useFonts();
  const [search, setSearch] = useState('');
  const [films, fetchMore] = useSearchFilms(search);
  const flatlistRef = useRef();
  const { navigate } = navigation

  if (!loaded) {
    return null;
  }

  return (
    <View style={container}>
      <Text style={text}>Baskino</Text>
      <TextInput
        style={trending}
        placeholder="Search..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      {films.length !== 0 ? (
        <FlatList
          ref={flatlistRef}
          data={films}
          renderItem={({item}) => <FilmCard film={item} navigate={navigate} component='SearchDetail' />}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.9}
          onEndReached={fetchMore}
        />
      ) : (
        <View style={foundContainer}>
          <AntDesign name="search1" size={120} color={'#5d5f64'} />
          <Text style={foundText}>Nothing Found...</Text>
        </View>
      )}
      <Pressable style={button} onPress={() => flatlistRef.current.scrollToOffset({ offset: 0 })}>
        <AntDesign name="up" size={20} color="white" />
      </Pressable>
    </View>
  );
}
