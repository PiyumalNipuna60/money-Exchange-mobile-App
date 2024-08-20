import React, { useEffect, useState } from 'react'
import { View ,StyleSheet ,ScrollView, TouchableOpacity, FlatList } from "react-native"
import { PaperProvider, Text, Button } from "react-native-paper"
import TextField from '../../common/TextField/TextField'
import CommonButton from '../../common/CommonButton/CommonButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import instance from '../../services/Axious'

export default function RecieverDetails({onNext,selectedAccount,isReceiverNew}) {

    const [accountList , setAccountList] = useState([]);
    const [accountList2 , setAccountList2] = useState([]);
    const [account,setAccount] = useState(selectedAccount);
    const [isNew , setIsNew] = useState(isReceiverNew)


    const [name,setName] = useState('');
    const [nic,setNic] = useState('');
    const [address,setAddress] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [country,setCountry] = useState('');
    const [bank,setBank] = useState('');
    const [accountNo,setAccountNo] = useState('');
    const [accountName,setAccountName] = useState('');

    const isValid = isNew ? name && nic && address && contactNo && country && bank && accountNo && accountName : account ? true : false ;

    const getAllAccounts = ()=>{
        instance.get('/account')
            .then(function (response){
                setAccountList(response.data)
                setAccountList2(response.data)
            })
            .catch(function (error){
                console.log(error);
            });
    }

    function searchAccounts(orders, searchString) {
        function searchInObject(obj, searchString) {
          for (let key in obj) {
            if (typeof obj[key] === 'object') {
              if (searchInObject(obj[key], searchString)) {
                return true;
              }
            } else {
              if (String(obj[key]).toLowerCase().includes(searchString.toLowerCase())) {
                return true;
              }
            }
          }
          return false;
        }
      
        return orders.filter(order => searchInObject(order, searchString));
      }

    useEffect(()=>{
           getAllAccounts();
      },[]);



    const AccountItem = ({val})=>{

        return(
            <TouchableOpacity onPress={()=>{setAccount(val)}}>
                <View style={{marginHorizontal:10,marginTop:10,backgroundColor:'#f0eee9',padding:8,borderRadius:7}}>
            <Text style={styles.listSenderName}>{val.customer.firstName}</Text>
            <Text style={styles.listSenderName}>{val.name}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={styles.listSenderName}>{val.bank}</Text>
                </View>
                <View>
                    <Text style={styles.listSenderName}>{val.accountNo}</Text>
                </View>

            </View>
        </View>
            </TouchableOpacity>
        )
    }
    
  return (
    <>
        <View style={styles.titleContainer}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{onNext('sender',account,isNew)}}>
                    <AntDesign name="leftcircleo" size={25} color="black"/>
                </TouchableOpacity>
                <Text style={{fontSize:24,color:"#4b5052",fontFamily:'Dosis-Regular',marginLeft:8}}>
                    {isNew ? "Reciever Details" : account ? account.name : "Select Account"}
                </Text>
            </View>
            
            
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
            <>
            <ScrollView>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>NIC</Text>
                    <TextField
                        //value={}
                        onChange={val => setNic(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Full Name</Text>
                    <TextField
                        //value={}
                        onChange={val => setName(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Contact No</Text>
                    <TextField
                        //value={}
                        onChange={val => setContactNo(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Address</Text>
                    <TextField
                        //value={}
                        onChange={val => setAddress(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Country</Text>
                    <TextField
                        //value={}
                        onChange={val => setCountry(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Bank</Text>
                    <TextField
                        //value={}
                        onChange={val => setBank(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Account No</Text>
                    <TextField
                        //value={}
                        onChange={val => setAccountNo(val)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldName}>Account Name</Text>
                    <TextField
                        //value={}
                        onChange={val => setAccountName(val)}
                    />
                </View>
                </ScrollView>
            </>
            :
            <>
                    <View style={styles.fieldContainer}>
                        <TextField
                            label={'Search Reciever'}
                            onChange={(val)=>{
                                const matchedOrders = searchAccounts(accountList2, val);
                                setAccountList(matchedOrders);
                            }}
                        />
                    </View>

               
                     <FlatList
                        data={accountList}
                        renderItem={({item})=> <AccountItem val={item}/>}
                    />
            </>    
        }
        </View>

        <View style={styles.buttonContainer}>
            < CommonButton
                style={styles.btn}
                label={'Next'}
                onPress={()=>{
                    const newRec = {
                        name:name,
                        address:address,
                        nic:nic,
                        contactNo:contactNo,
                        country:country,
                        bank:bank,
                        accountNo:accountNo,
                        accountName:accountName
                    }
                    onNext("order",isNew ? newRec : account,isNew)
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
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fieldName: {
        color: '#73716a',
        fontSize: 15,
        fontFamily:"Dosis-Regular",
        marginBottom:3
    },
    fieldContainer: {
       margin:10
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