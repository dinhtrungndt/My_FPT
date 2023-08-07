import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {getNoiBat} from '../../../homeService';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const XemThemNBScreens = props => {
  const {navigation} = props;

  const [noibat, setNoiBat] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetNoiBat = async () => {
    setLoading(true);
    const noibat = await getNoiBat();
    setNoiBat(noibat);
    setLoading(false);
  };

  useEffect(() => {
    console.log(' 18 useEffect running: ');
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    onGetNoiBat();
  }, []);

  const cutContent = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };

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
            source={require('../../../../../../media/img/loading_ly.gif')}
          />
        </View>
      ) : (
        <View style={styles.T}>
          {/* Header */}
          <View style={styles.header}>
            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                marginLeft: 15,
                marginBottom: 20,
              }}>
              {/* Back */}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{top: 5, width: 20, height: 20}}
                  source={require('../../../../../../media/img/back_25px.png')}
                />
              </TouchableOpacity>
              {/* Tài khoản */}
              <Text
                style={{
                  height: 30,
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginLeft: 110,
                  color: '#FF8E3C',
                }}>
                Nổi bật
              </Text>
            </View>
          </View>
          {/* Body */}
          <View style={styles.body}>
            {/* Danh sách chi tiết sự kiện */}
            <FlatList
              style={{height: 470}}
              showsVerticalScrollIndicator={false}
              data={noibat}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{marginBottom: 20}}
                  onPress={() =>
                    navigation.navigate('ChiTietNBScreens', {id: item._id})
                  }>
                  <Image
                    source={{uri: item.img}}
                    style={{width: '100%', height: 200, borderRadius: 5}}
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{width: 20, height: 20, marginTop: 10}}
                        source={require('../../../../../../media/img/date_skst.png')}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#000',
                          marginTop: 10,
                          marginLeft: 10,
                        }}>
                        {item.date}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{width: 20, height: 20, marginTop: 10}}
                        source={require('../../../../../../media/img/address_25px.png')}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#000',
                          marginTop: 10,
                          marginLeft: 10,
                        }}>
                        {cutContent(item.dress, 20)}
                      </Text>
                    </View>
                  </View>
                  <Text style={{color: '#000', fontSize: 14, marginTop: 10}}>
                    {cutContent(item.content, 130)}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item._id}
              onRefresh={onGetNoiBat}
              refreshing={loading}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default XemThemNBScreens;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
});
