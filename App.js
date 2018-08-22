import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Convo from './Components/convo';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Convo/>
      </View>
    );
  }
}
