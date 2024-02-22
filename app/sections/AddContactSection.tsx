import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import useOnceAsyncStorage from '../../app/hooks/useOnceAsyncStorage';
import useAsyncStorage from '../../app/hooks/useAsyncStorage';

import {Contact} from '../types/contact';

const AddContactSection: React.FC = ({closeFn}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contactType, setContactType] = useState('Work');

  const [storedValue] = useOnceAsyncStorage('contacts');
  const {addFirstContact, addContact} = useAsyncStorage('contacts');

  const contactTypeList = [
    {key: 'Work', value: 'Work'},
    {key: 'Personal', value: 'Personal'},
    {key: 'Random', value: 'Random'},
    {key: 'Other', value: 'Other', disabled: true},
  ];

  const handleSubmit = () => {
    const formData: Contact = {
      name,
      lastName,
      phoneNumber,
      email,
      contactType,
    };

    if (storedValue === null || storedValue === '{}') {
      addFirstContact(formData);
    } else {
      addContact(formData);
    }

    closeFn();
  };

  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Add new contact</Text>
      </View>
      {/* Form */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          keyboardType="email-address"
        />

        <SelectList
          setSelected={(val: string) => setContactType(val)}
          data={contactTypeList}
          save="value"
          boxStyles={styles.selectList}
          defaultOption={contactTypeList.at(0)}
        />

        <Button title="Create" onPress={handleSubmit} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  selectList: {
    width: '90%',
  },
});

export default AddContactSection;
