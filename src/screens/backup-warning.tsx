import React, {useMemo} from 'react';

import {StyleSheet} from 'react-native';

import {Color} from '@app/colors';
import {
  Button,
  ButtonVariant,
  Icon,
  InfoBlock,
  InfoBlockType,
  LottieWrap,
  PopupContainer,
  Spacer,
  Text,
} from '@app/components/ui';
import {app} from '@app/contexts/app';
import {
  useTheme,
  useTypedNavigation,
  useTypedRoute,
  useWallet,
} from '@app/hooks';
import {I18N} from '@app/i18n';
import {AppTheme} from '@app/types';

export const BackupWarningScreen = () => {
  const navigation = useTypedNavigation();
  const route = useTypedRoute<'backupWarning'>();
  const wallet = useWallet(route.params.address);
  const theme = useTheme();

  const animation = useMemo(() => {
    if (theme === AppTheme.dark) {
      return require('../../assets/animations/backup-start-dark.json');
    }

    return require('../../assets/animations/backup-start-light.json');
  }, [theme]);

  const onPressBackup = async () => {
    const password = await app.getPassword();
    const mnemonic = await wallet?.getMnemonic(password);
    navigation.navigate('backupCreate', {
      rootAddress: wallet?.rootAddress ?? '',
      mnemonic,
    });
  };

  return (
    <PopupContainer style={styles.container}>
      <Spacer style={styles.imageContainer}>
        <LottieWrap source={animation} style={styles.image} autoPlay loop />
      </Spacer>
      <Text t4 style={styles.title} i18n={I18N.backupWarningTitle} center />
      <Text
        t11
        style={styles.paragraph}
        color={Color.textBase2}
        i18n={I18N.backupWarningParagraph}
        center
      />
      <InfoBlock
        type={InfoBlockType.warning}
        style={styles.infoBlock1}
        icon={<Icon name="warning" color={Color.textYellow1} />}
        i18n={I18N.backupWarningInfoBlock1}
      />
      <InfoBlock
        type={InfoBlockType.warning}
        style={styles.infoBlock2}
        icon={<Icon name="warning" color={Color.textYellow1} />}
        i18n={I18N.backupWarningInfoBlock2}
      />
      <Button
        variant={ButtonVariant.contained}
        style={styles.submit}
        i18n={I18N.backupWarningButton}
        onPress={onPressBackup}
      />
    </PopupContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  imageContainer: {justifyContent: 'center', alignItems: 'center'},
  image: {width: 200, height: 200},
  title: {marginBottom: 4},
  paragraph: {marginBottom: 20},
  infoBlock1: {marginBottom: 20},
  infoBlock2: {marginBottom: 34},
  submit: {marginVertical: 16},
});
