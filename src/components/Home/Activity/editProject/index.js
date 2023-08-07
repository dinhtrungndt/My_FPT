import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from 'react-native';

import React, {useState, useCallback, useEffect, useContext} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {addProject} from '../../homeService';
import {UserContext} from '../../../user/UserContext';
import {editUser} from '../../../user/UserService';
import {uploadImage} from '../../homeService';

const EditScreens = props => {
  const {navigation} = props;

  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [sbd, setSbd] = useState('');
  const [image, setImage] = useState(null);

  const [imagePath, setImagePath] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const {user} = useContext(UserContext);

  const takePhoto = useCallback(async response => {
    if (response.didCancel) return;
    if (response.errorCode) return;
    if (response.errorMessage) return;
    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      setImage(asset.uri);
      setModalVisible(false);
      // upload image
      const formData = new FormData();
      formData.append('login', {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      const data = await uploadImage(formData);
      console.log(data.url);
      setImagePath(data.url);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhoto);
  }, []);

  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchImageLibrary(options, takePhoto);
  }, []);

  const save = useCallback(async () => {
    const data = {
      name: name,
      sbd: sbd,
      img: imagePath,
    };

    try {
      setLoading(true);
      const response = await editUser(user.user.id, data);
      console.log(response);
      if (response.error) {
        Alert.alert('Cập nhật thất bại');
      } else {
        Alert.alert('Cập nhật thành công');
        navigation.navigate('AccountScreens');
      }
    } catch (error) {
      setLoading(true);
      navigation.replace('AccountScreens');
    } finally {
      setLoading(false);
    }
  }, [name, sbd, imagePath, navigation, user.user.id]);

  return (
    <View>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Image
            style={{width: 100, paddingLeft: 80}}
            source={require('../../../../../media/img/loading_ly.gif')}
          />
        </View>
      ) : (
        <View style={styles.T}>
          {/* header  */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../../../media/img/edit_profile_no.png')}
              />
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '400'}}>
              Chỉnh sửa ảnh đại diện
            </Text>
            <TouchableOpacity onPress={save}>
              <Image
                style={{right: 5}}
                source={require('../../../../../media/img/edit_profile_yes.png')}
              />
            </TouchableOpacity>
          </View>

          {/* body  */}
          <View style={styles.body}>
            {/* img */}
            {user.user.img ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {!imagePath ? (
                  <Image
                    source={{uri: user.user.img}}
                    style={[
                      styles.up_news_img,
                      {width: 160, height: 160, borderRadius: 500, left: 100},
                    ]}
                  />
                ) : (
                  <Image
                    source={{uri: imagePath}}
                    style={[
                      styles.up_news_img,
                      {width: 160, height: 160, borderRadius: 500, left: 100},
                    ]}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  style={[
                    styles.up_news_img,
                    {width: 160, height: 160, borderRadius: 500, left: 100},
                  ]}
                  source={require('../../../../../media/img/avatar.png')}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                width: 300,
                height: 50,
                backgroundColor: '#D3D3D3',
                borderRadius: 10,
                left: 30,
                fontSize: 17,
                top: 50,
                color: '#585858',
                paddingTop: 13,
                textAlign: 'center',
                borderWidth: 1,
              }}>
              {user.user.name}
            </Text>
            <Text
              style={{
                width: 300,
                height: 50,
                backgroundColor: '#D3D3D3',
                borderRadius: 10,
                left: 30,
                fontSize: 17,
                top: 80,
                color: '#585858',
                paddingTop: 13,
                textAlign: 'center',
                borderWidth: 1,
              }}>
              {user.user.email}
            </Text>
            <Text
              style={{
                width: 300,
                height: 50,
                backgroundColor: '#D3D3D3',
                borderRadius: 10,
                left: 30,
                fontSize: 17,
                top: 110,
                color: '#585858',
                paddingTop: 13,
                textAlign: 'center',
                borderWidth: 1,
              }}>
              {user.user.sbd}
            </Text>
          </View>

          {/* modal  */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text onPress={openCamera}>Chụp ảnh</Text>
                <Text onPress={openLibrary}>Chọn ảnh</Text>
                <Text onPress={() => setModalVisible(false)}>Cancel</Text>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default EditScreens;

const styles = StyleSheet.create({
  // modal
  modalView: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // body
  body: {
    marginTop: 50,
  },

  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
  },
  T: {
    width: '100%',
    height: '100%',
    padding: 24,
  },
});
