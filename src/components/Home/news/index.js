import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';
import {UserContext} from '../../user/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeTabsTop from './TabTop';
import {EventRegister} from 'react-native-event-listeners';
import themContext from '../../../../theme/themeContext';
import Modal from 'react-native-modal';
import {getKhenThuong} from '../homeService';

const NewsScreens = props => {
  const {navigation} = props;

  const {user, setUser} = useContext(UserContext);
  const [isKhenthuong, setIsKhenThuong] = useState(false);
  const [khenThuong, setKhenThuong] = useState([]);

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
    setUser(null);

    navigation.navigate('LoginScreens');
  };

  const [darkMode, setDarkMode] = useState(false);
  const theme = useContext(themContext);

  const menuOptions = [
    'Thông tin cá nhân',
    'Khen thưởng/Kỷ luật',
    'Đăng xuất',
    <Switch
      value={darkMode}
      onValueChange={value => {
        setDarkMode(value);
        setDarkMode(value);
        EventRegister.emit('changeTheme', value);
      }}
    />,
  ];

  const menuIcons = [
    require('../../../../media/img/account_25px.png'),
    require('../../../../media/img/love_25px.png'),
    require('../../../../media/img/export_25px.png'),
  ];

  const handleSupportClick = () => {
    setIsKhenThuong(true);
  };

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
      // Model hiển thị thông tin cá nhân
      navigation.navigate('EditScreens');
    }
    if (rowData === 'Khen thưởng/Kỷ luật') {
      handleSupportClick();
    }
    if (rowData === 'Đăng xuất') {
      handleLogout();
    } else {
      console.log(rowData);
    }

    // Đóng dropdown sau khi chọn lựa chọn
    dropdownRef.current.hide();
  };

  const onGetKhenThuong = async () => {
    const res = await getKhenThuong();
    setKhenThuong(res);
  };

  useEffect(() => {
    onGetKhenThuong();
  }, []);

  return (
    <View style={[styles.T, {backgroundColor: theme.backgroundColor}]}>
      {/* header */}
      <View style={styles.header}>
        {/* Tài khoản */}
        <TouchableOpacity onPress={() => navigation.navigate('EditScreens')}>
          <Image
            style={{
              backgroundColor: '#fff',
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              marginLeft: -10,
            }}
            source={{uri: user.user.img}}></Image>
        </TouchableOpacity>

        <View>
          {/* Hello bee */}
          <Text
            style={[
              {
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 10,
              },
              {color: theme.color},
            ]}>
            Hello Bee ✋
          </Text>
          {/* name user */}
          <Text
            style={[
              {
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 5,
                color: '#000',
              },
              {color: theme.color},
            ]}>
            {user.user.name}
          </Text>
        </View>

        {/* Điểm danh */}
        <TouchableOpacity
          onPress={() => navigation.navigate('DiemDanhScreens')}>
          <Image
            style={{top: 15, marginLeft: 65}}
            source={require('../../../../media/img/attendance.png')}
          />
        </TouchableOpacity>
        {/* Thông báo */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ThongBaoScreens')}>
          <Image
            style={{top: 15, marginLeft: 10}}
            source={require('../../../../media/img/notification.png')}
          />
        </TouchableOpacity>
        {/* 3 chấm */}
        <View style={{marginLeft: 10}}>
          <ModalDropdown
            ref={dropdownRef} // Tham chiếu đến dropdown
            options={menuOptions}
            renderRow={renderMenuRow}
            showsVerticalScrollIndicator={false}
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
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate('SearchScreens')}>
          <Image
            style={{width: 20, height: 20, marginLeft: 15, marginTop: 12}}
            source={require('../../../../media/img/search.png')}
          />
          <Text
            style={{
              paddingHorizontal: 10,
              width: '85%',
              fontSize: 16,
              paddingTop: 9,
              paddingLeft: 10,
            }}>
            Tìm kiếm...
          </Text>
        </TouchableOpacity>
        <HomeTabsTop />
      </View>
      {/* Model Khen Thưởng*/}
      <Modal
        isVisible={isKhenthuong}
        onBackdropPress={() => setIsKhenThuong(false)}
        backdropColor="#000000"
        backdropOpacity={0.9}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Khen thưởng / Kỷ luật
          </Text>
          {/* Hiển thị nội dung hỗ trợ tại đây */}
          <Text style={{fontSize: 16, marginTop: 20, color: 'white'}}>
            {' '}
            Kì:
            {khenThuong.length > 0
              ? khenThuong[0].name + ': ' + khenThuong[0].khenthuong
              : 'Không có thông tin học phí'}
          </Text>
          <TouchableOpacity onPress={() => setIsKhenThuong(false)}>
            <Text
              style={{
                fontSize: 16,
                color: '#FF8E3C',
                marginTop: 20,
              }}>
              Đóng
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
