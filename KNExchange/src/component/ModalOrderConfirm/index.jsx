import * as React from 'react';
import { Text, View } from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider } from 'react-native-paper';


export default function ModalOrderConfirm({visible = false , onClose}) {
  return (
    <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{backgroundColor: 'white', padding: 20,height:"100%"}}>
            <Text style={{color:'red'}}>Order Eka asprogess eka finish nan recipt eka</Text> 
        </Modal>
    </Portal>
  )
}
