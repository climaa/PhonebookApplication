/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
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

import {ManageContactSection, ListContacts} from './app/sections';

function App(): React.JSX.Element {
  const [storedValue] = useOnceAsyncStorage('contacts');
  const isDarkMode = useColorScheme() === 'dark';
  const [editKey, setEditKey] = useState(null);
  const [currentSection, setCurrentSection] = useState<
    'ManageContactSection' | 'Home'
  >('Home');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const selectKeyFn = email => {
    setCurrentSection('ManageContactSection');
    setEditKey(email);
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
          {currentSection !== 'ManageContactSection' ? (
            <Button
              title="Add contact"
              onPress={() => {
                setCurrentSection('ManageContactSection');
              }}
            />
          ) : (
            <>
              <ManageContactSection
                mapKey={editKey}
                closeFn={() => setCurrentSection('Home')}
              />
              <Button
                color="gray"
                title="Close"
                onPress={() => {
                  setEditKey(null);
                  setCurrentSection('Home');
                }}
              />
            </>
          )}
          {/* end sections */}

          <View style={styles.noRecordsContainer}>
            <Text>Saved contacts</Text>
            <ListContacts selectKeyFn={selectKeyFn} myMap={storedValue} />
          </View>
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
    width: '90%',
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
