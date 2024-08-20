import React, { useState } from 'react'
import { Text } from 'react-native'
import { View ,StyleSheet } from "react-native"
import CommonButton from '../../common/CommonButton/CommonButton';
import {Divider, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../../common/TextField/TextField';

export default function RateItem({item}) {

  const [result,setResult] = useState('00.00');
  
    return(
      <>
        <View style={{margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:10,elevation:3}}>
          
          <TouchableOpacity onPress={()=>{}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.text}>{ 1 + " " +item.sentCurrency}</Text>
              <Text style={styles.text}>=</Text>
              <Text style={styles.text}>{ item.rate + " " +item.receiveCurrency}</Text>
          </View> 
           </TouchableOpacity>

          <Divider bold={true} style={{backgroundColor:'#c7c7c7',marginVertical:15}}/>
                
                {/* <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <TouchableOpacity >
                     <Text style={styles.text}>Edit</Text>
                  </TouchableOpacity >
                </View> */}

                <View style={{margin:10,flexDirection:'row',justifyContent:'center'}}>
                  <Text style={styles.text}>Calculate</Text>
                </View>
                <TextField
                  label={'Ammount'}
                  onChange={(val)=>{
                      const res = Number(item.rate) * Number(val)
                      setResult(res)
                    }}
                />
                <View style={{margin:10,flexDirection:'row',justifyContent:'flex-end'}}>
                  <Text style={styles.text}>{result}</Text>
                </View>
               
          
        </View>
      </>
    )
  }

  const styles = StyleSheet.create({
    text: {
    fontSize:22,
    color:'#636363',
    fontFamily:'Dosis-SemiBold'
  },
});
