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
      //console.log('Trending',data)
      if (data && data.results) {
        setTrending(data.results)
      setLoading(false)
      }
    }
    const getUpcomingMovies= async ()=>{
      const data =  await fetchUpcomingMovies();
      //console.log('Upcoming',data)
      if (data && data.results) {
        setUpcoming(data.results)
      setLoading(false)
      }
    }
    const getTopRatedMovies= async ()=>{
      const data =  await fetchTopRatedMovies();
      //console.log('Top Rated',data)
      if (data && data.results) {
        setToprated(data.results)
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
