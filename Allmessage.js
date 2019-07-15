import React from 'react';

import { FlatList, ActivityIndicator, Text, View, Platform, StatusBar  } from 'react-native';

import { StyleSheet, TextInput, Button, props,Image, TouchableOpacity, ScrollView,Alert } from 'react-native';

import  Moment from 'moment';

import t from 'tcomb-form-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { Icon } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

import Replymessage from './Replymessage';

import  alaSQLSpace from 'alasql';

 

const MyStatusBar = ({backgroundColor, ...props}) => (

  <View style={[styles.statusBar, { backgroundColor }]}>

    <StatusBar translucent backgroundColor={backgroundColor} {...props} />

  </View>

);

 

export default class Allmessage extends React.Component {

 

static navigationOptions = {

//To hide the ActionBar/NavigationBar

header:null,

};

 

constructor(props){

    super(props)

    {

       this.state={

        dataSource:'',

        id:'',

        isLoading:true,

        safeguard_Cookie:'',

        all_sms:'',

        crossshow:'',

        withoutcross:'',

        buttonTitle:'Edit',

       };

    }

}

 

GetAllmsg(){

 

  AsyncStorage.getItem('session',(err,result)=>{

  var organization_id=JSON.parse(result).organization_id;

  fetch(global.api_url,

     {

         method: 'POST',

         headers: {

             Accept: 'application/json',

             'Content-Type': 'application/json'

         },

         body: JSON.stringify({

          'action':'getMessageList',

          'organization_id': organization_id

         })

     })

      .then((response) => response.json())

      .then((response) => {

       

        const status=response.status;

 

       if(status === "true")

       {

      

        const message_list = response.message_list;

        const dats=message_list.conversation;

        console.log(dats);

          this.setState({

          isLoading: false,

          dataSource: dats,

          all_sms:response,

          crossshow:false,

          withoutcross:true

        }, function(){

 

          console.log("data");

          console.log(this.state.dataSource);

        });

        //AsyncStorage.setItem('safeguard_messages', JSON.stringify(message_list));  

       }      

 });

 

});

 

}

 

  componentDidMount(){

 

    this.GetAllmsg();

//     AsyncStorage.getItem('safeguard_Cookie',(err,result)=>{

//         this.setState({

//           safeguard_Cookie_loading: false,

//           safeguard_Cookie: result,

 

//         }, function(){

//        //  fetch('https://mobileemergencyresponseplans.com/api/messages',

// return fetch('https://mobileemergencyresponseplans.com/api/messages',

//     {

//       method:'GET',

//       headers:{

//           Accept: 'application/json',

//           'Content-Type':'application/json',

//           'Cookie':this.state.safeguard_Cookie,

//       }

//     })

//       .then((response) => response.json())

//       .then((responseJson) => {

 

//         this.setState({

//           isLoading: false,

//           dataSource: responseJson.conversations,

//           all_sms:responseJson,

//           crossshow:false,

//           withoutcross:true

//         }, function(){

 

//         });

//       })

//       .catch((error) =>{

//           });

//         });

//      });

    }

 

    reply(item){

    var id=item.id;

    this.props.navigation.navigate('Replymessage',{

     messageid: id});

      }

     

        confirmSubmit(item){

         

          AsyncStorage.getItem('safeguard_Cookie',(err,result)=>{

            this.setState({

              safeguard_Cookie_loading: false,

              safeguard_Cookie: result,

              id:item.id.toString(),

     

            }, function(){

              

        let collections={}

        collections.id=this.state.id,

       

         fetch('https://mobileemergencyresponseplans.com/api/messages/'+item.id.toString(),

       // fetch('http://35.174.0.12/api/messages',

        {

          method:'DELETE',

          headers:{

              Accept: 'application/json',

              'Content-Type':'application/json',

              'Cookie':this.state.safeguard_Cookie,

       },

       

        })

      .then((response)=>response.json())

      .then((responsejson)=>{

         

      return fetch('https://mobileemergencyresponseplans.com/api/messages',

      {

        method:'GET',

        headers:{

            Accept: 'application/json',

            'Content-Type':'application/json',

            'Cookie':this.state.safeguard_Cookie,

        }

      })

        .then((response) => response.json())

        .then((responseJson) => {

   

          this.setState({

            isLoading: false,

            dataSource: responseJson.conversations,

          }, function(){

   

          });

        })

        .catch((error) =>{

        

            });

   

      })

      .catch((error)=>

      {

      //alert('Something Wrong',error);

      });

      });

      }); 

    }

   

 

    actionOnRow(item) {

 

      Alert.alert(

        'Alert',

        'Are you sure you want to Delete message?',

        [{text: 'Cancel', onPress: () => console.log('Cancel Pressed'),

            style: 'cancel',

          },

          {text: 'Yes',

          onPress: () =>  this.confirmSubmit(item)},

        ],

        {cancelable: false},

      );

}

 

