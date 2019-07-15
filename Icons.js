import React from 'react';

import {

StyleSheet, Text,

View, Button,

Image, TouchableOpacity, Alert,

Navigate, ScrollView, Platform, StatusBar}

from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator, createAppContainer, createSwitchNavigator }from 'react-navigation';

// import { Font } from 'expo';

// import { Ionicons,FontAwesome,AntDesign } from '@expo/vector-icons';

import Home from './Home';

// import FileScreen from './filescreen';

import Profile from './Profile';

// import Files from './files';

import { Icon } from 'react-native-elements';

 

const MyStatusBar = ({backgroundColor, ...props}) => (

    <View style={[styles.statusBar, { backgroundColor }]}>

      <StatusBar translucent backgroundColor={backgroundColor} {...props} />

    </View>

  );

 

  export default class Icons extends React.Component {

 

static navigationOptions = {

//To hide the ActionBar/NavigationBar

header:null,

};

 

constructor(props){

    super(props)

    {

       this.state={

           safeguard_org:'',

           safeguard_org_loading:true

       };

    }

}

componentDidMount(){

AsyncStorage.getItem('safeguard_org',(err,result)=>{

  this.setState({

    safeguard_org_loading: true,

    safeguard_org: result,

  }, function(){

 

    // console.log(this.state.safeguard_school);

  });

});

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

      onPress: () =>  this.confirmSubmit()},

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

 

<ScrollView contentContainerStyle={styles.contentContainer}>

<View style={styles.wrapper}>

<MyStatusBar backgroundColor="#031537" barStyle="light-content" />

<View style={styles.header}>

            <View style={styles.text}>

                <View style={styles.logoimg}>

                    <View>

                        <View style={styles.logoText}>

                        <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Home')}

                    underlayColor='#fff'>

                            <Text style={styles.iconfont}>h</Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{paddingLeft: 5, marginTop: 2,}}>

                        <Text style={styles.logoText}>

                            Arodek

                        </Text>

                    </View>

                </View>

            </View>

            <View style={styles.rightnav}>

                    <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Icons')}

                    underlayColor='#fff'>

                       <Text style={styles.iconfont}>?</Text>

                    </TouchableOpacity>

 

                    <TouchableOpacity

                   

                    onPress={() => this.props.navigation.navigate('Filescreen')}

                    underlayColor='#fff'>

                        {/* <Icon color='#fff'  name='folder' type='material'  size={26}/> */}

                        <Text style={styles.iconfont}>d</Text>

                    </TouchableOpacity>

 

                    <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Profile')}

                    underlayColor='#fff'>

                        {/* <Icon color='#fff'  name='torso' type='foundation' size={26}/> */}

                        <Text style={styles.iconfont}>u</Text>

                    </TouchableOpacity>

 

                    <TouchableOpacity

                    onPress={() => this.logoutuser()}

                    underlayColor='#fff'>

                        <Text style={styles.iconfont}>o</Text>

                    </TouchableOpacity>

            </View>

          </View>

 

<View style={styles.mainsection}>

<View style={styles.headingTxt}>

<Text style={styles.headingtxtsty}>Icon Key</Text>

</View>

 

<View style={{position:

'absolute', right: 10, top:

25,}}>

 

<TouchableOpacity

onPress={() => this.props.navigation.navigate('Home')}>

{/* <Icon color='#031537'  name='close' type='material' size={26} /> */}

<Text style={styles.iconfont1}>x</Text>

</TouchableOpacity>

</View>

 

<View style={styles.iconListBg}>

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>h</Text>

</View>

<View style={styles.icontxt}>

<Text style={{fontFamily:'Arimo-Regular', lineHeight:16, color: '#000'}}>

  <Text style={{fontFamily:'Arimo-Bold', color: '#000'}}>Home Button</Text>- Displays the available Emergency Plans based on

Group Assignment.

</Text>

</View>

</View>

 

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>c</Text>

</View>

 

<View style={styles.icontxt}>

<Text style={{fontFamily:'Arimo-Regular',lineHeight:16, color: '#000'}}>

<Text style={{fontFamily:'Arimo-Bold', color: '#000'}}>Adminstrative

Settings

</Text>

- Provides access to

Administrative options.

</Text>

</View>

</View>

 

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>o</Text>

</View>

 

<View style={styles.icontxt}>

<Text style={{fontFamily:'Arimo-Regular', lineHeight:16, color: '#000'}}>

<Text style={{fontFamily:'Arimo-Bold', color: '#000'}}>Sign Out</Text>

