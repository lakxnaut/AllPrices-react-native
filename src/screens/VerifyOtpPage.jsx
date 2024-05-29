import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React,{useEffect, useState} from "react";
const otpImage = require("../assets/images/otp.jpg");
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { authApi } from "../api/authApis";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 4; // Number of cells (OTP digits)

const VerifyOtpPage = ({route,navigation}) => {
  const description = route.params.description
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });  
  useEffect(() => {
    console.log(description)
    console.log(route.params.userData)
  }, [])
  

  const handleVerify = async()=>{
    console.log(description,'dessss')
    console.log(route.params.phone,'verify phoneee')
    let json = {}
    if(description=='register'){
        json={
            description,
            userData:route.params.userData,
            phone:route.params.phone,
            otp:value
        }

    }
    else if(description=='login'){

      json={
        description,
        phone:route.params.phone,
        otp:value
    }
        
    }
    authApi.VerifyPhoneOtp(json).then(async(res)=>{
      console.log(res,'----><> oye res')
        if(res.status){
          await AsyncStorage.setItem('@user_id', res.data._id);
          await AsyncStorage.setItem('@referCode', res.data.referCode);
          navigation.navigate('HomePage')
        }
        else{

        }
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={otpImage} style={styles.logo} />
      </View>
      <Text style={styles.title}>Enter One Time Password (OTP)</Text>
      <Text style={styles.description}>
        OTP has been sent to your Mobile Number
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      <TouchableOpacity
        style={styles.loginButton}
          onPress={handleVerify}
      >
        <Text style={styles.loginButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  logoContainer: {
    width: "20%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    // backgroundColor:"red"
  },
  description: {
    marginTop: 20,
    // fontWeight:"bold",
    fontSize: 12,
    color: "grey",
    // backgroundColor:"red"
  },
  root: {padding: 20, minHeight: 300, justifyContent: 'center'},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#615754',
    textAlign: 'center',
    marginRight: 15,
  },
  focusCell: {
    borderColor: '#000',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    textAlign: "center",
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});

export default VerifyOtpPage;
