import React, { useEffect, useState } from 'react'
import { View ,StyleSheet ,ScrollView, TouchableOpacity, FlatList} from "react-native"
import { Button, PaperProvider, Text } from "react-native-paper"
import TextField from '../../common/TextField/TextField'
import CommonButton from '../../common/CommonButton/CommonButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import instance from '../../services/Axious'

export default function SenderDetails({onNext,selectedClient,isClientNew}) {

    const [senderList , setSenderList] = useState([]);
    const [senderList2 , setSenderList2] = useState([]);
    const [isNew , setIsNew] = useState(isClientNew)
    const [client,setClient] = useState(selectedClient);

    const [name,setName] = useState('');
    const [nic,setNic] = useState('');
    const [address,setAddress] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [country,setCountry] = useState('');

    const isValid = isNew ? name && nic && address && contactNo && country : client ? true : false;
 
    const ClientItem = ({val})=>{
        return(
            <TouchableOpacity onPress={()=>{setClient(val)}}>
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


  return (
    <>
        <View style={styles.titleContainer}>
            <Text style={{fontSize:24,color:"#4b5052",fontFamily:'Dosis-Regular'}}>
                {isNew ? "Client Details" : client ?client.firstName : "Select Client"}
            </Text>
            <TouchableOpacity onPress={()=>{
                if(isNew){
                    setIsNew(false)
                }else{
                    setIsNew(true)
                }
            }}>
                {/* {isNew ? <AntDesign name="search1" size={25} color="black"/> : <AntDesign name="adduser" size={25} color="black"/>} */}
                 
            </TouchableOpacity>
        </View>


        <View style={{height:"83%"}}>
        {isNew? 
                <View style={{marginTop:5}}> 
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Full Name</Text>
                        <TextField
                            //value={}
                            onChange={(val)=>{setName(val)}}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>NIC </Text>
                        <TextField
                            //value={}
                            onChange={(val)=>{setNic(val)}}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Contact No </Text>
                        <TextField
                            //value={}
                            onChange={(val)=>{setContactNo(val)}}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Address</Text>
                        <TextField
                            //value={}
                            onChange={(val)=>{setAddress(val)}}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldName}>Country</Text>
                        <TextField
                            //value={}
                            onChange={(val)=>{setCountry(val)}}
                        />
                    </View>

                </View>
            :
                <>
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
                </>
        }
        </View>

        <View style={styles.buttonContainer}>
                < CommonButton
                    style={styles.btn}
                    label={'Next'}
                    onPress={()=>{
                        const newClient = {
                            name: name,
                            address:address,
                            nic:nic,
                            contactNo:contactNo,
                            country:country
                        }
                        onNext("reciever",isNew ? newClient : client ,isNew)
                    }}
                    disabled={!isValid}
                />
        </View>


                 
    </>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        //flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",   
        paddingVertical:3,
        paddingHorizontal:8,
        height:"7%",
        //borderWidth:2
    },
    title: {
        color: '#44357F',
        fontSize: 24,
        //fontWeight: 'bold',
        textAlign: 'center',

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
        justifyContent:'center',
        alignItems: "center",
        height:"10%",
        //borderWidth:2,
        paddingHorizontal:7
    },
    listSenderName: {
       color:'#919190'
    },
});
