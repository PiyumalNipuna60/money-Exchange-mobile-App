import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CustomerList from '../../component/CustomerList';
import CustomerOrders from '../../component/CustomerOrders';

export default function CustomerManage({navigation}) {

    const Stack = createStackNavigator();
    const [selectCustomer,setSelectCustomer] = useState({});

  return (

    <>
        <Stack.Navigator>
            <Stack.Screen name="CustomerList" options={{ headerShown: false }}>
                {props => <CustomerList setCustomer={(item)=>{setSelectCustomer(item)}}/>}
            </Stack.Screen>
            <Stack.Screen name="CustomerOrdrs" options={{ headerShown: false }}>
                {props => <CustomerOrders customer={selectCustomer}/>}
            </Stack.Screen>
        </Stack.Navigator>               
    </>

  )
}