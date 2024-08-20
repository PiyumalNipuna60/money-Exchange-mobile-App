import * as React from 'react';
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import  { useState, useMemo ,useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextField from '../../common/TextField/TextField';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../common/CommonButton/CommonButton';
import instance from '../../services/Axious';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker from 'react-native-country-picker-modal'
import PhoneInput from "react-native-phone-number-input";


export default function ModalCustomerView({visible = false , onClose,loadAllCustomers}) {

    const [name,setName] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [nic,setNic] = useState('');
    const [address,setaddress] = useState('');
    const [country,setcountry] = useState('');
    const [code,setCode] = useState('');

    // phone input
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    const [isContactNoValid,setIsContactNoValid] = useState(false);

    const isValid = name && contactNo && nic && address && country && isContactNoValid; 

    const clrFields = ()=>{
      setName('');
      setNic('')
      setContactNo('');
      setcountry('');
      setaddress('');
    }

    const saveCustomer = ()=>{

      const customer = {
        firstName: name,
        address: address,
        contact: contactNo,
        nic: nic,
        country: country,
        employeeId: "1",
        amount: 100,
        lastName: "Z"
      }

      instance.post('/customer',customer)
          .then(function (response){
                loadAllCustomers();
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
                      <Text style={styles.title}>NEW CUSTOMER</Text>
                      <TouchableOpacity onPress={()=>{}}>
                          {/* <Icon1 name="adduser" size={30} color="black"/>  */}
                      </TouchableOpacity>
                  </View>
                  
              </View>

              <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%",paddingTop:15}}>
                   <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}> 
                    
                    
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Full Name</Text>
                        <TextField
                            onChange={(val)=>{setName(val)}}
                             //value={name}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>NIC </Text>
                        <TextField
                            onChange={(val)=>{setNic(val)}}
                           // value={nic}
                        />
                    </View>

                    {/* <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Contact No </Text>
                        <TextField
                            activecolor={!isContactNoValid ? 'red' : '#bbbcbd'}
                            onChange={(val)=>{
                                const regex = /^-?\d+(\.\d+)?$/;
                                if(regex.test(val)){
                                    setIsContactNoValid(true)
                                }else{
                                    setIsContactNoValid(false)
                                }
                                setContactNo(val)
                            }}
                           // value={contactNo}
                        />
                    </View> */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Contact No </Text>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="LK"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                                setIsContactNoValid(phoneInput.current?.isValidNumber(text));
                                
                            }}
                            onChangeFormattedText={(text) => {
                                setContactNo(text)
                            }}
                            containerStyle={{borderWidth:1,borderColor:'#ebe9e4',borderRadius:10,height:55,width:'100%'}}
                            textContainerStyle={{borderRadius:10,height:55}}
                            textInputStyle={{fontFamily:'Dosis-Regular',color:'#73716a',height:55}}
                            
                        />
                    </View>


                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Address</Text>
                        <TextField
                            onChange={(val)=>{setaddress(val)}}
                            //value={address}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Select Country</Text>
                        <CountryPicker 
                           
                            withFilter
                            withEmoji
                            containerButtonStyle={{borderWidth:1,borderColor:'#ebe9e4',borderRadius:4,padding:10}}
                            onSelect={(val)=>{
                                setCode(val.cca2)
                                setcountry(val.name)
                            }}
                            countryCode={code}
                            withCountryNameButton
                            theme={{ 
                                fontSize:17,
                                onBackgroundTextColor:'gray',
                                fontFamily:'Dosis-Regular'
                            }} 
                        
                        />
                    </View>
                    
                    </KeyboardAwareScrollView> 

                   

                    <View style={styles.fieldContainer}>
                    < CommonButton
                    style={styles.btn}
                    label={'Save'}
                    onPress={saveCustomer}
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