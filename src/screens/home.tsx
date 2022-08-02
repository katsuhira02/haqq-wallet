import {CompositeScreenProps} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth';

type HomeScreenProp = CompositeScreenProps<any, any>;

export const HomeScreen = ({navigation}: HomeScreenProp) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('details')}
      />
    </View>
  );
};
