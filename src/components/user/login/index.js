import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Modal,
} from 'react-native';

import React, {useState, useContext} from 'react';

import {UserContext} from '../UserContext';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure();

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    console.log('Start Google Sign-In');
    const userInfo = await GoogleSignin.signIn();
    console.log('Google Sign-In Success:', userInfo);

    // Gọi hàm onLogin để kiểm tra hoặc đăng ký tài khoản người dùng với thông tin Google
    const result = await onLogin(userInfo.user.email, 'google_password');
    console.log('result', result);

    if (result) {
      // Lưu thông tin đăng nhập vào AsyncStorage khi đăng nhập thành công
      await AsyncStorage.setItem('userEmail', userInfo.user.email);
      await AsyncStorage.setItem('userPassword', 'google_password');
    }

    navigation.navigate('HomeTabBottom');
  } catch (error) {
    console.log('Google Sign-In Error:', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Google Sign-In Cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Google Sign-In In Progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services Not Available');
    } else {
      console.log('Other Google Sign-In Error:', error.message);
    }
  }
};

const LoginScreens = props => {
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin} = useContext(UserContext);
  const [isShowPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleToggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const onLoginPress = async () => {
    // Kiểm tra nếu người dùng chưa chọn cơ sở
    if (!selectedLocation) {
      Alert.alert('Vui lòng chọn cơ sở đào tạo trước khi đăng nhập');
      return;
    }
    setLoading(true);
    const result = await onLogin(email, password);
    if (!result) {
      setLoginError(true);
      setLoginErrorText('Đăng nhập thất bại, Vui lòng kiểm tra lại !');
      showMessage({
        message: 'Login failed',
        type: 'danger',
        duration: 3000,
        icon: 'auto',
        backgroundColor: 'red',
        color: 'white',
      });
    } else {
      // Đăng nhập thành công, lưu thông tin đăng nhập vào AsyncStorage
      try {
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);
      } catch (error) {
        console.log('Lỗi khi lưu thông tin đăng nhập:', error);
      }
    }
  };

  const fptPolytechnicLocations = [
    'FPT Polytechnic Hồ Chí Minh',
    'FPT Polytechnic Tây Nguyên',
    'FPT Polytechnic Hà Nội',
    'FPT Polytechnic Đà Nẵng',
    'FPT Polytechnic Cần Thơ',
    'FPT Polytechnic Hải Phòng',
  ];

  const [isListVisible, setListVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = location => {
    setSelectedLocation(location);
    setListVisible(false);
    setDialogVisible(false);
  };

  return (
    <View>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -100,
        }}
        source={require('../../../../media/img/background.jpg')}
      />
      <View style={styles.T}>
        {/* header */}
        <View style={styles.header}>
          <Image
            style={{
              left: 100,
              width: 150,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 50,
              marginBottom: 80,
            }}
            source={require('../../../../media/img/FPT_Education.png')}
          />
        </View>
        {/* Body */}
        {/* Title đăng nhập */}
        <Text
          style={{
            fontSize: 24,
            color: '#FF8E3C',
            fontWeight: '700',
            textAlign: 'center',
            paddingTop: 30,
          }}>
          Đăng nhập
        </Text>
        {/* Chọn cơ sở đào tạo */}
        <TouchableOpacity
          style={{
            height: 45,
            marginTop: 30,
            borderWidth: 1,
            borderColor: '#FF8E3C',
            borderRadius: 20,
            padding: 10,
            zIndex: 5,
          }}>
          <TouchableOpacity onPress={handleToggleDialog}>
            <Text
              style={{
                fontSize: 16,
                color: selectedLocation ? 'red' : '#FF8E3C',
                textAlign: 'center',
              }}>
              {selectedLocation ? selectedLocation : 'Chọn cơ sở đào tạo'}
            </Text>
          </TouchableOpacity>
          {/* Add the dialog */}
          <Modal
            visible={isDialogVisible}
            animationType="side"
            transparent={true}
            onRequestClose={handleToggleDialog}>
            {/* Add the content of the dialog here */}
            <View style={styles.dialogContainer}>
              <Text style={styles.dialogTitle}>Chọn cơ sở đào tạo</Text>
              {fptPolytechnicLocations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectLocation(location)}>
                  <Text style={styles.locationItem}>{location}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF8E3C',
                  width: 120,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 120,
                  marginTop: 5,
                  textAlign: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={handleToggleDialog}>
                <Text style={styles.dialogCancelButton}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </TouchableOpacity>

        {/* email */}
        <Text
          style={{
            fontSize: 16,
            color: '#FF8E3C',
            fontWeight: '700',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Email:
        </Text>
        <Image
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            top: 353,
            left: 45,
          }}
          source={require('../../../../media/img/Email_25px.png')}
        />
        <Text
          style={{
            width: 1,
            height: 20,
            position: 'absolute',
            top: 355,
            left: 80,
            backgroundColor: '#FF8E3C',
          }}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Nhập email của bạn"
          style={[
            styles.inputField,
            {borderColor: loginError ? 'red' : '#FF8E3C'},
          ]}
        />
        {/* password */}
        <Text
          style={{
            fontSize: 16,
            color: '#FF8E3C',
            fontWeight: '700',
            paddingTop: 10,
            paddingLeft: 15,
          }}>
          Password:
        </Text>
        <Image
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            top: 435,
            left: 45,
          }}
          source={require('../../../../media/img/lock_25px.png')}
        />
        <Text
          style={{
            width: 1,
            height: 20,
            position: 'absolute',
            top: 435,
            left: 80,
            backgroundColor: '#FF8E3C',
          }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isShowPassword}
          placeholder="Nhập password của bạn"
          style={[
            styles.inputField,
            {borderColor: loginError ? 'red' : '#FF8E3C'},
          ]}
        />
        {loginError && <Text style={styles.errorText}>{loginErrorText}</Text>}
        {/* Show password */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 435,
            right: 45,
          }}
          onPress={() => setShowPassword(!isShowPassword)}>
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={
              isShowPassword
                ? require('../../../../media/img/eye_hide.png')
                : require('../../../../media/img/eye_show.png')
            }
          />
        </TouchableOpacity>

        {/* Đăng nhập */}
        <TouchableOpacity
          style={{
            height: 55,
            marginTop: 45,
            backgroundColor: '#FF8E3C',
            borderRadius: 5,
            padding: 10,
            zIndex: -1,
          }}
          onPress={onLoginPress}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              fontWeight: '600',
              lineHeight: 24,
              paddingTop: 5,
              textAlign: 'center',
              letterSpacing: 0.12,
            }}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Text>
        </TouchableOpacity>

        {/* Đăng nhập bằng google */}
        <TouchableOpacity
          onPress={signIn}
          style={{
            height: 55,
            marginTop: 30,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 10,
            borderColor: '#FF8E3C',
            borderWidth: 1,
            zIndex: -1,
          }}>
          <Image
            style={{left: 20, top: 15, position: 'absolute'}}
            source={require('../../../../media/img/google_logo.png')}
          />
          <Text
            style={{
              color: '#FF8E3C',
              textAlign: 'center',
              top: 2,
              fontWeight: '700',
              fontSize: 20,
            }}>
            Đăng nhập bằng Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreens;

const styles = StyleSheet.create({
  // body
  dialogContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF8E3C',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8E3C',
    textAlign: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  dialogCancelButton: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  inputField: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 70,
    paddingRight: 50,
    borderRadius: 20,
  },
  dropdown: {
    width: 340,
    position: 'absolute',
    top: 44,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: '#FF8E3C',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1,
  },
  locationItem: {
    fontSize: 16,
    padding: 10,
    color: '#FF8E3C',
    textAlign: 'center',
    marginBottom: 2,
  },
  // header
  T: {
    width: '100%',
    height: '100%',
    padding: 26,
  },
});
