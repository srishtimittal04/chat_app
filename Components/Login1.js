import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, NativeModules} from 'react-native';

var ApplozicChat = NativeModules.ApplozicChat;

export default class LoginForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      userId : '',
      password: ''
    };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(){
    alert("err1");
    ApplozicChat.login({
                  'userId': this.state.userId,
                  'password': this.state.password,
                  'authenticationTypeId' : 1,
                  'applicationId' : 'applozic-sample-app',
                  'deviceApnsType' : 0
              }, (error, response) => {
                if(error){
                    alert("err2");
                    console.log("error " + error);
                }else{
                  console.log("response::" + response);
                  alert("err3");
                }
              })
  }

  render(){
    return(
      <View style={styles.container}>
          <TextInput style = {styles.input}
               autoCapitalize = "none"
               onSubmitEditing = {() => this.passwordInput.focus()}
               autoCorrect = {false}
               keyboardType = 'default'
               returnKeyType = "next"
               placeholder = 'User ID'
               placeholderTextColor = 'rgba(225,225,225,0.7)'
               onChangeText = {(text) => this.setState({userId: text})}/>

          <TextInput style = {styles.input}
              returnKeyType = "go"
              ref = {(input)=> this.passwordInput = input}
              placeholder = 'Password'
              placeholderTextColor = 'rgba(225,225,225,0.7)'
              secureTextEntry
              onChangeText = {(text) => this.setState({password: text})}/>

          <TouchableOpacity style = {styles.buttonContainer}
              onPress = {this.loginUser}>
              <Text  style={styles.buttonText}>LOGIN</Text>
         </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
