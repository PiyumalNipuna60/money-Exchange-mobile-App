import React from 'react'
import NewOrder from '../../../page/NewOrder/NewOrder';
import OrderManage from '../../../page/OrderManage/OrderManage';
import BPManage from '../../../page/BusinessPartnerManage';
import Dashboard from '../../../page/Dashboard';
import MoreMenuItems from '../../../page/MoreMunuIItems';
import CustomerManage from '../../../page/CustomerManage';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import ExchangeRates from '../../../page/ExchangeRates/ExchangeRates';
import Notifications from '../../../page/Notifications';
import AddNewOrder from '../../../page/AddNewOrder';

const Stack = createStackNavigator();

export default function AdminNavigation({ navigation }) {

  return (

    <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Transacations" component={OrderManage} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
        <Stack.Screen name="New Transaction" component={AddNewOrder} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
        <Stack.Screen name="Business Partners" component={BPManage} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
        <Stack.Screen name="Customers" component={CustomerManage} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}  />
        <Stack.Screen name="More" component={MoreMenuItems} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
        <Stack.Screen name="Rates" component={ExchangeRates} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
    </Stack.Navigator>

  )
}