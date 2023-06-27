import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { debounce, slice } from "lodash";
import Loading from "../components/loading";
import { searchMovies,image185 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResult] = useState([]);
  let movieName = "Ant-man and the Wasp: Quantumania";
  const [loading, setLoading] = useState(false);
  const handleSearch =(value) =>{
    //console.log('value',value)
    if(value && value.length>2){
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }).then(data=>{
        setLoading(false)
        //console.log('search movie results: ',data)
        if(data && data.results) setResult(data?.results)
      })
      .catch(e=>{
        console.log(e)
      })
    } else{
      setLoading(true)
      setResult([])
    }
  }
  const handleTextDebouce = useCallback(debounce(handleSearch,400))
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleTextDebouce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="24" color="white"></XMarkIcon>
        </TouchableOpacity>
      </View>
      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Result ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      // source={require("../assets/image/moviePoster2.png")}
                      source={{uri: image185(item?.poster_path)}}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    ></Image>
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/image/movieTime.png")}
            className="h-96 w-96"
          ></Image>
        </View>
      )}
    </SafeAreaView>
  );
}
