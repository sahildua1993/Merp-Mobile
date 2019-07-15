import React from 'react';

import { StyleSheet, Text, View, TextInput, Button, Image,props,TouchableOpacity, ScrollView, Platform, StatusBar,Alert} from 'react-native';

import t from 'tcomb-form-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { Icon } from 'react-native-elements';

import Home from './Home';

import AsyncStorage from '@react-native-community/async-storage';

 

const MyStatusBar = ({backgroundColor, ...props}) => (

  <View style={[styles.statusBar, { backgroundColor }]}>

    <StatusBar translucent backgroundColor={backgroundColor} {...props} />

  </View>

);

 

//var t = require('tcomb-form-native');

var _ = require('lodash');

// clone the default stylesheet

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

 

// overriding the background color

stylesheet.textbox.normal.backgroundColor = '#fff';

stylesheet.textbox.normal.borderRadius = 0;

stylesheet.textbox.normal.fontSize = 16;

//stylesheet.textbox.normal.placeholderTextColor = '#000';

 

const Form = t.form.Form;

// here we are: define your domain model

const Email = t.subtype(t.Str, (email) => {

  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return reg.test(email);

});

 

const LoginFields = t.struct({

  email: Email,  // a required string

  password: t.String, // a required string

  new_password: t.String, // a required string

  confirm_password: t.String, // a required string

});

 

const options = {

  fields: {

   

    password: {

      type: 'password',

      placeholder: 'Current Password',

      secureTextEntry: true,

      //label: '',

    

      auto: 'none',

      stylesheet: stylesheet,

     

    },

    new_password: {

        type: 'new_password',

        placeholder: 'Password',

        secureTextEntry: true,

        auto: 'none',

        stylesheet: stylesheet,

      },

      confirm_password: {

        type: 'confirm_password',

        placeholder: 'Password Confirmation',

        secureTextEntry: true,

        auto: 'none',

 

        stylesheet: stylesheet,

      },

   

    email: {

      placeholder: 'e.g: abc@gmail.com',

      error: 'Insert a valid email',

      auto: 'none',

      stylesheet: stylesheet,

    

    }

  }

};

 

export default class Profile extends React.Component {

    constructor(props){

        super(props)

        {

           this.state={

            safeguard_Cookie:'',

            safeguard_Cookie_loading:true,

            safeguard_org:'',

            safeguard_org_loading:true,

            email:"abcd",

            password:null,

            newpassword:null,

            confirmpassword:null,

            userid:null,

            organizationid:null

           };

        }

    }

 

static navigationOptions = {

//To hide the ActionBar/NavigationBar

header:null,

};

 

componentDidMount(){

    const { navigation } = this.props;

    AsyncStorage.getItem('session',(err,result)=>{

      let sdata=JSON.parse(result);

     this.setState({

        userid: sdata.id,

        organizationid:sdata.organization_id,

        email:sdata.email

    },

  function(){

  })

   });

 

 

  }

 

handleSubmit=()=>{

  const value = this.refs.form.getValue();

 

   if (value) { // if validation fails, value will be null

   

     fetch(global.api_url,

     {

       method:'POST',

       headers:{

                Accept: 'application/json',

                'Content-Type':'application/json',

             

               },

        body: JSON.stringify({

            "action": "editProfile",

            "userid":this.state.userid,

            "organizationid": this.state.organizationid,

            'user_email': value.email,

            'current_password': value.password,

            'new_password': value.new_password

            })

     })

    .then((response)=>response.json())

    .then((responsejson)=>{

   

     alert('Your profile has been updated.');

     this.props.navigation.navigate('Login');

});

 

   }

else{

    alert('All fields are mendatory.');

    return;

}

 

}

 

logoutuser()

{

  Alert.alert(

    'Alert',

    'Are you sure you want to log out?',

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

    AsyncStorage.clear();

    this.props.navigation.navigate('Login');

  }

 

 

 

render() {

return (

// <View>

 

<View style={styles.wrapper}>

<MyStatusBar backgroundColor="#1e3a6b" barStyle="light-content" />

<View style={styles.header}>

<View style={styles.logoimg}>

 

<TouchableOpacity

onPress={() => this.props.navigation.navigate('Home')}

underlayColor='#fff'>

<Icon color='#fff'  name='home' type='font-awesome' size={26} />

</TouchableOpacity>

 

<Text style={styles.logoText}>

arodek

</Text>

</View>

<View style={styles.rightnav}>

 

<TouchableOpacity

onPress={() => this.logoutuser()}

underlayColor='#fff'>

<Icon color='#fff'  name='power' type='foundation' size={26} />

</TouchableOpacity>

 

</View>

</View>

<ScrollView>

<View style={styles.mainCont}>

<View style={styles.container1}>

<View style={styles.container2}>

<Text style={styles.text}>Update

Profile</Text>

</View>

 

<View style={styles.formcont}>

<Text

 

style={styles.textStyle}>Leave Password fields blank

if you do not want to change your password.</Text>

 

  <Form

    ref="form"

    type={LoginFields}

    options={options}

  />

 

<TouchableOpacity

          style={styles.loginScreenButton}

          onPress={() => this.handleSubmit()}

          underlayColor='#fff'>

          <Text style={styles.loginText}>Update</Text>

        </TouchableOpacity>

</View>

</View>

 

<View style={styles.blnktop}></View>

 

</View>

</ScrollView>

</View>

);

}

}




const styles = StyleSheet.create({

 

contentContainer: {

paddingVertical: 40,

},

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

paddingLeft: 0,

},

 

logoText: {

color: 'white',

fontSize: 18,

//fontWeight: 'bold',

paddingLeft: 5,

marginTop: 3,

},

 

rightnav: {

paddingRight: 10,

},

 

mainCont: {

//flex: 10,

padding: 20,

//justifyContent: 'center',

//alignItems: 'center',

flexDirection: 'column',

},

 

blnktop: {

flex: 1,

},

 

textStyle:{

fontSize: 16,

textAlign: 'center',

paddingBottom: 20,

},

 

container1: {

backgroundColor: '#dde5fb',

//flex: 4,

borderColor: '#031537',

borderWidth: 1,

paddingBottom: 10,

marginLeft: 10,

marginRight: 10,

marginTop: 10,

},

 

container2: {

backgroundColor:'#031537',

},

 

text: {

color: 'white',

fontWeight: 'bold',

backgroundColor: 'transparent',

fontSize: 25,

textAlign: 'center',

padding: 10,

},

 

formcont: {

paddingTop: 10,

paddingLeft:15,

paddingRight:15,

//marginLeft: 15,

//marginRight: 15,

marginTop: 20,

//flex: 1,

flexDirection: 'column',

},

loginScreenButton:{

  marginTop:10,

  paddingTop:14,

  paddingBottom:14,

  backgroundColor:'#031537',

  //borderRadius:5,

  //borderWidth: 1,

  //borderColor: '#fff'

},

 

loginText:{

  color:'#fff',

  textAlign:'center',

  paddingLeft : 10,

  paddingRight : 10,

  fontSize: 15,

  //fontWeight: 'bold',

},

textbox: {
    
    color: '#000000',

    fontSize: 17,

    height: 36,

    padding: 7,

    borderRadius: 4,

    borderColor: '#cccccc',

    borderWidth: 1,

    marginBottom: 5

  },

});