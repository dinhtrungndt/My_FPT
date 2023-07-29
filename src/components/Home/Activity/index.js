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

import {DataDV} from './Data';

const AccountScreens = props => {
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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginLeft: 20,
            justifyContent: 'space-between',
          }}>
          {/* Back */}
          <TouchableOpacity style={() => navigation.goBack()}>
            <Image
              style={{top: 20, width: 20, height: 20}}
              source={require('../../../../media/img/menu.png')}
            />
          </TouchableOpacity>
          {/* Tài khoản */}
          <Text
            style={{
              height: 20,
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 15,
              marginLeft: 100,
              textAlign: 'center',
              color: '#FF8E3C',
            }}>
            Tài khoản
          </Text>
          <View style={{flexDirection: 'row', marginRight: 25}}>
            {/* Điểm danh */}
            <TouchableOpacity
              onPress={() => navigation.navigate('DiemDanhScreens')}>
              <Image
                style={{top: 15, marginLeft: 60}}
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
        </View>
        {/* Ảnh */}
        <View
          style={{
            width: '100%',
            marginTop: 50,
            marginLeft: 20,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              backgroundColor: '#D5D5D5',
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
            }}
            source={require('../../../../media/img/user.png')}
          />
          <Image
            style={{
              position: 'absolute',
              top: 40,
              left: 90,
            }}
            source={require('../../../../media/img/camera_25px.png')}
          />
          <View
            style={{
              marginTop: 10,
              marginLeft: 35,
            }}>
            {/* name user */}
            <Text
              style={{
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#494949',
              }}>
              Nguyễn Đình Trưng
            </Text>
            {/* Số báo danh */}
            <Text
              style={{
                height: 20,
                fontSize: 14,
                marginTop: 5,
                color: '#494949',
              }}>
              PK02294
            </Text>
            {/* Thay đổi */}
            <TouchableOpacity>
              <Text
                style={{
                  height: 20,
                  fontSize: 14,
                  marginTop: 5,
                  textDecorationLine: 'underline',
                  color: '#FF8E3C',
                }}>
                Thay đổi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Gạch ngang */}
        <Text
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#D5D5D5',
            marginTop: 20,
          }}
        />
      </View>
      {/* body */}
      <View style={styles.Body}>
        <Text
          style={{
            height: 20,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#494949',
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 20,
            textDecorationLine: 'underline',
          }}>
          Dịch vụ
        </Text>
        {/* Danh sách dịch vụ */}
        <FlatList
          style={{
            width: '100%',
            marginTop: 30,
            marginLeft: 20,
          }}
          data={DataDV}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                width: 150,
                height: 150,
                marginRight: 20,
                marginBottom: 20,
                backgroundColor: '#fff',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#FF8E3C',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 10,
                  height: 10,
                },
                shadowOpacity: 0.51,
                shadowRadius: 13.16,
                elevation: 20,
              }}>
              <Image style={{width: 50, height: 50}} source={item.image} />
              <Text
                style={{
                  height: 20,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  marginTop: 10,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#565656',
                }}>
                {item.content}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default AccountScreens;

const styles = StyleSheet.create({
  // body
  // header
  T: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
});
