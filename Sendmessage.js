import React from 'react';

import { Alert,StyleSheet, Text, ActivityIndicator,View, Button, Image, TouchableOpacity, Navigate, ScrollView,TextInput, AppRegistry, Component, Platform, StatusBar} from 'react-native';

import { createStackNavigator, createAppContainer, createSwitchNavigator }from 'react-navigation';

import { Icon } from 'react-native-elements';

import ActionSheet from 'react-native-custom-actionsheet';

import AsyncStorage from '@react-native-community/async-storage';

import Replymessage from './Replymessage';

 

const MyStatusBar = ({backgroundColor, ...props}) => (

    <View style={[styles.statusBar, { backgroundColor }]}>

      <StatusBar translucent backgroundColor={backgroundColor} {...props} />

    </View>

  );

 

const SEND_CANCEL_INDEX = 0;

const SEND_DESTRUCTIVE_INDEX = 2;

const SEND_options = [ 'Incident Commanders','All'];

const SEND_title = 'Send to All / Incident Commanders';

 

const CANCEL_INDEX = 0;

const DESTRUCTIVE_INDEX = 2;

const options = [ 'Reply All','Sender Only'];

const title = 'Please choose an option';

 

export default class Sendmessage extends React.Component {

 

    constructor(props){

        super(props)

        {

           this.state={

               collections:'',

               title:'',

               group:'',

               message:'',

               destination:'Commanders',

               receipient_id:'',

               replyall:'All',

               safeguard_Cookie:'',

               group_selected: 0,

               send_selected:0,

               selected:0,

               GROUP_options:[],

               safeguard_school:'',

               userid:null,

               organizationid:null

   

           };

        }

    }

 

    send_showActionSheet = () => this.send_actionSheet.show()

    send_getActionSheetRef = ref => (this.send_actionSheet = ref)

    send_handlePress = (index) => this.setState(

        { send_selected: index },

        function(){

 

            if(this.state.send_selected== 0){

   

                this.setState({

                    destination:'Commanders'

                })

            }

            else if(this.state.send_selected== 1){

   

                this.setState({

                    destination:'All'

                })

            }

        }

    )




    showActionSheet = () => this.actionSheet.show()

    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = (index) => this.setState({

        selected: index ,

    },

    function(){

 

        if(this.state.selected== 0){

 

            this.setState({

                replyall:'All'

            })

        }

        else if(this.state.selected== 1){

 

            this.setState({

                replyall:'Sender'

            })

        }

    }

)

 

    componentDidMount(){

    //   const { navigation } = this.props;

 

      AsyncStorage.getItem('session',(err,result)=>{

      var session_array=JSON.parse(result);

 

        this.setState({

 

            group:session_array.school,

            userid: session_array.id,

            organizationid:session_array.organization_id,

 

        }, function(){

           

        });

     });

    }

 

    updateValue(text,type)

    {

        if(type=='message')

        {

            this.setState({message:text})

        }

        else if(type=='group')

        {

            this.setState({group:text})

        }

        else if(type=='destination')

        {

            this.setState({destination:text})

        }

        else if(type=='replyall')

        {

            this.setState({replyall:text})

        }

    }

 

