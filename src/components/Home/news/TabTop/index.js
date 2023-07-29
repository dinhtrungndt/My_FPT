import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {DataSKST} from '../Data';
import {DataNB} from '../Data';
import {DataHT} from '../Data';
import {DataHD} from '../Data';
import {DataHP} from '../Data';
import {getNews} from '../../homeService';

const renderItem = value => {
  const {item} = value;
  return (
    <View
      style={{
        alignItems: 'center',
        width: 40,
        height: 57,
        borderRadius: 10,
        marginRight: 5,
      }}>
      <Text style={{fontSize: 12, lineHeight: 18, color: '#BCC1CD'}}>
        {item.title}
      </Text>
      <Text
        style={{fontSize: 16, lineHeight: 18, color: '#212525', marginTop: 2}}>
        {item.date}
      </Text>
    </View>
  );
};
const NewsScreen = () => {
  const [schedule, setSchedule] = useState([]);
  const ongetSchedule = async () => {
    const schedule = await getNews();
    setSchedule(schedule);
    console.log('Lichthi :48 >' + schedule);
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    ongetSchedule();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} backgroundColor="#fff">
      <FlatList
        data={schedule}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
      />
      {/* title sự kiện sắp tới */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
          Sự kiện sắp tới
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#FF8E3C'}}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      {/* list sự kiện sắp tới */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {DataSKST.map(item => (
          <View
            key={item.id}
            style={{flexDirection: 'row', marginLeft: 20, marginBottom: 20}}>
            <Image
              style={{width: 200, height: 180, borderRadius: 10}}
              source={item.image}
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
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
                {item.title}
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
                  {item.dress}
                </Text>
              </View>
              {/* Chi tiết */}
              <TouchableOpacity
                activeOpacity={0.7}
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
        <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
          Nổi bật
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#FF8E3C'}}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      {/* list nổi bật */}
      <ScrollView style={{marginBottom: 120}}>
        {DataNB.map(item => (
          <View
            key={item.id}
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
                style={{
                  width: 200,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#000',
                  marginRight: 10,
                  marginTop: 5,
                }}>
                {item.title}
              </Text>
            </View>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                left: 10,
              }}
              source={item.image}
            />
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const StudyScreen = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7E9',
      }}>
      {/* Danh sách học tập */}
      <FlatList
        data={DataHT}
        style={{marginBottom: 120}}
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
                  width: 15,
                  height: 15,
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
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7E9',
      }}>
      {/* Danh sách hoạt động */}
      <FlatList
        data={DataHD}
        style={{marginBottom: 120}}
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
                  width: 15,
                  height: 15,
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
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7E9',
      }}>
      {/* Danh sách học phí */}
      <FlatList
        data={DataHP}
        style={{marginBottom: 120}}
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
                  width: 15,
                  height: 15,
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
    if (route.name === 'NewsScreen') {
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
});

const TabTop = createMaterialTopTabNavigator();

function HomeTabsTop() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        marginTop: 10,
      }}>
      <TabTop.Navigator screenOptions={options}>
        <TabTop.Screen name="NewsScreen" component={NewsScreen} />
        <TabTop.Screen name="StudyScreen" component={StudyScreen} />
        <TabTop.Screen name="ActivityScreen" component={ActivityScreen} />
        <TabTop.Screen name="TuitionScreen" component={TuitionScreen} />
      </TabTop.Navigator>
    </View>
  );
}

export default HomeTabsTop;
