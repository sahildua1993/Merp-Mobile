import React from 'react';

import { StyleSheet, Text, Linking, View, Button,ActivityIndicator,Alert,Image, TouchableOpacity, FlatList,  TouchableWithoutFeedback,

Navigate, ScrollView,Dimensions, Platform, StatusBar, WebView } from 'react-native';

import { createStackNavigator, createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator, props }

from 'react-navigation';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Home from './Home';

import  alaSQLSpace from 'alasql';

import HTML from 'react-native-render-html';

// import TabViewExample from './tab';

import HTMLView from 'react-native-htmlview';

import { Icon } from 'react-native-elements';

import Profile from './Profile';

import Icons from './Icons';



import AsyncStorage from '@react-native-community/async-storage';




const MyStatusBar = ({backgroundColor, ...props}) => (

  <View style={[styles.statusBar, { backgroundColor }]}>

    <StatusBar translucent backgroundColor={backgroundColor} {...props} />

  </View>

);

 

const SECTIONS = [];

 

export default class FileScreen extends React.Component {

static navigationOptions = {

//To hide the ActionBar/NavigationBar

header:null,

};

 

constructor(props){

    super(props)

    {

      this.state={

        collections:'',

        title:'',

        safeguard_folder:'',

        safeguard_folder_loading:true,

        safeguard_links:'',

        safeguard_links_loading:true,

        newarrays:'',

        safeguard_collections:'',

        safeguard_collections_loading:true,

        newarray_loading:true,

       

        safeguard_org:'',

        safeguard_org_loading:true, 

        clicks:1,

        i:0,

        temparrays:'',

        temparrays_loading:'',

        index: 0,

        is_showing:false,

        image_name:'',

        image_full_path:'http://www.allwhitebackground.com/images/2/2270.jpg',

        //image_full_path:'',

        newcolletion:'',

        folderview :false,

        folder_item_view:false,

        folder_item:'',

    routes: [

      { key: 'first', title: 'Files' },

      { key: 'second', title: 'Emergency Phone Numbers' },

    ],

    activeSections: [],

      title: '',

      content: ''

      };

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

   //alert('fhfg');

   console.log('ok Pressed');

this.props.navigation.navigate('Login');

//   AsyncStorage.getItem('safeguard_collections',(err,result)=>{

//     this.setState({

//       isLoading: false,

//       dataSource: result,

//     }, function(){

 

//     });

//  });

 

}

 

componentDidMount(){

 

 

 

//   AsyncStorage.getItem('safeguard',(err,results)=>{

 

//   let sdata=JSON.parse(results);

   

 

//    this.setState({

//      safeguard_org_loading: false,

//      safeguard_org: sdata.folders,

//    }, function(){

   

//    });

//  });

 

    var temparray = [];

 

    const { navigation } = this.props;

    AsyncStorage.getItem('safeguard',(err,safeguard_folder)=>{

 

      let sdata=JSON.parse(safeguard_folder);

        this.setState({

            safeguard_folder_loading: false,

            safeguard_folder: sdata.folders,

            folderview:true,

            folder_item_view:false,

        }, function(){

 

        });

      });

     

 

      // AsyncStorage.getItem('safeguard_collections',(err,safeguard_collections)=>{

      //   this.setState({

      //       safeguard_collections_loading: false,

      //       safeguard_collections: JSON.parse( safeguard_collections),

      //   }, function(){

 

          // for (let i=0;i<this.state.safeguard_collections.length;i++)

          // {

          //      if(i===0)

          //      {

          //        SECTIONS.push({

          //           "supporting_material_title":this.state.safeguard_collections[0].supporting_material_title,

          //           "supporting_material_content":this.state.safeguard_collections[0].supporting_material_content

          //        })

          //      }

          //      else{

          //       SECTIONS.push({

          //         "supporting_material_title":this.state.safeguard_collections[i].supporting_material_title,

          //         "supporting_material_content":'<p></p>'

          //      })

          //      }

 

          //      if(i+1===this.state.safeguard_collections.length){

 

          //       this.setState({

          //         newcolletion:SECTIONS

          //       })

          //      }

          // }

        // });

      // });

 

   

  }

 

  folder_item_close(){

    AsyncStorage.getItem('safeguard',(err,safeguard_folder)=>{

      let sdata=JSON.parse(safeguard_folder);

      this.setState({

          safeguard_folder_loading: false,

          safeguard_folder: sdata.folders,

          folderview:true,

          folder_item_view:false,

      }, function(){

 

      });

    });

  }

 

 

  actionOnRow(item) {

 

    // let safeguard= localStorage.getItem("safeguard");

    // let safeguarddata=JSON.parse(safeguard);

    // let filedata=safeguarddata.links;

    // let res= alaSQLSpace('SELECT * FROM ? where file_folder_id = ?', [filedata,e]);

 

   AsyncStorage.getItem('safeguard',(err,safeguard_links)=>{

 

      let safeguarddata=JSON.parse(safeguard_links);

        this.setState({

            safeguard_links_loading: false,

            safeguard_links: safeguarddata.links,

            folderview:false,

            folder_item_view:true

        }, function(){

 

            res= alaSQLSpace('SELECT * FROM ? where file_folder_id = ?', [this.state.safeguard_links,item.id]);

          

            this.setState({

            folder_item: res,

           },

          function(){

          });

        });

    // AsyncStorage.setItem('safeguard_chart_cards', JSON.stringify(item.cards),()=>{

    // this.props.navigation.navigate('Cards');

    });

   }

 

   actiondetails(item,index){

 

    var temp=[];

 

      

    for (let i=0;i<this.state.safeguard_collections.length;i++)

    {

         if(i===index)

         {

         

          temp.push({

              "supporting_material_title":this.state.safeguard_collections[i].supporting_material_title,

              "supporting_material_content":this.state.safeguard_collections[i].supporting_material_content

 

           })

 

         }

         else{

          

          temp.push({

            "supporting_material_title":this.state.safeguard_collections[i].supporting_material_title,

            "supporting_material_content":'<p></p>'

 

         })

         }

     

 

         if(i+1===this.state.safeguard_collections.length){

        

          this.setState({

            newcolletion:temp

          })

         }

    }

   }

 

   _renderSectionTitle = section => {

    return (

      <View style={styles.content}>

        <Text>{section.content}</Text>

      </View>

    );

  };


  // _renderHeader = section => {

  //   return (

  //     <View style={styles.header}>

  //       <Text style={styles.headerText}>arodek</Text>

  //     </View>

  //   );

  // };


  _renderContent = section => {

    return (

      <View style={styles.content}>

        <Text>{section.content}</Text>

      </View>

    );

  };


  _updateSections = activeSections => {

    this.setState({ activeSections });

  };




render() {

   if(this.state.safeguard_folder_loading){

    return(

       

      <View style={{flex: 1, padding: 20}}>

        {/* <ActivityIndicator/> */}

       </View>

    )  

  }

  const FirstRoute = () => (

    <View style={{backgroundColor: '#fff',flex : 1}}>

       

   {

     this.state.folderview ?

   <View>

    <FlatList

    horizontal = {true}

    style={{flexDirection:'row',height:Dimensions.get("window").height}}

    data={this.state.safeguard_folder}

    renderItem={({item}) => (

     

    <TouchableOpacity onPress={ () => this.actionOnRow(item)}

    style={{padding: 20, flexDirection: 'column', alignItems: 'center'}}

    underlayColor='#fff'>

    {/* <Ionicons name="md-folder-open" size={30} color="#031537" /> */}

    <Icon color='#031537'  name='folder-open' type='font-awesome' size={26} />

    <Text style={{fontSize: 14,  paddingTop: 6,}}>{item.name}</Text>

    </TouchableOpacity>

   

    )}

    keyExtractor={ (item, index) => index.toString() }

    />

  

    </View>

    : null }

   

    {this.state.folder_item_view ?

   

    <View style={{flexDirection: 'row',}}>

    <TouchableOpacity

    onPress={ () => this.folder_item_close()}

    style={{padding: 20, flexDirection: 'column', alignItems: 'center'}}

    underlayColor='#fff'

    >

      <Icon color='#031537'  name='close' type='material' size={26} />

      <Text style={{fontSize: 14,  paddingTop: 6,}}>Close</Text>

    </TouchableOpacity>

 

    <FlatList

    

    data={this.state.folder_item}

    renderItem={({item}) => (

     

      <TouchableOpacity

      onPress={ ()=>{ Linking.openURL('https://mobileemergencyresponseplans.com/'+item.url)}}

      style={{padding: 20, flexDirection: 'column', alignItems: 'center'}}

      underlayColor='#fff'>

        {/* <Ionicons name="md-images" size={45} color="#031537" /> */}

        <Icon color='#031537'  name='image' type='font-awesome' size={26} />

        <Text style={{fontSize: 14, paddingTop: 6,}}>

        {item.name}

        </Text>

      </TouchableOpacity>

   

    )}

    keyExtractor={ (item, index) => index.toString() }

    />

      

    </View>

    : null }

 

    {/* <WebView

     

       source={{uri: this.state.image_full_path}}

        style={{marginTop: 20}}

/>  */}

   

  </View>

    );

 

   

    

    const SecondRoute = () => (

           <View  style={{marginLeft: 20, marginRight: 20, marginTop: 10,}}>

             <FlatList

                 data={this.state.newcolletion}

                 renderItem={({item,index}) => (

                <TouchableOpacity onPress={ () => this.actiondetails(item,index)}

                style={{flexDirection:'column'}}

                underlayColor='#fff'>

                <Text style={styles.loginScreenButton3}>{item.supporting_material_title}</Text>

               {/* <View style={{flex: 1}} > */}

               {/* <HTML style={{flex: 1, marginTop: 50}}

               html={item.supporting_material_content} /> */}

               <View style={{borderLeftColor: '#000', borderLeftWidth: 1,

              borderRightColor: '#000', borderRightWidth: 1, paddingLeft: 7,

              paddingRight: 7,

              }}>

                <HTMLView

                  value={item.supporting_material_content}

                />

                </View>

                {/* <WebView

                  originWhitelist={['*']}

                  source={{ html : item.supporting_material_content}}

                /> */}

               {/* </View>  */}

                </TouchableOpacity>

                )}              

                keyExtractor={ (item, index) => index.toString() }

              />

              </View>

    );

 

return (

 

<View style={styles.wrapper}>

<MyStatusBar backgroundColor="#1e3a6b" barStyle="light-content" />

<View style={styles.header}>

            <View style={styles.text}>

                <View style={styles.logoimg}>

                    <View>

                        <View style={styles.logoText}>

                        <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Home')}

                    underlayColor='#fff'>

                            <Icon color='#fff'  name='home' type='font-awesome' size={26} />

                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{paddingLeft: 5, marginTop: 2,}}>

                        <Text style={styles.logoText}>

                            arodek

                        </Text>

                    </View>

                </View>

            </View>

            <View style={styles.rightnav}>

                    <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Icons')}

                    underlayColor='#fff'>

                        <Icon color='#fff'  name='help' type='material' size={26}/>

                    </TouchableOpacity>

 

                    <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Filescreen')}

                    underlayColor='#fff'>

                        <Icon color='#fff'  name='folder' type='material'  size={26}/>

                    </TouchableOpacity>

 

                    <TouchableOpacity

                    onPress={() => this.props.navigation.navigate('Profile')}

                    underlayColor='#fff'>

                        <Icon color='#fff'  name='torso' type='foundation' size={26}/>

                    </TouchableOpacity>

 

                    <TouchableOpacity

                    onPress={() => this.logoutuser()}

                    underlayColor='#fff'>

                        <Icon color='#fff'  name='power' type='foundation' size={26} />

                    </TouchableOpacity>

            </View>

          </View>

 

<View style={styles.mainsection}>

<TabView

        navigationState={this.state}

        renderScene={SceneMap({

          first: FirstRoute,

          second: SecondRoute,

        })}

        onIndexChange={index => this.setState({ index })}

      //  initialLayout={{ width: Dimensions.get('window').width,height:Dimensions.get('window').height-50}}

 

        renderTabBar={props => (

            <TabBar

              {...props}

              renderLabel={this._renderLabel}

              getLabelText={({ route: { title } }) => title}

              indicatorStyle={styles.indicator}

              //tabStyle={styles.tabStyle}

              

              //style={styles.tab}

            />

          )}

      />

 

<View style={{position: 'absolute', right: 10, top: 6,}}>

 

<TouchableOpacity

onPress={() => this.props.navigation.navigate('Home')}>

{/* <Ionicons name="md-close" size={40} color="white" /> */}

<Icon color='#fff'  name='close' type='material' size={35} />

 

</TouchableOpacity>

 

</View>

 

<TouchableOpacity onPress={ () => this.actionimageclick()}

    style={{flexDirection:'column'}}

    underlayColor='#fff'>

    <Text style={styles.loginText}>{this.state.image_name}</Text>             

  </TouchableOpacity>

 

    {/* <Image style={{width: 50, height: 50}}

  source={{uri: this.state.image_full_path}}/> */}

</View>

 

</View>

 

);

}

}






