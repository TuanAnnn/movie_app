import { View, Text, ScrollView, TouchableOpacity, Platform,Dimensions,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import {styles, theme} from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import Loading from '../components/loading';


var { width, height } = Dimensions.get("window");
const ios = Platform.OS == 'ios'
const topMargin = ios?"":'mt-3'

export default function MovieScreen() {
    const navigation = useNavigation()
    const [isFavorite,toggleFavorite] = useState(false)
    const [movie, setMovie] = useState({});
    const {params: item} = useRoute()
    const [cast,setCast]=useState([1,2,3,4,5])
    const [similarMovies,setSimilarmovies] = useState([1,2,3])
    const [loading,setLoading] = useState(false) 
    let movieName = "Ant-man and the Wasp: Quantumania";
    useEffect(()=>{
        // call api the movie detail api
    },[item])
  return (
   <ScrollView
   contentContainerStyle={{paddingBottom:20}}
   className="flex-1 bg-neutral-900"
   >
    {/* back button and movie poster*/}
    <View className="w-full">
        <SafeAreaView
        className={"absolute z-20 w-full flex-row justify-between items-center px-4"+topMargin}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1">
                <ChevronLeftIcon size='28' strokeWidth={2.5} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>toggleFavorite(!isFavorite)}>
                <HeartIcon size='35' color={isFavorite?theme.background:'white'}/>
            </TouchableOpacity>
        </SafeAreaView>
        {
            loading?(
                <Loading/>
            ):(
                <View>
                <Image
                source={require('../assets/image/moviePoster2.png')}
                style={{width,height:height*0.55}}
                ></Image>
                <LinearGradient
                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                style={{width, height: height*0.40}}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
                ></LinearGradient>
            </View>
            )
        }
        </View>
    {/* movie details*/}
    <View style={{marginTop: -(height*0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {
                movieName
            }
        </Text>
    {/* status, release, runtime */}
    <Text className="text-neutral-400 font-semibold text-base text-center">
        Release • 2020 • 170 min
    </Text>
    {/* genres */}
    <View className="flex-row justify-center mx-4 space-x-2">
        <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill •
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
        </Text>
    </View>
    {/* Description */}
    <Text className="text-neutral-400 mx-4 tracking-wide">
    Today we are going to make a fully functional & responsive movie app with  react native using moviedb api, In this project you can browse trending, upcoming and top rated movies, you can see the details of a movie and the cast person, and you can even search any movie you want plus many more cool features. after this video you will be able to create professional apps like this one. so sit back and relax, grab some snacks and enjoy the tutorial.
    </Text>
    </View>


    {/* Cast */}
    <Cast cast={cast} navigation={navigation}/>

    {/* similar movie */}
    <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies}></MovieList>
   </ScrollView>
  )
}