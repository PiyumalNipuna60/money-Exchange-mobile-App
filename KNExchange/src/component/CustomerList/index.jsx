import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView,View ,StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native"
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker from 'react-native-country-picker-modal'

export default function CustomerList({setCustomer}) {

    const navigation = useNavigation();


    const [customerList , setCustomerList] = useState([]);
    const [customerList2 , setCustomerList2]= useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [visible,setVisible] = useState(false);
    const [viewAccountvisible,setViewAccountvisible] = useState(false);
    const [addAccountvisible,setAddAccountVisible] = useState(false);

    const getAllCustomers = ()=>{
        instance.get('/customer')
            .then(function (response){
                setCustomerList(response.data)
                setCustomerList2(response.data)
            })
            .catch(function (error){
                console.log(error);
            });
    }

    const searchCustomer = (search)=>{
        const filteredArr = customerList2.filter(obj =>
            Object.values(obj).some(value => String(value).includes(search))
          );
        setCustomerList(filteredArr);
    }

    useEffect(()=>{
        getAllCustomers();
      },[]);

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
                    <Text style={styles.title}>CUSTOMERS</Text>
                    <TouchableOpacity onPress={()=>{setVisible(true)}}>
                        <Icon1 name="adduser" size={30} color="black"/> 
                    </TouchableOpacity>
                   
                   
                </View>
            </View>

            <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingBottom:5}}>
                <View style={styles.fieldContainer}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>
                    <TextField
                        label={'Search'}
                        //value={}
                        onChange={(val)=>{
                            searchCustomer(val)
                        }}
                    />
                    </KeyboardAwareScrollView>
                   
                
                    
                </View>

                <FlatList
                        data={customerList}
                        renderItem={({item})=> 
                            <CustomerListItem 
                                item={item} 
                                onViewClick={()=>{
                                    setSelectedCustomer(item)
                                    setViewAccountvisible(true)
                                }}
                                onAddAccountClick={()=>{
                                    setSelectedCustomer(item)
                                    setAddAccountVisible(true);
                                }}
                                onItemClick={()=>{
                                    setCustomer(item);
                                    navigation.navigate('CustomerOrdrs');
                                }}
                            />}
                    />
                </View>


        </View>

        {/* Customer Add modal */}
        {visible && 
            <ModalCustomerView 
                visible={visible} 
                onClose={()=>{setVisible(false)}}
                loadAllCustomers={getAllCustomers}
            />
        }

        {addAccountvisible &&
            <ModalAddNewAccount
                visible={addAccountvisible}
                onClose={()=>{setAddAccountVisible(false)}}
                cusId={selectedCustomer.customerId}
                loadAll={()=>{
                    getAllCustomers();
                }}
            />
        }

        {viewAccountvisible && 
            <ModalCustomerAccountsView
                visible={viewAccountvisible}
                onClose={()=>{setViewAccountvisible(false)}}
                customer={selectedCustomer}
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
