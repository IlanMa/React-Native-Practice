import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {

  render() {

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: TabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: StackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen }
        })
      }
    },
    {
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      lazy: true, // Each screen will not mount/load until user clicks on them
      animationEnabled: false,
      tabBarOptions: {
        showIcon: true,
        iconStyle: {
          width: 30,
          height: 30
        }
      }
    })
  }
},
  {
    navigationOptions: {
      tabBarVisible: false
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: true, // Each screen will not mount/load until user clicks on them
    animationEnabled: false
  }
);



    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


