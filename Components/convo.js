import React, {Component} from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, StyleSheet, StatusBar, NativeModules, FlatList, ScrollView, DeviceEventEmitter} from 'react-native';

var ApplozicChat = NativeModules.ApplozicChat;

export default class Convo extends Component{
  static navigationOptions={
    title:'Conversation list'
  };

  constructor(props){
    super(props);
    var params=this.props.navigation.state.params.isLogin;
    this.state = {
      userId : '',
      password: '',
      email: '',
      phoneNumer: '',
      displayName: '',
      loggedIn: params,
      title: 'Login/SignUp',
      messages: [
//        {name: 'abc',
//        message: 'hlo',}
      ]
    };
    this.isUserlogIn = this.isUserLogIn.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.realTimeUpdate=this.realTimeUpdate.bind(this);
  }

  componentDidMount(){
    console.log("list to be displayed");
    this.isUserLogIn();
    console.log("b"+this.state.loggedIn);
    if(this.state.loggedIn==='true'){
      alert("e5");
        console.log("check3");
      this.getMessage();
      }

      ApplozicChat.registerListener((response) => {
           console.log("Reytum register UI response : " + JSON.stringify(response));
        });
         this.realTimeUpdate();
  }
  getMessage(){
    ApplozicChat.getLatestMessageList({'isScroll' : 'true'}, (error, response) => {
          if(error){
            alert("e6")
              console.log("Reytum error : " + JSON.stringify(error));
          }else{
              alert("e7");
              alert(response);
              var messageList = JSON.parse(response);  //this will be array of messages
              this.setState({messages:messageList});
              alert("msg"+this.state.messages[1]);
          }
        });
  }

  isUserLogIn() {
      ApplozicChat.isUserLogIn((response) => {
        this.setState({loggedIn: response});
          console.log(this.state.loggedIn);
        console.log("check2");
      })
      console.log("a");
  }
  onClickItem(item){
    console.log("call screen");
    this.props.navigation.navigate('ChatScreen',{'convoName':item});
    console.log("called");
  }

  componentWillUnMount()
  {
    ApplozicChat.unregisterListener((response) => {
                console.log("Reytum un-register UI response : " + JSON.stringify(response));
            });
  }

realTimeUpdate(){
  console.log("real updating");
  let messageSent = DeviceEventEmitter.addListener('Applozic-onMessageSent', (response) => {  //triggered when a message has been sent to applozic server
      console.log('Reytum rec event message sent : ' + JSON.stringify(response)); //message object, update this in the current message array and display on screen
  });

 let messageRec = DeviceEventEmitter.addListener('Applozic-onMessageReceived', (response) => { //triggered when a new message is received on the device
      console.log('Reytum rec event message received : ' + JSON.stringify(response)); //message object, update this in the current message array and display in the list
  });
}

  render(){
      return(
        <View style={styles1.container}>
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
                                item.name=name;
                //                console.log(item.name+" "+item.message);
                     });
                       //function to get unread count for Group
  //                    ApplozicChat.getUnreadCountForChannel({'groupId' :item.groupId}, (error, count) => {
    //                     if(error){
      //                       console.log("error ::" + error);
        //               }else{
          //                  unreadCount = count;
            //              }
              //      });

                    }else{
                      //function to get Contact object from contactId
                      ApplozicChat.getContactById(item.to, (arg1, arg2)=>{   //args1 will be status and args2 will be contact Object string
                           contact = JSON.parse(arg2);
                           imageUrl = contact.imageUrl;
                           channel = null
                           name = contact.fullName;
                           item.name=name;
        //                   console.log(item.name +" "+ item.message);
                   });
                      //function to get unread count for user
                   //   ApplozicChat.getUnreadCountForUser( 'ak102', (error, count) => {
                   //       unreadCount = count;
                   //   });
                    }

                    if(item.message.length){
                        message = item.message;
                    }else{
                        message = 'Some other type of message';
                    }

                    createdAtTime = item.createdAtTime;

return(
                  <TouchableHighlight onPress={()=>this.onClickItem(item.name)}>
                    <View
                    style={styles1.flatviewItem} key={item.name}
                    >
                      <Image style={styles1.imageStyle} source={{uri: imageUrl}}/>
                      <Text style={styles1.name}>{item.name}</Text>
                      <Text style={styles1.messageStyle}>{message}</Text>
                    </View>
                    </TouchableHighlight>
        )
              }
            }
            keyExtractor={item=>item.key}
          />
        </View>
      );
    }
}

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
    // padding: 30,
    borderRadius: 2,
    backgroundColor: 'blue',
  },
  flatviewItem: {
  //  flex:1,
  //  justifyContent: 'center',
    padding: 30,
    borderRadius: 2,
    backgroundColor: 'whitesmoke',
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
