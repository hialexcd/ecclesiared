import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import CustomDrawer from './CustomDrawer';
import CommunicationScreen from '../screens/CommunicationScreens/CommunicationScreen';
import MainPanel from '../screens/MainPanel';
import ConfigurationScreen from '../screens/ConfigurationScreens/ConfigurationScreen';
import EcCustom from './EcCustom';
import Header from './Header';
import ECStack from './ECStack';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <EcCustom {...props} />}
        screenOptions={{
          header: (props) => <Header {...props} />,
          drawerStyle: {
            width: '80%',
          },
        }}
      >
        <Drawer.Screen name="Home" component={MainPanel} />
        <Drawer.Screen name="Configuration" component={ConfigurationScreen} />
        <Drawer.Screen name="Communication" component={CommunicationScreen} />
        <Drawer.Screen name="EcStack" component={ECStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;