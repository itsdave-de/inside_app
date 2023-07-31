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


function HomeScreen() {
  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home Screen, we have to define, whats displayed here.</Text></Layout>;
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
      <Tab.Screen name="My Tickets" component={MyTicketsScreen} />
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


function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Tickets" component={Tickets} />
      <Drawer.Screen name="News" component={News} />
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
