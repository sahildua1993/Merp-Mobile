import React ,{Component, Fragment} from 'react';
import { StyleSheet, Text, View, Platform,  Button, Image, TouchableOpacity, Navigate, ScrollView, props, StatusBar,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HTMLView from 'react-native-htmlview';
import Base64 from 'base-64'
import { Fonts } from './src/utils/Fonts';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Cardpage extends React.Component {
    state={ flowChartCards: [], activeCardIndex: 0, newFlowCards: [] };

    async componentDidMount() {
        const safeguard = await AsyncStorage.getItem('safeguard');
        const _safeguard = JSON.parse(safeguard);
        const { navigation } = this.props;
        this.initialState(_safeguard.cards, navigation.state.params.chartData.id, _safeguard.actions);
    }

    componentWillReceiveProps(nextProps) {
        const { cards, chartid, actions, activeBreadCrumb } = nextProps;
        if(this.props.chartid !== chartid) {
            this.initialState(cards, chartid, actions);
            // this.props.resetBreadcrumb();
        }
        if(activeBreadCrumb && activeBreadCrumb.length){
            const index = this.state.flowChartCards.indexOf(activeBreadCrumb[0]);
            this.setState({activeCardIndex: index});
        }
    }

    initialState = (cards, chartid, actions) => {
        console.log('cards, chartid, actions', cards, chartid, actions);
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
        // const { resetActiveBreadCrumb } = this.props;
        // resetActiveBreadCrumb();
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

    logoutuser = () => {
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
    };

    confirmSubmit = () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    };

    render(){
        const { newFlowCards, activeCardIndex } = this.state;
        const { navigation } = this.props;
        const activeCardContent = newFlowCards && newFlowCards.length ? newFlowCards[activeCardIndex] : null;
        console.log('activeCardContent==>', activeCardContent);
        return(
            <ScrollView>
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
                            <Text style={styles.iconfont}>d</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Profile')}
                            underlayColor='#fff'>
                            <Text style={styles.iconfont}>u</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.logoutuser()}
                            underlayColor='#fff'>
                            <Text style={styles.iconfont}>o</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {activeCardContent &&
                        <View style={{ marginLeft:20, marginRight: 20, marginTop: 60, borderWidth: 1, borderColor: '#f5c200'  }}>
                            <View style={{ padding: 5, backgroundColor: '#f5c200' }}>
                                <Text style={{ textAlign: 'center', fontWeight: "bold", fontSize: 24, textTransform: 'uppercase', color: '#ffffff'}}>
                                    {navigation.state.params.chartData.title} - {activeCardContent.card_type}
                                </Text>
                            </View>
                            <View style={{ padding: 20, backgroundColor: '#fffcf2', justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                flexDirection:'row',
                            }}>
                                <HTMLView
                                    value={Base64.decode(activeCardContent.content)}
                                    stylesheet={styles}
                                />
                                {
                                    activeCardContent.actions.length ? activeCardContent.actions.map((item, idx) => (
                                        <TouchableOpacity
                                            key={ idx }
                                            onPress={ () => {
                                                this.handleNextButton(item)
                                            }}
                                            underlayColor='#fff'
                                            style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingLeft: 20,  paddingRight: 20, height: 50, backgroundColor: '#f5c200', marginRight: 15 }}
                                        >
                                            <Text style={{ color: '#ffffff', fontSize: 16 }}>{ (item.content == '' || item.content == 'test') ? 'Next' : item.content}</Text>
                                        </TouchableOpacity>
                                    ))
                                    : <Fragment>
                                            <TouchableOpacity
                                                onPress={ () => {}}
                                                underlayColor='#fff'
                                                style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingLeft: 20,  paddingRight: 20, height: 50, backgroundColor: '#f5c200', marginRight: 15 }}
                                            >
                                                <Text style={{ color: '#ffffff', fontSize: 16 }}>Save As Incident Report</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={ () => {}}
                                                underlayColor='#fff'
                                                style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingLeft: 20,  paddingRight: 20, height: 50, backgroundColor: '#f5c200' }}
                                            >
                                                <Text style={{ color: '#ffffff', fontSize: 16 }}>Save As drill Log</Text>
                                            </TouchableOpacity>
                                      </Fragment>
                                }
                            </View>
                        </View>
                    }
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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
    },
    logoText: {
        color: 'white',
        fontSize: 14,
        paddingLeft: 0,
        fontFamily: Fonts.Arimo
    },
    mainsection: {
        backgroundColor: '#e6e6e6',
        flex: 14,
    },
    loginScreenButton3:{
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