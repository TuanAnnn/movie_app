import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon,MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {styles} from '../theme/index'
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
    const [trending,setTrending] = useState([])
    const [upcoming,setUpcoming] = useState([])
    const [topRated,setToprated] = useState([])
    const [loading,setLoading] = useState(true) 
    const navigation = useNavigation()

    const getTrendingMovies= async ()=>{
      const data =  await fetchTrendingMovies();
      console.log('Trending',data)
      if (data) {
        setTrending(data)
      setLoading(false)
      }
    }
    const getUpcomingMovies= async ()=>{
      const data =  await fetchUpcomingMovies();
      console.log('Upcoming',data)
      if (data) {
        setUpcoming(data)
      setLoading(false)
      }
    }
    const getTopRatedMovies= async ()=>{
      const data =  await fetchTopRatedMovies();
      console.log('Top Rated',data)
      if (data) {
        setToprated(data)
      setLoading(false)
      }
    }

    useEffect(()=>{
      getTrendingMovies();
      getUpcomingMovies();
      getTopRatedMovies();
    },[])
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
        {trending.length>0 && <TrendingMovies data={trending}></TrendingMovies>}

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
