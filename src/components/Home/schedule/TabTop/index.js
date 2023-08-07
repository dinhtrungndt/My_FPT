import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import moment from 'moment';

import {DataTNHori} from '../Data';
import {getMonHoc} from '../../homeService';
import {getLichThi} from '../../homeService';
import themContext from '../../../../../theme/themeContext';
import {Calendar, LocaleConfig} from 'react-native-calendars';
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
import {Picker} from 'react-native-wheel-pick';

const ScheduleScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const theme = useContext(themContext);

  const handleToggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const handleSelectLocation = location => {
    setSelectedLocation(location);
    setListVisible(false);
    setDialogVisible(false);

    const selectedDayValue = parseInt(location.split('-')[0], 10);
    setSelectedDay(selectedDayValue.toString());
  };

  const fptPolytechnicLocations = [
    {label: '7 ngày tới', value: '7-ngay-toi'},
    {label: '14 ngày tới', value: '14-ngay-toi'},
    {label: '30 ngày tới', value: '30-ngay-toi'},
    {label: '90 ngày tới', value: '90-ngay-toi'},
    {label: '7 ngày trước', value: '7-ngay-truoc'},
    {label: '14 ngày trước', value: '14-ngay-truoc'},
    {label: '30 ngày trước', value: '30-ngay-truoc'},
    {label: '90 ngày trước', value: '90-ngay-truoc'},
  ];

  const [MonHoc, setMonHoc] = useState([]);

  const getCurrentDate = () => {
    const dateObj = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    };
    const formattedDate = dateObj.toLocaleDateString('vi-VN', options);
    return formattedDate;
  };

  useEffect(() => {
    setSelectedDay('7');
    setCurrentDate(getCurrentDate());
  }, []);

  const handleTodayButtonClick = () => {
    setSelectedDay('7');
  };

  const [loading, setLoading] = useState(false);

  const onGetMonHoc = async selectedDay => {
    setLoading(true);
    try {
      const MonHocData = await getMonHoc(selectedDay);
      console.log('MonHocData:', MonHocData);
      setMonHoc(MonHocData); // Cập nhật biến MonHoc với dữ liệu đã lấy
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleSelectDay = day => {
    setSelectedDay(day);
  };

  useEffect(() => {
    onGetMonHoc(selectedDay);
  }, [selectedDay]);

  return (
    <View style={[styles.T, {backgroundColor: theme.backgroundColor}]}>
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
          {/* Hôm nay */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                {
                  fontSize: 40,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginTop: 10,
                  color: '#000',
                },
                {color: theme.color},
              ]}>
              {currentDate?.split(',')[1]?.trim()?.split(' ')[0]}
            </Text>
            <View style={{top: 5}}>
              <Text
                style={{
                  width: 100,
                  fontSize: 16,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginTop: 10,
                  color: '#949494',
                }}>
                {currentDate.split(',')[0]}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 5,
                    color: '#949494',
                  }}>
                  {currentDate?.split(',')[1]}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    marginTop: 5,
                    color: '#949494',
                  }}>
                  {currentDate?.split(',')[2]}
                </Text>
              </View>
            </View>
            {/* Hôm nay buttom */}
            <TouchableOpacity
              onPress={handleTodayButtonClick}
              style={{
                width: 90,
                height: 40,
                borderRadius: 10,
                top: 20,
                right: 10,
                borderWidth: 1,
                borderColor: '#FF8E3C',
                position: 'absolute',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  top: 8,
                  color: '#FF8E3C',
                }}>
                Hôm nay
              </Text>
            </TouchableOpacity>
          </View>

          {/* gạch ngang */}
          <Text
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#A2A2A2',
              marginTop: 15,
            }}></Text>

          {/* Danh sách Horizontal thứ ngày */}
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 20,
              width: '100%',
              marginLeft: 10,
            }}
            data={DataTNHori}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectDay(item.ngay)}
                style={{
                  width: 52,
                  borderColor: 'red',
                  backgroundColor:
                    selectedDay === item.ngay ? '#FF8E3C' : '#fff',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    marginTop: 5,
                    textAlign: 'center',
                    color: selectedDay === item.ngay ? '#fff' : '#949494',
                  }}>
                  {item.thu}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    marginBottom: 7,
                    textAlign: 'center',
                    color: selectedDay === item.ngay ? '#fff' : '#949494',
                  }}>
                  {item.ngay}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Title Time, Course and arrange */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                marginLeft: 10,
                color: '#949494',
              }}>
              Thời gian
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                marginLeft: 30,
                color: '#949494',
              }}>
              Môn học
            </Text>
            <TouchableOpacity onPress={handleToggleDialog}>
              <Image
                style={{marginLeft: 170}}
                source={require('../../../../../media/img/sorting_25px.png')}
              />
            </TouchableOpacity>

            {/* Add the dialog */}
            <Modal
              visible={isDialogVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={handleToggleDialog}>
              <View style={styles.dialogContainer}>
                <Text style={styles.dialogTitle}>Chọn thời gian</Text>
                <Picker
                  style={{height: 200, width: '100%', marginBottom: 20}}
                  selectedValue={selectedLocation}
                  pickerData={fptPolytechnicLocations.map(item => item.label)}
                  onValueChange={value => {
                    setSelectedLocation(value);
                    handleSelectLocation(value);
                  }}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF8E3C',
                    width: 120,
                    height: 40,
                    borderRadius: 20,
                    marginLeft: 120,
                    marginTop: 5,
                    textAlign: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  onPress={handleToggleDialog}>
                  <Text style={styles.dialogCancelButton}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <View>
            {MonHoc.length > 0 && (
              <FlatList
                data={MonHoc.filter(
                  item =>
                    moment(item.ngayHoc).date().toString() === selectedDay,
                )}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={() => onGetMonHoc(selectedDay)}
                keyExtractor={item => item._id}
                style={{height: 410}}
                renderItem={({item}) => {
                  return (
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                      {/* Time */}
                      <View style={{marginLeft: 20}}>
                        <Text
                          style={[
                            {
                              fontSize: 16,
                              fontFamily: 'Roboto',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              color: '#000',
                            },
                            {color: theme.color},
                          ]}>
                          {item.timeStart}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            color: '#949494',
                          }}>
                          {item.timeEnd}
                        </Text>
                      </View>
                      {/* Course */}
                      <View
                        style={{
                          width: 270,
                          marginLeft: 35,
                          padding: 10,
                          borderRadius: 10,
                          borderWidth: 3,
                          borderColor: '#FF8E3C',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto',
                            marginLeft: 10,
                            color: '#FF8E3C',
                          }}>
                          Môn: {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            marginLeft: 10,
                            color: '#FF8E3C',
                          }}>
                          Lớp: {item.lop}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 15,
                            marginTop: 10,
                          }}>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              marginLeft: 5,
                            }}
                            source={require('../../../../../media/img/home_address_25px.png')}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Roboto',
                              color: '#FF8E3C',
                              paddingLeft: 10,
                            }}>
                            Phòng: {item.room}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 20,
                            marginTop: 5,
                          }}>
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../../../../../media/img/teacher_25px.png')}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Roboto',
                              color: '#FF8E3C',
                              paddingLeft: 10,
                            }}>
                            Gv: {item.GV}
                          </Text>
                        </View>
                        <TouchableOpacity>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              position: 'absolute',
                              right: 5,
                              bottom: 5,
                            }}
                            source={require('../../../../../media/img/forward_25px.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const TestScheduleScreen = () => {
  const theme = useContext(themContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [lichThi, setLichThi] = useState([]);
  const [loading, setLoading] = useState(false);

  const fptPolytechnicLocations = [
    {label: '7 ngày tới', value: '7-ngay-toi'},
    {label: '14 ngày tới', value: '14-ngay-toi'},
    {label: '30 ngày tới', value: '30-ngay-toi'},
    {label: '90 ngày tới', value: '90-ngay-toi'},
    {label: '7 ngày trước', value: '7-ngay-truoc'},
    {label: '14 ngày trước', value: '14-ngay-truoc'},
    {label: '30 ngày trước', value: '30-ngay-truoc'},
    {label: '90 ngày trước', value: '90-ngay-truoc'},
  ];

  const onGetLichThi = async () => {
    setLoading(true);
    const res = await getLichThi();
    setLichThi(res);
    setLoading(false);
  };

  useEffect(() => {
    onGetLichThi();
  }, []);

  const handleToggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

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
        <View style={[styles.T, {backgroundColor: theme.backgroundColor}]}>
          {/* Title Time, Course and arrange */}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                marginLeft: 10,
                color: '#949494',
              }}>
              Thời gian
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                marginLeft: 30,
                color: '#949494',
              }}>
              Môn học
            </Text>
            <TouchableOpacity onPress={handleToggleDialog}>
              <Image
                style={{marginLeft: 170}}
                source={require('../../../../../media/img/sorting_25px.png')}
              />
            </TouchableOpacity>

            {/* Add the dialog */}
            <Modal
              visible={isDialogVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={handleToggleDialog}>
              <View style={styles.dialogContainer}>
                <Text style={styles.dialogTitle}>Chọn thời gian</Text>
                <Picker
                  style={{height: 200, width: '100%', marginBottom: 20}}
                  selectedValue={selectedLocation}
                  pickerData={fptPolytechnicLocations.map(item => item.label)}
                  onValueChange={value => {
                    setSelectedLocation(value);
                    handleSelectLocation(value);
                  }}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF8E3C',
                    width: 120,
                    height: 40,
                    borderRadius: 20,
                    marginLeft: 120,
                    marginTop: 5,
                    textAlign: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  onPress={handleToggleDialog}>
                  <Text style={styles.dialogCancelButton}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          <FlatList
            data={lichThi}
            style={{marginTop: 10, height: 530}}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={() => onGetLichThi()}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  {/* Time */}
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={[
                        {
                          fontSize: 16,
                          fontFamily: 'Roboto',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: '#000',
                        },
                        {color: theme.color},
                      ]}>
                      {item.timeStart}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#949494',
                      }}>
                      {item.timeEnd}
                    </Text>
                  </View>
                  {/* Course */}
                  <View
                    style={{
                      width: 270,
                      marginLeft: 35,
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 3,
                      borderColor: '#FF8E3C',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        marginLeft: 10,
                        color: '#FF8E3C',
                      }}>
                      Môn: {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        marginLeft: 10,
                        color: '#FF8E3C',
                      }}>
                      Ca: {item.ca}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 15,
                        marginTop: 10,
                      }}>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 5,
                        }}
                        source={require('../../../../../media/img/home_address_25px.png')}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Roboto',
                          color: '#FF8E3C',
                          paddingLeft: 10,
                        }}>
                        Phòng: {item.diaDiem}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginTop: 5,
                      }}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../../media/img/teacher_25px.png')}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Roboto',
                          color: '#FF8E3C',
                          paddingLeft: 10,
                        }}>
                        Gv: {item.Gv}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          position: 'absolute',
                          right: 5,
                          bottom: 5,
                        }}
                        source={require('../../../../../media/img/forward_25px.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const options = ({route}) => ({
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'ScheduleScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Lịch Học
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Lịch Học
        </Text>
      );
    } else if (route.name === 'TestScheduleScreen') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
            textAlign: 'center',
          }}>
          Lịch Thi
        </Text>
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}>
          Lịch Thi
        </Text>
      );
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#FF8E3C',
    height: 3,
    width: 90,
    left: 50,
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
        <TabTop.Screen name="ScheduleScreen" component={ScheduleScreen} />
        <TabTop.Screen
          name="TestScheduleScreen"
          component={TestScheduleScreen}
        />
      </TabTop.Navigator>
    </View>
  );
}

export default HomeTabsTop;

const styles = StyleSheet.create({
  dialogContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF8E3C',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8E3C',
    textAlign: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  dialogCancelButton: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 20,
    flexDirection: 'row',
    width: '100%',
    height: 90,
    textAlign: 'center',
    alignItems: 'center',
  },
});
