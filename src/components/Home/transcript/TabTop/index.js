import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SelectDropdown from 'react-native-select-dropdown';

import {DataKH} from '../Data';
import {DataDS} from '../Data';
import {DataLS} from '../Data';
import {DataBD} from '../Data';

const KyHocScreen = () => {
  const countries = [
    'Fall 2023',
    'Summer 2023',
    'Spring 2023',
    'Fall 2022',
    'Summer 2022',
    'Spring 2022',
    'Fall 2021',
    'Summer 2021',
    'Spring 2021',
    'Fall 2020',
    'Summer 2020',
    'Spring 2020',
  ];

  const defaultIndex = countries.findIndex(item => item === 'Fall 2023');

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <SelectDropdown
          showsVerticalScrollIndicator={false}
          data={countries}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          dropdownTextStyle={styles.dropdownTextStyle}
          rowTextStyle={{color: '#FF8E3C'}}
          defaultButtonText={countries[defaultIndex]}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        />
      </View>
      {/* Body */}
      <View style={styles.body}>
        {/* Danh sách Kỳ Học */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DataDS}
          style={{
            marginTop: 30,
            height: 500,
          }}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: 120,
                borderWidth: 1,
                borderColor: '#FF8E3C',
                borderRadius: 5,
                marginBottom: 20,
                padding: 15,
              }}>
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#949494',
                    paddingTop: 5,
                  }}>
                  {item.score}
                  <Text style={{color: 'red'}}> {item.score2}</Text>
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#949494',
                    paddingTop: 5,
                  }}>
                  {item.status}{' '}
                  <Text style={{color: '#FF8E3C'}}>{item.status2}</Text>
                </Text>
              </View>
              <Image
                source={item.next}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const LichSuScreen = () => {
  return (
    <View>
      {/* Tiêu đề */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          borderWidth: 1,
          borderColor: '#FF8E3C',
          borderRadius: 5,
          paddingLeft: 20,
          paddingRight: 20,
          margin: 20,
          top: 20,
          shadowColor: '#000',
          shadowOpacity: 0.25,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#373737',
          }}>
          Học kỳ
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#373737',
          }}>
          Tên môn
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#373737',
          }}>
          Trạng thái
        </Text>
      </View>
      {/* Gạch ngang */}
      <Text
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#CACACA',
          top: 15,
        }}
      />
      {/* Danh sách học kỳ*/}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DataLS}
        style={{
          marginTop: 30,
          height: 500,
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 60,
              borderWidth: 1,
              borderColor: '#FF8E3C',
              borderRadius: 5,
              paddingLeft: 20,
              paddingRight: 20,
              margin: 20,
              marginBottom: 0,
              top: -20,
            }}>
            <Text
              style={{
                width: 90,
                fontSize: 14,
                color: '#000',
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                width: 120,
                fontSize: 14,
                paddingLeft: 20,
                color: '#373737',
              }}>
              {item.subject}
            </Text>
            <Text
              style={{
                width: 100,
                fontSize: 14,
                color: '#4FA474',
                paddingLeft: 20,
              }}>
              {item.status}
            </Text>
            <Image
              source={item.next}
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                right: 10,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const BangdiemScreen = () => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          margin: 20,
          borderWidth: 1,
          borderColor: '#CCCC',
          padding: 10,
          borderRadius: 5,
        }}>
        {/* Title Điểm */}
        <View>
          <Text
            style={{
              fontSize: 16,
              color: '#0842DE',
            }}>
            Điểm trung bình: 7.9
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#0842DE',
            }}>
            Tín chỉ: 75/97(Đạt/Tổng) - 0 miễn giảm
          </Text>
        </View>
        {/*  Title thống kê */}
        <Text
          style={{
            fontSize: 17,
            color: '#0842DE',
            fontWeight: 'bold',
            paddingTop: 15,
          }}>
          Thống kê
        </Text>
        {/* title thông kê */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#CCCCCC',
            paddingTop: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              width: 70,
              color: '#000',
              fontWeight: '500',
            }}>
            Tổng môn chưa học
          </Text>
          <Text style={{width: 70, color: '#000', fontWeight: '500'}}>
            Tổng môn đạt
          </Text>
          <Text style={{width: 70, color: '#000', fontWeight: '500'}}>
            Tổng môn học lại
          </Text>
          <Text style={{width: 70, color: '#000', fontWeight: '500'}}>
            Tổng môn đang học
          </Text>
        </View>
        {/* điểm thống kê */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#CCCCCC',
            paddingTop: 10,
            marginTop: 0,
          }}>
          <Text
            style={{
              width: 70,
              color: '#000',
              fontWeight: '500',
              textAlign: 'center',
            }}>
            7
          </Text>
          <Text
            style={{
              width: 70,
              color: '#000',
              fontWeight: '500',
              textAlign: 'center',
            }}>
            23
          </Text>
          <Text
            style={{
              width: 70,
              color: '#000',
              fontWeight: '500',
              textAlign: 'center',
            }}>
            0
          </Text>
          <Text
            style={{
              width: 70,
              color: '#000',
              fontWeight: '500',
              textAlign: 'center',
            }}>
            3
          </Text>
        </View>
      </View>
      {/* Body */}
      <View>
        {/* Tiêu đề */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            borderWidth: 1,
            borderColor: '#FF8E3C',
            borderRadius: 5,
            paddingLeft: 20,
            paddingRight: 20,
            margin: 20,
            marginTop: 0,
            shadowColor: '#000',
            shadowOpacity: 0.25,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#373737',
            }}>
            Học kỳ
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#373737',
            }}>
            Tên môn
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#373737',
            }}>
            Trạng thái
          </Text>
        </View>
        {/* Gạch ngang */}
        <Text
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#CACACA',
          }}
        />
        {/* Danh sách học kỳ*/}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DataBD}
          style={{
            marginTop: 30,
            height: 500,
          }}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 60,
                borderWidth: 1,
                borderColor: '#FF8E3C',
                borderRadius: 5,
                paddingLeft: 20,
                paddingRight: 20,
                margin: 20,
                marginBottom: 0,
                top: -20,
              }}>
              <Text
                style={{
                  width: 90,
                  fontSize: 14,
                  color: '#373737',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  width: 120,
                  fontSize: 14,
                  paddingLeft: 20,
                  color: '#373737',
                }}>
                {item.subject}
              </Text>
              <Text
                style={{
                  width: 100,
                  fontSize: 14,
                  color: '#373737',
                  fontWeight: 'bold',
                  paddingLeft: 30,
                }}>
                {item.status}
              </Text>
              <Image
                source={item.next}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  right: 10,
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const options = ({route}) => ({
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'KyHocScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Kỳ Học
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Kỳ Học
        </Text>
      );
    } else if (route.name === 'LichSuScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Lịch Sử
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Lịch Sử
        </Text>
      );
    } else if (route.name === 'BangdiemScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Bảng Điểm
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Bảng Điểm
        </Text>
      );
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#FF8E3C',
    height: 3,
    width: 80,
    left: 20,
  },
});

const TabTop = createMaterialTopTabNavigator();

function HomeTabsTop() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <TabTop.Navigator screenOptions={options}>
        <TabTop.Screen name="KyHocScreen" component={KyHocScreen} />
        <TabTop.Screen name="LichSuScreen" component={LichSuScreen} />
        <TabTop.Screen name="BangdiemScreen" component={BangdiemScreen} />
      </TabTop.Navigator>
    </View>
  );
}

export default HomeTabsTop;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '75%',
    height: 40,
    marginTop: 40,
    left: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF8E3C',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: '#FF8E3C',
  },
  dropdownStyle: {
    width: '71%',
    borderColor: '#FF8E3C',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownTextStyle: {
    fontSize: 16,
    color: '#FF8E3C',
    padding: 10,
  },
});
