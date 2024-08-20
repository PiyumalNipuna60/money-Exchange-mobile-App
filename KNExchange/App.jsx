import React from 'react'
import LoginPage from './src/page/LoginPage/LoginPage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import AdminNavigation from './src/common/Navigation/AdminNavigation/AdminNavigation';
import BPNavigation from './src/common/Navigation/BPNavigation';
import WelcomeScreen from './src/page/WelcomeScreen';
import RunnerNavigation from './src/common/Navigation/RunnerNavigation';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
            <Stack.Navigator>
                 <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                 <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                 <Stack.Screen name="Drawer" component={AdminNavigation} options={{ headerShown: false }} />
                 <Stack.Screen name="BPartner" component={BPNavigation} options={{ headerShown: false }} />
                 <Stack.Screen name="Runner" component={RunnerNavigation} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      <Toast/>
    </>
  )
}