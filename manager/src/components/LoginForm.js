import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password })
  }

  renderError() {
    if (this.props.error) {
      const { errorTextStyle } = styles
      const { error } = this.props;

      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={errorTextStyle}>
            {error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    const { loading } = this.props;
    if (!loading) {
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Login
        </Button>
      )
    } else {
      return <Spinner />
    }
  }

  render() {
    const { email, password } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            onChangeText={this.onEmailChange.bind(this)}
            label='Email'
            placeHolder='email@gmail.com'
            value={email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            onChangeText={this.onPasswordChange.bind(this)}
            label='Password'
            placeholder='password'
            value={password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
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
};

mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  }
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser,  })(LoginForm);