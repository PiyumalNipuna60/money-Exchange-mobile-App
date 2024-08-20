import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PartnerDashboard from '../../../page/PartnerDashboard';
import PartnerOrderManage from '../../../page/PartnerOrderManage';
import RunnerManage from '../../../page/RunnerManage';
import RunnerDashboard from '../../../page/RunnerDashboard';
import RunnerOrderManage from '../../../page/RunnerOrderManage';

const Stack = createStackNavigator();

export default function RunnerNavigation({ navigation }) {

  return (

    <Stack.Navigator initialRouteName='RunnerDashboard'>
        <Stack.Screen name="RunnerDashboard" component={RunnerDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="RunnerAssignOrders" component={RunnerOrderManage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}