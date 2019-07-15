import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Cards extends React.Component {

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

 componentDidMount(){


  const { navigation } = this.props;
  var chart_id= navigation.getParam('chart_id', 'NO-ID');
  var chart_title= navigation.getParam('chart_title', 'NO-ID');
  AsyncStorage.getItem('safeguard',(err,safeguard_cards)=>{
  let sdata=JSON.parse(safeguard_cards);
  let chardda=sdata.cards;

  alert(chart_id + " "+ chart_title);

  
  // let result= alaSQLSpace('SELECT * FROM ? WHERE collection = ?', [chartda,id]);
 
         
 })
 }

 componentWillMount(){

  
 }

  render(){

    return(
      <View>
      </View>
    )
  }
}