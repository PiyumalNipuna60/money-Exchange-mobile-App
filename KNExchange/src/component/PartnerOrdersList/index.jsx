import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text ,Alert } from 'react-native'
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
import ModalAssignRunner from '../ModalAssignRunner'
import ModalPartnerOrderDetails from '../ModalPartnerOrderDetails'
import ModalPartnerOrderConfirm from '../ModalPartnerOrderConfirm'

export default function PartnerOrderList({search,mode='partner',runnerId}) {
 
  const [orders,setOrders] = useState([]);
  const [ordersSerch,setOrdersSerch] = useState([])
  const [partnerId,setPartnerId] = useState('');

  const [assignRunnerVisible, setAssignRunnerVisible] = useState(false);
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
  const [orderConfirmVisible, setOrderConfirmVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const onViewClick = (val,item)=>{
    
    if(val==='view'){
      setSelectedOrder(item)
      setOrderDetailsVisible(true);
    }else if(val==="assign"){
      setSelectedOrder(item)
      setAssignRunnerVisible(true)
    }else{
        setSelectedOrder(item)
        setOrderConfirmVisible(true)
      
    }
}

function getUserInfo(){
    instance.post('/user/get_user_info_by_token',{role:'Partner'})
            .then(function (response){
                setPartnerId(response.data.employeeId);
            })
}

  const getAllOrders = async ()=>{

    const res = await instance.post('/user/get_user_info_by_token',{role:'Partner'});
    instance.get(`/payment_details/employee_wise/${res.data.employeeId}`).then(function (response){
        if(search === 'new'){
            const odrs = response.data.filter(item => item.runner === null && item.order.status != 'complete');
            setOrders(odrs);
            setOrdersSerch(odrs)
        }else if(search === 'ongoing'){
            const odrs = response.data.filter(item => item.runner != null && item.order.status != 'complete');
            setOrders(odrs);
            setOrdersSerch(odrs)
        }else if(search === 'complete'){
            const odrs = response.data.filter(item => item.order.status === 'complete');
            setOrders(odrs);
            setOrdersSerch(odrs)
        }else{
            setOrders(response.data);
            setOrdersSerch(response.data)
         }

    }).catch(function (error){
      console.log(error);
    })
  }

  const getAllOrdersOfRunner = ()=>{
    instance.get(`/payment_details/runner_wise/${runnerId}`).then(function (response){
        if(search === 'new'){
            const odrs = response.data.filter(item => item.runner === null && item.order.status != 'complete');
            setOrders(odrs);
            setOrdersSerch(odrs)
        }else if(search === 'ongoing'){
            const odrs = response.data.filter(item => item.runner != null && item.order.status != 'complete');
            setOrders(odrs);
            setOrdersSerch(odrs)
        }else if(search === 'complete'){
            const odrs = response.data.filter(item => item.order.status === 'complete');
            setOrders(odrs);
            setOrdersSerch(odrs)
        }else{
            setOrders(response.data);
            setOrdersSerch(response.data)
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



  useFocusEffect(
    React.useCallback(() => {
        getUserInfo();
        if(mode=='partner'){
            getAllOrders();
        }else if(mode==='runner'){
            getAllOrdersOfRunner();
        }
    
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
                    renderItem={({item})=> <PartnerOrderItem 
                            item={item}
                            onViewClick={(val)=>{onViewClick(val,item)}}
                    /> }
                />

            </View>

        </PaperProvider>

        {assignRunnerVisible && 
         <ModalAssignRunner
            visible={assignRunnerVisible}
            order={selectedOrder}
            partnerId={partnerId}
            onClose={()=>{setAssignRunnerVisible(false)}}
            loadData={()=>{
                if(mode=='partner'){
                    getAllOrders();
                }else if(mode==='runner'){
                    getAllOrdersOfRunner();
                }
            }}
         />
         }

        {orderDetailsVisible && 
            <ModalPartnerOrderDetails
                visible={orderDetailsVisible}
                item={selectedOrder}
                onClose={()=>{setOrderDetailsVisible(false)}}
            />
        }

        {orderConfirmVisible && 
            <ModalPartnerOrderConfirm
                visible={orderConfirmVisible}
                order={selectedOrder}
                onClose={()=>{setOrderConfirmVisible(false)}}
                loadData={()=>{
                    if(mode=='partner'){
                        getAllOrders();
                    }else if(mode==='runner'){
                        getAllOrdersOfRunner();
                    }
                }}
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
