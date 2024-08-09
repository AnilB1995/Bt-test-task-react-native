import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const CheckoutScreen = ({route, navigation}) => {
  const {totalPrice, cartItemsArray} = route.params; 

  const handleOrderSubmit = () => {
    navigation.navigate('OrderCompletion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amt}>Total Amount is: ${totalPrice.toFixed(2)}</Text>
      <Text>Cash on Delivery</Text>
      <Button title="Place Order" onPress={handleOrderSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  amt: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  },
});

export default CheckoutScreen;
