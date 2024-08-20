import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { View ,StyleSheet } from "react-native"
import OrderItemViewModal from '../../component/OrderItemViewModal/OrderItemViewModal';
import ModalOrderItemAssign from '../../component/ModalOrderItemAssign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';;
import { useNavigation } from '@react-navigation/native';
import CustomerOrderList from '../CustomerOrdersList';


export default function CustomerOrders({customer}) {

  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [order,setOrder] = useState({});
  const [visible,setVisible] = useState(false);
 
  return (
    <>
         <View style={{padding:10,backgroundColor:'#d5f0f5'}}>
            <View style={{marginBottom:2}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('CustomerList')}}>
                  <Ionicons name="return-up-back" size={30} color="black"/>
              </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{customer.firstName}</Text>
            </View>


        </View>

        <Tab.Navigator>
            <Tab.Screen name="Send">
                {props => <CustomerOrderList  search={'send'} customerId={customer.customerId} onViewClick={(order)=>{
                    setOrder(order);
                    setVisible(true);
                }}/>}
            </Tab.Screen>
            <Tab.Screen name="Recieve">
                {props => <CustomerOrderList search={'reciew'} customerId={customer.customerId} onViewClick={(order)=>{
                   setOrder(order);
                   setVisible(true);
                }}/> }
            </Tab.Screen>
            
            {/* <Tab.Screen name="Ongoing">
                {props => <OrdersListToday search={'ongoing'} onViewClick={(val,item)=>{onViewClick(val,item)}}/>}
            </Tab.Screen> */}
        </Tab.Navigator>

        {visible && 
         <OrderItemViewModal
            visible={visible}
            order={order}
            onClose={()=>{setVisible(false)}}
         />}

    </>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  title: {
    color: '#1d86f0',
    fontSize: 26,
    textAlign: 'left',
    fontFamily:'Dosis-Bold'
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
