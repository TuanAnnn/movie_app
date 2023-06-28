import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import Appdrawer from './Appdrawer';


const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Appdrawer} />
        <Stack.Screen options={{headerShown: false}} name="Movie" component={MovieScreen} />
        <Stack.Screen options={{headerShown: false}} name="Person" component={PersonScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})