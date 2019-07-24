import React from 'react';

import {ActivityIndicator, Alert,StyleSheet, Text, View, TextInput, Button, Image,

   TouchableOpacity, KeyboardAvoidingView,props} from 'react-native';

import { createSwitchNavigator,StackNavigator, createAppContainer } from 'react-navigation';

import DialogInput from 'react-native-dialog-input';

import AsyncStorage from '@react-native-community/async-storage';

import Home from './Home';

import { Fonts } from './src/utils/Fonts';

import axios from 'axios';

//import CookieManager from 'react-native-cookies';

//import reqwest from 'reqwest';


export default class Login extends React.Component {

    constructor (props){
      
        super(props);

        this.state={

            useremail:'',

            userpassword:'',

            isUser:'abc',

            isDialogVisible: false,

            collections:'',

            email:'',

            id:'',

            school:'',

           

        }

    }

    componentWillMount(){

    

 

      AsyncStorage.getItem('sessionstatus',(err,result)=>{

      

        if(result != null){

 

          this.props.navigation.navigate('Home');

        }

       

     });

 

    }

   

 

    showDialog(isShow){

      this.setState({isDialogVisible: isShow});

    }

 

   /* Reset Password API request*/

    sendInput(inputText){

 

      fetch('https://mobileemergencyresponseplans.com/api/account/reset_password',

      {

      method:'POST',

      headers:{

          Accept: 'application/json',

          'Content-Type':'application/json'

      },

      body: JSON.stringify({

              'email': inputText

       })

      })

  .then((response)=>response.json())

  .then((responsejson)=>{

      alert('Reset password link has been sent to your registered email.');

  })

 

  .catch((error)=>

  {

      Alert.alert('Something Wrong!')

  });

  }

 

    updateValue(text,type)

    {

        if(type=='pass')

        {

            this.setState({userpassword:text})

        }

        else if(type=='email')

        {

            this.setState({useremail:text})

        }

    }

   

    /* Login API request*/

    submit()

    {

 

        let collections={}

        collections.email=this.state.useremail,

        collections.password=this.state.userpassword

 

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (this.state.useremail == '')

        {

          alert('Enter your email id');

          return;

        }

        else if(reg.test(this.state.useremail))

        {

          // alert('email is valid');

        }

        else{

          alert('Enter valid email id.');

          return;

        }

        if (this.state.userpassword == '')

        {

          alert('Enter your password');

          return;

        }

       

        

          

        fetch(global.api_url,

          {

            method:'POST',

            headers:{

                Accept: 'application/json',

                'Content-Type':'application/json'

          },

          body: JSON.stringify({

              'action':'userLogin',

              'email': this.state.useremail,

              'password': this.state.userpassword

             })

          })

    .then((response)=>response.json())

    .then((response)=>{

    

     const status=response.status;

    

     if(status === "true")

     {
      AsyncStorage.setItem('sessionstatus', response.status,() =>{

      AsyncStorage.setItem('session', JSON.stringify(response.user_details),() =>{

      AsyncStorage.setItem('safeguard', JSON.stringify(response.safeguard),() =>{

         this.props.navigation.navigate('Home');
     });
      });

    });

  

     }

     else{

      Alert.alert('Something Wrong','Please enter valid username and password')

 

     }

  })

  .catch((error)=>

  {

    console.log(error);

      Alert.alert('Something Wrong','Please contact your Administrator')

  });

 

  }

 

  render() {

 

   

    const {navigate}=this.props.navigation;

    return (

      <View style={styles.mainCont}>

       <View style={styles.leftBlank}></View>

       <View style={styles.middlebox}>

      <View style={styles.blnktop}></View>

      <View style={styles.container1}>

       <View style={styles.container2}>

         <Text style={styles.text}>Mobile Emergency Response Plan</Text>

       </View>

     

      <View style={styles.formcont}>

          <TextInput

          style={styles.inputStyle}

          placeholder="Email Address"

          autoCapitalize = "none"

          keyboardType='email-address'

          returnKeyType="next"

          onChangeText={(text) => this.updateValue(text,'email')}

          />

        <TextInput

          style={styles.inputStyle}

          placeholder="Password" secureTextEntry={true}

          onChangeText={(text) => this.updateValue(text,'pass')}

        />

 

        <TouchableOpacity

          style={styles.loginScreenButton}

          onPress={()=>this.submit()}

          underlayColor='#fff'>

          <Text style={styles.loginText}>Sign In</Text>

        </TouchableOpacity>

 

        <DialogInput isDialogVisible={this.state.isDialogVisible}

          // title={"DialogInput 1"}

          message={"Enter your email to have your password reset and instructions on setting a new one sent to your email:"}

          hintInput ={"Your email"}

          submitInput={ (inputText) => {this.sendInput(inputText)} }

          closeDialog={ () => {this.showDialog(false)}}>

        </DialogInput>

 

        <TouchableOpacity

          style={styles.forgotButton}

          onPress={()=>{this.showDialog(true)}} style={{padding:10}}

          underlayColor='#fff'>

          <Text style={styles.forgotText}>Forgot your password?</Text>

        </TouchableOpacity>

 

      </View>

    </View>

    <View style={styles.blnkbottom}>

    <View >

     <Image source={require('./assets/watermark.png')} style={{width: 300, height: 80}} />
    </View>

    </View>

    

   

    </View>

    <View style={styles.rightBlank}></View>

    </View>

    );

  }

}

 

const styles = StyleSheet.create({

  mainCont: {

    flex: 1,

    paddingTop: 50,

    paddingBottom: 20,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

  },

  leftBlank:{

    flex:0.5,

   

  },

  middlebox:{

    flex:6,

    flexDirection:'column',

   

  },

  rightBlank:{

    flex:0.5,

  },

  blnktop: {

    flex: 1,

  },

 

  blnkbottom: {

    flex: 3,
    marginTop: 40,
    justifyContent: 'center',

    alignItems: 'center',

  },

 

  container1: {

    backgroundColor: '#dde5fb',

    borderColor: '#031537',

    borderWidth: 2,

  },

 

  container2: {

    backgroundColor: '#031537',

  },


  text: {

    color: 'white',

    fontWeight: 'bold',

    backgroundColor: 'transparent',

    fontSize: 27,

    textAlign: 'center',

    padding: 10,

    fontFamily: Fonts.Arimo

  },


  formcont: {

    paddingTop: 13,

    paddingLeft:15,

    paddingRight:15,

    //marginTop: 10,

  

    //flex: 1,

    flexDirection: 'column',

  },

inputStyle:{

  height: 37, backgroundColor:'white', paddingLeft: 10, paddingRight:10, marginBottom: 13, borderColor:'#ccc',

  borderWidth:1, fontSize:16,  color:'#000', fontFamily:'Arimo-Regular',

},

  logobox: {

    flex: 2,

    justifyContent: 'center',

    alignItems: 'center',

  },


  loginScreenButton:{

    //marginTop:10,

    paddingTop:15,

    paddingBottom:15,

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

    fontSize: 20,

    fontWeight: 'bold',

    fontFamily: Fonts.Arimo

},

 

  forgotButton:{

    marginTop:10,

    paddingTop:10,

    paddingBottom:20,

    backgroundColor: 'transparent',

    borderColor: '#fff'

  },

 

  forgotText:{

    color:'#6e0ad5',

    textAlign:'center',

    paddingLeft : 10,

    paddingRight : 10,

    fontSize: 16,

    fontWeight: 'normal',

    textDecorationLine:'underline',

    fontFamily: Fonts.Arimo

  }

});


