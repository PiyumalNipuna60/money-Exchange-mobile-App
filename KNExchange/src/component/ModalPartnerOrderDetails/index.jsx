import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider,Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function ModalPartnerOrderDetails({visible = false , onClose,item}) {

    
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
                    <Text style={styles.mainText}>{"Ref No" + "  " + item.order.referenceNo }</Text>
                    <Text style={styles.middleText}> {item.order.status === 'complete' ? "Completed" : 'Pending'} </Text>
                </View>

                <Divider bold={true} style={{marginTop:8,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                <View style={{flexDirection:'row',justifyContent:''}}>
                    <View style={{flex:1}}>
                        <View>
                            <Text style={styles.text}>Order on  </Text>
                            <Text style={styles.text}>{item.order.date}  </Text>
                        </View>
                        <View style={{marginTop:3}}>
                            <Text style={styles.text}>Completed on  </Text>
                            <Text style={styles.text}>{item.completeDate}  </Text>
                        </View>
                        
                    </View>

                    <View style={{flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                        {/* <View>
                            <Text style={styles.text}>Send Amount     </Text>
                            <Text style={styles.text}>1000</Text>
                        </View> */}
                        <View style={{marginTop:3}}>
                            <Text style={styles.text}>Ammount</Text>
                            <Text style={styles.text}>{item.order.receiveCurrency + " " + item.runnerAmount}</Text>
                        </View>
                    </View>
                </View>

                <Divider bold={true} style={{marginVertical:15,backgroundColor:'#c7c7c7'}}/>


                <View style={{borderRadius:6,backgroundColor:'#ededed',padding:6,marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Account Details</Text>
                        <Text style={styles.middleText}>{item.order.account.customer.firstName} </Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                    <View style={{margin:6}}>
                        <Text style={styles.text}>{item.order.account.customer.address + " , " + item.order.account.customer.country} </Text>
                    </View>
                    <View style={{margin:6,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.text}>{item.order.account.customer.contact}  </Text>
                        <Text style={styles.text}>{item.order.account.customer.nic} </Text>
                    </View>
                    <View style={{margin:6}}>
                        <Text style={styles.text}>{item.order.account.name} </Text>
                    </View>
                    <View style={{margin:6,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.text}>{item.order.account.bank}</Text>
                        <Text style={styles.text}>{item.order.account.accountNo} </Text>
                    </View>
                    

                </View>

                <View style={{backgroundColor:'#ededed',padding:6,marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Runner</Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                    <View style={{margin:5}}>
                        {item.runner === null ?
                            <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                            <Text style={styles.text}>Runner Not Assign</Text>
                        </View>
                        :
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                            <Text style={styles.text}>{item.runner.name}</Text>
                            <Text style={styles.text}>{item.runner.contact} </Text>
                        </View>
                        }
                       
                    </View>
                </View>

                <View style={{backgroundColor:'#ededed',padding:6,marginTop:10}}>
                     <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
                        <Text style={styles.middleText}>Money Deposit Receipt</Text>
                    </View>

                    <Divider bold={true} style={{marginTop:2,backgroundColor:'#c7c7c7',marginBottom:8}}/>

                    {item.image === null ?
                         
                     
                       <View style={{margin:6}}>
                       <Text style={styles.middleText}>Pending</Text>
                       </View>
                      
                        :
                        <View style={styles.imgContainer}>
                        <Image 
                            source={{uri: `http://89.116.20.123:8080/api-0.0.1-SNAPSHOT/${item.image}`}}
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
        fontSize: 18,
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
        flexDirection:'row',
        justifyContent:'center'
    },
    img:{
       
        borderRadius:8,
        width:275,
        height:360,
        borderWidth:2
    }
});