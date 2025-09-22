import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator();
export default function Notification({ navigation, route }) {
  const { email } = route.params || {};
  const [adresse, setAdresse] = useState('');
  const [objetsFiltres, setObjetsFiltres] = useState([]);
  
  useEffect(() => {
  const apiUrl = 'http://10.0.2.2:8000/api/signup';
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
  data.forEach(item => {
  if (item.email === email) {
  setAdresse(item.adresse);
  }
  });
  })
  .catch(error => console.error(error));
  }, [email]);
  
  useEffect(() => {
  const apiUrl = 'http://10.0.2.2:8000/api/objets';
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
  const objetsWithSameAdresse = data.filter(item => item.adresse === adresse);
      // Filter the objects to keep only those created within the last 24 hours
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const now = new Date().getTime();
      const recentObjets = objetsWithSameAdresse.filter(item => {
        const createdAt = new Date(item.created_at).getTime();
        return now - createdAt <= oneDayInMilliseconds;
      });
  
      setObjetsFiltres(recentObjets);
    })
    .catch(error => console.error(error));
  }, [adresse]);

  const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
  <View style={styles.imageContainer}>
  {item.image && (
  <Image source={{ uri: `http://10.0.2.2:8000/storage/${item.image}` }} style={styles.image} />
  )}
  <Text style={styles.date}>{new Date(item.created_at).toLocaleTimeString()}</Text>
  </View>
  <View style={styles.infoContainer}>
  <Text style={styles.title}>{item.title}</Text>
  <Text style={styles.type}>{item.type}</Text>
  <Text style={styles.price}>{item.prix}</Text>
  </View>
  </View>
  );
  
  return (
  <View style={styles.container}>
  {objetsFiltres.length > 0 ? (
  <FlatList
  data={objetsFiltres}
  renderItem={renderItem}
  keyExtractor={item => item.id.toString()}
  ListHeaderComponent={
  <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginVertical: 20 }}>
  Notifications
  </Text>
  }
  />
  ) : (
  <Text style={{ fontSize: 25, alignSelf: 'center', marginVertical: 20 }}>No notifications found</Text>
  )}
  <StatusBar style="auto" />
  </View>
  );
  }  

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        height:600,
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      borderRadius:50,
      backgroundColor:'#b0fd87',
      paddingBottom: 20,
      marginHorizontal:20,
    },
    imageContainer: {
      marginRight: 10,
      width: 160,
      left: 40,
      top:10,
      borderRightWidth:1,
      borderRightColor:'#fff',
    },
    image: {
      width: '50%',
      height: 80,
      borderRadius: 20,
      left : 20
    },
    date: {
      marginTop: 10,
      fontSize: 15,
      fontWeight: 'bold',
      left :30
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
      left : 50,
      top:10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    type: {
      marginTop: 5,
      fontSize: 14,
    },
    address: {
      marginTop: 5,
      fontSize: 14,
    },
    email: {
      marginTop: 5,
      fontSize: 14,
    },
    price: {
      marginTop: 5,
      fontSize: 14,
    },
    quantity: {
      marginTop: 5,
      fontSize: 14,
    },
    quality: {
      marginTop: 5,
      fontSize: 14,
    },
    description: {
      marginTop: 5,
      fontSize: 14,
    },
  });
  
