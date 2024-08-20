import React, { useEffect, useState } from 'react'
import {StyleSheet, TouchableOpacity, View } from "react-native"
import { Text} from "react-native-paper"
import Icon1 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';


export default function Notifications() {

    const navigation = useNavigation();

  return (
    <>

        <View style={{height:"100%" , backgroundColor:"#d5f0f5"}}>
            <View style={{height:"12%",padding:12}}>

                <View style={{marginBottom:2}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')}}>
                        <Ionicons name="return-up-back" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notifications</Text>
                </View>
            </View>

            <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingBottom:5,justifyContent:'center',alignItems:'center'}}>
                
                <Text style={{fontSize:25,color:'#8a8d91',fontFamily:'Dosis-Regular'}}>No Notifications</Text>
                <Text style={{fontSize:15,color:'#8a8d91',fontFamily:'Dosis-Regular'}}>You do not have notifications yet</Text>
    
            </View>


        </View>

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
    },
    fieldName: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    fieldContainer: {
       marginHorizontal:15
    },
});