    defineBgColor(unread){

      switch(unread){

        case "true":

          return "#0d2a7a";

        case "false":

          return "#4c4c4c";

        default:

        return null;

      }

    }

 

editMessage(title){

 

if (title== 'Edit')

{

  this.setState({

    crossshow:true,

    withoutcross:false,

    buttonTitle:'Done'

  })

}

else if(title=='Done'){

  this.setState({

    crossshow:false,

    withoutcross:true,

    buttonTitle:'Edit'

  })

}

}

 

    refreshMessage(){

 

      alert('refresh');

      this.componentDidMount();

    }

 

render() {

 

    Moment.locale('en');

   if(this.state.isLoading){

        return(

          <View style={{

            flex:1,

            alignItems: 'center',

            justifyContent: 'center'}}>

                   <ActivityIndicator size="large" color="#0000ff" />

                </View>

        )

      }

 

      return(

      

         <View style={styles.wrapper}>

            <MyStatusBar backgroundColor="#031537" barStyle="light-content" />

            <View style={styles.header}>

            <View style={styles.logoimg}>

            <TouchableOpacity

            onPress={() => this.props.navigation.navigate('Home')}

            underlayColor='#fff'>

            <Text style={styles.iconfont}>h</Text>

            </TouchableOpacity>

 

            <Text style={styles.logoText}>

            Messages

            </Text>

            </View>

            <View style={styles.rightnav}>

              <TouchableOpacity

              // onPress={() => this.props.navigation.navigate('Home')}

              onPress={() => this.editMessage(this.state.buttonTitle)}

              underlayColor='#fff'>

                <Text style={{color: 'white', fontSize: 18, paddingRight: 12,}}>{this.state.buttonTitle}</Text>

              </TouchableOpacity>

 

               <TouchableOpacity

              // onPress={() => this.props.navigation.navigate('Home')}

              onPress={() => this.refreshMessage()}

              underlayColor='#fff'>

              <Text style={styles.iconRefresh}>⟳</Text>

              </TouchableOpacity>

            </View>

            </View>

            <View style={styles.mainsection}>

         

          {/* style={styles.grayView} */}

 

          { this.state.withoutcross ?

            <FlatList

              data={this.state.dataSource}

              renderItem={({item}) =>

              <TouchableOpacity onPress={ () => this.reply(item)}>

              <View style={styles.grayView}

               style={{ backgroundColor: this.defineBgColor(item.unread),

                borderBottomColor: 'rgba(41, 41, 41, 0.7)', borderBottomWidth: 1, paddingTop: 9,

                paddingBottom: 9,

                paddingLeft: 7,

                paddingRight: 7, flexDirection:'row', paddingTop:16, paddingBottom: 16,}} >

                 <View style={styles.textrow1}>
                 { item.unread != "false"  ? 
                <Text style={styles.icontick}>✓</Text>
                 : null}

                  { item.unread != "true"? 
                  <Text style={styles.iconminus}>—</Text>
                  : null }

                  </View>

                  <View style={styles.textrow2}>

                    <View style={styles.item}>

                      <View style={{flex:2, flexDirection: 'row',}}>

                        <View style={{flex:5,}}>

                          <Text style={styles.senderName}>{item.sender.first_name} {item.sender.last_name}</Text>

                          <Text style={styles.senderLocation}>{item.sender.school}</Text>

                        </View>

               

                        <View style={{flex:3, flexDirection: 'row', justifyContent: 'flex-end'}}>

                          <Text style={styles.datetime}>

                          {Moment(item.last_message_at).format('MM/DD/YYYY')}

                          </Text>

                          <Text style={styles.datetime}>

                          {Moment(item.last_message_at).format('hz:mm a')}

                          </Text>

                        </View> 

                      </View>

                      <View style={{flex:1, paddingTop: 12,}}>

                        <Text style={styles.senderMsg}>{item.snippet}</Text>

                      </View>

                    </View>

                  </View>

 

             </View>

             </TouchableOpacity >

          }

              keyExtractor={({id}, index) => index.toString()}

            />

 

           : null }

 

           { this.state.crossshow ?

      

            <FlatList

              data={this.state.dataSource}

              renderItem={({item}) =>

              <TouchableOpacity >

              <View style={styles.grayView} style={{backgroundColor: this.defineBgColor(item.unread),

                borderBottomColor: 'rgba(41, 41, 41, 0.7)', borderBottomWidth: 1, paddingTop: 9,

                paddingBottom: 9,

                paddingLeft: 7,

                paddingRight: 7, flexDirection:'row', paddingTop:16, paddingBottom: 16,}} >

                

                  <View style={styles.textrow2}>

                    <View style={styles.item}>

                      <View style={{flex:2, flexDirection: 'row',}}>

                        <View style={{flex:5,}}>

                          <Text style={styles.senderName}>{item.sender.name}</Text>

                          <Text style={styles.senderLocation}>{item.sender.school}</Text>

                        </View>

               

                        <View style={{flex:3, flexDirection: 'row', justifyContent: 'flex-end'}}>

                          <Text style={styles.datetime}>

                          {Moment(item.last_message_at).format('DD/MM/YYYY')}

                          </Text>

                          <Text style={styles.datetime}>

                          {Moment(item.last_message_at).format('hz:mm a')}

                          </Text>

                        </View> 

                      </View>

                      <View style={{flex:1, paddingTop: 12,}}>

                        <Text style={styles.senderMsg}>{item.snippet}</Text>

                      </View>

                    </View>

                  </View>

                

                  <View style={styles.textrowClose}>

                  <TouchableOpacity

                    onPress={() => this.actionOnRow(item)}

                    underlayColor='#fff'>

                    {/* <Text style={styles.iconclose}>x</Text> */}

                    <Text style={{fontFamily:'safeguard', color:'red', fontSize:25,}}>x</Text>

                    </TouchableOpacity>

                  </View>

 

             </View>

             </TouchableOpacity >

          }

              keyExtractor={({id}, index) => index.toString()}

            />

 

            : null }

          </View>

        </View>

       

      );

  }

}

 

