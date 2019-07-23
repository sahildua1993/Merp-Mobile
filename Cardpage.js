import React ,{Component, Fragment} from 'react';
import { StyleSheet, Text, View, Platform,  Button, Image, TouchableOpacity, Navigate, ScrollView, props, StatusBar,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/Ionicons";
import HTMLView from 'react-native-htmlview';
import { pipe, replace, trim } from 'ramda';
import Base64 from 'base-64'
import { Fonts } from './src/utils/Fonts';
import { COLOR_CODES } from './constants';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Cardpage extends React.Component {
    state={
        flowChartCards: [],
        activeCardIndex: 0,
        newFlowCards: [],
        breadcrumbs: [],
    };

    async componentDidMount() {
        const safeguard = await AsyncStorage.getItem('safeguard');
        const _safeguard = JSON.parse(safeguard);
        const { navigation } = this.props;
        this.initialState(_safeguard.cards, navigation.state.params.chartData.id, _safeguard.actions);
    }

    componentWillReceiveProps(nextProps) {
        const { cards, chartid, actions } = nextProps;
        if(this.props.chartid !== chartid) {
            this.initialState(cards, chartid, actions);
            // this.resetBreadcrumb();
        }
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
        this.resetActiveBreadCrumb();
        const { activeCardIndex, newFlowCards, flowChartCards } = this.state;
        const actionIndex = flowChartCards.findIndex(item => item.id === actionSelected.destination);
        this.setState({newFlowCards: [...newFlowCards, flowChartCards[actionIndex]], activeCardIndex: activeCardIndex + 1});
    };

    handlePrevButton = () => {
        const { activeCardIndex, newFlowCards } = this.state;
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

    addBreadcrumb = addNew => this.setState({ breadcrumbs: [ ...this.state.breadcrumbs, addNew ] });

    resetActiveBreadCrumb = () => this.setState({activeBreadCrumb: []});

    handleBreadCrumb = item => {
        const index = this.state.flowChartCards.indexOf(item);
        this.setState({
            breadcrumbs: [...this.state.breadcrumbs, item],
            activeCardIndex: index,
        });
    };

    render(){
        const { newFlowCards, activeCardIndex, breadcrumbs } = this.state;
        const { navigation } = this.props;
        const activeCardContent = newFlowCards && newFlowCards.length ? newFlowCards[activeCardIndex] : null;
        return(
            <ScrollView>
                <View style={styles.wrapper}>
                <MyStatusBar backgroundColor="#031537" barStyle="light-content" />
                <View style={styles.header}>
                    <View style={styles.text}>
                        <View style={styles.logoimg}>
                            <TouchableOpacity
                                underlayColor='#fff'
                                style={{flexWrap: 'wrap',
                                    flexDirection:'row',
                                }}
                                onPress={() => this.props.navigation.navigate('Charts', {collectionid: this.props.navigation.state.params.safeguard_charts_id, clickedChartId: navigation.state.params.chartData.id })}
                            >
                                <Fragment>
                                    <View>
                                        <View>
                                            <FontAwesome
                                                name="bars"
                                                color="#fff"
                                                size={20}
                                                style={styles.iconfont}
                                            />
                                        </View>
                                    </View>
                                    <View style={{paddingLeft: 5, marginTop: 3,}}>
                                        <Text style={styles.logoText}>
                                            Arodek
                                        </Text>
                                    </View>
                                </Fragment>
                            </TouchableOpacity>
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
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            {(activeCardIndex >= 1) &&
                            <Icon
                                name="md-play"
                                color="#000000"
                                size={30}
                                style={{ marginLeft:20, marginTop:20, transform: [{ rotate: '180deg'}] }}
                                onPress={ this.handlePrevButton }
                            />
                            }
                        </View>
                        <View style={{ marginTop: 13, flex: 6, flexDirection: 'row', flexWrap: 'wrap', marginLeft: 50, marginRight: 50 }}>
                            { breadcrumbs.length !== 0 && breadcrumbs.map(item => (
                                <TouchableOpacity
                                    onPress={ () => this.handleBreadCrumb(item) }
                                    underlayColor='#fff'
                                >
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            borderRadius: 30,
                                            marginTop: 10,
                                            backgroundColor: COLOR_CODES[item.card_type].headColor,
                                        }} />
                                        <Icon
                                            name="md-link"
                                            color="#000000"
                                            size={10}
                                            style={{ marginLeft: 5, marginRight: 5, marginTop: 10 }}
                                            onPress={ this.handlePrevButton }
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {activeCardContent &&
                        <View style={{ ...styles.cardWrapper, marginTop: (activeCardIndex >= 1) ? 15 : 25,  borderColor: COLOR_CODES[activeCardContent.card_type].headColor  }}>
                            <View style={{ ...styles.titleContainer, backgroundColor: COLOR_CODES[activeCardContent.card_type].headColor }}>
                                <Text style={ styles.title}>
                                    {navigation.state.params.chartData.title} - {activeCardContent.card_type}
                                </Text>
                            </View>
                            <View style={{ ...styles.cardBody, backgroundColor: COLOR_CODES[activeCardContent.card_type].bgColor }}>
                                <HTMLView
                                    value={(Base64.decode(activeCardContent.content)).replace(/^\s+|\s+$/g, '')}
                                    stylesheet={styles}
                                    addLineBreaks={false}
                                />
                                <View style={styles.btnWrapper}>
                                    {
                                        activeCardContent.actions.length ? activeCardContent.actions.map((item, idx) => (
                                                <TouchableOpacity
                                                    key={ idx }
                                                    onPress={ () => {
                                                        this.handleNextButton(item);
                                                        this.addBreadcrumb(activeCardContent);
                                                    }}
                                                    underlayColor='#fff'
                                                    style={{ ...styles.nxtBtn, backgroundColor: COLOR_CODES[activeCardContent.card_type].headColor }}
                                                >
                                                    <Text style={ styles.nxtBtnTxt }>
                                                        { (item.content == '' || item.content == 'test') ? 'Next' : item.content}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                            : <Fragment>
                                                <TouchableOpacity
                                                    onPress={ () => {}}
                                                    underlayColor='#fff'
                                                    style={{ ...styles.nxtBtn, backgroundColor: COLOR_CODES[activeCardContent.card_type].headColor }}
                                                >
                                                    <Text style={ styles.saveBtn }>Save As Incident Report</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={ () => {}}
                                                    underlayColor='#fff'
                                                    style={{ ...styles.nxtBtn, marginTop: 50, backgroundColor: COLOR_CODES[activeCardContent.card_type].headColor }}
                                                >
                                                    <Text style={ styles.saveBtn }>Save As Drill Log</Text>
                                                </TouchableOpacity>
                                            </Fragment>
                                    }
                                </View>
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
        marginLeft: 12,
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

    cardWrapper: {
        marginLeft:20,
        marginRight: 20,
        borderWidth: 1,
        marginBottom: 50
    },
    titleContainer: {
        padding: 5,
    },
    title: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#ffffff',
    },
    cardBody: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    btnWrapper: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    nxtBtn: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        marginTop: 50,
        marginRight: 15,
    },
    nxtBtnTxt: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    saveBtn: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    p: {
        fontSize: 20,
        textAlign: 'center',
        marginLeft: -25,
        paddingLeft: 15,
        paddingRight: 15,
    },
    ul: {
        fontSize: 19,
        paddingLeft: 10,
    },
    li: {
        fontSize: 19,
        textAlign: 'left',
        paddingLeft: 10,
    }
});