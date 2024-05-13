import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomePage = () => {
    const { height, width } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <View style={{height: height * 0.2,backgroundColor:'red'}}>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      },
})

export default HomePage
