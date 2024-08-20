import React from 'react'
import { Text } from 'react-native'
import { View ,StyleSheet } from "react-native"
import CommonButton from '../../common/CommonButton/CommonButton';
import {Divider, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BPListItem({item,onViewClick,onChangePassword}) {
  
    return(
      <><TouchableOpacity onPress={onViewClick}>

      
        <View style={{margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:10,elevation:3}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontSize:18,color:'#636363',fontFamily:'Dosis-SemiBold'}}>{item.fistName}</Text>
              <Text style={styles.text}>{item.contact}</Text>
          </View>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
            <Text style={styles.text}>{item.country}</Text>
            <Text style={styles.text}>{item.nic}</Text>
          </View>

          <Divider bold={true} style={{backgroundColor:'#c7c7c7',marginBottom:8}}/>
                
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <TouchableOpacity onPress={onChangePassword}>
                     <Text style={styles.text}>Change Password</Text>
                  </TouchableOpacity>

                </View>
          
        </View>
        </TouchableOpacity></>
    )
  }

  const styles = StyleSheet.create({
    text: {
      color: '#636363',
      fontSize: 15,
      fontFamily:'Dosis-Regular'
  },
});
