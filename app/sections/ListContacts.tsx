import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import useAsyncStorage from '../../app/hooks/useAsyncStorage';
import {Contact} from '../types/contact';

interface Props {
  myMap: Map<string, string> | null;
}

const ListContacts: React.FC<Props> = ({myMap}) => {
  const {deleteContact} = useAsyncStorage('contacts');
  let storedArray = JSON.parse(myMap);
  let storedMap = new Map(storedArray);

  return (
    <View style={styles.container}>
      {Array.from(storedMap.entries()).map(([key, obj], index) => {
        const {name, lastName, email, phoneNumber, contactType}: Contact = obj;

        const backgroundStyle = {
          backgroundColor: index % 2 ? {} : styles.grey,
        };

        return (
          <View key={key} style={{...styles.column, ...backgroundStyle}}>
            <View style={styles.row}>
              <Text style={styles.valueBold}>Full name: </Text>
              <Text style={styles.value}>{name}</Text>
              <Text style={styles.value}>{lastName}</Text>
              <Text style={styles.valueBold}>Phone number: </Text>
              <Text style={styles.value}>{phoneNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.valueBold}>Type: </Text>
              <Text style={styles.value}>{contactType}</Text>
              <Text style={styles.valueBold}>Email: </Text>
              <Text style={styles.value}>{email}</Text>
              <TouchableOpacity onPress={() => Alert.alert('edit')}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../images/icons8-edit-64.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(email)}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../images/icons8-trash-100.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grey: {
    backgroundColor: 'grey',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 10,
  },
  item: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  value: {
    marginLeft: 5,
  },
  valueBold: {
    fontWeight: '600',
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
  },
  column: {
    width: '90%',
  },
});

export default ListContacts;
