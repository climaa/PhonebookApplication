import useOnceAsyncStorage from './useOnceAsyncStorage';

interface contactData {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  contactType: string;
}

const useAsyncStorage = (key: string): [string | null] => {
  const [storedValue, saveValue] = useOnceAsyncStorage(key);

  const addFirstContact = (formData: contactData) => {
    const dataMap = new Map();
    dataMap.set(formData.email, formData);
    let mapArray = Array.from(dataMap);
    saveValue(JSON.stringify(mapArray));
  };

  const addContact = (formData: contactData) => {
    const parsedLocalStorage = JSON.parse(storedValue);
    const dataMap = new Map(parsedLocalStorage);
    dataMap.set(formData.email, formData);
    let mapArray = Array.from(dataMap);
    saveValue(JSON.stringify(mapArray));
  };

  const getContact = (email: string) => {
    const parsedLocalStorage = JSON.parse(storedValue);
    const dataMap = new Map(parsedLocalStorage);
    return dataMap.get(email);
  };

  const deleteContact = (email: string) => {
    const parsedLocalStorage = JSON.parse(storedValue);
    const dataMap = new Map(parsedLocalStorage);
    dataMap.delete(email);
    let mapArray = Array.from(dataMap);
    saveValue(JSON.stringify(mapArray));
  };

  return {addFirstContact, addContact, getContact, deleteContact};
};

export default useAsyncStorage;
