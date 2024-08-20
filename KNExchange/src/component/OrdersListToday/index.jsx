import React, { useEffect, useState } from 'react'
import { FlatList} from 'react-native'
import { View ,StyleSheet } from "react-native"
import OrderItem from '../OrderItem/OrderItem'
import TextField from '../../common/TextField/TextField';
import { PaperProvider } from 'react-native-paper';
import instance from '../../services/Axious'
import { useFocusEffect } from '@react-navigation/native'
import ModalOrderItemAssign from '../ModalOrderItemAssign';
import OrderItemViewModal from '../OrderItemViewModal/OrderItemViewModal';
import ModalPartnerOrderConfirm from '../ModalPartnerOrderConfirm';

export default function OrdersListToday({search}) {

  const [orders,setOrders] = useState([]);
  const [ordersSerch,setOrdersSerch] = useState([])

  const [orderAssignVisible,setOrderAssignVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [orderConfirmVisible, setOrderConfirmVisible] = useState(false);

  const [selectedOrder,setSelectedOrder] = useState({});

  const getAllOrders = ()=>{
    instance.get('/order').then(function (response){
      if(search === 'new'){
        const odrs = response.data.filter(order => order.status === 'pending');
        setOrders(odrs);
        setOrdersSerch(odrs);
      }else if(search === 'ongoing'){
        const odrs = response.data.filter(order => order.status === 'assign');
        setOrders(odrs);
        setOrdersSerch(odrs);
      }else if(search === 'complete'){
        const odrs = response.data.filter(order => order.status === 'complete');
        setOrders(odrs);
        setOrdersSerch(odrs);
      }else{
        setOrders(response.data);
        setOrdersSerch(response.data);
      }
    }).catch(function (error){
      console.log(error);
    })
  }

  function searchOrders(orders, searchString) {
    function searchInObject(obj, searchString) {
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          if (searchInObject(obj[key], searchString)) {
            return true;
          }
        } else {
          if (String(obj[key]).toLowerCase().includes(searchString.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    }
  
    return orders.filter(order => searchInObject(order, searchString));
  }

  const onClick = (val,item)=>{
    
    if(val==='view'){
      setVisible(true)
      setSelectedOrder(item)
    }else if(val==="asign"){
      setOrderAssignVisible(true)
      setSelectedOrder(item)
    }else{
      setOrderConfirmVisible(true);
      setSelectedOrder(item);
    }
}
  
  useFocusEffect(
    React.useCallback(() => {
      getAllOrders();
    }, [])
);

  return (
    <>

       
            <PaperProvider>
                <View style={{backgroundColor:'#e8e8e8',height:"100%"}}>

                
                <View style={styles.fieldContainer}>
                    <TextField
                        label={'Search Orders'}
                        //value={}
                        onChange={(val)=>{
                          const matchedOrders = searchOrders(ordersSerch, val);
                          setOrders(matchedOrders);
                      }}
                    />
                </View>

                
                    <FlatList
                        data={orders}
                        renderItem={({item})=> 
                            <OrderItem 
                                order={item} 
                                onViewClick={(val)=>{
                                  onClick(val,item);      
                                }}
                            />}
                    />
                
                </View>
              
            </PaperProvider>
        
        {orderAssignVisible && 
           <ModalOrderItemAssign
           visible={orderAssignVisible}
           order={selectedOrder}
           onClose={()=>setOrderAssignVisible(false)}
           loadData={()=>{getAllOrders()}}
         />
        }

        {visible && 
         <OrderItemViewModal
            visible={visible}
            order={selectedOrder}
            onClose={()=>{setVisible(false)}}
         />
         }

        {orderConfirmVisible && 
            <ModalPartnerOrderConfirm
                visible={orderConfirmVisible}
                order={selectedOrder}
                onClose={()=>{setOrderConfirmVisible(false)}}
                loadData={()=>{
                  getAllOrders()
                }}
                adminConfirm={true}
            />
        }
    </>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
     marginVertical:15
  },
  title: {
      color: '#44357F',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  fieldName: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
  },
  fieldContainer: {
     margin:10
  },
  btn: {
      borderRadius: 7,
      width: 125,
      height:50,
      fontSize: 18,
      textAlign:'center',
      justifyContent:'center'
  },
  buttonContainer: {
      flexDirection:'row',
      justifyContent:'flex-end',
      margin:10
  },
  listSenderName: {
      color: 'white',
      fontSize: 19,
      fontWeight: 'bold',
  },
});
