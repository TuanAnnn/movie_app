import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon,MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {styles} from '../theme/index'
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
    const [trending,setTrending] = useState([1,2,3])
    const [upcoming,setUpcoming] = useState([1,2,3])
    const [topRated,setToprated] = useState([1,2,3])
    const [loading,setLoading] = useState(false) 
    const navigation = useNavigation()
  return (
    <View className="flex-1 bg-neutral-800">
        {/* Search bar and logo*/}
      <SafeAreaView className={ios ? "-mb2-" : "mb-3"}>
        <StatusBar style="light"></StatusBar>
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon
            size={30}
            strokeWidth={2}
            color="white"
          ></Bars3CenterLeftIcon>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovie</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color='white'></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading?(
          <Loading/>
        ):(
          <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:10}}
      >

        {/* Trending movies carousel */}
        <TrendingMovies data={trending}></TrendingMovies>

        {/* upcoming movies carousel */}
        <MovieList title='Upcoming' data={upcoming}></MovieList>

        {/* top rated movies row */}
        <MovieList title='Top Rated' data={topRated}></MovieList>
      </ScrollView>
        )
      }
      
    </View>
  );
};

export default HomeScreen;
