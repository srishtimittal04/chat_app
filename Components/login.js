import React, {Component} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar, NativeModules, FlatList, ScrollView} from 'react-native';
import Convo from './convo';

var ApplozicChat = NativeModules.ApplozicChat;

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      userId : '',
      password: '',
      email: '',
      phoneNumer: '',
      displayName: '',
      loggedIn: 'false',
      title: 'Login/SignUp',
      messages: [
//        {name: 'abc',
//        message: 'hlo',}
      ]
    };
    this.logInUser = this.logInUser.bind(this);
    this.isUserlogIn = this.isUserLogIn.bind(this);
  }

  componentDidMount(){
              console.log(this.state.loggedIn);
    this.isUserLogIn();
    if(this.state.loggedIn==='true'){
      alert("never occurs");
      }
  }

  logInUser(){
    alert("err1");
    console.log("err1");
    this.isUserLogIn();
    ApplozicChat.login({
                  'userId': 'shivam',
                  'email': '',
                  'contactNumber': '',
                  'displayName': '',
                  'password': 'shivam',
                  'authenticationTypeId' : 1,
                  'applicationId' : 'applozic-sample-app',
                  'deviceApnsType' : 0
              }, (error, response) => {
                if(error){
                    alert("err2");
                    console.log("err2");
                    console.log("error " + error);
                }else{
                  alert("err3");
                  console.log("err3");
                      this.setState({loggedIn:'true'});
                      console.log("response::" + response);
                  console.log("login successfull");
                }
              });
            console.log("out from login");
            this.isUserLogIn();
      }

  isUserLogIn() {
              console.log("logged in 1");
        ApplozicChat.isUserLogIn((response) => {
        this.setState({loggedIn: response});
        console.log("loggedIn 2 "+this.state.loggedIn);
      })
  }

  componentWillUnMount()
  {
    //    this.setState(loggedIn:'false');
  }

  render(){
    if(this.state.loggedIn==='true'){
      return(
          this.props.navigation.navigate('Convo',{'isLogin':this.state.loggedIn})
      //      <Convo loggedIn={this.state.loggedIn}></Convo>
      );
    }

    return(
      <View style={styles.container}>
      <ScrollView>
          <Text style = {styles.titleText}>Applozic </Text>
          <Text style = {styles.baseText}>Demo App </Text>
          <TextInput style = {styles.input}
               autoCapitalize = "none"
            //   onSubmitEditing = {() => this.passwordInput.focus()}
               autoCorrect = {false}
               keyboardType = 'default'
               underlineColorAndroid = 'transparent'
               returnKeyType = "next"
               placeholder = 'User ID'
               maxLength = {25}
               placeholderTextColor = 'rgba(225,225,225,0.7)'
               onChangeText = {(text) => this.setState({userId: text})}/>

               <TextInput type = "email-address"
                  style = {styles.input}
                  placeholder = "Email"
                  autoCapitalize = "none"
                  keyboardType = "email-address"
                  returnKeyType = "next"
                  maxLength = {30}
                  underlineColorAndroid = 'transparent'
                  placeholderTextColor = 'rgba(225,225,225,0.7)'
              //    value = { this.state.email}
                  onChangeText = {email => this.setState({email})}/>

               <TextInput style = { styles.input}
                  placeholder = "Phone Number"
                  keyboardType = "phone-pad"
                  maxLength = {10}
                  returnKeyType = "next"
                  underlineColorAndroid = 'transparent'
                  placeholderTextColor = 'rgba(225,225,225,0.7)'
              //    value = {this.state.phoneNumber}
                  onChangeText = {phoneNumber => this.setState({phoneNumber})}/>

                  <TextInput id = "displayName"
                     style = {styles.input}
                     placeholder = "Display Name"
                     keyboardType = "default"
                     returnKeyType = "next"
                     underlineColorAndroid = 'transparent'
                     placeholderTextColor = 'rgba(225,225,225,0.7)'
              //       value = {this.state.displayName}
                     maxLength = {25}
                     onChangeText = {displayName => this.setState({displayName})}/>

          <TextInput style = {styles.input}
              secureTextEntry={true}
              password='true'
              autoCapitalize = "none"
              returnKeyType = "go"
              maxLength = {25}
      //        ref = {(input)=> this.passwordInput = input}
              placeholder = 'Password'
              underlineColorAndroid = 'transparent'
              placeholderTextColor = 'rgba(225,225,225,0.7)'
              onChangeText = {(text) => this.setState({password: text})}/>

          <TouchableOpacity style = {styles.buttonContainer}
              onPress = {this.logInUser}>
              <Text  style={styles.buttonText}>{this.state.title}</Text>
         </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
//    flex:1,
//     alignItems:'center',
//     justifyContent:'center',
     padding: 20,
     backgroundColor: '#4D394B'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 35,
        alignSelf: 'center'
    },
    baseText: {
        fontFamily: 'Cochin',
        color: '#fff',
        marginBottom: 25,
        alignSelf: 'center'
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
        paddingVertical: 15,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
