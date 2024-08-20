import React, { useState } from 'react'
import { View ,StyleSheet, TouchableOpacity } from "react-native"
import { PaperProvider, Text,Button } from "react-native-paper"
import TextField from '../../common/TextField/TextField'
import CommonButton from '../../common/CommonButton/CommonButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DropdownList from '../../common/DropdownList'
import instance from '../../services/Axious'

export default function OrderDetails({onNext,placeOrder}) {

    const [fromCurrency,setFromCurrency] = useState('');
    const [toCurrency,setToCurrency] = useState('');
    const [rate,setRate] = useState('');
    const [isExist,setIsExist] = useState(false);
    const [sendAmmount,setSendAmmount] = useState('');
    const [receiveAmmount,setReceiveAmmount] = useState('');
    const [serviceCharge,setServiceCharge] = useState('');
    const [description,setDescription] = useState('');
    const [isAmmountValid,setIsAmmountValid] = useState(false);
    const [isChargeValid,setIsChargeValid] = useState(false);

    const isValid = fromCurrency && toCurrency && isExist && sendAmmount && serviceCharge && isAmmountValid && isChargeValid

    const [allCurenncy,setAllCurrency] = useState([
        { label: 'USD', value: '1' },
        { label: 'CAD', value: '2' },
        { label: 'LKR', value: '3' },
        { label: 'ERO', value: '4' },
    ])

    const serchRate = (params)=>{
        
        instance.get('/rate/search',{params})
        .then(function (response){

            if(response.data === ''){
                setRate('NoRate')
                setIsExist(false);
            }else{
                setRate(response.data.rate)
                setIsExist(true);
            }
            
           
        })
        .catch(function (error){
            console.log(error);
        });
    }


  return (
    <>
        <View style={styles.titleContainer}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{onNext("reciever")}}>
                    <AntDesign name="leftcircleo" size={25} color="black"/>
                </TouchableOpacity>
                <Text style={{fontSize:24,color:"#4b5052",fontFamily:'Dosis-Regular',marginLeft:8}}>
                    Amount Details
                </Text>
            </View>
            
        </View>

        <View style={{height:"83%"}}>
        <>
                 
                <View style={{margin:10,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <DropdownList allCurrency={allCurenncy} onChange={(item)=>{
                        setFromCurrency(item.label);
                        if(toCurrency){
                            const params = {
                                sentCurrency: item.label,
                                receiveCurrency: toCurrency
                              };

                            serchRate(params);
                        }
                    }}/>
                    <Text style={styles.fieldName}> To </Text>
                    <DropdownList allCurrency={allCurenncy} onChange={(item)=>{
                        setToCurrency(item.label);
                        if(fromCurrency){
                            const params = {
                                sentCurrency: fromCurrency,
                                receiveCurrency: item.label                              };

                            serchRate(params);
                        }
                    }}/>
                </View>

                <View style={{flexDirection:'row',marginHorizontal:15,justifyContent:'flex-end'}}>
                    <Text style={styles.fieldName}>{1 + " " + fromCurrency + " = " + rate + " " + toCurrency}</Text>
                </View>
                
        

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Amount</Text>
                    <TextField
                        activecolor={!isAmmountValid ? 'red' : '#bbbcbd'}
                        onChange={(val)=> {

                            const regex = /^-?\d+(\.\d+)?$/;
                            if(regex.test(val)){
                                setIsAmmountValid(true)
                            }else{
                                setIsAmmountValid(false)
                            }
                            setSendAmmount(val);
                            const recAmmout = Number(rate) * Number(val);
                            setReceiveAmmount(recAmmout);
                        }}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Service Charge</Text>
                    <TextField
                        //value={}
                        activecolor={!isChargeValid ? 'red' : '#bbbcbd'}
                        onChange={(val)=>{
                            const regex = /^-?\d+(\.\d+)?$/;
                            if(regex.test(val)){
                                setIsChargeValid(true)
                            }else{
                                setIsChargeValid(false)
                            }
                            setServiceCharge(val);
                        }}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Description</Text>
                    <TextField
                        //value={}
                        onChange={(val)=> setDescription(val)}
                    />
                </View>

                <View style={{marginTop:10,marginHorizontal:15,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.fieldName}>Total Payble Amount</Text>
                    <Text style={styles.fieldName}>{Number(sendAmmount) + Number(serviceCharge) + " " + fromCurrency}</Text>
                </View>

                <View style={{marginTop:10,marginHorizontal:15,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.fieldName}>Reciever Amount</Text>
                    <Text style={styles.fieldName}>{receiveAmmount + " " + toCurrency}</Text>
                </View>

                
            </>
        </View>

        <View style={styles.buttonContainer}>
            < CommonButton
                style={styles.btn}
                label={'Place Order'}
                onPress={()=>{
                    const orderDetails = {
                        sendCurrency : fromCurrency,
                        recCurrency : toCurrency,
                        rate: rate,
                        sendAmount: sendAmmount,
                        recAmmount: receiveAmmount,
                        servCharge:serviceCharge,
                        desc:description
                    }

                    placeOrder(orderDetails);
                }}
                disabled={!isValid}
            />
        </View>

    </>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        //flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",   
        paddingVertical:3,
        paddingHorizontal:8,
        height:"7%",
        //borderWidth:2
    },
    title: {
        color: '#44357F',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fieldName: {
        color: '#73716a',
        fontSize: 18,
        //fontWeight: 'bold',
        fontFamily:"Dosis-Regular"
    },
    fieldContainer: {
       margin:10
    },
    btn: {
        borderRadius: 8,
        width: "100%",
        height:50,
        fontSize: 18,
        textAlign:'center',
        justifyContent:'center'
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems: "center",
        height:"10%",
        //borderWidth:2,
        paddingHorizontal:7
    },
    listSenderName: {
        color:'#919190'
     },
});