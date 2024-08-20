import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text ,Alert, TouchableOpacity } from 'react-native'
import { View ,StyleSheet } from "react-native"
import OrderItem from '../OrderItem/OrderItem'
import OrderItemViewModal from '../OrderItemViewModal/OrderItemViewModal'
import TextField from '../../common/TextField/TextField';
import { PaperProvider } from 'react-native-paper';
import ModalOrderItemAssign from '../ModalOrderItemAssign';
import { setupMicrotasks } from 'react-native-reanimated/lib/typescript/reanimated2/threads';
import ModalAssignDetails from '../ModalOrderConfirm';
import instance from '../../services/Axious'
import { useFocusEffect } from '@react-navigation/native'
import PartnerOrderItem from '../PartnerOrderItem'

export default function CustomerOrderList({search,onViewClick,customerId}) {
 
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orders,setOrders] = useState([]);

  const getAllOrders = ()=>{
    if(search === 'send'){
        instance.get(`/order/get_order_customer_wise/${customerId}`)
        .then(function (response){
            setOrders(response.data)
        })
        .catch(function (er){
            console.log(er);
        })
    }else{
        instance.get(`/order/get_order_receiver_wise/${customerId}`)
        .then(function (response){
            setOrders(response.data)
        })
        .catch(function (er){
            console.log(er);
        })
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
                        //onChange={}
                    />
                </View>

                <FlatList
                    data={orders}
                    renderItem={({item})=><OrderItem onViewClick={()=>{onViewClick(item)}} order={item}/>}
                />

            </View>

        </PaperProvider>
    </>
  )
}


const styles = StyleSheet.create({
    fieldContainer: {
        margin:10
     },
});
