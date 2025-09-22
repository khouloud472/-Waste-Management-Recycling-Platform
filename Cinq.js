import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';

const Cinq = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const personnes = [
    { nom: '      Le mémorial de Medjez-El-Bab est un mémorial situé dans le cimetière militaire de Medjez-el-Bab près de Medjez el-Bab, en Tunisie. Dessiné par Hubert Worthington (en) pour le compte de l\'Imperial War Graves Commission (actuelle Commonwealth War Graves Commission), il est inauguré le 16 novembre 1957.\n\n      Le mémorial commémore 1 956 membres des forces armées du Commonwealth (1re armée en opérations entre le 8 novembre 1942 et le 13 mai 1943 et 8e armée en opérations du 20 février au 13 mai 1943) qui sont morts en Tunisie et en Algérie pendant la Seconde Guerre mondiale et qui n\'ont pas de sépulture connue.', image:[ require('./assets/s1.png'),  require('./assets/s2.png'),  require('./assets/s3.png')] },
    { nom: '', image:[ require('./assets/s4.png'),  require('./assets/s5.png'),  require('./assets/s6.png')] },
    ];
  useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3); // Ici, 3 est le nombre d'images différentes pour chaque personne.
    }, 2000); // 5 secondes

    return () => clearTimeout(timer); // Nettoyez la minuterie lors du démontage.
}, [currentImageIndex]);

  return (
   
    <ScrollView contentContainerStyle={styles.container}>
      {personnes.map((personne, index) => (
        <View key={index} style={styles.card}>
        <Image source={personne.image[currentImageIndex]} style={styles.image} />

          <Text style={styles.text}>{personne.nom}</Text>
          
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor:'#fff'
  },
  card: {
    width: '95%',
    backgroundColor: 'white',
    margin: 10,

    borderRadius: 10,
    alignItems: 'center',
   
  },
  image: {
    width: 150,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    width: '95%',
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
   /* shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,*/
  },
  text: {
    fontSize: 15,
    
    color:'#031835',
   padding:10,
   fontWeight:'400'
  },
  
});

export default Cinq;
