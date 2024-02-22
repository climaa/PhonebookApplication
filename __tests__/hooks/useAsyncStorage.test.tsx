import {renderHook, act} from '@testing-library/react-hooks';
import useAsyncStorage from '../../app/hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useAsyncStorage', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('should add first contact to AsyncStorage', async () => {
    const {result} = renderHook(() => useAsyncStorage('contacts'));
    const formData = {
      name: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'john@example.com',
      contactType: 'Work',
    };

    await act(async () => {
      result.current.addFirstContact(formData);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([[formData.email, formData]]),
    );
  });

  it.skip('should add contact to existing AsyncStorage data', async () => {
    const existingData = [
      [
        'existing@example.com',
        {
          name: 'Existing',
          lastName: 'Contact',
          phoneNumber: '987654321',
          email: 'existing@example.com',
          contactType: 'Personal',
        },
      ],
    ];
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingData));

    const {result} = renderHook(() => useAsyncStorage('contacts'));
    const formData = {
      name: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'john@example.com',
      contactType: 'Work',
    };

    await act(async () => {
      result.current.addContact(formData);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([...formData, [formData.email, formData]]),
    );
  });

  it('should delete contact from AsyncStorage', async () => {
    const existingData = [
      [
        'existing@example.com',
        {
          name: 'Existing',
          lastName: 'Contact',
          phoneNumber: '987654321',
          email: 'existing@example.com',
          contactType: 'Personal',
        },
      ],
    ];
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingData));

    const {result} = renderHook(() => useAsyncStorage('contacts'));
    const emailToDelete = 'existing@example.com';

    await act(async () => {
      result.current.deleteContact(emailToDelete);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([]),
    );
  });
});