    submit(){

 

        Alert.alert(

            'Alert',

            'Are you sure you want to send message?',

            [{text: 'Cancel', onPress: () => console.log('Cancel Pressed'),

                style: 'cancel',

              },

              {text: 'Yes',

              onPress: () => this.confirmSubmit()},

            ],

            {cancelable: false},

          );

}

 

confirmSubmit(){

        AsyncStorage.getItem('safeguard_Cookie',(err,result)=>{

            this.setState({

             

              safeguard_Cookie: result

     

            }, function(){

                     

        let collections={}

        collections.message=this.state.message,

        collections.group=this.state.group,

        collections.destination=this.state.destination,

        collections.replyall=this.state.replyall,

       

        

         fetch(global.api_url,

     

        {

          method:'POST',

          headers:{

              Accept: 'application/json',

              'Content-Type':'application/json',

            

        },

        body: JSON.stringify({

            "action":"sendMessage",

            'message': collections.message,

            'group': collections.group,

            'destination': collections.destination,

            'replyall': collections.replyall,

            "userid":this.state.userid,

            "organizationid":this.state.organizationid

    

           })

        })

  .then((response)=>response.json())

  .then((responsejson)=>{

 

    if(responsejson.status === "true"){

 

        var id=responsejson.conversation_id;

 

        console.log(responsejson);

      

        AsyncStorage.setItem('safeguard_replymessage_id', id,()=>{

            console.log(id);

       this.props.navigation.navigate('Replymessage',{

        messageid: id});

        });

 

    }

    else{

 

        Alert.alert('Something Wrong',error);

 

    }

 

})

.catch((error)=>

{

    Alert.alert('Something Wrong',error);

});

 

});

});

 

}

 

render() {

return (

 

<View style={styles.wrapper}>

<MyStatusBar backgroundColor="#031537" barStyle="light-content" />

<View style={styles.header}>

 

<View style={styles.logoimg}>

 

<TouchableOpacity

onPress={() => this.props.navigation.navigate('Allmessage')}

underlayColor='#fff'>

<Text style={styles.iconfont}>M</Text>

</TouchableOpacity>

<Text style={styles.logoText}>Messages</Text>

 

</View>

<View style={styles.rightnav}>

<Text style={styles.iconRefresh}>⟳</Text>

</View>

 

</View>

 

<View style={styles.mainsection}>

<View style={styles.formBox}>

<Text style={styles.labeltxt}>Send a Message</Text>

<TextInput style={styles.txtInputstyle}

placeholder="Message"

onChangeText={(text) => this.updateValue(text,'message')}

/>

<View>

<Text style={styles.labeltxt}>Group /Building (Optional)</Text>

{/* <TextInput style={styles.txtInputstyle}

placeholder="Kolkata"

oonChangeText={(text) => this.updateValue(text,'group')}

 

/> */}

<View style={{position:'absolute', marginTop:40, right:20, zIndex: 100,}}>

        {/* <Ionicons name="md-arrow-dropdown" size={18} color="#666" /> */}

        <Icon color='#000'  name='sort-desc' type='font-awesome' size={18} />

</View>

 

<Text style={styles.txtInputstyle2}  >

 {this.state.group}

        </Text>

       

</View>

<View>

<Text style={styles.labeltxt}>Send to All / Incident Commanders</Text>

 

<View style={{position:'absolute', marginTop:40, right:20, zIndex: 100,}}>

        {/* <Ionicons name="md-arrow-dropdown" size={18} color="#666" /> */}

        <Icon color='#000'  name='sort-desc' type='font-awesome' size={18} />

</View>

 <Text style={styles.txtInputstyle}  onPress={this.send_showActionSheet}>

{SEND_options[this.state.send_selected]}

        </Text>

        <ActionSheet

          ref={this.send_getActionSheetRef}

          title={SEND_title}

          message=" "

          options={SEND_options}

          //cancelButtonIndex={CANCEL_INDEX}

          destructiveButtonIndex={SEND_DESTRUCTIVE_INDEX}

          onPress={this.send_handlePress}

        />

</View>

<View>

<Text style={styles.labeltxt}>Reply to All / Sender Only</Text>

{/* <TextInput style={styles.txtInputstyle}

placeholder="All"

onChangeText={(text) => this.updateValue(text,'replyall')}

/> */}

<View style={{position:'absolute', marginTop:40, right:20, zIndex: 100,}}>

        {/* <Ionicons name="md-arrow-dropdown" size={18} color="#666" /> */}

</View>

 

<Text style={styles.txtInputstyle}  onPress={this.showActionSheet}>

{options[this.state.selected]}

        </Text>

        <ActionSheet

          ref={this.getActionSheetRef}

          title={title}

          message=" "

          options={options}

          //cancelButtonIndex={CANCEL_INDEX}

          destructiveButtonIndex={DESTRUCTIVE_INDEX}

          onPress={this.handlePress}

        />

</View>

<View style={{ justifyContent:'center', alignItems:'center',}}>

<TouchableOpacity style={styles.loginScreenButton}

// onPress={() => this.props.navigation.navigate('Home')}

onPress={()=>this.submit()}

underlayColor='#fff'>

<Text style={styles.loginText}>Send Message</Text>

</TouchableOpacity>

</View>

</View>

 

<View style={styles.blnkbottom}>

    <View >
        <Image source={require('./assets/perp_logo_grey.png')} style={{marginLeft: 13,width: 150, height: 150}} />
    </View>

</View>

 

</View>

</View>

);

}

}

 

const styles = StyleSheet.create({wrapper: {

flex: 1,

flexDirection: 'column',

justifyContent: 'flex-start',

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

            justifyContent: 'flex-end',

            //alignItems: 'center',

            paddingRight: 10,

          

          },

          iconfont:{

           fontFamily:'safeguard',

           color:'#fff',

           fontSize:25,

          },

          iconRefresh:{

           fontFamily:'safeguard',

           color:'#fff',

           fontSize:35,

           marginTop:-10,

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

       fontFamily:'Arimo-Regular',

       paddingTop: 3,

       },

 

mainsection: {

backgroundColor: '#e6e6e6',

flex: 8,

flexDirection: 'column',

paddingBottom:20,

},

 

formBox: {

//flex: 4,

paddingTop: 10,

padding: 14,

},

 

labeltxt: {

textAlign: 'center',

//flex: 1,

justifyContent: 'center',

alignItems: 'center',

fontSize: 19,

 

paddingBottom: 7,

fontFamily:'Arimo-Bold',

color:'#000',

},

 

txtInputstyle: {

height: 40,

backgroundColor:'#fff',

padding: 10,

marginBottom: 12,

borderRadius: 4,

borderWidth: 1,

borderColor: '#666',

fontWeight: 'bold',

overflow: 'hidden',

},

txtInputstyle2: {

    height: 40,

    backgroundColor:'#e6e6e6',

    padding: 10,

    marginBottom: 12,

    borderRadius: 4,

    borderWidth: 1,

    borderColor: '#666',

    fontFamily:'Arimo-Bold'

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

fontFamily:'Arimo-Bold'

},

 

blnkbottom: {

flex: 3,

justifyContent: 'center',

alignItems: 'center',

marginTop:30,

//backgroundColor:'red',

},

});

