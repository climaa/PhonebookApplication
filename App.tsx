/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import {ManageContactSection, ContactsList} from './app/sections';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({size}) => {
            if (route.name === 'Contact list') {
              return (
                <Image
                  source={require('./app/images/icons8-directory-80.png')}
                  style={{width: size, height: size}}
                />
              );
            }

            if (route.name === 'New contact') {
              return (
                <Image
                  source={require('./app/images/icons8-new-contact-80.png')}
                  style={{width: size, height: size}}
                />
              );
            }

            return null;
          },
        })}>
        <Tab.Screen
          component={ContactsList}
          name="Contact list"
          options={{title: 'Contact list'}}
        />
        <Tab.Screen
          component={ManageContactSection}
          name="New contact"
          options={{title: 'Add contact'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
