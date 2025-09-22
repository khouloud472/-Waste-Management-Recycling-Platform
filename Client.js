import React, { useState, useEffect } from 'react';
import { FlatList,StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import { Ionicons, MaterialIcons,AntDesign  } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
const Client = ({ route }) => {
  const { email } = route.params || {};
  const [objets, setObjets] = useState([]);
  const [vendres, setVendres] = useState([]);
  const [objetId, setObjetId] = useState(null); 
 
  const fetchData = async () => {
    const [objetsData, vendresData] = await Promise.all([
      fetch(`http://10.0.2.2:8000/api/objets?email=${email}`).then(response => response.json()),
      fetch(`http://10.0.2.2:8000/api/vendres`).then(response => response.json())
    ]);
    setObjets(objetsData);
    setVendres(vendresData);
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 500); 
    return () => clearInterval(intervalId); 
  }, []);


  const getObjetInfo = (idObjet) => {
    const objetInfo = objets.find(objet => objet.id == idObjet && objet.email == email);
    if (objetInfo) {
      
      return (
        <>
          <View style={{top:-30, height :230,}}>
       

            {objetInfo.image && (
              <Image
                source={{ uri: `http://10.0.2.2:8000/storage/${objetInfo.image}` }}
                style={{ width: 100, height: 100, marginRight: 10, marginLeft: 10,top:30,  borderRadius: 100,left : 20,}}
              />
            )}
            <View style={{left:150,top:-55,}}>
              <Text style={{fontSize:16,fontWeight:'bold',}}>Prix : {objetInfo.prix}</Text>
              <Text style={{fontSize:16,fontWeight:'bold',}}>Qualite : {objetInfo.qualite}</Text>
              <Text style={{fontSize:16,fontWeight:'bold',}}>Quantite : {objetInfo.quantite}</Text>
            </View>
            
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('./assets/back3.png')} style={styles.backgroundImage}>
            <Text style={styles.title}>Liste des personnes ayant acheté vos objets</Text>
            <FlatList
                data={vendres}
                keyExtractor={item => `${item.idobjet}`}
                style={{ width: '100%', marginHorizontal: 0, marginVertical: 10, top: 30, }}
                renderItem={({ item }) => {
                    if (item.email === email) {
                        const encours = item.status === 'En cours';
                        const terminer = item.status === 'terminé';
                        const annuler = item.status === 'annuler';
                        const handleUpdateComplaint = async (id) => {
                          try {
                            const response = await fetch(`http://10.0.2.2:8000/api/vendre/${id}`, {
                              method: 'PUT',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({status: 'annuler'}),
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
                        const handleUpdateComplaintd = async (id) => {
                          try {
                            const response = await fetch(`http://10.0.2.2:8000/api/vendre/${id}`, {
                              method: 'PUT',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({status: 'terminé'}),
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
                  
                        
                        const handleUpdateComplaintts = async (id) => {
                          try {
                            const response = await fetch(`http://10.0.2.2:8000/api/vendres/${id}`, {
                              method: 'PUT',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({etat: 'supprimer'}),
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
                        if (item.etat === 'supprimer') {
                          return null;
                      }  
            return (
              <View  style={{backgroundColor:"#fff",borderRadius: 25,top:25,marginHorizontal:25, marginBottom:20,height:370, flex:1}}>
             
          
             <Entypo name="cross" size={44} color="#828e7b" style={{left:310, top:0, }} onPress={() => handleUpdateComplaintts(item.id)} />


                  {getObjetInfo(item.idobjet)}
                 
                <View style={{left:10,top:-120,marginHorizontal:30,}}>
                <Text style={styles.infoText}>Nom de l'acheteur : {item.nom}</Text>
                <Text style={styles.infoText}>Adresse : {item.adresseun}, {item.adressedeux}, {item.codepostal}, {item.ville}, {item.pays}</Text>
                <Text style={styles.infoText}>Téléphone : {item.telephone}</Text>
                <Text style={styles.infoText}>Informations supplémentaires: {item.informations}</Text>
                <Text style={styles.infoText}>Mode de paiement : {item.modepaiement}</Text>
                <View style={{ flexDirection: 'row', alignSelf:'center', top:40,left:-10,  }}>
                  
                <TouchableOpacity
  style={{   backgroundColor: annuler ? "#f68f84" : "#b0fd87",
  borderRadius: 25,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  marginLeft: 10,}}
  onPress={() => handleUpdateComplaint(item.id)} 
>
  <Text style={{ color: '#000', fontWeight: 'bold' }}>Anuller</Text>
</TouchableOpacity>

              <TouchableOpacity
                style={{
                
                  backgroundColor: encours ? "#f68f84" : "#b0fd87", 
                  borderRadius: 25,
                  padding: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>En cours</Text>
              </TouchableOpacity>
              <TouchableOpacity
  style={{
    backgroundColor: terminer ? "#f68f84" : "#b0fd87", 
                  borderRadius: 25,
                  padding: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginLeft: 10,
  }}
  onPress={() => handleUpdateComplaintd(item.id)} 
>
  <Text style={{ color: '#000', fontWeight: 'bold' }}>Terminer</Text>
</TouchableOpacity>




            </View>
                </View>
              </View>
            );
          } else {
            return null;
          }
        }}
        
      />
      <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      </ImageBackground>
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 415,
    height: 630,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal:50,
    textAlign: 'center',
    top:20,
    color:"#fff",
  },
  infoText: {
    fontSize: 16,
    fontWeight:'bold',
  },
  image: {
    width: 160,
    height: 160,
    marginRight: 10,
    marginLeft: 10,
    top: 20,
    borderRadius: 50,
  },
});
export default Client;

