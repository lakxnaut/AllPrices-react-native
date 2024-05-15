import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { authApi } from "../api/authApis";
import { USERAPIS } from "../api/userApis";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

const LoginPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referCode, setReferCode] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [states, setStates] = useState([]);
  const [userState, setUserState] = useState('');

  useEffect(() => {
    if (!isLogin) getStates();
  }, [isLogin]);

  // useEffect(() => {
  //   console.log('hiii')
  //   getStates()

  // }, [])

  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Hello',
  //     text2: 'This is some something 👋'
  //   });
  // };

  const handlePhoneNumberChange = (number) => {
    // console.log(number)
    setPhoneNumber(number);
  };

  const handleReferCodeChange = (refercode) => {
    // console.log(number)
    setReferCode(refercode);
  };

  const handleLogin = () => {
    if(!phoneNumber){
      return
    }
    authApi.Login(phoneNumber).then((res) => {
      console.log(res,'login res---')
      if (!res.status) {
        setIsLogin(false);
      }
      else if(res.status){
        navigation.navigate('VerifyOtpPage',{description:"login"})
      }
    });
  };

   const handleSignUp = () =>{
    console.log(userState,'stateeee')
    if(userState==''){
      console.log("jggghghh")
      return 
    }
    authApi.SignUp(phoneNumber).then((res)=>{
      console.log(res,'resssss')
      if(!res.status_code){

      }
      else if(res.status_code){
        navigation.navigate('VerifyOtpPage',{description:"register",userData:{phone:phoneNumber,referCode,userState}})
      }

    })
   }

  const getStates = () => {
    console.log("h");
    USERAPIS.GetStates().then((res) => {
      // console.log(res)
      if (res.status_code) {
        setStates(res.data.option_value);
        console.log(res.data.option_value);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={styles.logo}
        />
      </View>

      <View style={{ flexDirection: "column",width:"100%", alignItems: "flex-start" }}>
        {/* Login title */}
        <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

        {/* Description */}
        <Text style={styles.description}>
          Please {isLogin ? "Login" : "Sign Up"} to Continue
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your 10 digit number"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
        />
      </View>

      {!isLogin && (
        <View style={styles.formContainer}>
          {/* <Text style={styles.prefix}>+91</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Refer Code"
            keyboardType="default"
            maxLength={12}
            onChangeText={handleReferCodeChange}
            value={referCode}
          />
        </View>
      )}

      {!isLogin && (
        <View style={styles.formContainer}>
          <Picker
            selectedValue={userState}
            onValueChange={(itemValue, itemIndex) => setUserState(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Select State" value="" />
            {states.map((state, index) => (
              <Picker.Item label={state} value={state} key={index} />
            ))}
          </Picker>
        </View>
      )}

      {/* Login button */}
      {isLogin && (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      )}

      {/* Sign up button */}
      {!isLogin && (
        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      {/* Footer */}
      <Text style={styles.footer}>
        By Continuing, You Agree with our Policy
      </Text>
    </View>
  );
};

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
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 55,
  },
  prefix: {
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 5,
    // paddingVertical: 8,
    // paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "orange",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
  },
});

export default LoginPage;
