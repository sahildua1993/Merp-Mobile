import React from 'react';
import { StyleSheet, Text, View, Platform,  Button, Image, TouchableOpacity, Navigate, ScrollView, props,ActivityIndicator, StatusBar,Alert} from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { FlatList,  TouchableWithoutFeedback} from 'react-native';
import  alaSQLSpace from 'alasql';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Fonts } from './src/utils/Fonts';
import FontAwesome, { Icons } from 'react-native-fontawesome';

global.indexnos='';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Charts extends React.Component {

  constructor(props){
        super(props)
        {
           this.state={
               collections:'',
               title:'',
               newarrays:'',
               newarray_loading:true,
               safeguard_charts:'',
               safeguard_charts_loading:true,
               safeguard_collections_charts:'',
               safeguard_collections_charts_loading:true,
               isLoading: true,
               safeguard_org:'',
               safeguard_org_loading:true,
               safeguard_charts_id:'',
               safeguard_charts_id_loading:'',
               collectionid:''
           };
        }
  }

  componentDidMount(){

     const { navigation } = this.props;
     var id= navigation.getParam('collectionid', 'NO-ID');
     AsyncStorage.getItem('safeguard',(err,safeguard_charts)=>{
     let sdata=JSON.parse(safeguard_charts);
     let chartda=sdata.charts;
     var ids= JSON.stringify(id) ;
     let result= alaSQLSpace('SELECT * FROM ? WHERE collection = ?', [chartda,id]);
     let temp= alaSQLSpace('SELECT * FROM ? ORDER BY priority ASC ' , [result]);

      this.setState({
        newarray_loading: false,
        newarrays: result,
        safeguard_charts_id:id

      });

    })

  }

  checkIndexIsEven (n) {
    if(this.state.safeguard_charts_id==='1036')
    {
       //alert(n);
    var colorcode='#db5700';
    if(n>=0 && n<=5)
    {
     colorcode='#f5c200';
    }
    else if(n>=6 && n<=11){colorcode='#db5700';}
    else if(n>=12 && n<=17){colorcode='#730e12';}
    else if(n>=18 && n<=23){colorcode='#649409';}
    else if(n>=24 && n<=29){colorcode='#1d3c0e';}
    else if(n>=30 && n<=35){colorcode='#0d2a7a';}
      return colorcode;
    }

    else{
      switch (n%6){

        case 0:
        return "#f5c200";
        case 1:
          return "#db5700";
        case 2:
          return "#730e12";
          case 3:
          return "#649409";
        case 4:
          return "#1d3c0e";
          case 5:
          return "#0d2a7a";

        default:
        return null;
      }
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
        onPress: () =>  this.confirmSubmit()},
      ],
      {cancelable: false},
    );
  }

    confirmSubmit(){

       AsyncStorage.clear();
       this.props.navigation.navigate('Login');
    }

  renderItem(data) {
    let { item, index } = data;

    return (
      <TouchableOpacity onPress={ () => this.actionOnRow(item,index)}
               // style={(item.length-6)?styles.loginScreenButton3:styles.loginScreenButton4}
                style={[styles.loginScreenButton3,
                  { backgroundColor: this.checkIndexIsEven(index)}]}
                underlayColor='#fff'>

                <LinearGradient
                 colors={['transparent', 'transparent','transparent', 'transparent', 'rgba(0, 0, 0, 0.3)']}
                 style={{alignItems: 'center', flex: 1, flexDirection: 'column', }}>
                { index===indexnos ?
                <View style={{position: 'absolute', right: 10, marginTop: 17,}}>
                  <FontAwesome name="exclamation-triangle" size={20} color="#fff" />
                </View>
                 : null }
                <Text style={styles.loginText}>{item.title.toString().toUpperCase()}</Text>
                </LinearGradient>


                </TouchableOpacity>
    )
  }

  render() {

   if(this.state.newarray_loading){
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    )
  }
 const {navigation} = this.props;

       return (

/* <ScrollView contentContainerStyle={styles.contentContainer}>   */
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

            <View style={styles.btnBg3}>

              <FlatList
                 data={this.state.newarrays}
                 renderItem={this.renderItem.bind(this)}
                keyExtractor={ (item, index) => index.toString() }
              />
            </View>
            </View>
            </View>
            /* </ScrollView> */
       );
    }

  actionOnRow(item) {
    this.props.navigation.navigate('Cardpage', { chartData: item });
  }
}

  const styles = StyleSheet.create({
  //  contentContainer: {
  //     //paddingVertical: 10,
  //   },
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
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
      flex: 14,
      //paddingTop: 5,
    },


    loginScreenButton3:{
      //marginBottom:1,
      //paddingTop:12,
      //paddingBottom:12,
      backgroundColor:'#0d2a7a',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    },
    loginScreenButton4:{
      marginBottom:1,
      paddingTop:12,
      paddingBottom:12,
      backgroundColor:'#000',

    },

    loginText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 0,
        paddingRight : 0,
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 12,
    },


    btnBg3:{
      flex:7,
      flexDirection: 'column',
    },

  });

  
 


