import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {
  MainScreenNav,
  SearchScreenNav,
  FavoritesScreenNav,
} from './navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer theme={{ colors: '#171920' }}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            activeTintColor: '#4150bd',
            inactiveTintColor: '#5d5f64',
            style: { backgroundColor: '#171920' },
          }}
        >
          <Tab.Screen
            name="Home"
            component={MainScreenNav}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreenNav}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="search1" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesScreenNav}
            options={{
              tabBarLabel: 'Favorites',
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="staro" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