const styles = StyleSheet.create({

// contentContainer: {

// paddingVertical: 20

// },

wrapper: {

  flex: 1,

  flexDirection: 'column',

  justifyContent: 'flex-start',

  backgroundColor: '#e6e6e6',

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

    logoimg: {

      paddingLeft: 5,

      flex: 1,

      flexDirection: 'row',

      //backgroundColor: 'red',

    },

    logoText: {

      color: 'white',

      fontSize: 18,

      //fontWeight: 'bold',

      paddingLeft: 0,

      },

 

mainsection: {

backgroundColor: '#e6e6e6',

flex: 1,

//paddingTop: 12,

},

 

headingTxt:{

flex:1,

justifyContent: 'center',

alignItems: 'center',

paddingBottom: 24,

},

 

headingtxtsty: {

fontSize: 22,

fontWeight: 'bold',

},

 

iconListBg: {

marginLeft: 35,

marginRight: 35,

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

paddingRight: 25,

//backgroundColor: 'red',

flex: 2,

},

 

icontxt: {

//backgroundColor: '#ddd',

flex: 8,

},

scene: {

    flex: 1,

   // color:'#000'

  },

 

// text: {

//   lineHeight: 20,

//   paddingTop: 9,

//   paddingLeft: 30,

//   paddingRight: 30,

//   paddingBottom: 9,

//   textAlign: 'center',

//   color: 'black'

// },

tabStyle: {

  //opacity: 1,

  //width: 'auto',

  marginRight: 2,

  paddingTop: 15,

  paddingLeft: 0,

  paddingRight: 0,

paddingBottom: 15,

  backgroundColor: '#e6e6e6',

  color:'#000'

},

tab: {

  backgroundColor: 'white',

  //paddingRight: 5,

  //paddingLeft: 20,

  //paddingTop: 20,

  marginTop: 2,

  color:'#000'

},

indicator: {

  backgroundColor: 'white',

  color:'black'

},

content: {

  padding: 20,

  //backgroundColor: 'red'

},

contentText: {

  color: '#000',

},

buttonFolder:{

  padding:20,

  textAlign: 'center',

 

},

loginScreenButton3:{

  marginBottom:1,

  backgroundColor:'#0d2a7a',

  color:'white',

  paddingBottom: 20,

  paddingTop: 20,

  paddingLeft: 10,

  paddingRight: 10,

},

});

 