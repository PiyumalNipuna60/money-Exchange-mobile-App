import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView,View ,StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { PaperProvider, Text, TextInput } from "react-native-paper"
import TextField from '../../common/TextField/TextField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { MD3Colors  } from 'react-native-paper';
import BPListItem from '../../component/BPListItem';
import ModalBusinessPartView from '../../component/ModalBusinessPartView';
import CustomerListItem from '../../component/CustomerListItem';
import ModalCustomerView from '../../component/ModalCustomerView';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import instance from '../../services/Axious';
import ModalAddNewAccount from '../../component/ModalAddNewAccount';
import DropdownList from '../../common/DropdownList';
import RateItem from '../../component/RateItem';
import ModalAddNewRate from '../../component/ModalAddNewRate';

export default function ExchangeRates({navigation}) {

    const [visible,setVisible] = useState(false);
    const [fromCurrency,setFromCurrency] = useState(null);
    const [toCurrency,setToCurrency] = useState(null);
    const [isRateFound,setIsRateFound] = useState(true);

    const [allCurenncy,setAllCurrency] = useState([
        { label: 'LKR', value: '3' },
        { label: 'USD', value: '1' },
        { label: 'CAD', value: '2' },
        { label: 'EUR', value: '4' },
        { label: 'GBP', value: '4' }
    ])

    const [ratesList,setRatesList] = useState([])

    

    const serchRate = ()=>{

        const params = {
            sentCurrency: fromCurrency,
            receiveCurrency: toCurrency
          };

        if(fromCurrency && toCurrency){
           
            instance.get('/rate/search',{params})
            .then(function (response){

                if(response.data === ''){
                    setRatesList([])
                }else{
                    const res = response.data;
                    const arr = []
                    arr.push(res);
                    setRatesList(arr)
                }
                
               
            })
            .catch(function (error){
                console.log(error);
            });
        }
    }

    const getAllRates = ()=>{
        // instance.get('/rate')
        //     .then(function (response){
        //         //setRatesList(response.data)
        //         console.log(response.data);
        //     })
        //     .catch(function (error){
        //         console.log(error);
        //     });
    }

    useEffect(()=>{
        getAllRates();
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
                    <Text style={styles.title}>Exchange Rates</Text>
                    <TouchableOpacity onPress={()=>{setVisible(true)}}>
                        <Icon1 name="plus" size={30} color="black"/> 
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%"}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                    <DropdownList allCurrency={allCurenncy} onChange={(item)=>{
                        setFromCurrency(item.label);
                    }}/>
                    
                    <DropdownList allCurrency={allCurenncy} onChange={(item)=>{
                        setToCurrency(item.label);
                    }}/>
                    <TouchableOpacity onPress={serchRate}>
                        <Ionicons name="search" size={30} color="black"/>
                    </TouchableOpacity>
                    
                </View>

                {isRateFound ? 
                    <FlatList
                        data={ratesList}
                        renderItem={({item})=>
                                <RateItem item={item}/>
                            }
                    />

                    :

                    <></>
                }
            </View>


        </View>

    

        {visible && 
            <ModalAddNewRate visible={visible} onClose={()=>{setVisible(false)}} />

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
