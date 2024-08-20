import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text } from 'react-native'
import { View ,StyleSheet } from "react-native"
import TextField from '../../common/TextField/TextField';
import { PaperProvider } from 'react-native-paper';
import AsssignOrdersListItem from '../../component/AssignOrdersListItem';

export default function AssignedOrders() {
  
    const [assignList,setAssignList] = useState([{name:"Lanka"}])
  return (
    <>
    <PaperProvider>

    
        <View style={styles.titleContainer}>
            <Text style={styles.title}>My Assign Orders</Text>
        </View>

        <View style={styles.fieldContainer}>
            <TextField
                label={'Today - this shld be dropdown'}
                //value={}
                //onChange={}
            />
        </View>

        <View style={styles.fieldContainer}>
            <TextField
                label={'Search Orders'}
                //value={}
                //onChange={}
            />
        </View>

        <SafeAreaView>
          <FlatList
            data={assignList}
            renderItem={({item})=> 
              <AsssignOrdersListItem 
                  order={item} 
                  onViewClick={(val)=>{
                      onViewClick(val,item)  
                  }}
              />}
          />
        </SafeAreaView>
    

</PaperProvider>
    </>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
     marginVertical:15
  },
  title: {
      color: '#44357F',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  fieldName: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
  },
  fieldContainer: {
     margin:10
  },
  btn: {
      borderRadius: 7,
      width: 125,
      height:50,
      fontSize: 18,
      textAlign:'center',
      justifyContent:'center'
  },
  buttonContainer: {
      flexDirection:'row',
      justifyContent:'flex-end',
      margin:10
  },
  listSenderName: {
      color: 'white',
      fontSize: 19,
      fontWeight: 'bold',
  },
});
