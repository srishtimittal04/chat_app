import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, NativeModules, FlatList, ScrollView} from 'react-native';

var ApplozicChat = NativeModules.ApplozicChat;

export default class Convo extends Component{

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
      messages: []
    };
    this.logInUser = this.logInUser.bind(this);
    this.isUserlogIn = this.isUserLogIn.bind(this);
  }

  componentDidMount(){
    this.isUserLogIn();
    if(this.state.loggedIn){
      alert("e4");
      ApplozicChat.getLatestMessageList({'isScroll' : 'true'}, (error, response) => {
            if(error){
              alert("e5")
                console.log("Reytum error : " + JSON.stringify(error));
            }else{
                alert("e6");
                var messageList = JSON.parse(response);  //this will be array of messages
                this.setState({messages:messageList});
            }
          });
      }
  }

  logInUser(){
//    alert("err1");
    ApplozicChat.login({
                  'userId': this.state.userId,
                  'email': this.state.email,
                  'contactNumber': this.state.phoneNumber,
                  'displayName': this.state.displayName,
                  'password': this.state.password,
                  'authenticationTypeId' : 1,
                  'applicationId' : 'applozic-sample-app',
                  'deviceApnsType' : 0
              }, (error, response) => {
                if(error){
//                    alert("err2");
                    console.log("error " + error);
                }else{
                  this.setState({loggedIn:'true'});
                  console.log("response::" + response);
//                  alert("err3");
                }
              })
      }

  isUserLogIn() {
      ApplozicChat.isUserLogIn((response) => {
        this.setState({loggedIn: response});
      })
  }

  render(){
    if(this.state.loggedIn){
      return(
        <View style={styles1.container}>
          <View style={styles1.header}>
            <Text style={styles1.h2style}>Conversation List</Text>
          </View>
          <FlatList
            style={styles1.flatview}
            showsVerticalScrollIndicator={true}
            data={this.state.messages}
            renderItem={
              ({item})=> {
                  var contact=null;
                  var channel=null;
                  var imageUrl=null;
                  var name=null;
                  var message=null;
                    if(item.hasOwnProperty('groupId')){
                      //function to get Group object from groupId
                      ApplozicChat.getChannelFromChannelKey(item.groupId, (args1, args2)=>{  //args1 will be status and args2 will be group Object string
                                channel = JSON.parse(args2).channel;
                                contact = null;
                                imageUrl = channel.imageUrl;
                                name = channel.name;
                     });
                       //function to get unread count for Group
                      ApplozicChat.getUnreadCountForChannel({'groupId' :item.groupId}, (error, count) => {
                         if(error){
                             console.log("error ::" + error);
                       }else{
                            unreadCount = count;
                          }
                    });

                    }else{
                      //function to get Contact object from contactId
                      ApplozicChat.getContactById(item.to, (arg1, arg2)=>{   //args1 will be status and args2 will be contact Object string
                           contact = JSON.parse(arg2);
                           imageUrl = contact.imageUrl;
                           channel = null
                           name = contact.fullName;
                   });
                      //function to get unread count for user
                     ApplozicChat.getUnreadCountForUser( 'ak102', (error, count) => {
                         unreadCount = count;
                     });
                   }

                    if(item.message.length){
                        message = item.message;
                    }else{
                        message = 'Some other type of message';
                    }

                    createdAtTime = item.createdAtTime;
return(
                   <View style={styles1.flatviewItem}>
                      <Text>User1</Text>
                      <Image style={styles1.imageStyle} source={{uri: imageUrl}}/>
                      <Text style={styles1.name}>{name}</Text>
                      <Text style={styles1.messageStyle}>{message}</Text>
                    </View>
        )
              }
            }
            keyExtractor={item=>item.key}
          />
        </View>
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

const styles1=StyleSheet.create({
  container:{
//    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'skyblue',
  },
  header: {
//    flex: 0.2,
  },
  h2style:{
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 20,
    padding:10,
  //  fontWeight: 'bold',
  },
  flatview: {
//    flex:0.8,
  //  justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
    backgroundColor: 'blue',
  },
  flatviewItem: {
  //  flex:1,
  //  justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
    backgroundColor: 'blue',
  },
  imageStyle:{
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  messageStyle: {
    color: 'red',
    fontSize: 10
  }
});
