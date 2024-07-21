import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { materialApi } from "../api/materialApis";
const { height, width } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";

const HomePage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [subData, setSubData] = useState([]);
  const [selectedSubDataIndex, setSelectedSubDataIndex] = useState(0);
  const [materialId, setMaterialId] = useState("");
  const [subMaterialId, setSubMaterialId] = useState("");
  const [userId, setUserId] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [loadingAllMaterialData, setLoadingAllMaterialData] = useState(true);
  const [allMaterialData, setAllMaterialData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      setUserId(id);
      GetAllMaterialCategory();
    })();
  }, []);

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("@user_id");
      if (userId !== null) {
        return userId;
      }
    } catch (error) {
      console.error("Error retrieving user_id from AsyncStorage:", error);
    }
    return null;
  };

  const GetAllMaterialCategory = async () => {
    setLoadingCategories(true);
    try {
      const res = await materialApi.GetAllMaterialCategory();
      if (res.status) {
        setData(res.data);
        setMaterialId(res.data[0]._id);
        getAllSubCategory(res.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching material categories:", error);
    }
    setLoadingCategories(false);
  };

  const getAllSubCategory = async (materialId) => {
    setLoadingSubCategories(true);
    try {
      const res = await materialApi.GetAllMaterialSubCategory(materialId);
      if (res.status) {
        setSubData(res.data);
        setSubMaterialId(res.data[0]._id);
        let json = {
          materialId: materialId,
          materialSubCatId: res.data[0]._id,
          user_id: userId,
        };
        getAllMaterialData(json);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
    setLoadingSubCategories(false);
  };

  const getAllMaterialData = async (json) => {
    setLoadingAllMaterialData(true);
    try {
      const res = await materialApi.GetMaterialDataByMaterialId(json);
      if (res.status) {
        setAllMaterialData(res.data);
      }
    } catch (error) {
      console.error("Error fetching AllMaterialData:", error);
    }
    setLoadingAllMaterialData(false);
  };

  const handleSelectCategory = (index, item) => {
    setSelectedDataIndex(index);
    setMaterialId(item._id);
    getAllSubCategory(item._id);
  };

  const handleSelectSubCategory = (index, item) => {
    setSelectedSubDataIndex(index);
    setSubMaterialId(item._id);
    let json = {
      materialId: materialId,
      materialSubCatId: item._id,
      user_id: userId,
    };
    getAllMaterialData(json);
  };

  const handleSearch = () => {
    console.log("Search text:", searchText);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleSelectCategory(index, item)}>
      <View
        style={[
          styles.item,
          selectedDataIndex === index && styles.selectedItem,
        ]}
      >
        <Text
          style={[
            styles.title,
            selectedDataIndex === index && styles.selectedTitle,
          ]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSubItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleSelectSubCategory(index, item)}>
      <View
        style={[
          styles.subItem,
          selectedSubDataIndex === index && styles.selectedSubItem,
        ]}
      >
        <ImageBackground source={{ uri: item.image }} style={styles.image}>
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  const renderAllMaterialDataItem = ({ item }) => (
    <View style={styles.materialItem}>
      <Image source={{ uri: item.image[0] }} style={styles.materialImage} />
      <Text style={styles.materialName}>{item.name}</Text>
      <Text style={styles.materialPrice}>₹{item.price}</Text>
      <Text style={styles.materialWhatsApp}>
        WhatsApp: {item.whatsappNumber}
      </Text>
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        {loadingCategories ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>

      <View style={styles.Subcategory}>
        {loadingSubCategories ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={subData}
            renderItem={renderSubItem}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.middleButton]}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>🤍</Text>
        </TouchableOpacity>
      </View>
      <View>
        {loadingSubCategories ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={allMaterialData}
            renderItem={renderAllMaterialDataItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.materialList}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchBar: {
    flex: 2.5,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "orange",
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 2,
  },
  middleButton: {
    flex: 1.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  category: {
    height: height * 0.1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "red",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 1,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  selectedTitle: {
    color: "red",
  },
  Subcategory: {
    height: height * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  subItem: {
    padding: 0,
    marginVertical: 5,
    marginHorizontal: 0,
    width: width * 0.32,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 5,
  },
  selectedSubItem: {
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 5,
  },
  image: {
    width: width * 0.28,
    height: width * 0.26,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  materialList: {
    paddingHorizontal: 10,
  },
  materialItem: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
  },
  materialImage: {
    width: "100%",
    height: width * 0.4,
    borderRadius: 5,
  },
  materialName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  materialPrice: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  materialWhatsApp: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  callButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  callButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HomePage;
