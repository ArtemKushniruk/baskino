import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FilmDetailScreen from '../screens/FilmDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import MainScreen from '../screens/MainScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import useFonts from '../hooks/useFonts';

const Stack = createStackNavigator();

function MainScreenNav() {
  const { loaded } = useFonts();

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FilmDetail"
        component={FilmDetailScreen}
        options={({ route }) => ({
          headerStyle: { backgroundColor: '#181a20' },
          headerTintColor: '#fff',
          title: route.params.name,
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
          },
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

export { MainScreenNav };

function SearchScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchDetail"
        component={FilmDetailScreen}
        options={({ route }) => ({
          headerStyle: { backgroundColor: '#181a20' },
          headerTintColor: '#fff',
          title: route.params.name,
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
          },
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

export { SearchScreenNav };

function FavoritesScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FavoritesDetail"
        component={FilmDetailScreen}
        options={({ route }) => ({
          headerStyle: { backgroundColor: '#181a20' },
          headerTintColor: '#fff',
          title: route.params.name,
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
          },
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

export { FavoritesScreenNav };
