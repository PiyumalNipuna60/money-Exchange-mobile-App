import React from 'react'
import { Text,TouchableOpacity } from 'react-native'
import { View ,StyleSheet } from "react-native"
import CommonButton from '../../common/CommonButton/CommonButton';
import {Divider, Button } from 'react-native-paper';

export default function PartnerOrderItem({item,onViewClick}) {
  
    return(
      <><TouchableOpacity onPress={()=>{onViewClick('view')}}>

      
        <View style={{margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:8,elevation:3}}>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:6}}>
            <Text style={{fontSize:18,color:'#636363',fontFamily:'Dosis-SemiBold'}}>Ref No : {item.order.referenceNo}</Text>
            <Text style={styles.text}>{item.order.date}</Text>
            {/* <Text style={{fontSize:14,color:'#636363',fontWeight:'bold'}}>{order.confirmStatus === "yes" ? "Confirm" : "NotConfirm"}</Text> */}
            
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
            <View>
                <Text style={styles.text}>{item.order.account?.name}</Text>
                <Text style={styles.text}>{item.order.receiveCurrency + " " + item.runnerAmount}</Text>
            </View>
            <View>
                <Text style={styles.text}>{item.order.account?.bank}</Text>
                <Text style={styles.text}>{item.order.account?.accountNo}</Text>
            </View>
          </View>

          <Divider bold={true} style={{backgroundColor:'#c7c7c7',marginBottom:8}}/>
         
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
              <View>
                  <Text style={{fontSize:14,color:'#636363',fontFamily:'Dosis-SemiBold'}}>{item.runner === null ? "No Runner" : item.runner.name}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                
                <TouchableOpacity onPress={()=>{
                  onViewClick('assign')
                  }}>
                  <Text style={{fontSize:14,color:'#4499c7',fontFamily:'Dosis-SemiBold'}}>   {item.runner === null && item.order.status !== 'complete' ? "Assign"  : ""}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  onViewClick('confirm')
                  }}>
                  <Text style={{fontSize:14,color:'#4499c7',fontFamily:'Dosis-SemiBold'}}>   {item.order.status === "complete" ? "" : "Confirm"}</Text>
                </TouchableOpacity>
              </View>
        
          </View>
        </View>
        </TouchableOpacity></>
    )
  }

  const styles = StyleSheet.create({
    text: {
        color: '#636363',
        fontSize: 17,
        fontFamily:'Dosis-Regular'
    },
});
