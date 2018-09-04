import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Components/login';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      this.props.navigation.navigate('Login',{'user':"abc"})
    );
  }
}
