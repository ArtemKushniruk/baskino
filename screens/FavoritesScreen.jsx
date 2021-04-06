import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilmCard from '../components/FilmCard'
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
});

const { container, text, trending, button } = styles;
export default function FavoritesScreen({ navigation }) {
  const [films, setFilms] = useState([]);
  const { navigate } = navigation
  const flatlistRef = useRef();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Favorites');
      if (value !== null) {
        setFilms(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(
    () =>
      navigation.addListener('focus', () => {
        getData();
      }),
    [navigation]
  );

  return (
    <>
    <View style={container}>
    <Text style={text}>Baskino</Text>
      <FlatList
        ref={flatlistRef}
        data={films}
        ListHeaderComponent={() => <Text style={trending}>Favorites List</Text>}
        renderItem={({ item }) => (
          <FilmCard film={item} navigate={navigate} component='FavoritesDetail' />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable
        style={button}
        onPress={() => flatlistRef.current.scrollToOffset({ offset: 0 })}
      >
        <AntDesign name="up" size={20} color="white" />
      </Pressable>
    </View>
  </>
  );
}
