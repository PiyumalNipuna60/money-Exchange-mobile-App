import React from 'react'
import { Button } from 'react-native-paper';

export default function CommonButton({ label,onPress,style,disabled }) {
  return (
    <Button
      mode="contained-tonal"
      buttonColor={'#0575ad'}
      textColor={'white'}
      onPress={onPress}
      style={style}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}