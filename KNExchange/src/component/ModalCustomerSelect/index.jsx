import React, { useState,useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import TextField from '../../common/TextField/TextField';
import instance from '../../services/Axious';


export default function ModalCustomerSelect({visible = false , onClose,onItemClick}) {

    const [senderList , setSenderList] = useState([]);
    const [senderList2 , setSenderList2] = useState([]);

    const getAllCustomers = ()=>{
        instance.get('/customer')
            .then(function (response){
                setSenderList(response.data);
                setSenderList2(response.data);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    const searchSender = (search)=>{
        const filteredArr = senderList2.filter(obj =>
            Object.values(obj).some(value => String(value).includes(search))
          );
        setSenderList(filteredArr);
    }

    useEffect(()=>{
            getAllCustomers();
    },[]);


    const ClientItem = ({val})=>{
        return(
            <TouchableOpacity onPress={()=>{onItemClick(val)}}>
                <View style={{marginHorizontal:10,marginTop:10,backgroundColor:'#f0eee9',padding:8,borderRadius:7}}>
            <Text style={styles.listSenderName}>{val.firstName}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={styles.listSenderName}>{val.contact}</Text>
                </View>
                <View>
                    <Text style={styles.listSenderName}>{val.nic}</Text>
                </View>
            

            </View>
        </View>
            </TouchableOpacity>
        )
    }



  return (
    <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{backgroundColor: 'white', padding: 20,height:"100%"}}>
            <View style={{flex:1}}>

                <View style={{marginHorizontal:8}}>
                        <TextField
                            label={'Search Sender'}
                            onChange={(val)=>{
                                searchSender(val)
                            }}
                           
                        />
                    </View>

                     <FlatList
                        data={senderList}
                        renderItem={({item})=> <ClientItem val={item}/>}
                    />

                </View> 
        </Modal>
    </Portal>
  )
}


const styles = StyleSheet.create({
    title: {
      color: '#1d86f0',
      fontSize: 26,
      textAlign: 'left',
      fontFamily:'Dosis-Bold'
    },
    listSenderName: {
        color:'#919190'
     },
});
