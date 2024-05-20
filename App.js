import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/screens/Login';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import VerifyOtpPage from './src/screens/VerifyOtpPage';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'green'
  },
};


export default function App({navigation}) {
  useEffect(() => {
    getUserFromLocal();
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 5000);
  }, )

  const getUserFromLocal = async () => {
    try {
      const value = await AsyncStorage.getItem('@phone');
      if (value !== null) {
        console.log(value)
      }
    } catch (e) {
      console.error('Failed to fetch data', e);
    }
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: 'red',
      //   },
      //   headerTintColor: '#fff', // Change text color of header
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
      // }}
      >
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown:false }}/>
      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown:false }} />
      <Stack.Screen name="VerifyOtpPage" component={VerifyOtpPage} options={{ headerShown:false }} />
      </Stack.Navigator>
      </NavigationContainer>
    // <View style={styles.container}>
    //   <LoginPage/>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
