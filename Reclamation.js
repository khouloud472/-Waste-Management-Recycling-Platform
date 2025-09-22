import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
export default function Reclamation({ navigation, route }) {
 const { email } = route.params || {};
  const [objet, setObjet] = useState('');
  const [descrption, setDescrption] = useState('');
  const [emaill, setEmaill] = useState('');
  const [etat, setEtat] = useState('');
  const { title } = route.params || {};

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const id = route.params.id;
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/reclamations/${id}`);
      const data = await response.json();
      const { email, objet, descrption } = data;
     
      setEmaill(email);
      setObjet(objet);
      setDescrption(descrption);
      setEtat(etat);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('objet', objet);
    formData.append('descrption', descrption);
    formData.append('etat', etat);
    try {
      const response = await fetch('http://10.0.2.2:8000/api/reclamations', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
  
      const data = await response.json();
      Alert.alert('Success', 'Réclamation enregistré avec succès.');
     
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Une erreur s\'est produite lors de l\'enregistrement de la catégorie.');
    }
  };
  return (
    <View style={styles.container}>
   
  
      <ImageBackground source={require('./assets/reclamation.png')} style={styles.backgroundImage}>
        <Text>{'\n'}{'\n'}{'\n'}{'\n'}</Text>
        <View style={styles.form}>
          
        <View style={{top:-300}}>
    <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmaill(text)}
      />
       <TextInput
        style={styles.input}
        value="non traitée"
        onChangeText={text => setEtat(text)}
      />
      
      </View>
     
             <TextInput
        style={styles.input}
        value={objet} 
        placeholder="Objet"
        onChangeText={text => setObjet(text)}
        
      />
          <TextInput
          style={styles.input}
          
            value={descrption}
            placeholder="Description"
            onChangeText={text => setDescrption(text)}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.b}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Envoyer la réclamation</Text>
          </TouchableOpacity>
        </View>
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
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
form: {
width: '80%',
left:40,
top:30,
},

buttonText: {
color: '#8ED332',
textAlign: 'center',
fontWeight: 'bold',
fontSize:20,
},
b:{
    backgroundColor: '#fff', 
    width: '80%',
    alignItems: 'center',
    top:30,
    right:40,
    left:40,
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
    padding:15,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 615,
  },
  tx0:{
    top:-80,
    fontSize: 30,
    fontWeight: 'bold',
    right:20,
  },
  label:{
    top:40,
    left:30,
    fontSize: 15,
    fontWeight: 'bold',
    color:'#000',
    marginBottom:-5,
  },


  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:40,
    height:45,
    maxHeight:70,

    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor:'#fff',
    borderRadius: 35,
    paddingHorizontal: 5,
    top:35,
    borderRadius: 18,
 
    opacity: 0.8,
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),},
    input: {
      borderWidth: 1.5,
      borderColor: '#fff',
      backgroundColor:'#fff',
      borderRadius: 4,
      padding: 2,
      marginBottom: 10,
      width: '100%',
    },
});/*
*/