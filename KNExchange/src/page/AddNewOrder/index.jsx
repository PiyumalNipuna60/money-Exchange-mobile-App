import React, { useState,useEffect } from 'react'
import { Text, View , StyleSheet, TouchableOpacity} from 'react-native'
import { Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import instance from '../../services/Axious';
import ModalCustomerSelect from '../../component/ModalCustomerSelect';
import ModalCustomerAccountSelect from '../../component/ModalCustomerAccountSelect';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DropdownList from '../../common/DropdownList'
import TextField from '../../common/TextField/TextField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddNewOrder({navigation}) {
 
    const [senderVisible,setSenderVisible] = useState(false);
    const [recieverVisible,setRecieverVisible] = useState(false);
    const [client,setClient] = useState({});
    const [account,setAccount] = useState({});

    const [isNewClent,setIsNewClent] = useState(false);
    const [isNewReciever,setIsNewReciever] = useState(false)

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

    const isValid = fromCurrency && toCurrency && isExist && sendAmmount && serviceCharge && isAmmountValid && isChargeValid && Object.keys(client).length !== 0 && Object.keys(account).length !== 0

    const [allCurenncy,setAllCurrency] = useState([
        { label: 'LKR', value: '3' },
        { label: 'USD', value: '1' },
        { label: 'CAD', value: '2' },
        { label: 'EUR', value: '4' },
        { label: 'GBP', value: '4' }
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







    const placeOrder = ()=>{
      
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
    
      let order = {}
      if(isNewClent && isNewReciever){
          order = {
            sender : {

            },
            receiver : {

            },
            amountDetails: orderDetails
          }
      }else if(isNewClent){
         order = {
            sender: client,
            receiver : {},
            amountDetails: orderDetails
         }
      }else if(isNewReciever){
        order = {
          sender: {},
          receiver : account,
          amountDetails: orderDetails
       }
      }else{

        order = {

          date: formattedDate,
          sentCurrency:fromCurrency,
          receiveCurrency:toCurrency,
          rate:rate,
          sentAmount:sendAmmount,
          receiveAmount:receiveAmmount,
          serviceCharge:serviceCharge,
          description:description,
          customerId:client.customerId,
          accountId:account.accountId
        }
      }

      instance.post('/order',order)
              .then(function (response){
                navigation.navigate("Transacations");
              })
              .catch(function (error){
                console.log(error);
              })
    }

  return (
    <>
      <View style={{height:"100%" , backgroundColor:"#d5f0f5"}}>

        <View style={{height:"12%",padding:10}}>

            <View style={{marginBottom:2}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Transacations')}}>
                  <Ionicons name="return-up-back" size={30} color="black"/>
              </TouchableOpacity>
            </View>

            <View style={{}}>
                <Text style={styles.title}>NEW ORDER</Text>
            </View>
            
        </View>

        <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%"}}>
            
            <TouchableOpacity onPress={()=>{setSenderVisible(true)}}>
                <View style={{height:75,margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:8,elevation:3}}>
                    <Text style={{fontSize:18,color:'#898c8a',fontFamily:'Dosis-Bold'}}>From</Text>
                    <View style={{margin:4,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:18,color:'#898c8a',fontFamily:'Dosis-Regular'}}>{client.firstName}</Text>
                        <Text style={{fontSize:18,color:'#898c8a',fontFamily:'Dosis-Regular'}}>{client.contact}</Text>
                    </View>
                    <Divider bold={true} style={{backgroundColor:'#c7c7c7',marginBottom:8}}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setRecieverVisible(true)}}>
                <View style={{height:75,margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:8,elevation:3}}>
                    <Text style={{fontSize:18,color:'#898c8a',fontFamily:'Dosis-Bold'}}>To</Text>
                    <View style={{margin:4,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:18,color:'#898c8a',fontFamily:'Dosis-Regular'}}>{account.bank}</Text>
                        <Text style={{fontSize:18,color:'#898c8a',fontFamily:'Dosis-Regular'}}>{account.accountNo}</Text>
                    </View>
                    <Divider bold={true} style={{backgroundColor:'#c7c7c7',marginBottom:8}}/>
                </View>
            </TouchableOpacity>

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

            <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>

           

            <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Amount</Text>
                    <TextField
                        bdrWidth={0.5}
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
                        bdrWidth={0.5}
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
                        bdrWidth={0.5}
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

                <View style={{marginHorizontal:10,marginTop:15}}>
                    < CommonButton
                        style={styles.btn}
                        label={'Place Order'}
                        onPress={()=>{placeOrder()}}
                        disabled={!isValid}
                    />
                </View>

                </KeyboardAwareScrollView>


        </View>
      </View>


      {senderVisible && 
        <ModalCustomerSelect 
            visible={senderVisible}
            onClose={()=>{setSenderVisible(false)}}
            onItemClick={(val)=>{
                setClient(val)
                setSenderVisible(false)
            }}
        />
      }

      {recieverVisible && 
        <ModalCustomerAccountSelect 
            onClose={()=>{setRecieverVisible(false)}}
            visible={recieverVisible}
            onItemClick={(val)=>{
                setAccount(val)
                setRecieverVisible(false)
            }}/>
      }
    </>
  )
}

const styles = StyleSheet.create({
    title: {
      color: '#1d86f0',
      fontSize: 26,
      textAlign: 'left',
      fontFamily:'Dosis-Bold'
    },
    stepCircle: {
      width:28,
      height:28,
      borderWidth:1,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',

      backgroundColor:"#07CAB6",
      borderColor: "#07CAB6",
      marginHorizontal:8
    },
    fieldName: {
        color: '#73716a',
        fontSize: 18,
        //fontWeight: 'bold',
        fontFamily:"Dosis-Regular"
    },
    fieldContainer: {
        marginHorizontal:15,
        marginVertical:4,
        //borderBottomWidth:0.5
     },
     btn: {
        borderRadius: 8,
        width: "100%",
        height:50,
        fontSize: 18,
        textAlign:'center',
        justifyContent:'center'
    },
});
