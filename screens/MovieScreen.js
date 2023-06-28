import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilar,
  image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [movie, setMovie] = useState({});
  const { params: item } = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarmovies] = useState([]);
  const [loading, setLoading] = useState(false);
  //let movieName = "Ant-man and the Wasp: Quantumania";

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    //console.log('movie details: ',data)
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    //console.log('movie credit: ',data)
    if (data && data?.cast) setCast(data.cast);
     setLoading(false);
  };
  const getMovieSimilar = async (id) => {
    const data = await fetchMovieSimilar(id);
    //console.log('similar credit: ',data)
    if (data && data?.results) setSimilarmovies(data?.results);
     setLoading(false);
  };

  useEffect(() => {
    //console.log("item", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
     getMovieSimilar(item.id);
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster*/}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              //source={require('../assets/image/moviePoster2.png')}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.75 }}
            ></Image>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            ></LinearGradient>
          </View>
        )}
      </View>
      {/* movie details*/}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
          {movie?.title}
        </Text>
        {/* status, release, runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
            {
                movie?.genres?.map((genre,index)=>{
                    let showDot = index+1 != movie.genres.length
                    return(
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                        {genre.name} {showDot?"•":null}
                      </Text>
                    )
                })
            }
        </View>
        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {
            movie?.overview
          }
        </Text>
      </View>

      {/* Cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* similar movie */}
     <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies}></MovieList> 
    </ScrollView>
  );
}
