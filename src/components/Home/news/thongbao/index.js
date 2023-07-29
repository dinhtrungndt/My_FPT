import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';

const ThongBaoScreens = props => {
  const {navigation} = props;

  const menuOptions = [
    'Thông tin cá nhân',
    'Khen thưởng/Kỷ luật',
    'Cài đặt',
    'logOut',
  ];

  const menuIcons = [
    require('../../../../../media/img/account_25px.png'),
    require('../../../../../media/img/love_25px.png'),
    require('../../../../../media/img/settings_25px.png'),
    require('../../../../../media/img/export_25px.png'),
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
        {/* Điểm danh */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginLeft: 20,
            justifyContent: 'space-between',
          }}>
          {/* Back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{top: 20, width: 20, height: 20}}
              source={require('../../../../../media/img/back_25px.png')}
            />
          </TouchableOpacity>
          {/* Tài khoản */}
          <Text
            style={{
              height: 30,
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 15,
              marginLeft: 20,
              textAlign: 'center',
              color: '#FF8E3C',
            }}>
            Thông báo
          </Text>
          <View style={{flexDirection: 'row', marginRight: 25}}>
            {/* Điểm danh */}
            <TouchableOpacity
              onPress={() => navigation.navigate('DiemDanhScreens')}>
              <Image
                style={{top: 15}}
                source={require('../../../../../media/img/attendance.png')}
              />
            </TouchableOpacity>
            {/* Thông báo */}
            <TouchableOpacity>
              <Image
                style={{top: 15, marginLeft: 5}}
                source={require('../../../../../media/img/notification.png')}
              />
            </TouchableOpacity>
            {/* 3 chấm */}
            <View>
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
                    source={require('../../../../../media/img/menu_logout.png')}
                  />
                </ModalDropdown>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ThongBaoScreens;
const styles = StyleSheet.create({
  // header
  T: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
});
