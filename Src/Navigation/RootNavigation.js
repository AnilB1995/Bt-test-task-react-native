// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import ProductList from '../Product/ProductList';
import Cart from '../Cart/Cart';
import CheckoutScreen from '../Cart/CheckoutScreen';
import OrderCompletion from '../Cart/OrderCompletion';


const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="OrderCompletion" component={OrderCompletion} />
    </Stack.Navigator>
  );
}
