import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  DarkTheme,
} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {EventRegister} from 'react-native-event-listeners';
import theme from '../../../theme/theme';
import themContext from '../../../theme/themeContext';
import {DefaultTheme} from 'react-native-paper';

import NewsScreens from './news';
import LoginScreens from '../user/login';
import SplashScreen from '../../screens/Splash/SplashScreens';
import TranscriptScreens from './transcript';
import ScheduleScreens from './schedule';
import AccountScreens from './Activity';
import DiemDanhScreens from './news/diemdanh';
import ThongBaoScreens from './news/thongbao';
import DienDanScreens from './diendan';
import SearchScreens from './news/search';
import EditScreens from './Activity/editProject';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    if (route.name === 'HomeStack') {
      if (focused) {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/img/news_logo_tab_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/img/news_logo_tab.png')}
          />
        );
      }
    } else if (route.name === 'ScheduleScreens') {
      if (focused) {
        return (
          <Image
            source={require('../../../media/img/schedule_logo_click.png')}
          />
        );
      } else {
        return (
          <Image source={require('../../../media/img/schedule_logo.png')} />
        );
      }
    } else if (route.name === 'DienDanScreens') {
      if (focused) {
        return (
          <Image
            source={require('../../../media/img/diendan_bottom_tab_icon.png')}
          />
        );
      } else {
        return (
          <Image
            source={require('../../../media/img/diendan_bottom_tab_icon.png')}
          />
        );
      }
    } else if (route.name === 'TranscriptScreens') {
      if (focused) {
        return (
          <Image
            source={require('../../../media/img/transcript_logo_click.png')}
          />
        );
      } else {
        return (
          <Image source={require('../../../media/img/transcript_logo.png')} />
        );
      }
    } else if (route.name === 'StackAccount') {
      if (focused) {
        return (
          <Image
            source={require('../../../media/img/account_logo_click.png')}
          />
        );
      } else {
        return (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../media/img/account_logo.png')}
          />
        );
      }
    }
  },
  tabBarLabel: ({focused, color, size}) => {
    if (route.name === 'HomeStack') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          {' '}
          Tin Tức{' '}
        </Text>
      ) : (
        <Text> Tin Tức </Text>
      );
    } else if (route.name === 'ScheduleScreens') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          {' '}
          Lịch học{' '}
        </Text>
      ) : (
        <Text> Lịch học </Text>
      );
    } else if (route.name === 'DienDanScreens') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          {' '}
          Diễn đàn{' '}
        </Text>
      ) : (
        <Text> Diễn đàn </Text>
      );
    } else if (route.name === 'TranscriptScreens') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          {' '}
          Điểm{' '}
        </Text>
      ) : (
        <Text> Điểm </Text>
      );
    } else if (route.name === 'StackAccount') {
      return focused ? (
        <Text
          style={{
            color: '#FF8E3C',
          }}>
          {' '}
          Tiện ích{' '}
        </Text>
      ) : (
        <Text> Tiện ích </Text>
      );
    }
  },
  tabBarStyle: {
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    bottom: 10,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF8E3C',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
});

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* News */}
      <Stack.Screen name="NewsScreens" component={NewsScreens} />
      <Stack.Screen name="SearchScreens" component={SearchScreens} />
      <Stack.Screen name="DiemDanhScreens" component={DiemDanhScreens} />
      <Stack.Screen name="ThongBaoScreens" component={ThongBaoScreens} />
      <Stack.Screen name="AccountScreens" component={AccountScreens} />
      <Stack.Screen name="LoginScreens" component={LoginScreens} />
      <Stack.Screen name="EditScreens" component={EditScreens} />
      <Stack.Screen name="DienDanScreens" component={DienDanScreens} />
    </Stack.Navigator>
  );
};

const StackAccount = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccountScreens" component={AccountScreens} />
      <Stack.Screen name="EditScreens" component={EditScreens} />
    </Stack.Navigator>
  );
};

const HomeNavigations = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('changeTheme', data => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  return (
    <themContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <Tab.Navigator
        screenOptions={options}
        them={darkMode === true ? DarkTheme : DefaultTheme}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="ScheduleScreens"
          component={ScheduleScreens}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="DienDanScreens"
          component={DienDanScreens}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="TranscriptScreens"
          component={TranscriptScreens}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="StackAccount"
          component={StackAccount}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </themContext.Provider>
  );
};

export default HomeNavigations;

const styles = StyleSheet.create({});
