import { View } from "react-native"
import { PaperProvider, Text, TextInput } from "react-native-paper"

function SmplPg(){

    return (
        <>
            <PaperProvider>
            <View>
                <Text>Prasad Indika</Text>
            </View>

            <TextInput
                style={{backgroundColor:'white'}}
                mode='outlined'
                label="Email"
                //value={text}
                //onChangeText={text => setText(text)}
            />
            </PaperProvider>
        
        </>
    )
}

export default SmplPg