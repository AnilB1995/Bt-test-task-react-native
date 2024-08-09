import { StyleSheet, Dimensions } from 'react-native';

const { width,height } = Dimensions.get("screen");

export const style = StyleSheet.create({
    
    rootStyle:{
        height:height*0.15,
        width:width*.95,
        borderRadius:10,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'pink',
        marginBottom:5,
        marginTop:10
      },
    
      rootProductView:{
      display:'flex',
      flexDirection:'row',
      paddingLeft:10,
      paddingTop:10,
      justifyContent:'space-between'
      },
        
    subView:{
        flexDirection:'row',
    },
    text:{
        color:'#FFF',
        fontSize:20,
        marginTop:25,
        marginLeft:10
    },
    cartIcon:{
        marginTop:25,
        marginRight:20
    },
    imageStyle:{
        width:width*.20,
        height:height*.1,
        borderRadius:10,
        marginRight:10
    },

    imageView:{
        flexDirection:'row'
    },
    textStyleProduct:{
        fontSize:18,
        fontWeight:"bold",
        color:'#30336b',
      },
      priceProduct:{
        fontSize:14,
        fontWeight:'bold',
        color:'#e74c3c'
      },
      offerPriceProduct:{
        fontSize:17.5,
        fontWeight:'bold',
        color:'#3498db'
      },
      offerStyleProduct:{
        fontSize:14,
        color:'#5f27cd',
        fontWeight:'500'
      },
      buttonStyle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center', 
        width:width*0.22,
        height:height*0.04,
        borderRadius:10,
        alignSelf:'center',
        
       },
       textColor:{
         fontSize:13,
         fontWeight:'bold',
         color:'#FFF'
       },
      
})