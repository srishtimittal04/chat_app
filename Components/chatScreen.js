import React, {Component} from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, StyleSheet, StatusBar, NativeModules, FlatList, ScrollView} from 'react-native';

var ApplozicChat = NativeModules.ApplozicChat;

export default class ChatScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [
//        {name: 'abc',
//        message: 'hlo',}
        ]
      };
//this.ChangeThisTitle=this.ChangeThisTitle(bind).this;
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('convoName','defaultName'),
  };
};
//
// ChangeThisTitle = (titleText) => {
//    const {setParams} = this.props.navigation;
//     setParams({ title: titleText })
// }

  componentDidMount(){
//    var params= this.props.navigation.state.params.convoName
console.log("chatScreen");
  }

  componentWillUnMount()
  {

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

return(
                  <TouchableHighlight onPress={()=>this.props.navigation.navigate('ChatScreen',{'user':item})}>
                    <View
                    style={styles1.flatviewItem} key={item.name}
                    >
                      <Image style={styles1.imageStyle} source={{uri: imageUrl}}/>
                      <Text style={styles1.name}>{item.name}</Text>
                      <Text style={styles1.messageStyle}>{item.message}</Text>
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
    paddingTop: 30,
    borderRadius: 2,
    backgroundColor: 'blue',
  },
  flatviewItem: {
  //  flex:1,
  //  justifyContent: 'center',
    paddingTop: 30,
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
