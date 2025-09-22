import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, } from 'react-native';
import Pagedeux from './Pagedeux';
import Pagetrois from './Pagetrois';
import Pageun from './Pageun';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Pagequatre from './Pagequatre';
import Pagecinq from './Pagecinq';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';  
import Pagetroisdeux from './Pagetroisdeux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreendeux = ({ route,navigation }) => {
  const { email } = route.params || {};
  const gmail = email;
  useEffect(() => {
    console.log(email);
  }, []);

  return (
    

    <Tab.Navigator initialRouteName="Pagetrois" style={styles.tabNavigator}
    tabBarOptions={{
      
      showLabel: false,
      style: {
        opacity: 0.1,
      },
      tabStyle: {
        borderRadius: 0,
        marginHorizontal: 0,
        backgroundColor: '##E3F4CB',
        
      },
      inactiveTintColor: '#D3CCB0',
      activeTintColor: '#68C239',
      
    }}> 
      

<Tab.Screen
  name="Pagedeux"
  component={Pagedeux}
  initialParams={{ email: gmail }}
  options={{
    tabBarLabel: 'Points de collecte',
    tabBarIcon: ({ color, size }) => (
      <Octicons name="feed-person" color={color} size={35} />
    ),headerTitle: ' ',headerShown: false,
  }}
/>


            
      <Tab.Screen name="Pagetroisdeux" component={Pagetroisdeux} initialParams={{ email: gmail }} options={{ tabBarLabel: 'Catégories', tabBarIcon: ({ color, size }) => (
            <FontAwesome name="recycle"  color={color}  size={35}  /> ), title: 'ef',headerShown: false,}} />



      </Tab.Navigator>
  
  );
};
const styles = StyleSheet.create({
  button: {
  right:10,
  left: 10,
  },
});
export default MainTabScreendeux;
