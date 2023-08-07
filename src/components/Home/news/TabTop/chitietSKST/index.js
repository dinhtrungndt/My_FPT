import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {getNewsDetail} from '../../../homeService';

const ChiTietSKSTScreens = props => {
  const {navigation, route} = props;

  const {id} = route?.params;

  const [newsDetail, setNewsDetail] = useState(false);

  const onGetNewsDetail = async () => {
    if (!id) return;
    const data = await getNewsDetail(id);
    setNewsDetail(data);
  };

  useEffect(() => {
    onGetNewsDetail();
  }, [id]);

  if (!newsDetail)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  // Hàm cắt chuỗi khi nội dung quá dài
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };

  return (
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
            Chi tiết
          </Text>
        </View>
      </View>
      {/* Body */}
      <View style={styles.body}>
        {/* Danh sách chi tiết sự kiện */}
        <ScrollView style={{height: 450}} showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: newsDetail.img}}
            style={{width: '100%', height: 200, borderRadius: 5}}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {newsDetail.title}
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
                {newsDetail.date}
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
                {truncateText(newsDetail.dress, 22)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#000',
              marginTop: 10,
              fontSize: 14,
              textAlign: 'justify',
            }}>
            {newsDetail.content}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChiTietSKSTScreens;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
});
