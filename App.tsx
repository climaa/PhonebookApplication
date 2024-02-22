/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ManageContactSection, ContactsList} from './app/sections';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Contact list" component={ContactsList} />
        <Tab.Screen name="New contact" component={ManageContactSection} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
