import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TextField from '../../common/TextField/TextField'
import { Divider } from 'react-native-paper'
import OrderItem from '../../component/OrderItem/OrderItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MetIcon from 'react-native-vector-icons/MaterialIcons'
import { BackHandler,Alert } from 'react-native';
import { removeData } from '../../utils/storage/Storage'
import { CommonActions, useFocusEffect } from '@react-navigation/native'
import instance from '../../services/Axious'
import PartnerOrderItem from '../../component/PartnerOrderItem'
import ModalAssignRunner from '../../component/ModalAssignRunner'
import ModalPartnerOrderDetails from '../../component/ModalPartnerOrderDetails'
import ModalPartnerOrderConfirm from '../../component/ModalPartnerOrderConfirm'
import ChangePassword from '../ChangePassword'

export default function PartnerDashboard({navigation}) {

    const [userName,setUserName] = useState('');
    const [isPressed,setIsPressed] = useState('new');
    const [orders,setOrders] = useState([]);

    const [assignRunnerVisible, setAssignRunnerVisible] = useState(false);
    const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
    const [orderConfirmVisible, setOrderConfirmVisible] = useState(false);
    const [changePwordVisible,setChangePwordVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [partnerId,setPartnerId] = useState('');
    const [partner,setPartner] = useState({})

    const onViewClick = (val,item)=>{
    
        if(val==='view'){
          setSelectedOrder(item)
          setOrderDetailsVisible(true);
        }else if(val==="assign"){
          setSelectedOrder(item)
          setAssignRunnerVisible(true)
        }else{
            setSelectedOrder(item)
            setOrderConfirmVisible(true)
          
        }
    }


    const getAllOrders = async (search)=>{

        const res = await instance.post('/user/get_user_info_by_token',{role:'Partner'});
        instance.get(`/payment_details/employee_wise/${res.data.employeeId}`).then(function (response){
            if(search === 'new'){
                const odrs = response.data.filter(item => item.runner === null && item.order.status != 'complete');
                setOrders(odrs);
            }else if(search === 'ongoing'){
                const odrs = response.data.filter(item => item.runner != null && item.order.status != 'complete');
                setOrders(odrs);
            }else if(search === 'complete'){
                const odrs = response.data.filter(item => item.order.status === 'complete');
                setOrders(odrs);
            }else{
                setOrders(response.data);
             }
    
        }).catch(function (error){
          console.log(error);
        })
      }


    const handleLogout = () => {

        removeData("token");
        removeData("role");
    
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
    }

    function getUserInfo(){
       
        instance.post('/user/get_user_info_by_token',{role:'Partner'})
                .then(function (response){
                    setUserName(response.data.fistName)
                    setPartnerId(response.data.employeeId);
                    setPartner(response.data)
                }).catch(function (error){
                    console.log(error);
                })
    }

    function getTimeOfDay() {

        const now = new Date();
        const hour = now.getHours();

        if (hour >= 3 && hour < 12) {
            return 'Good Morning';
          } else if (hour >= 12 && hour < 17) {
            return 'Good Afternoon';
          } else if (hour >= 17 && hour < 21) {
            return 'Good Evening';
          } else {
            return 'Good Night';
          }
    }




      const handleGoBack = ()=>{
        Alert.alert("Stop","Are You Sure",[{text:"cancel",onPress:()=>null,style:'cancel'},{text:'Yes',onPress:()=>{BackHandler.exitApp()}}]);
        return true;
    }

      useEffect(()=>{
        const backHandler = BackHandler.addEventListener("hardwareBackPress",handleGoBack);
        getUserInfo();
        getAllOrders('new');
      },[])


      useFocusEffect(
        React.useCallback(() => {
            getAllOrders('new');
            setIsPressed('new')
        }, [])
    );
      

  return (
    <View style={{height:'100%',backgroundColor:'#d5f0f5',padding:10}}>
        
        <View style={{height:'37%'}}>
        <View style={{flexDirection:'row',padding:4,marginTop:10}}>
            <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
            <Ionicons name="person-circle-outline" size={38} color="black" />
            </View>
            <View style={{flex:6}}> 
                <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-Regular"}}>{getTimeOfDay()}</Text>
                <Text style={{color:'#1d86f0',fontSize:22,fontFamily:"Dosis-Bold"}}>{userName?.toUpperCase()}</Text>
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <Ionicons name="notifications" size={25} color="black" />
            </View>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'white',borderRadius:7,padding:6,marginTop:15}}>
            <View style={{flex:6}}> 
                <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-Regular"}}>Total Transaction</Text>
                <Text style={{color:'black',fontSize:22,fontFamily:"Dosis-Bold"}}> USD 00.00</Text>
            </View>
            <View style={{flex:1}}>
                <Icon name="long-arrow-right" size={30} color="black" />
            </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'white',borderRadius:7,paddingVertical:12,marginTop:15}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('PartnerOrders')}}>
                <View style={{width:75,height:90,borderWidth:1,borderRadius:5,borderColor:'#c8cacc',alignItems:'center',justifyContent:'space-around'}}>
                    <View>
                        <Icon name="exchange" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-SemiBold"}}>Orders</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={()=>{navigation.navigate('Runner')}}>
                <View style={{width:75,height:90,borderWidth:1,borderRadius:5,borderColor:'#c8cacc',alignItems:'center',justifyContent:'space-around'}}>
                    <View>
                        <Icon name="dollar" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:15,fontFamily:"Dosis-SemiBold"}}>Runner</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setChangePwordVisible(true)}}>
                <View style={{width:75,height:90,borderWidth:1,borderRadius:5,borderColor:'#c8cacc',alignItems:'center',justifyContent:'space-around'}}>
                    <View>
                        <MetIcon name="password" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:15,fontFamily:"Dosis-SemiBold"}}>Change Password</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <View style={{width:75,height:90,borderWidth:1,borderRadius:5,borderColor:'#c8cacc',alignItems:'center',justifyContent:'space-around'}}>
                    <View>
                        <Icon2 name="log-out" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-SemiBold"}}>Logout</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
        </View>

        </View>

       

       

       
        <View style={{height:'63%',flexDirection:'column',backgroundColor:'white',borderRadius:7,padding:4,marginTop:5}}>
            
                {/* <TextField
                    label={'Search'}
                    //value={}
                    //onChange={}
                /> */}
                <View style={{marginTop:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>

                    <TouchableOpacity onPress={()=>{
                        getAllOrders('new')
                        setIsPressed('new');
                        }}>
                        <View style={isPressed === 'new' ? styles.pressed : styles.noPressed}>
                            <Text style={isPressed === 'new' ? styles.textPressed : styles.textNoPressed}>New</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        getAllOrders('ongoing')
                        setIsPressed('ongoing');
                        }}>
                        <View style={isPressed === 'ongoing' ? styles.pressed : styles.noPressed}>
                            <Text style={isPressed === 'ongoing' ? styles.textPressed : styles.textNoPressed}>Ongoing</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        getAllOrders('complete')
                        setIsPressed('complete');
                        }}>
                        <View style={isPressed === 'complete' ? styles.pressed : styles.noPressed}>
                            <Text style={isPressed === 'complete' ? styles.textPressed : styles.textNoPressed}>Completed</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={{marginTop:10}}/>

                <FlatList
                    data={orders}
                    renderItem={({item})=> <PartnerOrderItem
                            item={item}
                            onViewClick={(val)=>{onViewClick(val,item)}}
                    /> }
                />

            
        </View>

        {assignRunnerVisible && 
         <ModalAssignRunner
            visible={assignRunnerVisible}
            order={selectedOrder}
            partnerId={partnerId}
            onClose={()=>{setAssignRunnerVisible(false)}}
            loadData={()=>{
               getAllOrders(isPressed);
            }}
         />
         }

        {orderDetailsVisible && 
            <ModalPartnerOrderDetails
                visible={orderDetailsVisible}
                item={selectedOrder}
                onClose={()=>{setOrderDetailsVisible(false)}}
            />
        }

        {orderConfirmVisible && 
            <ModalPartnerOrderConfirm
                visible={orderConfirmVisible}
                order={selectedOrder}
                onClose={()=>{setOrderConfirmVisible(false)}}
                loadData={()=>{
                     getAllOrders(isPressed);
                }}
            />
        }

        {changePwordVisible && 
            <ChangePassword
                visible={changePwordVisible}
                onClose={()=>{setChangePwordVisible(false)}}
                partner={partner}
                changeRole={'AdminPartner'}

            />
        }
        
    </View>

  )
}

const styles = StyleSheet.create({
    menuItem:{
        width:75,
        height:90,
        borderRadius:5,
        borderColor:'#c8cacc',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'#f5f4f2'
    },
    pressed: {
       width:100,
       paddingVertical:6,
       borderRadius:20,
       alignItems:'center',
       backgroundColor:'#16a0f0'
    },
    noPressed: {
        borderWidth:1,
        width:100,
        paddingVertical:6,
        borderRadius:20,
        alignItems:'center'
     },
     textPressed:{
        color:'white',
        fontSize:16,
        fontFamily:'Dosis-SemiBold'
     },
     textNoPressed:{
        color:'black',
        fontSize:16,
        fontFamily:'Dosis-SemiBold'
     }
  });
