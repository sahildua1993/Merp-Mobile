import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';

import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import { Icon } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

import { Fonts } from './src/utils/Fonts';

import {  Button,ScrollView,props,ActivityIndicator,FlatList, Alert} from 'react-native';

import { List, ListItem } from "react-native-elements";

import LinearGradient from 'react-native-linear-gradient';



const MyStatusBar = ({backgroundColor, ...props}) => (

    <View style={[styles.statusBar, { backgroundColor }]}>

      <StatusBar translucent backgroundColor={backgroundColor} {...props} />

    </View>

  );

 

  export default class Home extends React.Component {

 

    constructor(props){

      super(props)

      {

         this.state={

             collections:'',

             title:'',

             dataSource:'',

             isLoading: true,

             safeguard_Cookie:'',

             safeguard_Cookie_loading:true,

             safeguard_org:'',

             safeguard_org_loading:true,

             safeguard_token:'',

             token_save:true

         };

      }

  }

 

    // componentWillMount(){

    //     const { navigation } = this.props;

    //     const itemId = navigation.getParam('itemId', 'NO-ID');

    //     const otherParam = navigation.getParam('otherParam', 'some default value');

    // }

 

    componentDidMount()

    {

       

      AsyncStorage.getItem('safeguard',(err,result)=>{

          this.setState({

          isLoading: false,

          dataSource: JSON.parse(result).collections,

        }, function(){

 

        });

     });

 

    //  AsyncStorage.getItem('safeguard_org',(err,result)=>{

    //   this.setState({

    //     safeguard_org_loading: true,

    //     safeguard_org: result,

    //   }, function(){

   

    //     // console.log(this.state.safeguard_school);

    //   });

    // });

    }

    actionOnRow(item) {

        var id=item.id;
        this.props.navigation.navigate('Charts',{collectionid: id});

    //     AsyncStorage.setItem('safeguard_charts_id', JSON.stringify(item.id),()=>{
    //    this.props.navigation.navigate('Charts');
    // });   

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

   //alert('fhfg');

this.props.navigation.navigate('Login');

//   AsyncStorage.getItem('safeguard_collections',(err,result)=>{

//     this.setState({

//       isLoading: false,

//       dataSource: result,

//     }, function(){

// console.log(result);

//     });

//  });

 

}

 

  render() {

 

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

 

    return (

        <View style={styles.wrapper}>

            <MyStatusBar backgroundColor="#031537" barStyle="light-content" />

            <View style={styles.header}>

            <View style={styles.text}>

                <View style={styles.logoimg}>

                    <View>

                        <View>

                        <Text style={styles.iconfont}>h</Text>

                        </View>

                    </View>

                    <View style={{paddingLeft: 5, marginTop: 3,}}>

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

            <View style={styles.btnBg1}>

                <View style={styles.btncont1}>

                    <TouchableOpacity

                    style={styles.loginScreenButton}

                    onPress={() => this.props.navigation.navigate('Emergency')}

                    underlayColor='#fff'>

                    {/* <Text style={styles.loginText}>EMERGENCY</Text> */}

                        <LinearGradient

                    colors={['transparent', 'transparent','transparent', 'rgba(0, 0, 0, 0.2)']}

                    style={{alignItems: 'center', flex: 1, flexDirection: 'column', }}>

                        <Text style={styles.loginText}>EMERGENCY</Text>

                        </LinearGradient>

                    </TouchableOpacity>

                </View>

                <View style={styles.btncont2}>

                    <TouchableOpacity

                    style={styles.loginScreenButton}

                    onPress={() => this.props.navigation.navigate('Activeshooter')}

                    underlayColor='#fff'>

                        {/* <Text style={styles.loginText}>ACTIVE SHOOTER</Text> */}

                        <LinearGradient

                    colors={['transparent', 'transparent','transparent', 'rgba(0, 0, 0, 0.2)']}

                    style={{alignItems: 'center', flex:1, flexDirection: 'column', }}>

                        <Text style={styles.loginText1}>

                        ACTIVE {'\n'} SHOOTER

                        </Text>

                        </LinearGradient>

                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.btnBg2}>

                <View style={styles.btncont1}>

                    <TouchableOpacity

                    style={styles.loginScreenButton2}

                    onPress={() => this.props.navigation.navigate('Sendmessage')}

                    underlayColor='#fff'>

                        {/* <Text style={styles.loginText}>SEND MESSAGE</Text> */}

                        <LinearGradient

                    colors={['transparent', 'transparent','transparent', 'rgba(0, 0, 0, 0.2)']}

                    style={{alignItems: 'center', flex: 1, flexDirection: 'column', }}>

                        <Text style={styles.loginText}>SEND MESSAGE</Text>

                        </LinearGradient>

                   </TouchableOpacity>

                </View>

                <View style={styles.btncont2}>

                    <TouchableOpacity

                    style={styles.loginScreenButton2}

                    onPress={() => this.props.navigation.navigate('Allmessage')}

                    underlayColor='#fff'>

                        {/* <Text style={styles.loginText}>VIEW MESSAGES</Text> */}

                        <LinearGradient

                    colors={['transparent', 'transparent','transparent', 'rgba(0, 0, 0, 0.2)']}

                    style={{alignItems: 'center', flex: 1, flexDirection: 'column', }}>

                        <Text style={styles.loginText1}>VIEW {'\n'} MESSAGES</Text>

                        </LinearGradient>

                    </TouchableOpacity>

               </View>

        </View>

        <View style={styles.btnBg3}>

               {/* <TouchableOpacity

                //onPress={ () => this.actionOnRow(item)}

                 style={styles.loginScreenButton3}

                 underlayColor='#fff'

                >

                <Text style={styles.loginText}>EMERGENY RESPONSE PLAN</Text>

               

                 </TouchableOpacity>

 

                   <View style={styles.logobox}>

          <Image source={{uri: 'https://mobileemergencyresponseplans.com/images/watermark.png'}}

           style={{width: 300, height: 80}} /> */}





                  <FlatList

                  data={this.state.dataSource}

                 renderItem={({item}) => (

                 <TouchableOpacity onPress={ () => this.actionOnRow(item)}

                //  <TouchableOpacity onPress= {() => navigate('Charts', {selectid:item.id})}>

 

                 style={styles.loginScreenButton3}

                 underlayColor='#fff'>

                

                 <LinearGradient colors={['transparent', 'transparent','transparent', 'rgba(0, 0, 0, 0.3)']} style={styles.linearGradient}>

                 <Text style={styles.loginText2}>{item.title.toString().toUpperCase()}</Text>

                 </LinearGradient>

                

                 </TouchableOpacity>

                 )}

                 keyExtractor={({id}, index) => index.toString()}

               />

  {/* <Text style={styles.loginText2}>{item.title.toString().toUpperCase()}</Text>

       */}

                

        </View>

          </View>

        </View>

     

    );

  }

}

 

