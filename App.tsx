/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import useOnceAsyncStorage from './app/hooks/useOnceAsyncStorage';

import {AddContactSection, ListContacts} from './app/sections';

function App(): React.JSX.Element {
  const [storedValue] = useOnceAsyncStorage('contacts');
  const isDarkMode = useColorScheme() === 'dark';
  const [currentSection, setCurrentSection] = useState<
    'AddContactSection' | 'Home'
  >('Home');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            ...styles.top,
          }}>
          <Text style={styles.sectionTitle}>Phonebook</Text>
          {/* No existing contact records in persisted mode */}
          {storedValue === null && (
            <View style={styles.noRecordsContainer}>
              <Text style={styles.noRecords}>
                You can start with your favorite contact, please add a new
                record
              </Text>
            </View>
          )}
          {/* end comment section */}

          {/* Start sections */}
          {currentSection !== 'AddContactSection' ? (
            <Button
              title="Add contact"
              onPress={() => {
                setCurrentSection('AddContactSection');
              }}
            />
          ) : (
            <>
              <AddContactSection closeFn={() => setCurrentSection('Home')} />
              <Button
                color="gray"
                title="Close"
                onPress={() => {
                  setCurrentSection('Home');
                }}
              />
            </>
          )}
          {/* end sections */}

          {storedValue !== null && storedValue !== '{}' && (
            <View style={styles.noRecordsContainer}>
              <Text>Saved contacts</Text>
              <ListContacts myMap={storedValue} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  noRecords: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  noRecordsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  top: {
    paddingTop: 20,
  },
});

export default App;
