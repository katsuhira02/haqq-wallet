/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/home';
import {AuthContext} from './contexts/auth';
import {DetailsScreen} from './screens/details';
import {SplashScreen} from './screens/splash';
import {LoginScreen} from './screens/login';
import {PasswordScreen} from "./screens/password";
import {Create1Screen} from "./screens/create-1";
import {Create2Screen} from "./screens/create-2";
import {Create3Screen} from "./screens/create-3";

const Stack = createNativeStackNavigator();

export const App = () => {
  const [credentials, setCredentials] = useState({
    authorized: false,
    loaded: false,
  });

  useEffect(() => {
    Keychain.getGenericPassword().then(creds => {
      if (creds) {
        setCredentials({
          authorized: true,
          loaded: true,
          ...creds,
        });
      } else {
        setCredentials({
          authorized: false,
          loaded: true,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={credentials}>
      <NavigationContainer>
        {credentials.loaded && credentials.authorized ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen name="details" component={DetailsScreen}/>
            </Stack.Group>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="create-1" component={Create1Screen}/>
            <Stack.Screen name="create-2" component={Create2Screen}/>
            <Stack.Screen name="create-3" component={Create3Screen}/>
            <Stack.Screen name="password" component={PasswordScreen}/>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
