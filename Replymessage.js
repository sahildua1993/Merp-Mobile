import React from 'react';

import { FlatList, ActivityIndicator, Text, View, StatusBar } from 'react-native';

import { StyleSheet, TextInput, Button,props,Image, TouchableOpacity, ScrollView, Platform } from 'react-native';

import  Moment from 'moment';

import t from 'tcomb-form-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { Icon } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';


const MyStatusBar = ({backgroundColor, ...props}) => (

  <View style={[styles.statusBar, { backgroundColor }]}>

    <StatusBar translucent backgroundColor={backgroundColor} {...props} />

  </View>

);

 

export default class Replymessage extends React.Component {

 

static navigationOptions = {

//To hide the ActionBar/NavigationBar

header:null,

};

 

constructor(props){

    super(props)

    {

       this.state={

        dataSource:'',

        isLoading:true,

        safeguard_replymessage:'',

        safeguard_replymessage_loading:true,

        urgenttype:'',

        group:'',

        user: null,

        group:'',

        ids: 0,

        ids_loading:true,

        message:'',

        destination:'All',

        favColor: null,

        selected: '1',

        safeguard_Cookie:'',

        safeguard_Cookie_loading:true,

        userid:null,

        organizationid:null

       };

    }

}

 

updateValue(text,type)

{

    if(type=='urgenttype')

    {

        this.setState({urgenttype:text})

    }

    else if(type=='message')

    {

        this.setState({message:text})

    }

  

}

 

submit(){   

  let collections={}

  collections.message=this.state.message,

  collections.ids=this.state.ids,

  fetch(global.api_url,

 

  {

    method:'POST',

    headers:{

        Accept: 'application/json',

        'Content-Type':'application/json',

      

  },

  body: JSON.stringify({

    

'action':'replyMessage',

'message' :  collections.message,

'userid' : this.state.userid,

'organizationid' : this.state.organizationid,

'conversation_id' : this.state.ids

     })

  })

.then((response)=>response.json())

.then((responsejson)=>{

console.log(responsejson);
if(responsejson.status === 'true'){
  this.Getetallmessage();

}
})

.catch((error)=>

{

alert('Something Wrong',error);

});

}

 

componentWillMount(){

const { navigation } = this.props;

var id= navigation.getParam('messageid', 'NO-ID');

console.log("ids-->"+id);

this.setState({

  ids:JSON.stringify(id)

},function(){
  console.log(this.state.ids);

})

}

  componentDidMount(){

    AsyncStorage.getItem('session',(err,result)=>{

      var session_array=JSON.parse(result);

        this.setState({

            group:session_array.school,

            userid: session_array.id,

            organizationid:session_array.organization_id,

        }, function(){

          this.Getetallmessage();

        });

     });

    }

