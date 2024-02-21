import {renderHook, act} from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useOnceAsyncStorage from '../../app/hooks/useOnceAsyncStorage.tsx';

// Mock AsyncStorage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useOnceAsyncStorage', () => {
  it('should retrieve data from AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('testValue');

    const {result, waitForNextUpdate} = renderHook(() =>
      useOnceAsyncStorage('testKey'),
    );

    await waitForNextUpdate();

    const [value] = result.current;
    expect(value).toBe('testValue');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  it('should save data to AsyncStorage', async () => {
    AsyncStorage.setItem.mockResolvedValueOnce();

    const {result} = renderHook(() => useOnceAsyncStorage('testKey'));
    const [, saveValue] = result.current;

    await act(async () => {
      await saveValue('newValue');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('testKey', 'newValue');
    const [value] = result.current;
    expect(value).toBe('newValue');
  });

  it('should return null initially', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error

    const {result} = renderHook(() => useOnceAsyncStorage('testKey'));
    const [value] = result.current;
    expect(value).toBeNull();
  });

  it('should retrieve data from AsyncStorage and update state', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('testValue');

    const {result, waitForNextUpdate} = renderHook(() =>
      useOnceAsyncStorage('testKey'),
    );

    await waitForNextUpdate();

    const [value] = result.current;
    expect(value).toBe('testValue');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  it('should save data to AsyncStorage and update state', async () => {
    const {result} = renderHook(() => useOnceAsyncStorage('testKey'));
    const [, saveValue] = result.current;

    await act(async () => {
      await saveValue('newValue');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('testKey', 'newValue');
    const [value] = result.current;
    expect(value).toBe('newValue');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should handle errors when retrieving data from AsyncStorage', async () => {
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('AsyncStorage Error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const {result, waitForNextUpdate} = renderHook(() =>
      useOnceAsyncStorage('testKey'),
    );

    await waitForNextUpdate();

    const [value] = result.current;
    expect(value).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching data from AsyncStorage:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore(); // Restore console.error
  });

  it('should handle errors when saving data to AsyncStorage', async () => {
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('AsyncStorage Error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const {result} = renderHook(() => useOnceAsyncStorage('testKey'));
    const [, saveValue] = result.current;

    await act(async () => {
      await saveValue('newValue');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error saving data to AsyncStorage:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore(); // Restore console.error
  });
});
