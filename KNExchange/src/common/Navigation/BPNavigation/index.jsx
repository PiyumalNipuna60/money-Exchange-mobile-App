import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PartnerDashboard from '../../../page/PartnerDashboard';
import PartnerOrderManage from '../../../page/PartnerOrderManage';
import RunnerManage from '../../../page/RunnerManage';

const Stack = createStackNavigator();

export default function BPNavigation({ navigation }) {

  return (

    <Stack.Navigator initialRouteName='PartnerDashboard'>
        <Stack.Screen name="PartnerDashboard" component={PartnerDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="PartnerOrders" component={PartnerOrderManage} options={{headerShown:false}} />
        <Stack.Screen name="Runner" component={RunnerManage} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}