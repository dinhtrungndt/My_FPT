import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';
import {UserContext} from '../../user/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeTabsTop from './TabTop';

import {getNews} from '../homeService';

const NewsScreens = props => {
  const {navigation} = props;

  const {user, setUser} = useContext(UserContext);
  const dropdownRef = useRef(); // Thêm useRef vào để tham chiếu đến dropdown

  // Xử lý đăng xuất
  const handleLogout = async () => {
    // Xóa thông tin đăng nhập từ AsyncStorage
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
    } catch (error) {
      console.log('Lỗi khi xóa thông tin đăng nhập:', error);
    }

    // Đặt lại trạng thái người dùng trong UserContext thành null
    setUser(null);

    // Chuyển hướng đến màn hình đăng nhập (LoginScreen)
    navigation.navigate('LoginScreens');
  };

  const menuOptions = [
    'Thông tin cá nhân',
    'Khen thưởng/Kỷ luật',
    'Cài đặt',
    'logOut',
  ];

  const menuIcons = [
    require('../../../../media/img/account_25px.png'),
    require('../../../../media/img/love_25px.png'),
    require('../../../../media/img/settings_25px.png'),
    require('../../../../media/img/export_25px.png'),
  ];

  const renderMenuRow = (rowData, rowID, highlighted) => {
    const icon = menuIcons[rowID];

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#FF8E3C',
        }}
        onPress={() => handleMenuItemPress(rowData)}>
        <Image
          style={{
            width: 20,
            height: 20,
            marginTop: 10,
          }}
          source={icon}
        />
        {/* Bọc nội dung văn bản trong thành phần <Text> */}
        <Text style={{padding: 10, color: '#000'}}>{rowData}</Text>
      </TouchableOpacity>
    );
  };

  const handleMenuItemPress = rowData => {
    if (rowData === 'Thông tin cá nhân') {
      navigation.navigate('AccountScreens');
    }
    if (rowData === 'logOut') {
      handleLogout();
    } else {
      console.log(rowData);
    }

    // Đóng dropdown sau khi chọn lựa chọn
    dropdownRef.current.hide();
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        {/* Tài khoản */}
        <Image
          style={{
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            marginLeft: -10,
          }}
          source={require('../../../../media/img/user.png')}
        />
        <View>
          {/* Hello bee */}
          <Text
            style={{
              height: 20,
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Hello bee ✋
          </Text>
          {/* name user */}
          <Text
            style={{
              height: 20,
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 5,
              color: '#000',
            }}>
            Nguyễn Đình Trưng
          </Text>
        </View>

        {/* Điểm danh */}
        <TouchableOpacity
          onPress={() => navigation.navigate('DiemDanhScreens')}>
          <Image
            style={{top: 15, marginLeft: 85}}
            source={require('../../../../media/img/attendance.png')}
          />
        </TouchableOpacity>
        {/* Thông báo */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ThongBaoScreens')}>
          <Image
            style={{top: 15, marginLeft: 5}}
            source={require('../../../../media/img/notification.png')}
          />
        </TouchableOpacity>
        {/* 3 chấm */}
        <View>
          <ModalDropdown
            ref={dropdownRef} // Tham chiếu đến dropdown
            options={menuOptions}
            renderRow={renderMenuRow}
            defaultIndex={0}
            dropdownStyle={{
              width: 180,
              height: 190,
              marginTop: 10,
              borderWidth: 1,
              borderColor: '#FF8E3C',
              padding: 10,
            }}>
            <Image
              style={{top: 15}}
              source={require('../../../../media/img/menu_logout.png')}
            />
          </ModalDropdown>
        </View>
      </View>
      {/* gạch ngang */}
      <Text
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#A2A2A2',
          marginTop: 50,
        }}></Text>

      {/* Body */}
      <View style={styles.body}>
        {/* Search */}
        <View style={styles.search}>
          <TouchableOpacity>
            <Image
              style={{width: 20, height: 20, marginLeft: 15, marginTop: 12}}
              source={require('../../../../media/img/search.png')}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Tìm kiếm"
            style={{paddingHorizontal: 10, width: '85%'}}
          />
        </View>
        <HomeTabsTop />
      </View>
    </View>
  );
};

export default NewsScreens;

const styles = StyleSheet.create({
  // body

  search: {
    flexDirection: 'row',
    height: 45,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: -60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8E3C',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  body: {
    marginTop: 80,
  },
  // header
  header: {
    flexDirection: 'row',
    height: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  T: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
});
