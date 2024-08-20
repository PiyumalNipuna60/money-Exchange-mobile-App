import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider,Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function OrderItemViewModal({visible = false , onClose,order}) {


  return (
    <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{backgroundColor: 'white', padding: 10,height:"100%"}}>
            
            <ScrollView>
            <View style={{height:"100%"}}>

                <View style={{marginVertical:12}}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="return-up-back" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                    <Text style={styles.mainText}>{"Ref No" + "  " + order.referenceNo }</Text>
                    <Text style={styles.middleText}> {order.status === 'complete' ? "Completed" : 'Pending'} </Text>
                </View>

                <Divider bold={true} style={{marginTop:8,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                <View style={{flexDirection:'row',justifyContent:''}}>
                    <View style={{flex:1}}>
                        <View>
                            <Text style={styles.text}>Order on  </Text>
                            <Text style={styles.text}>{order.date}  </Text>
                        </View>
                        <View style={{marginTop:3}}>
                            <Text style={styles.text}>Completed on  </Text>
                            <Text style={styles.text}>{order.paymentDetailsGetDto[0]?.completeDate}  </Text>
                        </View>
                        
                    </View>

                    <View style={{flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                        <View>
                            <Text style={styles.text}>Send Amount     </Text>
                            <Text style={styles.text}>{order.sentCurrency + " " + order.sentAmount}</Text>
                        </View>
                        <View style={{marginTop:3}}>
                            <Text style={styles.text}>Receive Amount</Text>
                            <Text style={styles.text}>{order.receiveCurrency + " " + order.receiveAmount}</Text>
                        </View>
                    </View>
                </View>

                <Divider bold={true} style={{marginVertical:15,backgroundColor:'#c7c7c7'}}/>

                <View style={{borderRadius:6,backgroundColor:'#ededed',padding:6}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Sender</Text>
                        <Text style={styles.middleText}>{order.customer?.firstName}</Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                    <View style={{margin:6}}>
                        <Text style={styles.text}>{order.customer?.address + " , " + order.customer?.country} </Text>
                    </View>
                    <View style={{margin:6,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.text}>{order.customer?.contact} </Text>
                        <Text style={styles.text}>{order.customer?.nic} </Text>
                    </View>

                </View>

                <View style={{borderRadius:6,backgroundColor:'#ededed',padding:6,marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Reciever</Text>
                        <Text style={styles.middleText}>{order.account.customer?.firstName} </Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                    <View style={{margin:6}}>
                        <Text style={styles.text}>{order.account.customer?.address + " , " + order.account.customer?.country}  </Text>
                    </View>
                    <View style={{margin:6,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.text}>{order.account.customer?.contact}  </Text>
                        <Text style={styles.text}>{order.account.customer?.nic}  </Text>
                    </View>
                    <View style={{margin:6}}>
                        <Text style={styles.text}>{order.account.name} </Text>
                    </View>
                    <View style={{margin:6,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.text}>{order.account.bank} </Text>
                        <Text style={styles.text}>{order.account.accountNo} </Text>
                    </View>
                    

                </View>

                <View style={{backgroundColor:'#ededed',padding:6,marginTop:10,borderRadius:6}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Money Deposit Partner</Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                   {order.paymentDetailsGetDto.length === 0 ?
                
                    <View style={{margin:5}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                            <Text style={styles.middleText}>Not Assign</Text>         
                        </View>
                    </View> 
                   :
                    <View style={{margin:5}}>
                    
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                            <Text style={styles.text}>{order.paymentDetailsGetDto[0].employee.fistName}</Text>
                            <Text style={styles.text}>{order.paymentDetailsGetDto[0].employee.contact}</Text>
                        </View>
                        <View style={{margin:6}}>
                            <Text style={styles.text}>{order.paymentDetailsGetDto[0].employee.country}</Text>
                        </View>

                    </View> 
                   }
                </View>

                <View style={{borderRadius:6,backgroundColor:'#ededed',padding:6,marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Deposit Slip</Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                    {order.paymentDetailsGetDto.length === 0 || order.paymentDetailsGetDto[0]?.image === null ? 
                        <><Text style={styles.middleText}>Pending</Text></>  
                        : 
                        <View style={styles.imgContainer}>
                            <Image
                                source={{uri: `http://89.116.20.123:8080/api-0.0.1-SNAPSHOT/${order.paymentDetailsGetDto[0]?.image}`}}
                                style={styles.img}
                            />
                        </View>
                    }
                </View>
                
            </View>
                
            </ScrollView>
             
        </Modal>
    </Portal>
  )
}


const styles = StyleSheet.create({
    text: {
        color: '#70706e',
        fontSize: 16,
        fontFamily:"Dosis-Regular"
    },
    mainText: {
        color: '#2e2e2d',
        fontSize: 23,
        fontFamily:"Dosis-Bold"
    },
    middleText: {
        color: '#474747',
        fontSize: 20,
        fontFamily:"Dosis-Regular"
    },
    imgContainer:{
        //height:360,
        //width:275,
        //borderWidth:1,
        flexDirection:'row',
        justifyContent:'center',
        //borderColor:'gray',
        //borderRadius:8

    },
    img:{
       
        borderRadius:8,
        width:280,
        height:360,
        borderWidth:2
    }
});