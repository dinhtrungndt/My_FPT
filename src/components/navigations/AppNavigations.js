import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../user/UserContext';
import HomeNavigations from '../Home/homeNavigations';
import UserNavigation from '../user/UserNavigation';

const AppNavigation = () => {
  const {user} = useContext(UserContext);

  return (
    <NavigationContainer>
      {user ? <HomeNavigations /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
