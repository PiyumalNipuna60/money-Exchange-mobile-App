import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-paper'
import OrderItem from '../../component/OrderItem/OrderItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BackHandler,Alert } from 'react-native';
import instance from '../../services/Axious'
import OrderItemViewModal from '../../component/OrderItemViewModal/OrderItemViewModal'
import ModalOrderItemAssign from '../../component/ModalOrderItemAssign'
import ModalOrderConfirm from '../../component/ModalOrderConfirm'
import ModalPartnerOrderConfirm from '../../component/ModalPartnerOrderConfirm';
import { boldFont } from '../../utils/CommonFunctions';
import { getData } from '../../utils/storage/Storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard({navigation}) {

    const [userName,setUserName] = useState('');
    const [orders,setOrders] = useState([]);
    const [isPressed,setIsPressed] = useState('new');
    const [visible, setVisible] = useState(false);
    const [assignModalVisible,setAssignModalVisible] = useState(false);
    const [assignDetailsVisible,setAssignDetailsVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const onViewClick = (val,item)=>{
    
        if(val==='view'){
          setVisible(true)
          setSelectedOrder(item)
        }else if(val==="asign"){
          setAssignModalVisible(true)
          setSelectedOrder(item)
        }else{
          setAssignDetailsVisible(true)
          setSelectedOrder(item)
        }
    }
 
    const getUserInfo = async ()=>{
        
        const rol = await getData('role')
        instance.post('/user/get_user_info_by_token',{role:rol})
                .then(function (response){
                    setUserName(response.data.fistName)
                })
    }

    const getAllOrders = (search)=>{
        instance.get('/order').then(function (response){
          if(search === 'new'){
            const odrs = response.data.filter(order => order.status === 'pending');
            setOrders(odrs);
          }else if(search === 'ongoing'){
            const odrs = response.data.filter(order => order.status === 'assign');
            setOrders(odrs);
          }else if(search === 'complete'){
            const odrs = response.data.filter(order => order.status === 'complete');
            setOrders(odrs);
          }else{
            setOrders(response.data);
          }
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
            setIsPressed('new');
            getAllOrders('new')
        }, [])
    );

  return (
    <View style={{height:"100%",backgroundColor:'#d5f0f5',padding:10}}>

        <View style={{height:'37%'}}>
            
            <View style={{flexDirection:'row',padding:4,marginTop:10}}>
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                <Ionicons name="person-circle-outline" size={38} color="black" />
                </View>
                <View style={{flex:6}}> 
                    <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-Regular"}}>{getTimeOfDay()}</Text>
                    <Text style={{color:'#1d86f0',fontSize:22,fontFamily:boldFont}}>{userName.toUpperCase()}</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Notifications')}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Ionicons name="notifications" size={25} color="black" />
                    </View>
                </TouchableOpacity>
               
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
            <TouchableOpacity onPress={()=>{navigation.navigate('Transacations')}}>
                <View style={styles.menuItem}>
                    <View>
                        <Icon name="exchange" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-SemiBold"}}>Orders</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{navigation.navigate('Customers')}}>
                <View style={styles.menuItem}>
                    <View>
                        <Icon1 name="addusergroup" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:15,fontFamily:"Dosis-SemiBold"}}>Customers</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Rates')}}>
                <View style={styles.menuItem}>
                    <View>
                        <Icon name="dollar" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:15,fontFamily:"Dosis-SemiBold"}}>Currency</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("More")}}>
                <View style={styles.menuItem}>
                    <View>
                        <Icon2 name="more-horizontal" size={30} color="black" />
                    </View>
                    <View>
                        <Text style={{color:'black',fontSize:16,fontFamily:"Dosis-SemiBold"}}>More</Text>
                    </View>
                
                </View>
            </TouchableOpacity>
        </View>

        </View>


        <View style={{height:'63%', backgroundColor: "#ffffff", borderRadius:7,marginTop:5}}>

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
                    renderItem={({item})=>
                        <OrderItem 
                            order={item} 
                            onViewClick={(val)=>{
                                onViewClick(val,item)  
                            }}
                        />}
                />
        </View>
        

        {visible && 
         <OrderItemViewModal
            visible={visible}
            order={selectedOrder}
            onClose={()=>{setVisible(false)}}
         />
         }

         {assignModalVisible &&
            <ModalOrderItemAssign
              visible={assignModalVisible}
              order={selectedOrder}
              onClose={()=>setAssignModalVisible(false)}
              loadData={()=>{getAllOrders('new')}}
            />

         }

         {assignDetailsVisible && 
            <ModalPartnerOrderConfirm
                visible={assignDetailsVisible}
                order={selectedOrder}
                onClose={()=>{setAssignDetailsVisible(false)}}
                loadData={()=>{
                    getAllOrders('ongoing')
                }}
                adminConfirm={true}
            />
         }
        
    </View>

  )
}


const styles = StyleSheet.create({
    menuItem:{
        width:70,
        height:80,
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