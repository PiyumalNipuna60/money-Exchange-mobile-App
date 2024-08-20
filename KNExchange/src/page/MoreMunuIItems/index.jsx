import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { removeData } from '../../utils/storage/Storage'
import Iconic from 'react-native-vector-icons/Ionicons'
import { CommonActions } from '@react-navigation/native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import ChangePassword from '../ChangePassword'

export default function MoreMenuItems({navigation}) {

  const [visible,setVisible] = useState(false);

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



  return (

    <>
      <View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Business Partners')}}>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',margin:10,padding:10,borderRadius:10,elevation:3}}>
            <Iconic name="person" size={25} color="black" />
                <Text style={{fontSize:20,color:'black',fontFamily:'Dosis-Bold',marginLeft:5}}>Business Partner</Text>
            </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
            <View style={{backgroundColor:'gray',margin:10,padding:10,borderRadius:10}}>
                <Text style={{fontSize:25,color:'white'}}>Reports</Text>
            </View>
        </TouchableOpacity> */}
         <TouchableOpacity onPress={()=>{
                setVisible(true)
                }}>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',margin:10,padding:10,borderRadius:10,elevation:3}}>
            <Iconic name="log-out" size={25} color="black" />
                <Text style={{fontSize:20,color:'black',fontFamily:'Dosis-Bold',marginLeft:5}}> Change Password</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleLogout()}}>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',margin:10,padding:10,borderRadius:10,elevation:3}}>
            <Iconic name="log-out" size={25} color="black" />
                <Text style={{fontSize:20,color:'black',fontFamily:'Dosis-Bold',marginLeft:5}}> Logout</Text>
            </View>
        </TouchableOpacity>
      </View>

      {visible &&
        <ChangePassword
          onClose={()=>{setVisible(false)}}
          visible={visible}

        />
       }
    </>

  )
}
