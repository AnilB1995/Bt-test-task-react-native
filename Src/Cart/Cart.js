import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,

} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';


function RenderItem({item, handleIncrement, handleDecrement}) {
  const discountAmount = (item.price * item.discountPercentage) / 100;
  const discountedPrice = item.price - discountAmount;
  const subtotal = discountedPrice * (item.count || 1);

  return (
    <View style={styles.cartItem} key={item.id}>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.listdata}>Price: ${item.price?.toFixed(2)}</Text>
      <Text style={styles.listdata}>
        Discount: {item.discountPercentage}% (${discountAmount?.toFixed(2)})
      </Text>
      <Text style={styles.listdata}>Rating: {item.rating}</Text>
      <Text style={styles.listdata}>Brand: {item.brand}</Text>
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => {
            handleDecrement(item);
          }}
        />
        <Text style={styles.count}>{item.count}</Text>
        <Button title="+" onPress={() => handleIncrement(item)} />
      </View>
      <Text style={styles.listdata}>Subtotal: ${subtotal.toFixed(2)}</Text>
    </View>
  );
}

const Cart = ({navigation}) => {
  const cartItems = useSelector(state => state.AddCart);

  const [cartData, setCartData] = useState([]);
  const [refresh,setRefresh]=useState(false)

  const totalPrice = useMemo(() => {
    return cartData?.reduce((sum, item) => {
      const discountAmount = (item.price * item.discountPercentage) / 100;
      const discountedPrice = item.price - discountAmount;
      return sum + discountedPrice * (item.count || 1);
    }, 0);
  }, [cartData]);

  React.useMemo(() => {
    if (cartItems !== undefined) {
      setCartData([...Object.values(cartItems)]);
    }
  }, [refresh]);

  const findAndUpdateCount = (id, increment = true) => {
    
    const item = cartData.find(item => item.id === id);
    
    if (item) {
      
      item.count = increment ? item.count + 1 : item.count - 1;
    }
    
    return item;
  };
  const incrementCount = item => {
    const updatedItems = findAndUpdateCount(item.id, true); 
    console.log(updatedItems);
    setRefresh(!refresh);
  };

  const decrementCount = item => {
    const updatedItems = findAndUpdateCount(item.id, false); 
    console.log(updatedItems);
    setRefresh(!refresh);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        renderItem={({item, index}) => {
          return (
            <RenderItem
              item={item}
              handleDecrement={val => decrementCount(val)}
              handleIncrement={val => incrementCount(val)}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      <View style={styles.btn}>
        <Button
          title="Proceed to Checkout"
          onPress={() =>
            navigation.navigate('CheckoutScreen', {totalPrice, cartData})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
  },
  cartItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listdata: {
    fontSize: 16,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  count: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  },
  btn:{
margin:'7%'
  },
});

export default Cart;
