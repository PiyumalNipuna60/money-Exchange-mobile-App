import * as React from 'react';
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import  { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextField from '../../common/TextField/TextField';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../common/CommonButton/CommonButton';
import instance from '../../services/Axious';
import DropdownList from '../../common/DropdownList';

export default function ModalAddNewRate({visible = false , onClose}) {

    const [fromRate,setFromRate] = useState('');
    const [toRate,setToRate] = useState('');
    const [currencyRate,setCurrencyRate] = useState('');
    const [isExist,setIsExist] = useState(false);
    const [isRateValid,setIsRateValid] = useState(true)

    const isValid = fromRate && toRate && currencyRate && !isExist & isRateValid;

    const [allCurenncy,setAllCurrency] = useState([
        { label: 'LKR', value: '3' },
        { label: 'USD', value: '1' },
        { label: 'CAD', value: '2' },
        { label: 'EUR', value: '4' },
        { label: 'GBP', value: '4' }
    ])

    const saveRate = ()=>{

      const newRate = {
        sentCurrency: fromRate,
        receiveCurrency: toRate,
        rate: currencyRate
    }

      instance.post('/rate',newRate)
          .then(function (response){
                onClose();
          })
          .catch(function (error){
                console.log(error);
          })


    }

    const serchRate = (params)=>{
        
            instance.get('/rate/search',{params})
            .then(function (response){

                if(response.data === ''){
                   
                    setIsExist(false);
                }else{
                    setIsExist(true);
                }
                
               
            })
            .catch(function (error){
                console.log(error);
            });
    }

    const Tabs = createMaterialTopTabNavigator();
    return (
      <Portal>
          <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{backgroundColor:"#d5f0f5", padding: 4,height:"100%"}}>
             <View style={{flex:1}}>

              <View style={{height:"12%",padding:12}}>

                  <View style={{marginBottom:2}}>
                      <TouchableOpacity onPress={onClose}>
                          <Ionicons name="return-up-back" size={30} color="black"/>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.titleContainer}>
                      <Text style={styles.title}>NEW RATE</Text>
                      <TouchableOpacity onPress={()=>{}}>
                          {/* <Icon1 name="adduser" size={30} color="black"/>  */}
                      </TouchableOpacity>
                  </View>
                  
              </View>

            <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingTop:15}}>
                <View style={{}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.fieldName}>      1 </Text>
                        <DropdownList allCurrency={allCurenncy} onChange={(item)=>{
                            setFromRate(item.label);
                            if(toRate){
                                const params = {
                                    sentCurrency: item.label,
                                    receiveCurrency: toRate
                                  };

                                serchRate(params);
                            }
                            }}/>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:1}}>
                        <TextField
                            activecolor={!isRateValid ? 'red' : '#bbbcbd'}
                            onChange={(val)=>{
                                const regex = /^-?\d+(\.\d+)?$/;
                                if(regex.test(val)){
                                    setIsRateValid(true)
                                }else{
                                    setIsRateValid(false)
                                }
                                setCurrencyRate(val)}}
                           // value={contactNo}
                        />
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <DropdownList allCurrency={allCurenncy} onChange={(item)=>{
                                setToRate(item.label);
                                if(fromRate){
                                    const params = {
                                        sentCurrency: fromRate,
                                        receiveCurrency: item.label
                                      };
    
                                    serchRate(params);
                                }
                                }}/>
                        </View> 
                    </View>
                    
                    </View>

                   
                    <View style={styles.fieldContainer}>
                    < CommonButton
                    style={styles.btn}
                    label={'Save'}
                    onPress={saveRate}
                    disabled={!isValid}
                />
                    </View>

                    <Text style={{fontSize:20,color:'black',fontFamily:'Dosis-Bold',alignSelf:'center'}}>{isExist ? "Already Exist" : ''}</Text>
                    

                    

              </View>

             </View>
          </Modal>
      </Portal>
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
      color: '#73716a',
      fontSize: 25,
      fontFamily:"Dosis-Bold",
      marginBottom:4
  },
    fieldContainer: {
       margin:8
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
        justifyContent:'flex-end',
        marginHorizontal:10
    },
    listSenderName: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
    },
});