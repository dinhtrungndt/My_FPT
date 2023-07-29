import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';

import HomeTabsTop from './TabTop';

const ScheduleScreens = props => {
  const {navigation} = props;

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
        onPress={() => console.log(rowData)}>
        <Image
          style={{
            width: 20,
            height: 20,
            marginTop: 10,
          }}
          source={icon}
        />
        <Text style={{padding: 10, color: '#000'}}>{rowData}</Text>
      </TouchableOpacity>
    );
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
        <View>
          {/* 3 chấm */}
          <View>
            <ModalDropdown
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
      <HomeTabsTop />
    </View>
  );
};

export default ScheduleScreens;

const styles = StyleSheet.create({
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
