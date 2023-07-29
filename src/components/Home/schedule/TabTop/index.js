import React, {useState, useEffect} from 'react';
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

import {DataTNHori} from '../Data';

import {Calendar, LocaleConfig} from 'react-native-calendars';

const ScheduleScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const getScheduleForSelectedDay = selectedDay => {
    const selectedDaySchedule = DataTNHori.find(
      item => item.ngay === selectedDay,
    );
    return selectedDaySchedule ? selectedDaySchedule.dataLH : [];
  };

  // console.log('selectedDay:', selectedDay);

  useEffect(() => {
    setSelectedDay('24');
  }, []);

  const handleTodayButtonClick = () => {
    setSelectedDay('24');
  };

  return (
    <View>
      {/* Hôm nay */}
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            marginLeft: 10,
            marginTop: 10,
            color: '#000',
          }}>
          24
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
            Thứ 2
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 5,
              color: '#949494',
            }}>
            Tháng 7 Năm 2023
          </Text>
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
        style={{marginTop: 20, width: '100%', height: 80, marginLeft: 10}}
        data={DataTNHori}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelectedDay(item.ngay)}
            style={{
              width: 52,
              borderColor: 'red',
              backgroundColor: selectedDay === item.ngay ? '#FF8E3C' : '#fff',
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
        <TouchableOpacity>
          <Image
            style={{marginLeft: 170}}
            source={require('../../../../../media/img/sorting_25px.png')}
          />
        </TouchableOpacity>
      </View>

      <View>
        {selectedDay === '24' && (
          <FlatList
            data={getScheduleForSelectedDay(selectedDay)}
            showsVerticalScrollIndicator={false}
            style={{height: 355}}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                {/* Time */}
                <View style={{marginLeft: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: '#000',
                    }}>
                    {item.dateStart}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: '#949494',
                    }}>
                    {item.dateEnd}
                  </Text>
                </View>
                {/* Course */}
                <View
                  style={{
                    width: 270,
                    marginLeft: 35,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#FF8E3C',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.subject}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.class}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 15,
                      marginTop: 10,
                    }}>
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 5,
                      }}
                      source={require('../../../../../media/img/home_address_25px.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.room}
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
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.teacher}
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
                      source={item.next}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {selectedDay === '25' && (
          <FlatList
            data={getScheduleForSelectedDay(selectedDay)}
            showsVerticalScrollIndicator={false}
            style={{height: 355}}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                {/* Time */}
                <View style={{marginLeft: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: '#000',
                    }}>
                    {item.dateStart}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: '#949494',
                    }}>
                    {item.dateEnd}
                  </Text>
                </View>
                {/* Course */}
                <View
                  style={{
                    width: 270,
                    marginLeft: 35,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#FF8E3C',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.subject}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.class}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 15,
                      marginTop: 10,
                    }}>
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 5,
                      }}
                      source={require('../../../../../media/img/home_address_25px.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.room}
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
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.teacher}
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
                      source={item.next}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {selectedDay === '26' && (
          <FlatList
            data={getScheduleForSelectedDay(selectedDay)}
            showsVerticalScrollIndicator={false}
            style={{height: 355}}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                {/* Time */}
                <View style={{marginLeft: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: '#000',
                    }}>
                    {item.dateStart}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: '#949494',
                    }}>
                    {item.dateEnd}
                  </Text>
                </View>
                {/* Course */}
                <View
                  style={{
                    width: 270,
                    marginLeft: 35,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#FF8E3C',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.subject}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.class}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 17,
                      marginTop: 10,
                    }}>
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 5,
                      }}
                      source={require('../../../../../media/img/home_address_25px.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.room}
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
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.teacher}
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
                      source={item.next}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {selectedDay === '27' && (
          <FlatList
            data={getScheduleForSelectedDay(selectedDay)}
            showsVerticalScrollIndicator={false}
            style={{height: 355}}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                {/* Time */}
                <View style={{marginLeft: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: '#000',
                    }}>
                    {item.dateStart}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: '#949494',
                    }}>
                    {item.dateEnd}
                  </Text>
                </View>
                {/* Course */}
                <View
                  style={{
                    width: 270,
                    marginLeft: 35,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#FF8E3C',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.subject}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.class}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 17,
                      marginTop: 10,
                    }}>
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 5,
                      }}
                      source={require('../../../../../media/img/home_address_25px.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.room}
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
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.teacher}
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
                      source={item.next}
                    />
                  </TouchableOpacity>
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

const TestScheduleScreen = () => {
  const [selected, setSelected] = useState('');

  const filteredClasses = classes.filter(c => c.date === selected);

  const markedDates = {};
  classes.forEach(c => {
    markedDates[c.date] = {marked: true, dotColor: 'orange'};
  });

  return (
    <View style={{flex: 1}}>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
        }}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          ...markedDates,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
            selectedColor: '#FF8E3C',
          },
        }}
      />
      {selected ? (
        <View style={{flex: 1, padding: 16}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 16,
              textAlign: 'center',
            }}>
            {selected}
          </Text>
          {filteredClasses.length ? (
            filteredClasses.map((c, index) => (
              <View key={index} style={styles.title}>
                <View
                  style={{
                    width: 120,
                    height: 51,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'orange',
                    borderRadius: 10,
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 16}}>{c.location}</Text>
                </View>

                <View
                  style={{
                    width: 180,
                    height: 51,
                    marginLeft: 10,
                  }}>
                  <Text style={{fontSize: 16}} numberOfLines={1}>
                    {c.title}
                  </Text>
                  <Text style={{fontSize: 16}}>{c.idsubject}</Text>
                </View>
                <Image
                  style={{
                    width: 21,
                    height: 15,
                  }}
                  source={require('../../../../../media/img/back.png')}
                />
              </View>
            ))
          ) : (
            <Text>No classes on {selected}</Text>
          )}
        </View>
      ) : null}
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

const classes = [
  {
    date: '2023-07-25',
    idsubject: 'MOB402',
    title: 'Lập trình sever cho Android',
    location: 'Phòng T311 (Nha T) - Ca 4',
    time: '15:15 - 17:00',
  },
  {
    date: '2023-07-28',
    idsubject: 'ENT123',
    title: 'Tiếng Anh 3',
    location: 'Phòng T311 (Nha T) - Ca 5',
    time: '17:35 - 19:30',
  },
  {
    date: '2023-07-31',
    idsubject: 'MOB401',
    title: 'Lập trình Game 2D nâng cao',
    location: 'Phòng T1001 (Nha T) - Ca 4',
    time: '10:00 AM - 12:00 PM',
  },
];
