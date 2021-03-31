import React from 'react';
import useGetFilmList from '../hooks/useGetFilmList';
import FilmCard from '../components/FilmCard';
import {
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  View,
} from 'react-native';
import useFonts from '../hooks/useFonst';

const renderItem = ({ item }) => {
  return <FilmCard film={item} key={item.id}/>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#181a20',
    paddingHorizontal: 20
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Poppins-ExtraBold',
    margin: 62,
  },
  trending: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
  },
});

const {container, text, trending} = styles

export default function MainScreen() {
  const {loaded} = useFonts()
  const [films, fetchMore] = useGetFilmList();

  if (!loaded) {
    return null;
  }

  return (
    <View style={container}>
      <Text style={text}>Baskino</Text>
      <Text style={trending}>Trending now</Text>
        <FlatList
          data={films}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.9}
          onEndReached={fetchMore}
        />
    </View>
  );
}
