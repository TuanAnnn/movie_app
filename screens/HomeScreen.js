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

const ios = Platform.OS == "ios";

const HomeScreen = () => {
    const [trending,setTrending] = useState([1,2,3])
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
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color='white'></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:10}}
      >
        {/* Trending movies carousel */}
        <TrendingMovies data={trending}></TrendingMovies>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
