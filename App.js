import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Animation from './Animation';
import Carousel from './Interface_un';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Categories from './Categories';
import Modifiercategorie from './Modifiercategorie';
import Ajoutercategorie from './Ajoutercategorie';
import Supprimercategorie from './Supprimercategorie';
import Ajouterpoint from './Ajouterpoint';
import Modifierpoint from './Modifierpoint';
import Points from './Points';
import Pageun from './Pageun';
import Pagedeux from './Pagedeux';
import Pagetrois from './Pagetrois';
import Pagequatre from './Pagequatre';
import Pagecinq from './Pagecinq';
import Supprimerpoint from './Supprimerpoint';
import Modif from './Modif';
import Modiff from './Modiff';
import Objet from './Objet';
import Plus from './Ajouter';
import BarObjet from './BarObjet';
import AdminInterface from './AdminInterface';
import Signup from './Signup';
import MainTabScreen from './Test';
import Achat from './Achat';
import StripeApp from './StripeApp';
import { StripeProvider } from '@stripe/stripe-react-native';
import Vendre from './Vendre';
import Client from './Client';

import Modifff from './Modifff';
import Dashbord from './Dashbord';
import Pun from './Pun';
import Pdeux from './Pdeux';
import Ptrois from './Ptrois';
import Pdeuxx from './Pdeuxx';
import Chat from './Chat';
import ConversationsList from './ConversationsList';
import Supmodif from './Supmodif';
import Modifier from './Modifier';
import Reclamation from './Reclamation';
import Maps from './Maps';
import Filter from './Filter';
import Notification from './Notification';
import Gererreclamation from './Gererreclamation';
import Commentaire from './Commentaire';
import Vendeur from './vendeur';
import MainTabScreendeux from './Testdeux';
import Pagetroisdeux from './Pagetroisdeux';
import Barvendeur from './Barvendeur';
import Mapsdeux from './Mapsdeux';
import Tourstique_un from './Tourstique_un';
import Tourstique_deux from './Tourstique_deux';
import Tourstique_trois from './Tourstique_trois';
import Tourstique_quatre from './Tourstique_quatre';
import Tourstique_cinq from './Tourstqiue_cinq';

import Deux from './Deux';
import Quatre from './Quatre';
import Cinq from './Cinq';
import Un from './Unu';




const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer >
      <Stack.Navigator >
    /* */

      <Stack.Screen name="Animation" component={Animation} options={{ title: 'Bienvenue' }}  />
            <Stack.Screen name="Carousel" component={Carousel} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Categories" component={Categories} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Points" component={Points} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Modifiercategorie" component={Modifiercategorie} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Ajoutercategorie" component={Ajoutercategorie} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Supprimercategorie" component={Supprimercategorie} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Ajouterpoint" component={Ajouterpoint} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Modifierpoint" component={Modifierpoint} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Supprimerpoint" component={Supprimerpoint} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pageun" component={Pageun} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pagedeux" component={Pagedeux} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pagetrois" component={Pagetrois} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pagequatre" component={Pagequatre} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pagecinq" component={Pagecinq} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Modif" component={Modif} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Modiff" component={Modiff} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Objet" component={Objet} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Plus" component={Plus} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="BarObjet" component={BarObjet} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="AdminInterface" component={AdminInterface} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Achat" component={Achat} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="StripeApp" component={StripeApp} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Vendre" component={Vendre} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Client" component={Client} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Modifff" component={Modifff} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Dashbord" component={Dashbord} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Modifier" component={Modifier} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pun" component={Pun} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pdeux" component={Pdeux} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Ptrois" component={Ptrois} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Pdeuxx" component={Pdeuxx} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Chat" component={Chat} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Supmodif" component={Supmodif} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="Reclamation" component={Reclamation} options={{ title: 'Bienvenue' }}/>
            <Stack.Screen name="ConversationsList" component={ConversationsList} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Maps" component={Maps} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Filter" component={Filter} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Notification" component={Notification} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Gererreclamation" component={Gererreclamation} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Commentaire" component={Commentaire} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Vendeur" component={Vendeur} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="MainTabScreendeux" component={MainTabScreendeux} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Pagetroisdeux" component={Pagetroisdeux} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Barvendeur" component={Barvendeur} options={{ title: 'Bienvenue' }} />
            <Stack.Screen name="Mapsdeux" component={Mapsdeux} options={{ title: 'Bienvenue' }} />
          </Stack.Navigator>
          </NavigationContainer> 
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
