import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert, ImageBackground, FlatList } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function Gererreclamation({ navigation, route }) {
  const [complaints, setComplaints] = useState([]);
  const [showOnlyUntreated, setShowOnlyUntreated] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/reclamations`);
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComplaint = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/reclamations/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({etat: 'traitée'}),
      });
      const updatedComplaint = await response.json();
      setComplaints((prevComplaints) => prevComplaints.map((complaint) => {
        if (complaint.id === updatedComplaint.id) {
          return updatedComplaint;
        }
        return complaint;
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const renderComplaint = ({ item }) => {
    const icon = item.etat === "non traitée" ?
      <Entypo 
        name="squared-cross" 
        size={34} 
        color='red' 
        style={{left:280,top:20}} 
        onPress={() => handleUpdateComplaint(item.id)} 
       /> :
      <AntDesign name="checksquare" size={34} color="#83e34f" style={{left:280,top:20}} />;
    return (
      <View style={{backgroundColor:'#fff',borderRadius: 50,borderWidth:0,shadowRadius:25,marginBottom:30,padding:10,marginLeft:20,marginRight:20,top:10,}}>
        {icon}
        <View style={{marginHorizontal:20,paddingTop:0,top:-10,paddingBottom:10,}}>
          <Text>{item.email}</Text>
          <View>
            <Text style={{fontSize:18,fontWeight:'bold'}}> Objet :</Text>
            <Text> {item.objet}</Text>
          </View>
          <View>
            <Text style={{fontSize:18,fontWeight:'bold'}}> Description :</Text>
            <Text> {item.descrption}</Text>
          </View>
        </View>
      </View>
    );
  };

  const sortedComplaints = complaints.sort((a, b) => {
    if (a.etat === "non traitée" && b.etat === "a") {
      return -1;
    } else if (a.etat === "traitée" && b.etat === "non traitée") {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/back33.png')}
        style={styles.backgroundImage}>  
        <Text style={{fontSize:30,top:30, fontWeight:'bold',color:'#fff',alignSelf:'center'}}>Liste des réclamations</Text>
        <FlatList
          data={sortedComplaints}
          renderItem={renderComplaint}
          keyExtractor={item => item.id.toString()}
          style={{marginVertical:40,}}
        />
      </ImageBackground>  
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
 

    width: 410,
    height: 890,
  },
  complaint: {
    borderWidth: 1,
    borderColor: '#68C239',
    padding: 10,
    marginBottom: 10,
    borderRadius:70,
    left:25,
    right:25,
    borderBottomWidth:12,
  },
});
