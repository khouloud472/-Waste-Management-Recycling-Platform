import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button,Clipboard, TouchableOpacity,ScrollView  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icon from React Native Vector Icons
import { Octicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const Commentaire = ({ route, navigation }) => {
    const { emaill, id } = route.params || {};
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
  
    useEffect(() => {
      // Fetch comments from the backend
      fetchComments();
    }, []);
  
    const fetchComments = () => {
      fetch('http://10.0.2.2:8000/api/commentaires')
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error(error));
    };
  
    const addComment = () => {
      fetch('http://10.0.2.2:8000/api/commentaires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenu: newComment, email: emaill + id }), // Add the email field
      })
        .then(response => response.json())
        .then(data => {
          setComments([...comments, data]);
          setNewComment('');
        })
        .catch(error => console.error(error));
    };
  
    const deleteComment = (commentId) => {
      fetch(`http://10.0.2.2:8000/api/commentaires/${commentId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Comment deleted') {
            // Remove the deleted comment from the state
            setComments(comments.filter(comment => comment.id !== commentId));
          }
        })
        .catch(error => console.error(error));
    };
const copyComment = (commentContent) => {
  Clipboard.setString(commentContent);
};


return (
  <View style={styles.container}>
    <View>
      <Text style={{ fontSize: 25, textAlign: 'center', alignSelf: 'center', padding: 10, fontWeight: 'bold', marginBottom:10 }}>Les commentaires</Text>
    </View>

    <ScrollView>
      <View style={styles.commentsContainer}>
        {comments.map(comment => (
          <View key={comment.id} style={styles.comment}>
            {comment.email.slice(-1) === id.toString() && (
              <View style={styles.commentContent}>
                <Octicons name="feed-person" size={44} color="#95ea66" />

                <View style={styles.commentText}>
                  <View style={{ padding: 10, borderRadius: 22, marginHorizontal: 10, width: 250, backgroundColor: '#95ea66', top: 10, opacity: 0.8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{comment.email.split('@')[0]}</Text>
                    <Text>{comment.contenu}</Text>
                  </View>
                  <Text style={{ left: 25, top: 15, color: 'gray' }}>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: fr })}</Text>
                </View>

                <View style={{ flexDirection: 'column', margin: 10 }}>
                  <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                    <MaterialCommunityIcons name="delete-empty" size={30} color='gray'  style={{opacity:0.5}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyComment(comment.contenu)}>
                    <Ionicons name="copy" size={28} color='gray' style={{opacity:0.5}} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>

    <View style={styles.inputContainer}>
      <TextInput
        style={{
          backgroundColor: '#e2fcd4',
          borderRadius: 15,
          paddingHorizontal: 10,
          flex: 1,
          marginRight: 10,
        }}
        placeholder="Ajouter un commentaire"
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#e2fcd4',
          borderRadius: 15,
          padding: 10,
        }}
        onPress={addComment}
      >
        <FontAwesome name="send" size={26} color="#000" />
      </TouchableOpacity>
    </View>
  </View>
);

  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff'
  },
  commentsContainer: {
    flex: 1,
  },
  comment: {
    marginBottom: 10,
  },
  commentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default Commentaire;

