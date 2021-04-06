import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import noActor from '../assets/no-actor-photo.jpeg';

export default function ActorCard({ actor }) {
  const source =
    actor.profile_path === null
      ? noActor
      : {
          uri: `https://image.tmdb.org/t/p/original${actor.profile_path}`,
          method: 'POST',
          headers: {
            Pragma: 'no-cache',
          },
          body: 'Your Body goes here',
        };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
      }}
    >
      <Image
        source={source}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />

      <Text
        style={{
          display: 'flex',
          color: '#fff',
          fontSize: 18,
          maxWidth: 100,
          textAlign: 'center',
        }}
      >
        {actor.name}
      </Text>
    </View>
  );
}
