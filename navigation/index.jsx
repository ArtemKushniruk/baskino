import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import FavoritesScreem from '../screens/FavoritesScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreem}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
