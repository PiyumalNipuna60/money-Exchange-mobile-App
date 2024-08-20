import React from 'react'
import { useState } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import SamplePage from '../../../page/SamplePage/SamplePage';
import SmplPg from '../../../page/SmplPg/SmplPg';
import SenderManage from '../../../page/SenderManage/SenderManage';
import RecieverManage from '../../../page/RecieverManage/RecieverManage';
import NewOrder from '../../../page/NewOrder/NewOrder';
import OrderManage from '../../../page/OrderManage/OrderManage';
import ExchangeCalculator from '../../../page/ExchangeRates/ExchangeRates';


const Drawer = createDrawerNavigator();

export default function StaffNavigation({ navigation }) {

  const [loading, setLoading] = useState(false);

  const logout = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   removeValue()
    //   setLoading(false);
    // }, 1000);

  };

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('stmToken')
      const value = await AsyncStorage.getItem('stmToken')
      if (value === null) {
        navigation.navigate('Home')
        console.log('=============', value);
      } else {
        console.log("Error Log Out");
      }
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <Drawer.Navigator

      drawerContent={props => {
        return (

          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <AlertNotificationRoot>
              <DrawerItem label="Logout" onPress={logout} />
            </AlertNotificationRoot>
          </DrawerContentScrollView>
        )

        {
          loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )
        }
      }}

    >

      <Drawer.Screen name="Order Manage" component={OrderManage} />
      <Drawer.Screen name="Sender Manage" component={SenderManage} />
      <Drawer.Screen name="Reciever Manage" component={RecieverManage} />
      <Drawer.Screen name="New Order" component={NewOrder} />
      <Drawer.Screen name="Exchange Calculator" component={ExchangeCalculator} />
      {/* <Drawer.Screen name="Home" options={{
        drawerItemStyle: { display: 'none' },
        headerShown: false
      }} component={HomePage} /> */}

    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    bottom: 40,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },

});
