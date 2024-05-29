import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Dimensions } from 'react-native';
import LoginPage from './src/screens/Login';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './src/screens/HomePage';
import VerifyOtpPage from './src/screens/VerifyOtpPage';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'green',
  },
};

const { height, width } = Dimensions.get('window');

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomePage">
      <Drawer.Screen name="HomePage" component={HomePage} options={{
          headerStyle: { backgroundColor: '#FF0000' }, // Change app bar color to red here
          headerTintColor: '#fff', // Change app bar text color here
          headerTitleStyle: { fontWeight: 'bold' },
        }} />
      <Drawer.Screen name="VerifyOtpPage" component={VerifyOtpPage} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        SplashScreen.hideAsync();
        const value = await AsyncStorage.getItem('@user_id');
        if (value !== null) {
          setInitialRoute('Drawer');
        } else {
          setInitialRoute('LoginPage');
        }
      } catch (e) {
        console.error('Failed to fetch data', e);
        setInitialRoute('LoginPage');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('./src/assets/images/logo.jpeg')} style={styles.logo} />
        </View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtpPage" component={VerifyOtpPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  logoContainer: {
    width: '20%',
    alignItems: 'center',
  },
  logo: {
    width: width,
    height: height * 0.5,
  },
});
