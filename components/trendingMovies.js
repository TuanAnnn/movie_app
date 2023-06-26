import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'

export default function TrendingMovies ({data}) {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
    </View>
  )
}

const MovieCard = ({item}) => {
  return(
    <TouchableWithoutFeedback>
    <Text className="text-white">Movie</Text>
    </TouchableWithoutFeedback>
  ) 
}


