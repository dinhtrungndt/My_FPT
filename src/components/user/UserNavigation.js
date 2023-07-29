import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from './login';
import SplashScreen from '../../screens/Splash/SplashScreens';

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreens" component={LoginScreens} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
