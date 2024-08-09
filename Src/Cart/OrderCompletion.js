// src/screens/OrderCompleteScreen.js
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const OrderCompletion = () => (
  <View style={styles.container}>
    <LottieView
      key="order-complete-animation"
      source={require('../Assest/success-animation.json')}
      autoPlay
      loop={false}
      style={styles.animation}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation:{
height:'100%',
width:'100%'
  },
});

export default OrderCompletion;
