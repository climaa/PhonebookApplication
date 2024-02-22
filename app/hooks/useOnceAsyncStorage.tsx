import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useOnceAsyncStorage = (
  key: string,
): [
  string | null,
  (value: string) => Promise<void>,
  (key: string) => Promise<void>,
  (key: string) => Promise<void>,
] => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(storedValue);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();

    // Cleanup function to avoid memory leaks
    return () => {};
  }, [key]);

  const saveValue = async (newValue: string) => {
    try {
      await AsyncStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const removeValue = async (removeKey: string) => {
    try {
      await AsyncStorage.removeItem(removeKey);
    } catch (error) {
      console.error('Error removing data to AsyncStorage:', error);
    }
  };

  const getValues = async (existingKey: string) => {
    try {
      await AsyncStorage.getItem(existingKey);
    } catch (error) {
      console.error('Error sync data to AsyncStorage:', error);
    }
  };

  return [value, saveValue, removeValue, getValues];
};

export default useOnceAsyncStorage;
