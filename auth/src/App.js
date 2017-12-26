import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyCaSwQB8sboWXiZX1XWlgNBTZDR9tix3oA',
      authDomain: 'auth-82b88.firebaseapp.com',
      databaseURL: 'https://auth-82b88.firebaseio.com',
      projectId: 'auth-82b88',
      storageBucket: 'auth-82b88.appspot.com',
      messagingSenderId: '791836566682'
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        <LoginForm />
      </View>
    );
  }
}

export default App;