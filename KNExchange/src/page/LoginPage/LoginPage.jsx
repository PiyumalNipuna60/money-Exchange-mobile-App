import { Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import TextField from '../../common/TextField/TextField';
import DesignButton from '../../common/CommonButton/CommonButton';
import instance from '../../services/Axious'
import { storeData } from '../../utils/storage/Storage';
import DropdownList from '../../common/DropdownList';
import Toast from 'react-native-toast-message';

export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role,setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const [allRoles,setAllRoles] = useState([
        { label: 'Admin', value: '1' },
        { label: 'Partner', value: '2' },
        { label: 'Runner', value: '3' },
    ])

    const signIn = () => {

        if(username && password !== ''){
            if(role !== ''){
                setLoading(true);
                setTimeout(() => {
                    login()
                    clear()
                    setLoading(false);
                }, 1000);
            }else{
                showToast('Error', "Select The Role")
            }
        }else{
            showToast('Error', "Enter Both User Name and Password")
        }
    }

    const showToast = (val1,val2) => {
        Toast.show({
          type: 'error',
          text1: val1,
          text2: val2,
          text2Style:{fontSize:17,fontFamily:'Dosis-Regular'},
          text1Style:{fontSize:15}
        });
      }

    const login = () => {
        
        instance.post('/user/login', {
            userName: username,
            password: password,
            role:role
        })
            .then(function (response) {
                if (response.data.token != null) {
                    storeData("token",response.data.token);
                    storeData("role",role);
                    if(role === 'Admin'){
                        navigation.navigate('Drawer');
                    }else if(role === 'Partner'){
                        navigation.navigate('BPartner');
                    }else if(role === 'Runner'){
                        navigation.navigate('Runner');
                    }
                   
                }else{
                    showToast("Error",'Username and Password Not Match');
                }
            })
            .catch(function (error) {
                console.log("Error " + error);
            });
    }

    const clear = () => {
        setUsername('');
        setPassword('');
    }

  
    return (
        <View style={{flex:1,justifyContent:'center',backgroundColor:'#d5f0f5'}}>

            <View style={{marginBottom:25,marginLeft:20}}>
                <Text style={{color:'black',fontSize:35,fontFamily:'Dosis-SemiBold'}}> WELCOME</Text>
                <Text style={{color:'#2089c9',fontSize:28,fontFamily:'Dosis-Regular'}}> Global Money Exchange</Text>
            </View>
            

                <View style={styles.mainView}>

                    <View style={styles.textFieldContainer}>
                        <Text style={{fontSize:19,color:'black',fontFamily:'Dosis-Regular'}}> Username</Text>
                        <View style={styles.textView}>
                            <TextField value={username} style={styles.textField} onChange={(val) => setUsername(val)} />
                        </View>

                        <Text style={{fontSize:19,color:'black',fontFamily:'Dosis-Regular'}}> Password</Text>
                        <View style={styles.textView}>
                            <TextField value={password} type={'password'} style={styles.textField} onChange={(val) => setPassword(val)} />
                        </View>
                        <Text style={{fontSize:19,color:'black',fontFamily:'Dosis-Regular'}}> Role</Text>
                        <View style={styles.textView}>
                            <DropdownList margin={''} width={''} allCurrency={allRoles} onChange={(item)=>{setRole(item.label)}} placeholder='Select Role' />
                        </View>
                    </View>

                     <View style={styles.buttonContainer} >
                            <DesignButton
                                style={styles.btn}
                                buttonColor={'#A50010'}
                                textColor={'white'}
                                rippleColor={'#64000A'}
                                label={'Login'}
                                onPress={signIn}
                        />
                    </View>

                    {loading && (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="black" />
                        </View>
                    )}
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
   
    mainView: {
        display: "flex",
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 20,
        width: "85%"
    },
    textFieldContainer: {
        width: "85%",
        marginTop: 20,
    },
    textField: {
        width: "100%",
    },
    textView: {
       paddingVertical:4
    },
    
    btn: {
        borderRadius: 6,
        width: '100%',
        fontSize: 18,
        fontFamily:'Dosis-Regular'
    },
    textContainer: {
        paddingTop: 15,
        display: 'flex',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    loaderContainer: {
        position: 'absolute',
        bottom: 'auto',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '40%',
        height: '40%',
        borderRadius:20
    },


});