const styles =

StyleSheet.create({

contentContainer: {

//paddingVertical: 40,

},

 

wrapper: {

  flex: 1,

  flexDirection: 'column',

  justifyContent: 'flex-start',

  backgroundColor: '#fff',

},

 

header: {

   height: Platform.OS === 'ios' ? 75 : 56,

   marginTop: Platform.OS === 'ios' ? 0 : 24,

   ...Platform.select({

       ios: { backgroundColor: '#031537', paddingTop: 24},

       android: { backgroundColor: '#031537'}

   }),

   alignItems: 'center',

   justifyContent: 'space-between',

   flexDirection:'row'

   },

   text: {

      color: '#fff',

      fontSize: 24,

      flex: 2,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'center',

     

      },

      rightnav: {

          // maxWidth: 120,

           flex: 1,

           flexDirection: 'row',

           justifyContent: 'space-between',

           //alignItems: 'center',

           paddingRight: 10,

         

         },

         iconfont:{

          fontFamily:'safeguard',

          color:'#fff',

          fontSize:23,

         },

         iconRefresh:{

          fontFamily:'safeguard',

          color:'#fff',

          fontSize:20,

          //marginTop:0,

         },

    logoimg: {

      paddingLeft: 5,

      flex: 4,

      flexDirection: 'row',

      //backgroundColor: 'red',

    },

    logoText: {

      color: 'white',

      fontSize: 14,

      //fontWeight: 'bold',

      paddingLeft: 10,

      fontFamily:'Arimo-Regular'

      },

mainCont: {

  flex: 12,

  flexDirection: 'column',

},

icontick:{

  fontFamily:'safeguard',

  color:'#fff',

  fontSize:28,

  fontWeight:'bold',

},

iconminus:{

  fontFamily:'safeguard',

  color:'#fff',

  fontSize:35,

  fontWeight:'bold',

},

iconclose:{

  fontFamily:'safeguard',

  color:'red',

  fontSize:35,

  fontWeight:'bold',

},

grayView: {

  backgroundColor: '#4c4c4c',

  paddingTop: 9,

  paddingBottom: 9,

  paddingLeft: 7,

  paddingRight: 7,

  flex: 1,

  flexDirection: 'row',

  borderBottomColor: 'black',

  borderBottomWidth: 1,

  marginBottom: 1,

},

blueView: {

  backgroundColor: '#0d2a7a',

  paddingTop: 9,

  paddingBottom: 9,

  paddingLeft: 7,

  paddingRight: 7,

  flex: 1,

  flexDirection: 'row',

  borderBottomColor: '#2f2e2e',

  borderBottomWidth: 1,

},

textrow1: {

  //flex:1,

  justifyContent: 'center',

  alignItems: 'flex-start',

  paddingLeft: 5,

  paddingRight: 25,

},

textrowClose: {

  flex:1,

  justifyContent: 'center',

  alignItems: 'flex-end',

},

textrow2: {

  flex:8,

  flexDirection: 'column',

},

 

senderName: {

color: 'white',

fontSize: 19,

 

fontFamily:'Arimo-Bold',

},

senderLocation: {

color: 'white',

 

fontSize: 16,

fontFamily:'Arimo-Bold',

},

senderMsg:{

  color: 'white',

  fontSize: 15,

  fontFamily:'Arimo-Regular',

},

datetime: {

color: 'white',

fontSize: 10,

textAlign: 'right',

 

paddingBottom: 2,

paddingRight: 5,

paddingTop: 5,

fontFamily:'Arimo-Bold',

},

loginScreenButton:{

marginTop:10,

paddingTop:9,

paddingBottom:9,

backgroundColor:'#112d7d',

borderRadius:5,

},

loginText:{

  color:'#fff',

  textAlign:'center',

  paddingLeft : 20,

  paddingRight : 20,

  fontSize: 16,

  fontFamily:'Arimo-Bold',

}

});

