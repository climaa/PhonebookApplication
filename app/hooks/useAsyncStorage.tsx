import useOnceAsyncStorage from './useOnceAsyncStorage';
import type {Contact} from '../types/contact';

interface UseAsyncStorage {
  addFirstContact: (formData: Contact) => void;
  addContact: (formData: Contact) => void;
  getContact: (email: string) => Contact | undefined | unknown;
  deleteContact: (email: string) => void;
}

const useAsyncStorage = (key: string): UseAsyncStorage => {
  const [storedValue, saveValue] = useOnceAsyncStorage(key);

  const addFirstContact = (formData: Contact) => {
    const dataMap = new Map();
    dataMap.set(formData.email, formData);
    let mapArray = Array.from(dataMap);
    saveValue(JSON.stringify(mapArray));
  };

  const addContact = (formData: Contact) => {
    if (storedValue !== null) {
      const parsedLocalStorage = JSON.parse(storedValue);
      const dataMap = new Map(parsedLocalStorage);
      dataMap.set(formData.email, formData);
      let mapArray = Array.from(dataMap);
      saveValue(JSON.stringify(mapArray));
    }
  };

  const getContact = (email: string) => {
    if (storedValue !== null) {
      const parsedLocalStorage = JSON.parse(storedValue);
      const dataMap = new Map(parsedLocalStorage);
      return dataMap.get(email);
    }
  };

  const deleteContact = (email: string) => {
    if (storedValue !== null) {
      const parsedLocalStorage = JSON.parse(storedValue);
      const dataMap = new Map(parsedLocalStorage);
      dataMap.delete(email);
      let mapArray = Array.from(dataMap);
      saveValue(JSON.stringify(mapArray));
    }
  };

  return {addFirstContact, addContact, getContact, deleteContact};
};

export default useAsyncStorage;
