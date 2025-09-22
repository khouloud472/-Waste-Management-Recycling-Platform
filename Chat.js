import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble,InputToolbar,Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';

const Chat = ({ route, navigation }) => {
  const { emaill, id, Emaildeux } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8000/api/chats?recipient_email=${Emaildeux}&sender_email=${emaill}`);
        const data = await response.json();
        const filteredMessages = data
          .filter(message => message.produit === id.toString())
          .map(message => ({
            _id: message.id,
            text: message.body,
            createdAt: message.created_at,
            user: {
              _id: message.sender_email === emaill ? 1 : 2,
              name: message.sender_email === emaill ? 'You' : 'Other',
              avatar: message.sender_email === emaill ? ' ' : ' ',
            },
          }))
          .reverse();
        setMessages(filteredMessages);
      } catch (error) {
        console.log(error);
        setErrorMessage('Failed to load messages');
      }
    };

    loadMessages();
  }, [emaill, Emaildeux, id]);

  const copyMessage = async (messageId) => {
    const message = messages.find(m => m._id === messageId);
    if (message) {
      Clipboard.setString(message.text);
      alert('Message copied to clipboard');
    }
  };
  
  const deleteMessage = async (messageId) => {
    try {
      await fetch('http://10.0.2.2:8000/api/chats/delete', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: messageId,
        }),
      });
      setMessages(previousMessages => previousMessages.filter(m => m._id !== messageId));
    } catch (error) {
      console.log(error);
      alert('Failed to delete message');
    }
  };
  

  
  const onSend = useCallback((newMessages = []) => {
  
    const sendMessage = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/chats', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: newMessages[0].text,
            sender_email: emaill,
            recipient_email: Emaildeux,
            produit: id,
          }),
        });
        const data = await response.json();
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages).reverse()); // Reverse the order of the messages
      } catch (error) {
        console.log(error);
        setErrorMessage('Failed to send message');
      }
    };
    sendMessage();
  }, [emaill, Emaildeux]);



  return (
    <View style={styles.container}>
    <View>
      <Text style={{ fontSize: 23, textAlign: 'center', alignSelf: 'center', padding: 10, fontWeight: 'bold' }}>Les commentaires</Text>
    </View>

    {errorMessage ? <Text>{errorMessage}</Text> : null}

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={(props) => {
        return (
          <View>
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: '#c6f7ab',
                  borderRadius: 15,
                  padding: 0,
                  marginRight: 60,
                  maxWidth: '80%',
                  bottom: 30,
                },
                right: {
                  backgroundColor: '#68C239',
                  borderRadius: 15,
                  padding: 0,
                  marginLeft: 60,
                  maxWidth: '80%',
                  bottom: 30,
                },
              }}
              textStyle={{
                left: {
                  color: '#000',
                },
                right: {
                  color: '#fff',
                },
              }}
            />
            {props.position === 'left' && (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => copyMessage(props.currentMessage._id)}>
                  <Text style={{ color: '#007aff', marginRight: 10 }}>Copier</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteMessage(props.currentMessage._id)}>
                  <Text style={{ color: 'red' }}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      }}

      renderInputToolbar={(props) => (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: '#e2fcd4',
            borderTopWidth: 0,
            paddingBottom: 5,
            paddingTop: 5,
            borderRadius: 15,
            marginHorizontal: 20,
            bottom: 15,
          }}
          renderSend={(props) => (
            <Send {...props}>
              <FontAwesome name="send" size={26} color="#000" style={{ top: 0, left: -10 }} />
            </Send>
          )}
        />
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
   
  },
});

export default Chat;


