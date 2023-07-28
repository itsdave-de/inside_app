import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { ApplicationProvider } from '@ui-kitten/components';
import { Text } from 'react-native';
import * as eva from '@eva-design/eva';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MenuIcon = () => <Ionicons name="menu" size={24} color="black" />;


function Screen1() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Screen 1</Text></Layout>;
}

function Screen2() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Screen 2</Text></Layout>;
}

function Screen3() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Screen 3</Text></Layout>;
}

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Screen1" component={Screen1} />
      <Tab.Screen name="Screen2" component={Screen2} />
      <Tab.Screen name="Screen3" component={Screen3} />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="MyTab">
      <Drawer.Screen name="MyTab" component={MyTab} />
      <Drawer.Screen name="MyTab2" component={MyTab} />
      {/* Add more screens here if needed */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
       
        <MyDrawer />
      </NavigationContainer>
    </ApplicationProvider>
  );
}