const styles = StyleSheet.create({

    wrapper: {

        flex: 1,

        flexDirection: 'column',

        justifyContent: 'flex-start',

        backgroundColor: '#e6e6e6',

      },

      linearGradient: {

        alignItems: 'center',

        flex: 1,

        flexDirection: 'column'

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

                fontFamily: Fonts.Safeguard,

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

            fontFamily: Fonts.Arimo

            },

        

            mainsection: {

              backgroundColor: '#e6e6e6',

              //flex: 14,

              paddingTop: 5,

            },

            loginScreenButton:{

            backgroundColor:'#730e12',

            borderRadius:5,

            //flex: 1,

            flexDirection: 'row',

            justifyContent: 'center',

            alignItems: 'center',

            overflow: 'hidden',

            height: 53,

            },

        

            loginScreenButton2:{

              backgroundColor:'#eebc00',

              borderRadius:5,

              //flex: 1,

              flexDirection: 'row',

              justifyContent: 'center',

              alignItems: 'center',

              overflow: 'hidden',

              height: 53,

            },

       

            loginScreenButton3:{
              marginBottom:1,
              backgroundColor:'#0d2a7a',
                minHeight: 60,
            },

       

            loginText:{

                color:'#fff',

                textAlign:'center',

                paddingLeft : 0,

                paddingRight : 0,

                fontSize: 18,

                fontWeight: 'bold',

                paddingTop:23,

                paddingBottom:0,

                flex:1,

                flexDirection: 'row',

                justifyContent:'center',

                alignItems:'center',

                textTransform: 'uppercase',

                fontFamily: Fonts.Arimo,

                lineHeight:14,

            },

            loginText1:{

                color:'#fff',

                textAlign:'center',
                fontSize: 18,

                fontWeight: 'bold',

                paddingTop:12,


                flex:1,

                flexDirection: 'row',

                justifyContent:'center',

                //flexWrap: 'wrap',

                alignItems:'center',

               textTransform: 'uppercase',

               fontFamily: Fonts.Arimo,

                lineHeight:15,

            },

            loginText2:{

              color:'#fff',

              textAlign:'center',

              fontSize: 18,

              fontWeight: 'bold',

              paddingTop:18,

              paddingBottom:15,

              paddingLeft:20,

              paddingRight:20,

              //flex:1,

              flexDirection: 'row',

              textTransform: 'uppercase',

              fontFamily: Fonts.Arimo

          },

       

            btnBg1:{

              //flex: 1,

              flexDirection: 'row',

              marginBottom: 8,

              //marginTop: 6,

             

            },

             btnBg2:{

              //flex: 1,

              flexDirection: 'row',

              marginBottom: 8,

            },

            btnBg3:{

              //flex:8,

              flexDirection: 'column',

             // backgroundColor: 'red',

            },

            btncont1:{

              paddingLeft: 6,

              paddingRight: 3,

              flex: 1,

            },

            btncont2:{

              paddingLeft: 3,

              paddingRight: 6,

              flex: 1,

            },

            logobackground: {

              //flex:1,

              justifyContent:'center',

              alignItems: 'center',

            },

            blnkbottom: {

              justifyContent: 'flex-end',

              alignItems: 'center',

              //position: 'absolute',

              //flex: 1,

              paddingBottom: 20,

              //bottom:50,

              //marginTop: 20,

              },

});