

import React, {Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import { Fonts } from './src/utils/Fonts';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Icons from './Icons';
import Allmessage from './Allmessage';
import Sendmessage from './Sendmessage';
import Replymessage from './Replymessage';
import Filescreen from './Filescreen';
import Emergency from './Emergency';

import Charts from './Charts';
import Cardpage from './Cardpage';
import { createSwitchNavigator,createAppContainer,createDrawerNavigator,createBottomTabNavigator,createStackNavigator } from 'react-navigation';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

global.api_url = 'http://13.232.30.205/merpapi/api.php';

const RootStack = createSwitchNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Profile : { screen: Profile },
    Icons : { screen: Icons} ,
    Allmessage : { screen : Allmessage },
    Emergency : { screen : props => <Emergency {...props} defaultValue={'emergency'} /> },
    ActiveShooter : { screen : props => <Emergency {...props} defaultValue={'activeShooter'} /> },
    Sendmessage : { screen : Sendmessage },
    Replymessage : { screen : Replymessage },
    Filescreen : { screen : Filescreen },
    Charts : { screen : Charts },
    Cardpage : { screen : Cardpage },
  },
  {
    initialRouteName: 'Login'
  }

);

const AppContainer = createAppContainer(RootStack);


export default class App extends React.Component {
  render() {
    return (
        <Fragment>
            <AppContainer/>
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: Fonts.Arimo
    
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
