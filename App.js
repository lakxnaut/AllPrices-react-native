import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator,Image,Dimensions } from 'react-native';
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

const { height, width } = Dimensions.get('window');

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      try {
        // await SplashScreen.preventAutoHideAsync();
         SplashScreen.hideAsync()
        const value = await AsyncStorage.getItem('@phone');
        if (value !== null) {
          console.log('yes phone',value)
          setInitialRoute('HomePage');
        // SplashScreen.hideAsync
        } else {
          setInitialRoute('LoginPage');
          console.log('nooooo phone',value)
        }
      } catch (e) {
        console.error('Failed to fetch data', e);
        setInitialRoute('LoginPage');
      } finally {
        setIsLoading(false);
        
      }
    };

    init();
  }, )


  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
          source={require("./src/assets/images/logo.jpeg")}
          style={styles.logo}
        />
      </View>
      <ActivityIndicator size="large" color="#00ff00" />

      </View>
    )
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor:"white"
  },
  logoContainer: {
    width: "20%",
    alignItems: "center",
  },
  logo: {
    width: width,
    height: height *0.5,
  },
});
