import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 60,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 20,
  }
});

const { button, text } = styles;

export default function TrailerCard({video}) {
  return (
    <TouchableOpacity
      style={button}
      onPress={() => {
        Linking.openURL(`https://youtu.be/${video.key}`);
      }}
    >
      <AntDesign name="youtube" size={24} color="white" />
      <Text
        style={text}
      >
        {video.name}
      </Text>
    </TouchableOpacity>
  );
}
