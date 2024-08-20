import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView,View ,StyleSheet } from "react-native"
import { PaperProvider, Text, TextInput } from "react-native-paper"
import TextField from '../../common/TextField/TextField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { Icon ,MD3Colors  } from 'react-native-paper';
import BPListItem from '../../component/BPListItem';
import RunnerListItem from '../../component/RunnerListItem';
import { createStackNavigator } from '@react-navigation/stack';
import RunnerList from '../../component/RunnerList';
import RunnerView from '../../component/RunnerView';
import instance from '../../services/Axious';

export default function RunnerManage({navigation}) {

    const Stack = createStackNavigator();
    const [selectRunner,setSelectRunner] = useState({});

  return (
    <>
        <Stack.Navigator>
            <Stack.Screen name="RunnerList" options={{ headerShown: false }}>
                {props => <RunnerList setRunner={(item)=>{setSelectRunner(item)}}/>}
            </Stack.Screen>
            <Stack.Screen name="RunnerView" options={{ headerShown: false }}>
                {props => <RunnerView runner={selectRunner}/>}
            </Stack.Screen>
        </Stack.Navigator>               
    </>
  )
}