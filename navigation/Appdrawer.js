import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import {styles} from '../theme'
import { Bars3CenterLeftIcon,MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import UserInfoScreen from '../screens/UserInfoScreen';

const Drawer = createDrawerNavigator();
const TextTitle = ()=>{
  return (
      <Text className="text-white text-3xl font-bold">
    <Text style={styles.text}>M</Text>ovie</Text>
  )
}
export default function Appdrawer() {
  const navigation = useNavigation()
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen"
      options={{
        title:"Home",
        headerTitle: (props) => <TextTitle {...props} />,
        headerStyle:{
          backgroundColor:'#4d4d4d',
          height:80
        },
        headerRight:()=>(
          <TouchableOpacity className='p-2' onPress={()=>navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color='white'></MagnifyingGlassIcon>
          </TouchableOpacity>
        )
      }}
      component={HomeScreen} />
      <Drawer.Screen name='UserInfo'
      options={{
        title:'Profile'
      }}
      component={UserInfoScreen}
      ></Drawer.Screen>
    </Drawer.Navigator>
  )
}