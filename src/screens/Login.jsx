import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* Your logo component goes here */}
        <Text>LOGO</Text>
      </View>
      
      {/* Login title */}
      <Text style={styles.title}>LOGIN</Text>
      
      {/* Description */}
      <Text style={styles.description}>Please Login to Continue</Text>
      
      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your 10 digit number"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      
      {/* Login button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      
      {/* Footer */}
      <Text style={styles.footer}>By continuing, you agree with our policy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '20%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  prefix: {
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
  },
});

export default LoginPage;
