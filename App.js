import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './Src/Navigation/RootNavigation';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './Src/redux/RootReducer';


export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
