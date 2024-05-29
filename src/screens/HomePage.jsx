import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { materialApi } from '../api/materialApis';
const { height, width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomePage = ({ navigation }) => {

  const [data,setData] = useState([])
  const [subData,setSubData] = useState([])
  const [materialId,setMaterialId] = useState('')
  const [subMaterialId,setSubMaterialId] = useState('')
  let userId=null;
  

  useEffect(() => {

    GetAllMaterialcategory()
    
  }, [])

  const GetAllMaterialcategory = async()=>{
    userId = await getUserId();
    materialApi.GetAllMaterialCategory().then(res=>{
      if(res.status){
        setData(res.data)
        console.log(res.data[0]._id)
        setMaterialId(res.data[0]._id)
        getAllSubCategory()
      }
    })
  }

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('@user_id');
      if (userId !== null) {
        return userId;
      }
    } catch (error) {
      console.error('Error retrieving user_id from AsyncStorage:', error);
    }
    return null;
  };

  const getAllSubCategory = async()=>{
    materialApi.GetAllMaterialSubCategory(materialId).then(res=>{
      if(res.status){
        
        setSubData(res.data)
        console.log(res.data)
        setSubMaterialId(res.data[0]._id)
      }

    })
  }

  const GetMaterialData = async()=>{
    const json = {
      materialId,
      subMaterialId,
      userId
    };

    materialApi.GetMaterialDataByMaterialId(materialId).then(res=>{
      if(res.status){
        
        setSubData(res.data)
      }

    })
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  const renderSubItem = ({ item }) => (
    <View style={styles.subItem}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </ImageBackground>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.category}>

      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      // onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      // ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
    />
      </View>

      <View style={styles.Subcategory}>

      <FlatList
      data={subData}
      renderItem={renderSubItem}
      keyExtractor={item => item._id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      // ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
    />
      </View>

      {/* <View style={styles.productsCategory}>

      <FlatList
      data={subData}
      renderItem={renderSubItem}
      keyExtractor={item => item._id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      // ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
    />
      </View> */}
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'orange',
  },
  category:{
    height:height*0.10,
    backgroundColor:"red"

  },
  item: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 1,
  },
  title: {
    fontSize: 18,
    fontWeight:"bold",
    color:"white"
  },
  Subcategory:{
    height:height*0.20,
    backgroundColor:"green"

  },
  subItem: {
    backgroundColor: 'black',
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 0,
    width: width * 0.6,
    // height:width*6,
    alignItems: 'center',
  },
  image: {
    width: width * 0.5,
    height: height * 0.15,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: to add a semi-transparent background to the text
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  productsCategory:{

  }
});

export default HomePage;
