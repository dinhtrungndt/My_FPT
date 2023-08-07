import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';
import {UserContext} from '../../../user/UserContext';
import {DataTB} from './Data';

const ThongBaoScreens = props => {
  const {navigation} = props;
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingTop: 50,
          }}>
          <Image
            style={{width: 100, paddingLeft: 80}}
            source={require('../../../../../media/img/loading_ly.gif')}
          />
        </View>
      ) : (
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
                  marginLeft: 90,
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
                    style={{top: 15, marginLeft: 65}}
                    source={require('../../../../../media/img/attendance.png')}
                  />
                </TouchableOpacity>
                {/* 3 chấm */}
                <View style={{marginLeft: 10}}>
                  <ModalDropdown
                    options={menuOptions}
                    renderRow={renderMenuRow}
                    defaultIndex={0}
                    dropdownStyle={{
                      width: 180,
                      height: 220,
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
          {/* body */}
          <FlatList
            data={DataTB}
            showsVerticalScrollIndicator={false}
            style={{height: 600, marginTop: 30}}
            renderItem={({item}) => (
              <View
                style={{
                  width: '100%',
                  height: 90,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#FF8E3C',
                  borderRadius: 10,
                  marginBottom: 15,
                }}>
                {/* Avatar */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 50 / 2}}
                    source={{uri: user.user.img}}
                  />
                </View>
                {/* Title */}
                <View
                  style={{
                    width: 300,
                    height: 100,
                    marginLeft: 15,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      paddingTop: 2,
                      color: '#000',
                    }}>
                    {item.date}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Roboto',
                      color: '#949494',
                    }}>
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
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
