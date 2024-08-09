import React,{useState,useEffect,} from "react";

import {Text,Image,View,FlatList,Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import { style } from "./ShowCartCSS";
import DEL from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";

function RenderItem ({ item,refresh,setRefresh }) {
  
        const [value,setValue]=useState(1)
        const dispatch=useDispatch()

        const handleQtyValueChange=(value,item)=>{
            // console.log("value",value)
            // console.log("item",item)
            if(value < 1)
            {
             dispatch({type:"REMOVE_CART",payload:[item.id]})
            //  alert(item)
             setRefresh(!refresh)
            }
            else{
                setValue(value)
            }
        }
      
        const handleProductRemove=(item)=>{
            dispatch({type:"REMOVE_CART",payload:[item.id]})
            setRefresh(!refresh)
        }

        return (
        <View style={style.rootStyle}>
        <View style={style.rootProductView}>
          <View style={{flexDirection:'row'}}>
          <Image style={style.imageStyle} source={item.image} />
           
            <View style={{flexDirection:'column'}}>
            <Text numberOfLines={1} style={style.textStyleProduct}>{item.title}</Text>
            <Text style={style.offerPriceProduct}>Offer price: &#8377; {item.offerPrice * value}</Text>
            <Text style={style.priceProduct}>MRP: &#8377; {item.price * value}</Text>
            <Text style={style.offerStyleProduct}>You save: &#8377; {(item.price - item.offerPrice) * value}</Text>
            
            </View>
            </View>
            
            <View style={{alignSelf:'center',marginRight:10}}>
            
              <View style={style.buttonStyle}>
              <View style={{marginBottom:10}}>
                <NumericInput 
                    value={value} 
                    onChange={(value) =>handleQtyValueChange(value,item) }
                    maxValue={10}
                    minValue={0}
                    totalWidth={80} 
                    totalHeight={25} 
                    iconSize={15}
                    step={1}
                    valueType='integer'
                    rounded 
                    textColor='#000' 
                    iconStyle={{ color: '#FFF', }} 
                    rightButtonBackgroundColor='#4834d4' 
                    leftButtonBackgroundColor='#4834d4'
                />    
                </View>
                <TouchableOpacity onPress={()=>handleProductRemove(item)} activeOpacity={0.7}>
            <DEL name="delete" size={20} color="#000"  />
            </TouchableOpacity>
            </View>
                
              </View>
            
        </View>
        </View> )
      }
      
        
const ShowCart=(props)=>{
    const navigation = useNavigation()
    
    const [data, setData] = useState([])
    const [refresh,setRefresh]=useState(false)

    const productData=useSelector(state=>state.cart)
   
    useEffect(()=>{
        const product=Object.values(productData)
        setData(product)
    },[refresh])

    return(
        <View>
            <Header title="Cart" badgeView={true} leftIconName="arrow-back-outline" rightIconName="shoppingcart" badgeValue={data.length} onPress={()=>navigation.navigate('TextInput')} />
            <View style={{paddingTop:80}}>
                <SafeAreaView>
             <FlatList
            data={data}
            renderItem={({item,index})=>(<RenderItem item={item} setRefresh={setRefresh} refresh={refresh} />)}
            keyExtractor={item => item.id}
            />
        </SafeAreaView>
        </View>
        </View>
    )
}

export default ShowCart