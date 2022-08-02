import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import * as bip39 from '../bip39';

type Create2ScreenProp = CompositeScreenProps<any, any> & {password: String};

export const Create2Screen = ({navigation, password}: Create2ScreenProp) => {
  const [words, setWords] = useState('');

  const seed = useMemo(
    () => bip39.mnemonicToSeedSync(words).toString('hex'),
    [words],
  );

  console.log(words);
  console.log(seed);

  useEffect(() => {
    const result = bip39.generateMnemonic().toString();
    setWords(result);

    console.log(bip39.validateMnemonic(result));
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Create 2 Screen</Text>
      <Text>{password}</Text>
      <Text>{words}</Text>
      <Text>{seed}</Text>
      <Button
        title="Go next"
        onPress={() =>
          navigation.navigate('create-3', {
            password,
            words,
          })
        }
      />
    </View>
  );
};
