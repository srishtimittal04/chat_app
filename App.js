import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Components/Login1';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
    //  <Text>Login:</Text>
        <Login/>
      </View>
    );
  }
}
