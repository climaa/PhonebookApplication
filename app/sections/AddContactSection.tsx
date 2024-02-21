import React, {useState} from 'react';
import {Alert, Button, View, Text, TextInput, StyleSheet} from 'react-native';

const AddContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contactType, setContactType] = useState('');

  const handleSubmit = () => {
    const formData = {
      name,
      lastName,
      phoneNumber,
      email,
      contactType,
    };
    Alert.alert('Form Data', JSON.stringify(formData));
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
        <TextInput
          style={styles.input}
          value={contactType}
          onChangeText={setContactType}
          placeholder="Contact Type"
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
});

export default AddContactSection;
