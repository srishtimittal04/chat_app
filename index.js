import { AppRegistry } from 'react-native';
import App from './App';
import { StackNavigator } from 'react-navigation';

import Login from './Components/login';
import Convo from './Components/convo';
import ChatScreen from './Components/chatScreen';
export const route=StackNavigator({
  App:{screen:App},
  Login:{screen: Login},
  Convo:{screen: Convo},
  ChatScreen:{screen:ChatScreen}
});

AppRegistry.registerComponent('pro', () => route);
