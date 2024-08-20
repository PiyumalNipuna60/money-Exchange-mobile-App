import { View, Image, StyleSheet, ActivityIndicator , ScrollView} from 'react-native';
import React, { useState } from 'react';

import {
    Text,
    Button,
    TextInput,
} from 'react-native-paper';
import CommonButton from '../../common/CommonButton/CommonButton';
import TextField from '../../common/TextField/TextField';

export default function SamplePage({navigation}) {
   
    return (
        <>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                

                <View style={styles.textContainer}>
                    <Text style={styles.headlineMedium}>Sample Page</Text>
                </View>

                <View style={styles.btnView}>
                    < CommonButton
                         style={styles.btn}
                         buttonColor={'#44357F'}
                         textColor={'white'}
                         rippleColor={'#64000A'}
                         label={'Add'}
                         //onPress={register}
                    />
                </View>

                <View style={styles.textView}>
                    <TextField 
                        label={'User Name'} 
                        //value={} 
                        style={styles.txtFields} 
                        onChange={(val) => setEmail(val)}
                    />
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
    },
    textContainer: {
        position: 'absolute',
        top: 50,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headlineMedium: {
        color: 'red',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    redText: {
        color: '#A50010',
        fontWeight: 'bold',
    },

    btnView: {
       
    },

    buttonStyle: {
        marginTop: 20,
        backgroundColor: '#A50010',
        width: 300,
        borderRadius: 7
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },
    loaderContainer: {
        position: 'absolute',
        bottom: 40,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
    },
    btn: {
        borderRadius: 7,
        width: 300,
        fontSize: 18,
    },
    txtFields: {
       width: 300 ,
       
    },
    container:{
        // borderWidth:2,
        borderRadius: 10,
        padding:10,
        margin:15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5, 
    
    }
});
