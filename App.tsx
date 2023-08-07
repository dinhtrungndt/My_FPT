import React from 'react';
import {Text, View} from 'react-native';
import HomeNavigations from './src/components/Home/homeNavigations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserProvider} from './src/components/user/UserContext';
import {HomeProvider} from './src/components/Home/homeContext';
import AppNavigation from './src/components/navigations/AppNavigations';
import DienDanScreens from './src/components/Home/diendan';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <HomeProvider>
          <AppNavigation />
        </HomeProvider>
      </UserProvider>
    </SafeAreaView>
  );
}

export default App;
