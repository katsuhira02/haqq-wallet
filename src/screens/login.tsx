import React from 'react';
import {Button, Text, View} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';

type LoginScreenProp = CompositeScreenProps<any, any>;

export const LoginScreen = ({navigation}: LoginScreenProp) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <Button
        title="Create new wallet"
        onPress={() => navigation.navigate('create-1')}
      />
    </View>
  );
};
