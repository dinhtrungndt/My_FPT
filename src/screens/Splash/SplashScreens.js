import React, {useEffect} from 'react';
import {StatusBar, View, Image, StyleSheet} from 'react-native';

const SplashScreen = props => {
  const {navigation} = props;
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('LoginScreens');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.T}>
      <StatusBar hidden={false} />
      <Image
        style={{bottom: 140}}
        source={require('../../../media/img/logo_conong.png')}
      />
      <Image
        style={{bottom: 120}}
        source={require('../../../media/img/logo_text_fpt.png')}
      />
      <Image
        style={{bottom: 70}}
        source={require('../../../media/img/ungdungdanhchosinhvien.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 150,
  },
});

export default SplashScreen;
