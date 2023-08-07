import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

import {DataSKST} from '../Data';
import {DataNB} from '../Data';
import {DataHT} from '../Data';
import {DataHD} from '../Data';
import {DataHP} from '../Data';
import {getNews} from '../../homeService';
import {getNoiBat} from '../../homeService';

import XemThemSKSTScreens from './xemthemSKST';
import ChiTietSKSTScreens from './chitietSKST';
import XemThemNBScreens from './xemthemNB';
import ChiTietNBScreens from './chitietNB';
import themContext from '../../../../../theme/themeContext';
import theme from '../../../../../theme/theme';

const NewsScreen = props => {
  const {navigation} = props;
  const theme = useContext(themContext);

  const [news, setNews] = useState([]);
  const [noibat, setNoiBat] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetNews = async () => {
    setLoading(true);
    const news = await getNews();
    setNews(news);
    setLoading(false);
  };

  const onGetNoiBat = async () => {
    setLoading(true);
    const noibat = await getNoiBat();
    setNoiBat(noibat);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    onGetNews();
    onGetNoiBat();
  }, []);

  useEffect(() => {
    onGetNews();
  }, []);

  useEffect(() => {
    onGetNoiBat();
  }, []);

  // Hàm cắt chuỗi khi nội dung quá dài
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: theme.backgroundColor}}>
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
        <View>
          {/* title sự kiện sắp tới */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <Text
              style={[
                {color: '#000', fontSize: 16, fontWeight: '500'},
                {color: theme.color},
              ]}>
              Sự kiện sắp tới
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('XemThemSKSTScreens')}>
              <Text style={{color: '#FF8E3C'}}>Xem thêm</Text>
            </TouchableOpacity>
          </View>
          {/* list sự kiện sắp tới */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {news.map(item => (
              <View
                key={item._id}
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginBottom: 20,
                }}>
                <Image
                  style={{width: 200, height: 180, borderRadius: 10}}
                  source={{uri: item.img}}
                />
                <View
                  style={{
                    width: 170,
                    height: 135,
                    marginLeft: 15,
                    position: 'absolute',
                    backgroundColor: '#F7F7F7',
                    opacity: 0.8,
                    marginTop: 35,
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    {truncateText(item.title, 20)}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{width: 20, height: 20, marginTop: 10}}
                      source={require('../../../../../media/img/date_skst.png')}
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
                      source={require('../../../../../media/img/address_25px.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        marginTop: 10,
                        marginLeft: 10,
                      }}>
                      {truncateText(item.dress, 22)}
                    </Text>
                  </View>
                  {/* Chi tiết */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('ChiTietSKSTScreens', {id: item._id})
                    }
                    style={{
                      width: 157,
                      height: 30,
                      backgroundColor: '#FF8B00',
                      borderRadius: 5,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff'}}>Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          {/* title nổi bật */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
              marginTop: 0,
            }}>
            <Text
              style={[
                {color: '#000', fontSize: 16, fontWeight: '500'},
                {color: theme.color},
              ]}>
              Nổi bật
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('XemThemNBScreens')}>
              <Text style={{color: '#FF8E3C'}}>Xem thêm</Text>
            </TouchableOpacity>
          </View>
          {/* list nổi bật */}
          <ScrollView style={{marginBottom: 60}}>
            {noibat.map(item => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChiTietNBScreens', {id: item._id})
                }
                key={item._id}
                style={{
                  flexDirection: 'row',
                  margin: 20,
                  marginBottom: -5,
                  top: -20,
                  borderRadius: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#FF8E3C',
                }}>
                <View style={{width: 230}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../../../media/img/fire_25px.png')}
                      style={{width: 15, height: 15, marginTop: 2}}
                    />
                    <Text style={{fontSize: 14, color: 'red', marginLeft: 5}}>
                      {item.date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        width: 200,
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#000',
                        marginRight: 10,
                        marginTop: 5,
                      },
                      {color: theme.color},
                    ]}>
                    {truncateText(item.title, 50)}
                  </Text>
                </View>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                    left: 10,
                  }}
                  source={{uri: item.img}}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const StudyScreen = () => {
  const theme = useContext(themContext);

  return (
    <View
      style={[
        {
          width: '100%',
          height: 525,
        },
        {backgroundColor: theme.backgroundColor},
      ]}>
      {/* Danh sách học tập */}
      <FlatList
        data={DataHT}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                marginBottom: 0,
                borderRadius: 10,
                padding: 10,
                paddingLeft: 38,
                shadowColor: '#000',
                shadowOffset: {width: 10, height: 5},
                shadowOpacity: 8,
                shadowRadius: 10,
                elevation: 10,
              }}>
              <Image
                source={item.imgTit}
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 7,
                  top: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: 5,
                }}>
                {item.title}
              </Text>
              <Image
                source={item.imgND}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 10,
                  top: 75,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#444444',
                  marginBottom: 5,
                }}>
                {item.post}
              </Text>
              <Image
                source={item.imgDate}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 10,
                  top: 100,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#444444',
                  marginBottom: 5,
                }}>
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ActivityScreen = () => {
  const theme = useContext(themContext);

  return (
    <View
      style={[
        {
          width: '100%',
          height: 525,
        },
        {backgroundColor: theme.backgroundColor},
      ]}>
      {/* Danh sách hoạt động */}
      <FlatList
        data={DataHD}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                marginBottom: 0,
                borderRadius: 10,
                padding: 10,
                paddingLeft: 38,
                shadowColor: '#000',
                shadowOffset: {width: 10, height: 5},
                shadowOpacity: 8,
                shadowRadius: 10,
                elevation: 10,
              }}>
              <Image
                source={item.imgTit}
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 7,
                  top: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: 5,
                }}>
                {item.title}
              </Text>
              <Image
                source={item.imgND}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 10,
                  top: 75,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#444444',
                  marginBottom: 5,
                }}>
                {item.post}
              </Text>
              <Image
                source={item.imgDate}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 10,
                  top: 100,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#444444',
                  marginBottom: 5,
                }}>
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const TuitionScreen = () => {
  const theme = useContext(themContext);

  return (
    <View
      style={[
        {
          width: '100%',
          height: 525,
        },
        {backgroundColor: theme.backgroundColor},
      ]}>
      {/* Danh sách học phí */}
      <FlatList
        data={DataHP}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                marginBottom: 0,
                borderRadius: 10,
                padding: 10,
                paddingLeft: 38,
                shadowColor: '#000',
                shadowOffset: {width: 10, height: 5},
                shadowOpacity: 8,
                shadowRadius: 10,
                elevation: 10,
              }}>
              <Image
                source={item.imgTit}
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 7,
                  top: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: 5,
                }}>
                {item.title}
              </Text>
              <Image
                source={item.imgND}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 10,
                  top: 75,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#444444',
                  marginBottom: 5,
                }}>
                {item.post}
              </Text>
              <Image
                source={item.imgDate}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 5,
                  position: 'absolute',
                  left: 10,
                  top: 100,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#444444',
                  marginBottom: 5,
                }}>
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const options = ({route}) => ({
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'HomeStack') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Tin Tức
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          {' '}
          Tin Tức{' '}
        </Text>
      );
    } else if (route.name === 'StudyScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Học tập
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          {' '}
          Học tập{' '}
        </Text>
      );
    } else if (route.name === 'ActivityScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          {' '}
          Hoạt động{' '}
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          {' '}
          Hoạt động{' '}
        </Text>
      );
    } else if (route.name === 'TuitionScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          {' '}
          Học phí{' '}
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          {' '}
          Học phí{' '}
        </Text>
      );
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#FF8E3C',
    height: 3,
    width: 70,
    left: 10,
  },
  tabBarStyle: {
    marginTop: 10,
    backgroundColor: theme.tabTop.backgroundColor,
    borderRadius: 10,
  },
});

const TabTop = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="XemThemSKSTScreens" component={XemThemSKSTScreens} />
      <Stack.Screen name="ChiTietSKSTScreens" component={ChiTietSKSTScreens} />
      <Stack.Screen name="ChiTietNBScreens" component={ChiTietNBScreens} />
      <Stack.Screen name="XemThemNBScreens" component={XemThemNBScreens} />
    </Stack.Navigator>
  );
};

function HomeTabsTop() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        marginTop: 10,
      }}>
      <TabTop.Navigator screenOptions={options}>
        <TabTop.Screen name="HomeStack" component={HomeStack} />
        <TabTop.Screen name="StudyScreen" component={StudyScreen} />
        <TabTop.Screen name="ActivityScreen" component={ActivityScreen} />
        <TabTop.Screen name="TuitionScreen" component={TuitionScreen} />
      </TabTop.Navigator>
    </View>
  );
}

export default HomeTabsTop;
