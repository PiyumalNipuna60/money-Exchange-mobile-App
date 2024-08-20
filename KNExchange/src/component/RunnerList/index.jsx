import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView,View ,StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { PaperProvider, Text, TextInput } from "react-native-paper"
import TextField from '../../common/TextField/TextField';
import CustomerListItem from '../CustomerListItem';
import ModalCustomerView from '../ModalCustomerView';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import instance from '../../services/Axious';
import ModalAddNewAccount from '../ModalAddNewAccount';
import ModalCustomerAccountsView from '../ModalCustomerAccountsView';
import { useNavigation } from '@react-navigation/native';
import RunnerListItem from '../RunnerListItem';
import ModalAddNewRunner from '../ModalAddNewRunner';
import ChangePassword from '../../page/ChangePassword';

export default function RunnerList({setRunner}) {

    const navigation = useNavigation();

    const [runnerList , setRunnerList] = useState([]);
    const [runnerList2 , setRunnerList2]= useState([]);
    const [selectedRunner, setSelectedRunner] = useState({});
    const [visible,setVisible] = useState(false);
    const [changePwordVisible,setChangePwordVisible] = useState(false);
   

    const getAllRunners = async ()=>{
        const res = await instance.post('/user/get_user_info_by_token',{role:'Partner'});
        instance.get(`/runner/get_all_runner_employee_wise/${res.data.employeeId}`)
            .then(function (response){
                setRunnerList(response.data)
                setRunnerList2(response.data)
            })
            .catch(function (error){
                console.log(error);
            });
    }

    const searchRunner = (search)=>{
        const filteredArr = runnerList2.filter(obj =>
            Object.values(obj).some(value => String(value).includes(search))
          );
        setRunnerList(filteredArr);
    }

    useEffect(()=>{
        getAllRunners();
      },[]);

  return (
    <>

        <View style={{height:"100%" , backgroundColor:"#d5f0f5"}}>
            <View style={{height:"12%",padding:12}}>

                <View style={{marginBottom:2}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('PartnerDashboard')}}>
                        <Ionicons name="return-up-back" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>RUNNERS</Text>
                    <TouchableOpacity onPress={()=>{setVisible(true)}}>
                        <Icon1 name="adduser" size={30} color="black"/> 
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingBottom:5}}>
                <View style={styles.fieldContainer}>
                    <TextField
                        label={'Search'}
                        //value={}
                        onChange={(val)=>{searchRunner(val)}}
                    />
                </View>

                <FlatList
                        data={runnerList}
                        renderItem={({item})=> <RunnerListItem item={item}  
                        onViewClick={()=>{
                            setRunner(item);
                            navigation.navigate('RunnerView');
                        }}
                        onPasswordChange={()=>{
                            setSelectedRunner(item);
                            setChangePwordVisible(true)
                        }}
                        />}
                    />
                </View>


        </View>

        {visible && 
            <ModalAddNewRunner 
                visible={visible} 
                onClose={()=>{setVisible(false)}}
                loadAllRunners={getAllRunners}
            />
        }

        {changePwordVisible && 
            <ChangePassword
                onClose={()=>{setChangePwordVisible(false)}}
                partner={selectedRunner}
                changeRole={'Runner'}
                visible={changePwordVisible}
            /> 
        }

    
        
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
       marginHorizontal:8
    },
    btn: {
        borderRadius: 7,
        width: 125,
        height:50,
        fontSize: 18,
        textAlign:'center',
        justifyContent:'center'
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'flex-end',
        marginHorizontal:10
    },
    listSenderName: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
    },
});
