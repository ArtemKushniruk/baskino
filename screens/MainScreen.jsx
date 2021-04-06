import React, { useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import useGetFilmList from '../hooks/useGetFilmList';
import FilmCard from '../components/FilmCard';
import useFonts from '../hooks/useFonts';
import {
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  View,
  Pressable,
} from 'react-native';

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

export default function MainScreen({ navigation }) {
  const { loaded } = useFonts();
  const [films, fetchMore] = useGetFilmList();
  const flatlistRef = useRef();
  const { navigate } = navigation;

  if (!loaded) {
    return null;
  }

  return (
    <>
      <View style={container}>
        <Text style={text}>Baskino</Text>
        <FlatList
          ref={flatlistRef}
          data={films}
          ListHeaderComponent={() => <Text style={trending}>Trending now</Text>}
          renderItem={({ item }) => (
            <FilmCard film={item} navigate={navigate} component='FilmDetail' />
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.9}
          onEndReached={fetchMore}
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
