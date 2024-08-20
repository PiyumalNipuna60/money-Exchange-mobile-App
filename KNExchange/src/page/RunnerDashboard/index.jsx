import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import TextField from '../../common/TextField/TextField'
import { Divider } from 'react-native-paper'
import OrderItem from '../../component/OrderItem/OrderItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BackHandler,Alert } from 'react-native';
import { removeData } from '../../utils/storage/Storage'
import { CommonActions } from '@react-navigation/native'
import instance from '../../services/Axious'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PartnerOrderList from '../../component/PartnerOrdersList'

export default function RunnerDashboard({navigation}) {

    const Tab = createMaterialTopTabNavigator();
    const [userName,setUserName] = useState('');
    const [runnerId,setRunnerId] = useState('');

    const handleLogout = () => {

        removeData("token");
        removeData("role");
    
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
    }

    const getUserInfo = async ()=> {
       await instance.post('/user/get_user_info_by_token',{role:'Runner'})
                .then(function (response){
                    setUserName(response.data.name)
                    setRunnerId(response.data.runnerId)
                })
    }

    function getTimeOfDay() {

        const now = new Date();
        const hour = now.getHours();

        if (hour >= 3 && hour < 12) {
            return 'Good Morning';
          } else if (hour >= 12 && hour < 17) {
            return 'Good Afternoon';
          } else if (hour >= 17 && hour < 21) {
            return 'Good Evening';
          } else {
            return 'Good Night';
          }
    }


  
      const handleGoBack = ()=>{
        Alert.alert("Stop","Are You Sure",[{text:"cancel",onPress:()=>null,style:'cancel'},{text:'Yes',onPress:()=>{BackHandler.exitApp()}}]);
        return true;
    }

      useEffect(()=>{
        const backHandler = BackHandler.addEventListener("hardwareBackPress",handleGoBack);
        getUserInfo();
      },[])

  return (
    <View style={{flex:1,backgroundColor:'#d5f0f5',padding:10}}>
        

        <View style={{flexDirection:'row',padding:4,marginTop:10}}>
            <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                <Ionicons name="person-circle-outline" size={38} color="black" />
            </View>
            <View style={{flex:6}}> 
                <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-Regular"}}>{getTimeOfDay()}</Text>
                <Text style={{color:'#1d86f0',fontSize:22,fontFamily:"Dosis-Bold"}}>{userName?.toUpperCase()}</Text>
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <Ionicons name="notifications" size={25} color="black" />
            </View>
        </View>



        <View style={{flexDirection:'row',backgroundColor:'white',borderRadius:7,padding:6,marginTop:15}}>
            <View style={{flex:6}}> 
                <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-Regular"}}>Total Transaction</Text>
                <Text style={{color:'black',fontSize:22,fontFamily:"Dosis-Bold"}}> USD 00.00</Text>
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <TouchableOpacity onPress={handleLogout}>
                    <Icon1 name="logout" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>



        <View style={{flex:1,backgroundColor:'white',borderRadius:7,padding:4,marginTop:15}}>
          {runnerId ? 
              <>
                 <Tab.Navigator>
                  <Tab.Screen name="Ongoing">
                    {props => <PartnerOrderList runnerId={runnerId} mode='runner' search={'ongoing'} />}
                  </Tab.Screen>
            
                  <Tab.Screen name="Complete">
                    {props => <PartnerOrderList runnerId={runnerId} mode='runner' search={'complete'}/>}
                  </Tab.Screen>
                  </Tab.Navigator>
              </> 
            : 
              <></> }
       
        </View>
        
    </View>

  )
}


