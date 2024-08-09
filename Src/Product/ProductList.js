import React, {Fragment, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import {ProductData} from '../Products';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const RenderItem = ({item, handleSelectItem}) => {

  return (
    <TouchableOpacity activeOpacity={1} style={styles.card}>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.listdata}>Description : {item.description} </Text>
      <Text style={styles.listdata}>Price : {item.price} $</Text>
      <Text style={styles.listdata}>Discount : {item.discountPercentage}</Text>
      <Text style={styles.listdata}>Rating : {item.rating}</Text>
      <Text style={styles.listdata}>Stock : {item.stock}</Text>
      <Text style={styles.listdata}>Brand: {item.brand}</Text>
      <Text style={styles.listdata}>Category : {item.category}</Text>
      <View style={styles.buttonStyle} >
        <Button title="AddCart" onPress={() => handleSelectItem(item)} />
      </View>
    </TouchableOpacity>
  );
};


const ProductList = () => {
   const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);
  const [visibleData, setVisibleData] = useState([]);
  const [newProductData,setNewProductData]=useState([])

  const batchSize = 10; 
  const loadDelay = 3000;
  
  React.useEffect(() => {
    setIsLoading(true);
    if (ProductData.products.length > 0) {
      setTimeout(() => {
        setVisibleData(ProductData.products.slice(0, batchSize));
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [ProductData.products]);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newDataSlice = ProductData.products.slice(
        0,
        visibleData.length + batchSize,
      );
      setVisibleData(newDataSlice);
      setIsLoading(false);
    }, loadDelay);
  };

  const selected = item => {
       dispatch({type: 'ADD_Cart', payload: item});
  };
  
  React.useMemo(()=>{
      const newData = [];
    for(let i=0;i<visibleData.length;i++){
      newData.push({...visibleData[i],count:1})
    }
    setNewProductData([...newData])
  },[visibleData])

  return (
    <Fragment>
      <FlatList
        data={newProductData}
        contentContainerStyle={styles.container}
        ref={flatListRef}
        keyboardDismissMode="on-drag"
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchData()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          ProductData.products?.length === 0 ? emptyComponent() : null
        }
        ListFooterComponent={() => {
          if (isLoading && visibleData.length > 9) {
            return <ActivityIndicator size="small" color="#FFF" />;
          } else {
            return null;
          }
        }}
        keyExtractor={(i, index) => `${i.id}-${index}`}
        renderItem={({item, index}) => {
          return (
            <RenderItem
              item={item}
              index={index}
              handleSelectItem={val => selected(val)}
              navigation={navigation}
            />
          );
        }}
      />
      <View style={styles.cartButton} >
        <Button title="Show Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  listdata: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cartButton:{
    position:'absolute',
    bottom:'10%',
    right:'5%',
    width:'40%'
  }
});

export default ProductList;
