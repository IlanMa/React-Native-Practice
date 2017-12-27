import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {
  state = { 
    email: '',
    password: '',
    error: ''
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: ''});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch((err) => {
            this.setState({ error: 'Authentication Failed.' })
          })
      })
  }

  render() {
    const { errorTextStyle } = styles;

    return (
      <Card>
        <CardSection>
          <Input
            placeholder='user@gmail.com'
            label='Email'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry={true}
            placeholder='password'
            label='Password'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </CardSection>

        <Text style={errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;