    Getetallmessage(){

      fetch(global.api_url,

        {

          method:'POST',

          headers:{

                   Accept: 'application/json',

                   'Content-Type':'application/json',

                  },

           body: JSON.stringify({

            "action": "getConversationList",

            "conversation_id": this.state.ids,

            "organizationid": this.state.organizationid

            }

            )

        })

       .then((response)=>response.json())

       .then((responsejson)=>{

      

        console.log(responsejson);

 

        if(responsejson.status === 'true'){

          this.setState({

            isLoading: false,

            dataSource: responsejson.conversation_list,

          });

        }

    });

     

    }

  

 

render() {

    Moment.locale('en');

    if(this.state.isLoading){

        return(

          <View style={{flex: 1, padding: 20}}>

            <ActivityIndicator/>

          </View>

        )

      }

 

return(   


  
    

<View >

 <MyStatusBar backgroundColor="#1e3a6b" barStyle="light-content" />        

<View style={styles.header}>

<View style={styles.logoimg}>

 

<TouchableOpacity

onPress={() => this.props.navigation.navigate('Home')}

underlayColor='#fff'>

<Icon color='#fff'  name='bars' type='font-awesome' size={24} style={{paddingLeft:5,}} />

</TouchableOpacity>

 <Text style={styles.logoText}>Messages</Text>

 

</View>

<View style={styles.rightnav}>

 

<Icon color='#fff'  name='refresh' type='material' size={26} />

</View>

</View>

 <ScrollView>

            <View style={styles.mainsection}>


          <View >

           

          <FlatList

             data={this.state.dataSource}

             renderItem={({item}) =>

             <View style={styles.grayView}>

                 <View style={styles.textrow2}>

                   <View style={styles.item}>

                     <View style={{flex:2, flexDirection: 'row',}}>

                       <View style={{flex:5,}}>

                         <Text style={styles.senderName}>{item.sender_name}</Text>

                         <Text style={styles.senderLocation}>{this.state.group}</Text>

                       </View>

              

                       <View style={{flex:3, flexDirection:'row', justifyContent: 'flex-end'}}>

                         <Text style={styles.datetime}>

                         {Moment(item.last_message_at).format('MM/DD/YYYY')}

                         </Text>

                         <Text style={styles.datetime}>

                         {Moment(item.last_message_at).format('hz:mm a')}

                         </Text>

                       </View>

                     

                     </View>

                     <View style={{flex:1, paddingTop: 6,}}>

                       <Text style={styles.senderMsg}>{item.body}</Text>

                     </View>

                   </View>

 

               </View>

 

            </View>

         }

             keyExtractor={({id}, index) => index.toString()}

           />

 

          

          </View>

        

          <View style={{padding: 12,}}>

          <Text style={styles.labeltxt}>Reply</Text>

       <TextInput style={styles.txtInputstyle}

          //placeholder="message"

          onChangeText={(text) => this.updateValue(text,'message')}

         />

          <View style={{justifyContent:'center', alignItems:'center',}}>

         <TouchableOpacity style={styles.loginScreenButton}

          onPress={()=>this.submit()}

          underlayColor='#fff'>

          <Text style={styles.loginText}>Send Message</Text>

        </TouchableOpacity>

        </View>

          </View>

          <View style={styles.blnkbottom}>

<Image source={{uri: 'https://mobileemergencyresponseplans.com/images/watermark.png'}}

style={{width: 300, height: 80}} />

</View>



           </View> 
 
           </ScrollView>

        </View>

       

       

      );

}

}

 

const styles =

StyleSheet.create({


 

wrapper: {

  flex: 1,

  flexDirection: 'column',

  justifyContent: 'flex-start',

},

header: {

  //height: Platform.OS === 'android' ? 76 : 100,

  height: Platform.OS === 'ios' ? 75 : 56,

  marginTop: Platform.OS === 'ios' ? 0 : 24,

  ...Platform.select({

      ios: { backgroundColor: '#031537', paddingTop: 24},

      android: { backgroundColor: '#031537'}

  }),

  alignItems: 'center',

  //justifyContent: 'space-between',

  flexDirection: 'row',

  },

logoimg: {

  width: 200,

  flex: 1,

  flexDirection: 'row',

},

logoText: {

  color: 'white',

  fontSize: 14,

  //fontWeight: 'bold',

  paddingLeft: 10,

  marginTop: 3,

},

rightnav: {

paddingRight: 10,

},

 

mainCont: {

  flex: 12,

  flexDirection: 'column',

},

 

grayView: {

  backgroundColor: '#a1cc8f',

  paddingTop: 9,

  paddingBottom: 9,

  paddingLeft: 7,

  paddingRight: 7,

  //flex: 1,

  flexDirection: 'row',

  borderBottomColor: '#2f2e2e',

  borderBottomWidth: 1,

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

  flex:1,

  //alignItems: 'left',

  //justifyContent:'center',

},

textrow2: {                           

  flex:8,

  flexDirection: 'column',

},

 

senderName: {

color: 'black',

fontSize: 20,

fontWeight: 'bold',

},

senderLocation: {

color: 'black',

//fontWeight:'bold',

fontSize: 15,

},

senderMsg:{

  color: 'black',

  fontSize: 15,

},

datetime: {

color: 'black',

fontSize: 11,

textAlign: 'right',

//fontWeight:'bold',

paddingLeft: 4,

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

  fontWeight: 'bold',

},

txtInputstyle: {

  height: 35,

  backgroundColor:'#fff',

  padding: 10,

  marginBottom: 12,

  marginTop: 10,

  borderRadius: 4,

  borderWidth: 1,

  borderColor: '#666',

  },

  labeltxt: {

    textAlign: 'center',

    //flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    fontSize: 18,

    fontWeight: 'bold',

    },

    blnkbottom: {

      //flex: 1,

      justifyContent: 'flex-end',

      alignItems: 'center',

      //marginTop: 20,

      position: 'relative',

      //backgroundColor: 'red',

      bottom: 0,

      },

});

