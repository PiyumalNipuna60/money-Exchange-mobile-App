import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View ,StyleSheet } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PartnerOrderList from '../../component/PartnerOrdersList';


export default function RunnerOrderManage({navigation}) {

  const Tab = createMaterialTopTabNavigator();
  const [runnerId,setRunnerId] = useState('');

  useEffect(()=>{

    instance.post('/user/get_user_info_by_token',{role:'Runner'})
            .then(function (response){
                //setUserName(response.data.fistName)
                setRunnerId(response.data)
            })

  },[])

  return (
    <>

        <View style={{padding:10,backgroundColor:'#d5f0f5'}}>
            <View style={{marginBottom:2}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('RunnerDashboard')}}>
                  <Ionicons name="return-up-back" size={30} color="black"/>
              </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Orders</Text>
            </View>
        </View>

        <Tab.Navigator>
            <Tab.Screen name="Ongoing">
                {props => <PartnerOrderList runnerId={runnerId} mode='runner' search={'ongoing'} />}
            </Tab.Screen>
            
            <Tab.Screen name="Complete">
                {props => <PartnerOrderList  runnerId={runnerId} mode='runner' search={'complete'}/>}
            </Tab.Screen>
        </Tab.Navigator>

       

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
  }
});
