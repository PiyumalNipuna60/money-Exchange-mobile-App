import React, { useState,useEffect } from 'react'
import { Text, View , StyleSheet, TouchableOpacity} from 'react-native'
import SenderDetails from '../../component/SenderDetails/SenderDetails';
import RecieverDetails from '../../component/RecieverDetails/RecieverDetails';
import OrderDetails from '../../component/OrderDetails/OrderDetails';
import { Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import instance from '../../services/Axious';

export default function NewOrder({navigation}) {
    const [align,setAlign] = useState('sender');

    const [client,setClient] = useState(null);
    const [account,setAccount] = useState(null);
    const [isNewClent,setIsNewClent] = useState(false);
    const [isNewReciever,setIsNewReciever] = useState(false)

    const placeOrder = (orderDetails)=>{
      
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
          //date: "2024-06-15",
          date: formattedDate,
          sentCurrency:orderDetails.sendCurrency,
          receiveCurrency:orderDetails.recCurrency,
          rate:orderDetails.rate,
          sentAmount:orderDetails.sendAmount,
          receiveAmount:orderDetails.recAmmount,
          serviceCharge:orderDetails.servCharge,
          description:orderDetails.desc,
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

        <View style={{height:"18%",padding:10}}>

            <View style={{marginBottom:2}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Transacations')}}>
                  <Ionicons name="return-up-back" size={30} color="black"/>
              </TouchableOpacity>
            </View>

            <View style={{}}>
                <Text style={styles.title}>NEW ORDER</Text>
            </View>
            

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                
                <View style={{alignItems:'center',}}>
                  <View style={styles.stepCircle}>
                    <Text style={{fontSize:15}}>1</Text>
                  </View>
                  <Text style={{fontSize:14,color:'black',fontFamily:'Dosis-Regular'}}>Client</Text>
                </View>
                
                <Divider style={{marginBottom:18,width:25,height:2,backgroundColor:'gray'}}/>

                <View style={{alignItems:'center'}}>
                  <View style={styles.stepCircle}>
                    <Text style={{fontSize:15}}>2</Text>
                  </View>
                  <Text style={{fontSize:14,color:'black',fontFamily:'Dosis-Regular'}}>Receiver</Text>
                </View>
                <Divider style={{marginBottom:18,width:25,height:2,backgroundColor:'gray'}}/>

                <View style={{alignItems:'center'}}>
                  <View style={styles.stepCircle}>
                    <Text style={{fontSize:15}}>3</Text>
                  </View>
                  <Text style={{fontSize:14,color:'black',fontFamily:'Dosis-Regular'}}>Order</Text>
                </View>
            </View>
          
        </View>

        <View style={{height:"80%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%"}}>
        {
            align === "sender" ? 
                  <>
                      <SenderDetails 
                          selectedClient={client}
                          isClientNew={isNewClent}
                          onNext={(val,client,isNew)=>{
                            setAlign(val);
                            setClient(client);
                            setIsNewClent(isNew);
                          }}
                      />
                  </> 
            : align === "reciever" ? 
                    <>
                        <RecieverDetails 
                            selectedAccount={account}
                            isReceiverNew={isNewReciever}
                            onNext={(val,account,isNew)=>{
                                setAlign(val)
                                setAccount(account)
                                setIsNewReciever(isNew)
                            }}
                        />
                    </> 
            : <><OrderDetails 
                      onNext={(val)=>{setAlign(val)}}
                      placeOrder={placeOrder}
                /></>
        }            
        </View>
      </View>
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

     
      // //backgroundColor: filled ? '#07CAB6' : 'transparent',
      // //border: `2px solid ${filled ? '#07CAB6' : '#07CAB6'}`,
      // //color: filled ? '#fff' : '#07CAB6',
    }
});
