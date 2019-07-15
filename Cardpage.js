import React ,{Component} from 'react';
import { View, Navigate, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Cardpage extends React.Component {
  state={};



  async componentDidMount() {

      const { cards, chartid, actions } = this.props;
      this.initialState(cards, chartid, actions);

     // console.log("propssssss==>>>" + JSON.stringify(this.props.navigation.state.params.chartData));
     const value = await AsyncStorage.getItem('safeguard');
     console.log('collections ==', value.collections);
  }


    initialState = (cards, chartid, actions) => {
        const flowChartCards = cards.filter(item => item.chart_id === chartid);
        let beginIndex;
        flowChartCards.map((item, idx) => {
            let flowChartActions = [];
            item.actions.map((actionItem) => {
                flowChartActions.push(actions.filter(item => item.id === actionItem)[0]);
            });
            item.actions = flowChartActions;
            if(item.card_type === 'begin')
                beginIndex = idx;
        });
        const temp = flowChartCards.splice(beginIndex, 1);
        flowChartCards.splice(0, 0, temp[0]);
        this.setState({ flowChartCards, newFlowCards: [flowChartCards[0]], activeCardIndex: 0 });
    };


    handleNextButton = actionSelected => {
        const { resetActiveBreadCrumb } = this.props;
        resetActiveBreadCrumb();
        const { activeCardIndex, newFlowCards, flowChartCards } = this.state;
        const actionIndex = flowChartCards.findIndex(item => item.id === actionSelected.destination);
        this.setState({newFlowCards: [...newFlowCards, flowChartCards[actionIndex]], activeCardIndex: activeCardIndex + 1});
    };

    handlePrevButton = () => {
        const { activeCardIndex, newFlowCards, flowChartCards } = this.state;
        this.setState({
            newFlowCards: newFlowCards.filter((itm, idx) => idx !== newFlowCards.length-1),
            activeCardIndex: activeCardIndex - 1
        });
    };

  render(){

    return(
      <View>
          <Text>Hellooooooooooo</Text>
      </View>
    )
  }
}