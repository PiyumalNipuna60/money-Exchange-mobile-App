import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BPList from '../../component/BPList';
import BPView from '../../component/BPView';

export default function BPManage() {

    const Stack = createStackNavigator();
    const [partner,setPartner] = useState({});

  return (
    <>
        <Stack.Navigator>
            <Stack.Screen name="BPList" options={{ headerShown: false }}>
                {props => <BPList setPartner={(item)=>{setPartner(item)}}/>}
            </Stack.Screen>
           
            <Stack.Screen name="BPView" options={{ headerShown: false }}>
                {props => <BPView partner={partner}/>}
            </Stack.Screen>
        </Stack.Navigator>               
    </>
  )
}
