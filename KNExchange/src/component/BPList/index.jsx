import React, { useEffect, useState } from 'react'
import { FlatList,View ,StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import TextField from '../../common/TextField/TextField';
import BPListItem from '../BPListItem';
import ModalBusinessPartView from '../../component/ModalBusinessPartView';
import { TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import instance from '../../services/Axious';
import { useNavigation } from '@react-navigation/native';
import ChangePassword from '../../page/ChangePassword';


export default function BPList({setPartner}) {

    const navigation = useNavigation();
    const [bpList , setbpList] = useState([{name: "Prasad Indika" , ContactNo:"0777939393"},{name: "Dilusha Dishani" , ContactNo:"0777939393"},{name: "Prasad Indika" , ContactNo:"0777939393"}]);
    const [visible,setVisible] = useState(false);
    const [changePwordvisible,setChangePwordVisible] = useState(false);
    const [selectedPArtner,setSelectedPartner] = useState({}); 

    const getAllPartners = ()=>{

        instance.get('/user/get_all_partner')
        .then(function (response){
            setbpList(response.data)
        })
        .catch(function (error){
            console.log(error);
        })

    }

    useEffect(()=>{
        getAllPartners()
    },[])

  return (
    <>

        <View style={{height:"100%" , backgroundColor:"#d5f0f5"}}>

        <View style={{height:"12%",padding:12}}>
            <View style={{marginBottom:2}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')}}>
                    <Ionicons name="return-up-back" size={30} color="black"/>
                </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>BUSINESS PARTNERS</Text>
                <TouchableOpacity onPress={()=>{setVisible(true)}}>
                    <Icon1 name="adduser" size={30} color="black"/> 
                </TouchableOpacity>
            </View>
        </View>

            <View style={{height:"86%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%"}}>
                <View style={styles.fieldContainer}>
                    <TextField
                        label={'Search'}
                        //value={}
                        //onChange={}
                    />
                </View>

               
                    <FlatList
                        data={bpList}
                        renderItem={({item})=> <BPListItem item={item} 
                        onViewClick={()=>{
                            setPartner(item);
                            navigation.navigate('BPView');
                        }}
                        onChangePassword={()=>{
                            setSelectedPartner(item);
                            setChangePwordVisible(true)
                        }}
                        />}
                        
                    />
               
            </View>


        </View>

        {visible && <ModalBusinessPartView visible={visible} onClose={()=>{setVisible(false)}} loadAllPartners={getAllPartners}/>}
        {changePwordvisible && <ChangePassword visible={changePwordvisible} onClose={()=>{setChangePwordVisible(false)}} partner={selectedPArtner} changeRole={'AdminPartner'}/>}    
        
    </>
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
        fontSize: 24,
        textAlign: 'left',
        fontFamily:'Dosis-Bold'
    },
    fieldContainer: {
       marginHorizontal:8
    },
});
