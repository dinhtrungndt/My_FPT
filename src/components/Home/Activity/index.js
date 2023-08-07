import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';

import {getHocPhi} from '../homeService';
import {DataDV} from './Data';
import {UserContext} from '../../user/UserContext';
import themContext from '../../../../theme/themeContext';

const AccountScreens = props => {
  const {navigation} = props;
  const theme = useContext(themContext);
  const {user} = useContext(UserContext);
  const [hocPhi, setHocPhi] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

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

  const handleServiceClick = item => {
    const email = 'CTSVfpt@fpt.edu.vn';
    const subject = `Dịch vụ ${item.title}`;

    Linking.openURL(`mailto:${email}?subject=${subject}`);
  };

  const handleTuitionClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onGetHocPhi = async () => {
    const res = await getHocPhi();
    setHocPhi(res);
  };

  useEffect(() => {
    onGetHocPhi();
  }, []);

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

  const handleSMSClick = () => {
    const phoneNumber = '0889541507';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSupportClick = () => {
    setIsSupportModalVisible(true);
  };

  return (
    <View style={[styles.T, {backgroundColor: theme.backgroundColor}]}>
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
                  source={require('../../../../media/img/menu_logout.png')}
                />
              </ModalDropdown>
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
            source={{uri: user.user.img}}
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
              style={[
                {
                  height: 20,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#494949',
                },
                {color: theme.color},
              ]}>
              {user.user.name}
            </Text>
            {/* Số báo danh */}
            <Text
              style={[
                {
                  height: 20,
                  fontSize: 14,
                  marginTop: 5,
                  color: '#494949',
                },
                {color: theme.color},
              ]}>
              {user.user.sbd}
            </Text>
            {/* Thay đổi */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditScreens', {_id: user.user.id})
              }>
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
          style={[
            {
              height: 20,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#494949',
              textAlign: 'center',
              marginTop: 40,
              marginBottom: 20,
              textDecorationLine: 'underline',
            },
            {color: theme.color},
          ]}>
          Dịch vụ
        </Text>

        {/* Danh sách hàng 1 */}
        <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 25}}>
          {/* Dịch vụ trực tuyết */}
          <TouchableOpacity
            onPress={handleServiceClick}
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
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../../media/img/internet_25px.png')}
            />
            <Text
              style={{
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 10,
              }}>
              Dịch vụ trực tuyến
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#565656',
              }}>
              Sử dụng dịch vụ trực tuyến
            </Text>
          </TouchableOpacity>

          {/* Học phí */}
          <TouchableOpacity
            onPress={handleTuitionClick}
            style={{
              width: 150,
              height: 150,
              marginRight: 20,
              marginLeft: 10,
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
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../../media/img/wallet_25px.png')}
            />
            <Text
              style={{
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 10,
              }}>
              Học phí
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#565656',
              }}>
              Thông tin học phí
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách hàng 2 */}
        <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 25}}>
          {/* Thông tin SMS */}
          <TouchableOpacity
            onPress={handleSMSClick}
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
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../../media/img/phone_50px.png')}
            />
            <Text
              style={{
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 10,
              }}>
              SMS
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#565656',
              }}>
              Thông tin SMS
            </Text>
          </TouchableOpacity>

          {/* Hỗ trợ */}
          <TouchableOpacity
            onPress={handleSupportClick}
            style={{
              width: 150,
              height: 150,
              marginRight: 20,
              marginLeft: 10,
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
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../../media/img/ask_question_50px.png')}
            />
            <Text
              style={{
                height: 20,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 10,
              }}>
              Hỗ trợ
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#565656',
              }}>
              Hỗ trợ trực tuyến
            </Text>
          </TouchableOpacity>
        </View>
        {/* Model của học phí */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          backdropColor="#000000"
          backdropOpacity={0.9}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Chi tiết học phí
            </Text>
            <Text style={{fontSize: 16, marginTop: 20, color: 'white'}}>
              {' '}
              Kì:
              {hocPhi.length > 0
                ? hocPhi[0].name + ': ' + hocPhi[0].hocPhi
                : 'Không có thông tin học phí'}
            </Text>
            <TouchableOpacity onPress={closeModal}>
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

        {/* Model của hỗ trợ */}
        <Modal
          isVisible={isSupportModalVisible}
          onBackdropPress={() => setIsSupportModalVisible(false)}
          backdropColor="#000000"
          backdropOpacity={0.9}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Hỗ trợ
            </Text>
            {/* Hiển thị nội dung hỗ trợ tại đây */}
            <Text
              style={{
                fontSize: 16,
                marginTop: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              Bạn cần hỗ trợ gì thì liên hệ Dịch vụ hoặc SMS nhé !
            </Text>
            <TouchableOpacity onPress={() => setIsSupportModalVisible(false)}>
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
