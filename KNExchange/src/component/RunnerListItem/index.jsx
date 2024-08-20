import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View ,StyleSheet } from "react-native"
import CommonButton from '../../common/CommonButton/CommonButton';
import {Divider, Button } from 'react-native-paper';

export default function RunnerListItem({item,onViewClick,onPasswordChange}) {
  
    return(
      <><TouchableOpacity onPress={onViewClick}> 

      
        <View style={{margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:10,elevation:3}}>
          <Text style={styles.text2}>{item.name}</Text>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
            <Text style={styles.text}>{item.country}</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>{item.contact}</Text>
            </View>
        </View>

        <Divider bold={true} style={{backgroundColor:'white',marginBottom:8}}/>
        <TouchableOpacity onPress={onPasswordChange}>
            <Text style={styles.text}>Change Password</Text>
        </TouchableOpacity>
       
        </View>
        </TouchableOpacity></>
    )
  }

  const styles = StyleSheet.create({
    text2: {
      color: '#636363',
      fontSize: 18,
      fontFamily:'Dosis-Bold'
  },
    text: {
      color: '#636363',
      fontSize: 15,
      fontFamily:'Dosis-Regular'
  },
});
