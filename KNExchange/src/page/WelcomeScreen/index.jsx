import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { getData } from '../../utils/storage/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler,Alert } from 'react-native';

export default function WelcomeScreen({navigation}) {


    const handleGetToken = async () => {
        const token = await getData('token');
        const role = await getData('role');
        console.log(token);
        setTimeout(()=>{
            if(token){
                if(role === 'Admin'){
                    navigation.navigate("Drawer")
                }else if(role === 'Partner'){
                    navigation.navigate('BPartner');
                }else if(role === 'Runner'){
                    navigation.navigate("Runner")
                }else{
                    navigation.navigate("Login")
                }
            }else{
                navigation.navigate("Login")
            }
        },2000)
    }

    useEffect(()=>{
        handleGetToken();
    },[])

  return (
    <View style={styles.mainView}>
        <Image style={styles.img} source={require('../../assets/img/applogo.jpeg')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    img:{
        height:350,
        width:350
    }
});