import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';

class App extends Component { 
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDj-V2w2xSPto_uKSoDIADvfKrB2bTY-iI',
      authDomain: 'manag-61265.firebaseapp.com',
      databaseURL: 'https://manag-61265.firebaseio.com',
      projectId: 'manag-61265',
      storageBucket: 'manag-61265.appspot.com',
      messagingSenderId: '462042940346'
    };
      
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <LoginForm />
        </View>
      </Provider>
    );  
  }
}

export default App;