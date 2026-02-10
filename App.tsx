/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import Toast from './src/components/Toast';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <Routes />
          </SafeAreaView>
        </NavigationContainer>
        <Toast position={'top'} />
      </PersistGate>
    </Provider>
  );
};

export default App;
