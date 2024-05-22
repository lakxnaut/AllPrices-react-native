import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menuIconContainer}>
        <View style={styles.menuIconLine} />
        <View style={styles.menuIconLine} />
        <View style={styles.menuIconLine} />
      </View>
      <View style={styles.contentContainer}>
        <Image source={{ uri: 'IMAGE_URL' }} style={styles.mainImage} />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonLarge}>
            <Text style={styles.buttonText}>Button with text</Text>
          </View>
          <View style={styles.buttonsRow}>
            <View style={styles.buttonSmall}>
              <Text style={styles.buttonText}>Button With Text</Text>
            </View>
            <View style={styles.buttonSmall}>
              <Text style={styles.buttonText}>Button with text</Text>
            </View>
          </View>
          <View style={styles.sideContainer}>
            <Image source={{ uri: 'IMAGE_URL' }} style={styles.sideImage} />
            <View style={styles.sideButton}>
              <Text style={styles.buttonText}>Button With Text</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  menuIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  menuIconLine: {
    width: 30,
    height: 5,
    backgroundColor: 'white',
    marginVertical: 2,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  mainImage: {
    width: '30%',
    height: '100%',
    backgroundColor: 'black',
  },
  buttonsContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  buttonLarge: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonSmall: {
    flex: 1,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  sideContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sideImage: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  sideButton: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'orange',
  },
});

export default HomePage;
