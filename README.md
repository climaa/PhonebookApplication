# Phonebook simple application

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Install all the dependencies

```bash
> npm install --force
```

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

Use the interactive terminal options.

## Release APK

To create

```terminal
> cd android
> ./gradlew assembleRelease
```

Here is the file created `android/app/build/outputs/apk/app-release.apk`

## Helpful links

- [React Navigation](https://reactnavigation.org/docs) - How it works the navigation.
- [Async Storage](https://github.com/react-native-async-storage/async-storage) - Documentation about the storage data
  - HooKs files for management are `app/hooks/useAsyncStorage.tsx` & `app/hooks/useOnceAsyncStorage.tsx`.
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/) - Added unit testing.

  - Running from the terminal the command `npm run test -- --watch`.

- [Dropdown select list](https://github.com/danish1658/react-native-dropdown-select-list) - Library to create Option list in a form.
