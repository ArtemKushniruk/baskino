import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './navigation'

export default function App() {
  return (
    <NavigationContainer theme={{colors: '#171920'}}>
      <BottomNavigation />
    </NavigationContainer>
  );
}