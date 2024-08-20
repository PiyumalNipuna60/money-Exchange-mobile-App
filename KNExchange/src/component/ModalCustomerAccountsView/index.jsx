import * as React from 'react';
import { Text, View ,StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider, Divider } from 'react-native-paper';
import  { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextField from '../../common/TextField/TextField';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../common/CommonButton/CommonButton';
import instance from '../../services/Axious';

export default function ModalCustomerAccountsView({visible = false , onClose,customer}) {

    const [accounts,setAccounts] = useState([]);

    const Tabs = createMaterialTopTabNavigator();

    const AccountListItem = ({item})=>{
        return(
            <View style={{margin:8,backgroundColor:'#f7f7f7',borderRadius:7,padding:10,elevation:3}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:18,color:'#636363',fontFamily:'Dosis-SemiBold'}}>{item.bank}</Text>
                <Text style={{fontSize:18,color:'#636363',fontFamily:'Dosis-SemiBold'}}>{item.accountNo}</Text>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
  
            <Divider bold={true} style={{backgroundColor:'#c7c7c7',marginTop:2}}/>
                  
            
          </View>
        )
    }

    React.useEffect(()=>{
        setAccounts(customer.accounts)
    },[])

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
                      <Text style={styles.title}>{customer.firstName}</Text>
                      <TouchableOpacity onPress={()=>{}}>
                          {/* <Icon1 name="adduser" size={30} color="black"/>  */}
                      </TouchableOpacity>
                  </View>
                  
              </View>

              <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingTop:15}}>
              
              <SafeAreaView>
                    <FlatList
                        data={accounts}
                        renderItem={({item})=> <AccountListItem item={item}/>}
                    />
                </SafeAreaView>

                   
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
      fontSize: 15,
      fontFamily:"Dosis-Regular",
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
    text: {
        color: '#636363',
        fontSize: 17,
        fontFamily:'Dosis-Regular'
    },
});