import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetFilmDetails from '../hooks/useGetFilmDetails';
import useFonts from '../hooks/useFonts';
import useGenres from '../hooks/useGenres';
import ActorCard from '../components/ActorCard';
import TrailerCard from '../components/TrailerCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181a20',
  },
  wrapper: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
  },
  text: {
    display: 'flex',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  desc: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    marginRight: 12,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
    borderRadius: 36,
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 20,
  },
});

const { container, wrapper, title, text, desc, item, image } = styles;

export default function FilmDetailScreen({ route }) {
  const { id } = route.params;
  const { loaded } = useFonts();
  const [details, credits, videos] = useGetFilmDetails(id);
  const [favorite, setFavorite] = useState(false);

  if (!loaded) {
    return null;
  }

  const getFavorites = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem('@Favorites'));
    const sourse = favorites.find((e) => e.id === id);
    if (sourse) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  getFavorites();

  const storeData = async (film) => {
    try {
      let favorites = JSON.parse(await AsyncStorage.getItem('@Favorites'));

      if (favorites) {
        const sourse = favorites.find((e) => e.id === film.id);
        if (sourse) {
          favorites = favorites.filter((e) => e.id !== film.id);
        } else {
          favorites.push(film);
        }
      } else {
        favorites = [film];
      }

      await AsyncStorage.setItem('@Favorites', JSON.stringify(favorites));
      getFavorites();
    } catch (e) {
      console.log(e);
    }
  };

  const ids = [];
  details.genres ? details.genres.map((genre) => ids.push(genre.id)) : null;
  const genres = useGenres(ids);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={container}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${details.backdrop_path}`,
              method: 'POST',
              headers: {
                Pragma: 'no-cache',
              },
              body: 'Your Body goes here',
            }}
            style={image}
          />
          <View style={wrapper}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={title}>{details.title}</Text>
              <TouchableOpacity onPress={() => storeData(details)}>
                <AntDesign
                  name={favorite ? 'star' : 'staro'}
                  size={24}
                  color={'#4150bd'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={desc}>Overwiew</Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  textAlign: 'right',
                  fontFamily: 'Poppins-Regular',
                }}
              >
                <MaterialCommunityIcons
                  name="star"
                  color={'yellow'}
                  size={20}
                />
                {details.vote_average}
              </Text>
            </View>
            <Text style={text}>{details.overview}</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#fff',
                marginVertical: 10,
              }}
            />
            <View style={item}>
              <Text style={desc}>Released:</Text>
              <Text style={text}>{details.release_date}</Text>
            </View>
            <View style={item}>
              <Text style={desc}>Genre:</Text>
              <Text style={{ ...text, maxWidth: '70%' }}>{genres}</Text>
            </View>
            <Text style={desc}>Actors</Text>
            <ScrollView directionalLockEnabled={false} horizontal={true}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                {credits.cast
                  ? credits.cast.map((actor) => (
                      <ActorCard actor={actor} key={actor.id} />
                    ))
                  : null}
              </View>
            </ScrollView>
            <Text style={desc}>Trailers</Text>
            {videos
              ? videos.map((video) => (
                  <TrailerCard video={video} key={video.id} />
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
