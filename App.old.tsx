import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Layout, TopNavigation, TopNavigationAction, Icon, IconRegistry } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, Button, FlatList, Image, } from 'react-native';
import * as eva from '@eva-design/eva';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import database from './database';

import AppProvider from './components/AppProvider';

import { ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

//Screens
import TicketScreen from './components/TicketScreen';
import SuperSearchScreen from './components/SuperSearchScreen';
import BackendSettingsScreen from './components/BackendSettingsScreen'


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home Screen: Wir sollten uns überlegen, was für tolle Sachen wir hier anzeigen.</Text></Layout>;
}

function MyTicketsScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>List of all open tickets assigned to current agent.</Text></Layout>;
}

function TeamTicketsScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>List of all open tickets assigned to any team, the current agent is member of, but without the ones displayed in My Tickets.</Text></Layout>;
}

function ClosedTicketsScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>List of all closed tickets assigned to any team, the current agent is member of.</Text></Layout>;
}

function UnreadNewsScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>List of all news, which have been not read yet.</Text></Layout>;
}

function AllNewsScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>List of all news.</Text></Layout>;
}


function Tickets() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Tickets" component={TicketScreen} />
      <Tab.Screen name="Team Tickets" component={TeamTicketsScreen} />
      <Tab.Screen name="Closed Tickets" component={ClosedTicketsScreen} />
    </Tab.Navigator>
  );
}

function News() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Unread News" component={UnreadNewsScreen} />
      <Tab.Screen name="All News" component={AllNewsScreen} />
    </Tab.Navigator>
  );
}

function Settings() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Backend Settings" component={BackendSettingsScreen} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{ width: 167, height: 169, marginTop: 30, marginBottom: 30 }} // modify the size as needed
          source={require('./assets/logo.png')} // replace with your image path
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}




function MainMenu() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Tickets" component={Tickets} />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="SuperSearch" component={SuperSearchScreen} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

const HomeIcon = (props) => (
  <Icon
    {...props}
    name='home-outline'
  />
);

 

export default function App() {
  return (
    <AppProvider>
    <DatabaseProvider database={database}>
    
    <ApplicationProvider {...eva} theme={eva.light}>
    <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <MainMenu />
      </NavigationContainer>
    </ApplicationProvider>
    
    </DatabaseProvider>
    </AppProvider>
  );
}
