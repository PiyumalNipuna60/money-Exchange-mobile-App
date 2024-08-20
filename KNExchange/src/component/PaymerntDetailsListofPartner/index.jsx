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

export default function PaymentDetailsListofPartner({search,onViewClick,partnerId}) {
 
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orders,setOrders] = useState([]);

  const getAllOrders = ()=>{

    instance.get(`/payment_details/employee_wise/ ${partnerId}`).then(function (response){
        if(search === 'ongoing'){
          const odrs = response.data.filter(item => item.order.status === 'assign');
          setOrders(odrs);
        }else if(search === 'complete'){
          const odrs = response.data.filter(item => item.order.status === 'complete');
          setOrders(odrs);
        }else{
          setOrders(response.data);
        }
      }).catch(function (error){
        console.log(error);
      })
      
  }

 


  useFocusEffect(
    React.useCallback(() => {
      getAllOrders();
    }, [])
);

    const PaymentDetailItem = ({item})=>{
        return(
            <><TouchableOpacity onPress={()=>{
                onViewClick(item.order.orderId)
                }}>
            <View style={{margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:8,elevation:3}}>
              
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:6}}>
                    <Text style={{fontSize:18,color:'#636363',fontFamily:'Dosis-SemiBold'}}>Ref No : {item.order.referenceNo}</Text>
                    <Text style={styles.text}>{item.order.date}</Text>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                    <View>
                        <Text style={styles.text}>{item.order.account?.name}</Text>
                        <Text style={styles.text}>{item.order.receiveCurrency +  " " + item.runnerAmount}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{item.order.account?.bank}</Text>
                        <Text style={styles.text}>{item.order.account?.accountNo}</Text>
                    </View>
                </View>

            </View>
            </TouchableOpacity></>
        )
    }

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
                    renderItem={({item})=> <PaymentDetailItem item={item}/>}
                />

            </View>

        </PaperProvider>
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
  text: {
    color: '#636363',
    fontSize: 17,
    fontFamily:'Dosis-Regular'
},
});
