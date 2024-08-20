import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


export default function TextField({value,onChange , label,bdrWidth = 1.5, type, disabled,outColor='#e1e4e6',activecolor='#bbbcbd'}) {
  return (
       <TextInput
       
       label={label}
       mode='outlined'
       outlineColor={outColor}
       activeOutlineColor={activecolor}
       value={value}
       onChangeText={onChange}
       style={styles.styl}
       secureTextEntry={type === 'password'}
       disabled={disabled}
       textColor='gray'
       contentStyle={{fontFamily:'Dosis-Regular',fontSize:16}}
       outlineStyle={{borderRadius:7,borderWidth:bdrWidth}}
       
    />
  )
}

const styles = StyleSheet.create({
  styl: {
     backgroundColor:'white',
     height: 45,
  },
});