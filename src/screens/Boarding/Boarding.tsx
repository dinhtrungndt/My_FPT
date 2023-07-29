import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const BoardingScreens = (): React.JSX.Element => {
  return (
    <View style={styles.T}>
      {/* header */}
      <Image
        style={styles.boarding}
        source={require('../../../image/Boarding_Illustration.png')}
      />
      {/* body */}
      <View>
        <Text
          style={{
            color: '#7F4E1D',
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'center',
            paddingTop: 30,
          }}>
          Realax and shop
        </Text>
        <Text
          style={{
            width: 230,
            height: 65,
            textAlign: 'center',
            fontSize: 14,
            color: '#7F4E1D',
            fontWeight: '400',
            paddingTop: 10,
            alignSelf: 'center',
          }}>
          Shop online and get grocories delivered from stores to your home in as
          fast as 1 hour .
        </Text>
      </View>

      {/* footer */}
      <View>
        {/* btnSignUp */}
        <TouchableOpacity
          style={{
            width: 329,
            height: 48,
            backgroundColor: '#FF5E00',
            borderRadius: 30,
            marginTop: 50,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '700',
              paddingTop: 12,
              color: '#FFFFFF',
            }}>
            Sign up
          </Text>
        </TouchableOpacity>

        {/* btnSignIn */}

        <TouchableOpacity
          style={{
            width: 329,
            height: 48,
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            marginTop: 20,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: '#FF5E00',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '700',
              paddingTop: 12,
              color: '#FF5E00',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardingScreens;

const styles = StyleSheet.create({
  boarding: {
    width: 329.36,
    height: 362,
    marginTop: 50,
    marginLeft: 20,
  },
  T: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
});