- Signs the user out of the MERP system.

</Text>

</View>

</View>

 

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>a</Text>

</View>

<View style={styles.icontxt}>

<Text style={{fontFamily:'Arimo-Regular', lineHeight:16, color: '#000'}}>

<Text style={{fontFamily:'Arimo-Bold', color: '#000'}}>

Incident Icon

</Text>

- Indicates which event is currently selected.

</Text>

</View>

</View>

 

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>d</Text>

</View>

<View style={styles.icontxt}>

<Text style={{color: '#000',fontFamily:'Arimo-Regular', lineHeight:16,}}>

<Text style={{color: '#000',fontFamily:'Arimo-Bold'}}>

Supporting Files

</Text>

- Access to any supporting files that have been uploaded.

</Text>

 

</View>

</View>

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>p</Text>

</View>

<View style={styles.icontxt}>

<Text style={{color: '#000', fontFamily:'Arimo-Regular', lineHeight:16,}}>

<Text style={{color: '#000', fontFamily:'Arimo-Bold'}}>

Overview

</Text>

- Displays a flow chart overview of the incident selected.

</Text>

</View>

 

</View>

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Image style={{width: 30, height: 30,backgroundColor:'#ddd'}}

//source={{uri: 'https://www.mobileemergencyresponseplans.com/images/event_aid_icon.png'}}

source={require('./assets/event_aid_icon.png')}

/>

</View>

 

<View style={styles.icontxt}>

<Text style={{color: '#000', fontFamily:'Arimo-Regular', lineHeight:16,}}>

<Text style={{fontWeight: 'bold', color: '#000', fontFamily:'Arimo-Regular'}}>

Event Aid

</Text>

- Offers more information specific to the incident selected.

</Text>

</View>

</View>

 

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Image style={{width: 30, height: 30}}

 

//source={{uri: 'https://www.mobileemergencyresponseplans.com/images/event_aid_icon.png'}}

source={require('./assets/incident_log_icon.png')}

/>

 

</View>

<View style={styles.icontxt}>

<Text style={{color: '#000', fontFamily:'Arimo-Regular', lineHeight:16,}}>

<Text style={{color: '#000', fontFamily:'Arimo-Bold'}}>

Incident Log

</Text>

- Displays the incident log with the ability to add in additional notes.

</Text>

</View>

</View>

 

<View style={styles.iconlistrow}>

<View style={styles.iconbox}>

<Text style={styles.iconfont2}>x</Text>

</View>

<View style={styles.icontxt}>

 

<Text style={{color: '#000', fontFamily:'Arimo-Regular', lineHeight:16,}}>

<Text style={{color: '#000', fontFamily:'Arimo-Bold'}}>

Close

</Text>

- Closes the current window and returns the user to the previous screen.

</Text>

</View>

</View>

</View>

</View>

</View>

</ScrollView>

);

}

}

 

const styles = StyleSheet.create({

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

                 alignItems: 'center',

                 paddingRight: 10,

               

               },

               iconfont:{

                fontFamily:'safeguard',

                color:'#fff',

                fontSize:23,

               },

          logoimg: {

            paddingLeft: 5,

            flex: 1,

            flexDirection: 'row',

            //backgroundColor: 'red',

          },

          logoText: {

            color: 'white',

            fontSize: 14,

            //fontWeight: 'bold',

            paddingLeft: 0,

            fontFamily:'Arimo-Regular'

            },

 

mainsection: {

//backgroundColor: '#e6e6e6',

flex: 1,

paddingTop: 12,

},

 

headingTxt:{

flex:1,

justifyContent: 'center',

alignItems: 'center',

paddingBottom: 24,

paddingTop:10,

},

 

headingtxtsty: {

fontSize: 23,

 

color:'#000',

fontFamily:'Arimo-Bold',

},

iconfont1:{

    fontFamily:'safeguard',

    color:'#031537',

    fontSize:25,

   },

   iconfont2:{

    fontFamily:'safeguard',

    color:'#031537',

    fontSize:28,

   },

iconListBg: {

marginLeft: 25,

marginRight: 25,

paddingTop: 10,

//backgroundColor: '#666',

flex:9,

},

 

iconlistrow: {

//flex: 1,

flexDirection: 'row',

marginBottom: 30,

},

 

iconbox: {

paddingLeft: 15,

//backgroundColor: 'red',

flex: 4,

//textAlign:'left',

justifyContent:'center',

// alignItems:'center',

 

},

 

icontxt: {

//backgroundColor: '#ddd',

flex: 7.5,

color: '#031537',

}

});

