import * as React from 'react';
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import  { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextField from '../../common/TextField/TextField';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../common/CommonButton/CommonButton';
import instance from '../../services/Axious';

export default function ModalAddNewAccount({visible = false , onClose,cusId,loadAll}) {

    const [name,setName] = useState('');
    const [accountNo,setAccountNo] = useState('');
    const [bank,setBank] = useState('');

    const isValid = name && accountNo && bank;


    const saveAccount = ()=>{

      const account = {
        name: name,
        accountNo: accountNo,
        bank: bank,
        branch: "No",
        country: "Lanka",
        customerId:cusId
    }

      instance.post('/account',account)
          .then(function (response){
                console.log("Ssuccess")
                loadAll();
                onClose();
          })
          .catch(function (error){
                console.log(error);
          })


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
                      <Text style={styles.title}>NEW ACCOUNT</Text>
                      <TouchableOpacity onPress={()=>{}}>
                          {/* <Icon1 name="adduser" size={30} color="black"/>  */}
                      </TouchableOpacity>
                  </View>
                  
              </View>

              <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingTop:15}}>
              <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Account Name</Text>
                        <TextField
                            onChange={(val)=>{setName(val)}}
                             //value={name}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Bank </Text>
                        <TextField
                            onChange={(val)=>{setBank(val)}}
                           // value={nic}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Account No </Text>
                        <TextField
                            onChange={(val)=>{setAccountNo(val)}}
                           // value={contactNo}
                        />
                    </View>

        

                    <View style={styles.fieldContainer}>
                    < CommonButton
                    style={styles.btn}
                    label={'Save'}
                    onPress={saveAccount}
                    disabled={!isValid}
                />
                    </View>
                    

                    

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
});