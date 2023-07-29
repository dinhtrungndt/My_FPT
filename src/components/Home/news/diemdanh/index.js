import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';

import {DataDD} from './Data';

const DiemDanhScreens = props => {
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

  const diemDanh = () => {
    Alert.alert('Bạn đang ở trang điểm danh');
  };

  const [selectedDay, setSelectedDay] = useState('');

  const getScheduleForSelectedDay = selectedDay => {
    const selectedDaySchedule = DataDD.find(item => item.name === selectedDay);
    return selectedDaySchedule ? selectedDaySchedule.dataLH : [];
  };

  useEffect(() => {
    setSelectedDay('Điểm danh');
  }, []);

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
            Điểm danh
          </Text>
          <View style={{flexDirection: 'row', marginRight: 25}}>
            {/* Điểm danh */}
            <TouchableOpacity onPress={diemDanh}>
              <Image
                style={{top: 15}}
                source={require('../../../../../media/img/attendance.png')}
              />
            </TouchableOpacity>
            {/* Thông báo */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ThongBaoScreens')}>
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
      {/* Body */}
      <View style={styles.body}>
        {/* Danh sách Horizontal điểm danh */}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 30,
          }}
          data={DataDD}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setSelectedDay(item.name)}
              style={{
                width: 160,
                height: 30,
                borderColor: 'red',
                backgroundColor: selectedDay === item.name ? '#FF8E3C' : '#fff',
                borderRadius: 16,
                marginLeft: 20,
                marginBottom: 30,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  marginTop: 5,
                  textAlign: 'center',
                  color: selectedDay === item.name ? '#fff' : '#949494',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  marginBottom: 7,
                  textAlign: 'center',
                  color: selectedDay === item.name ? '#fff' : '#000',
                }}>
                {item.ngay}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* Danh sách đã điểm danh */}
        {selectedDay === 'Điểm danh' && (
          <FlatList
            data={getScheduleForSelectedDay(selectedDay)}
            showsVerticalScrollIndicator={false}
            style={{height: 600}}
            renderItem={({item}) => (
              <View
                style={{
                  width: '100%',
                  height: 70,
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
                  <Image style={{width: 50, height: 50}} source={item.image} />
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
                      color: '#949494',
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
        )}
        {/* Danh sách chưa điểm danh */}
        {selectedDay === 'Chưa điểm danh' && (
          <FlatList
            data={getScheduleForSelectedDay(selectedDay)}
            showsVerticalScrollIndicator={false}
            style={{height: 600}}
            renderItem={({item}) => (
              <View
                style={{
                  width: '100%',
                  height: 70,
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
                  <Image style={{width: 50, height: 50}} source={item.image} />
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
                      color: '#949494',
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
        )}
      </View>
    </View>
  );
};

export default DiemDanhScreens;

const styles = StyleSheet.create({
  // header
  T: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
});
