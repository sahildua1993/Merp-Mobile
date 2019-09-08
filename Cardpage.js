import React ,{Component, Fragment} from 'react';
import { TextInput, Keyboard, StyleSheet, Text, View, Platform,  Button, Image, TouchableOpacity, Navigate, ScrollView, props, StatusBar,Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/Ionicons";
import HTMLView from 'react-native-htmlview';
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
        drawerDataList: [{
            isEdit: false,
            key: Date.now(),
            date: new Date(),
            text: 'Active logging began',
        }],
        showStaticDrawer: false,
        showDrawer: false,
        isTextboxSelected: false,
        addNoteText: '',
        staticData: {},
        isIncident: false,
    };

    async componentDidMount() {
        const safeguard = await AsyncStorage.getItem('safeguard');
        const _safeguard = JSON.parse(safeguard);
        const { navigation } = this.props;
        this.initialState(_safeguard.cards, navigation.state.params.chartData.id, _safeguard.actions);
        const data = _safeguard.charts.find(item => item.id === navigation.state.params.chartData.id);
        if(data) {
            this.setState({
                isIncident: navigation && navigation.state && navigation.state.params && navigation.state.params.safeguard_charts_id === '1036',
                staticData: {
                    title: data.supporting_materials_title,
                    content: data.supporting_materials_content,
                }
            });
        }
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
        const currentIndex = flowChartCards.findIndex(item => item.id === actionSelected.card_id);
        this.setState({
            newFlowCards: [...newFlowCards, flowChartCards[actionIndex]],
            activeCardIndex: activeCardIndex + 1,
            drawerDataList: [
                ...this.state.drawerDataList,
                {
                    isEdit: false,
                    key: Date.now(),
                    date: new Date,
                    source: actionSelected.card_id,
                    destination: actionSelected.destination,
                    type: flowChartCards[currentIndex].card_type,
                    text: `Moved forward to ${flowChartCards[actionIndex].card_type}(${actionSelected.destination})`
                }
            ]
        });
    };

    handlePrevButton = () => {
        const { activeCardIndex, newFlowCards } = this.state;
        const actionIndex = newFlowCards.filter((itm, idx) => idx !== newFlowCards.length-1);
        this.setState({
            newFlowCards: actionIndex,
            activeCardIndex: activeCardIndex - 1,
            drawerDataList: [
                ...this.state.drawerDataList,
                {
                    isEdit: false,
                    key: Date.now(),
                    date: new Date,
                    source: newFlowCards[newFlowCards.length - 1].id,
                    destination: actionIndex[actionIndex.length - 1].id,
                    type: newFlowCards[newFlowCards.length - 1].card_type,
                    text: `Moved back to (${actionIndex[actionIndex.length-1].id})`
                }
            ]
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
            drawerDataList: [
                ...this.state.drawerDataList,
                {
                    isEdit: false,
                    key: Date.now(),
                    date: new Date,
                    source: this.state.newFlowCards[this.state.newFlowCards.length - 1].id,
                    destination: item.id,
                    type: this.state.newFlowCards[this.state.newFlowCards.length - 1].card_type,
                    text: `Rollback to ${item.card_type}(${item.id}) back via Breadcrumb.`
                }
            ]
        });
    };

    handleStaticDrawer = () => this.setState(prevState => ({ showStaticDrawer: !prevState.showStaticDrawer }));

    handleDrawer = () => this.setState(prevState => ({ showDrawer: !prevState.showDrawer }));

    handleAddNote = () => {
        Keyboard.dismiss();
        this.setState({
            drawerDataList: [
                ...this.state.drawerDataList,
                {
                    isEdit: true,
                    key: Date.now(),
                    date: new Date,
                    text: this.state.addNoteText,
                }
            ],
            addNoteText: ''
        });
    };

    handleDeleteNote = data => {
        const { drawerDataList } = this.state;
        this.setState({
            drawerDataList: drawerDataList.filter(item => item.key !== data.key),
        });
    };

    handleDrawerData = ({ item }) => {
      return (
        <View style={{
            flex: 1,
            height: 150,
            borderBottomWidth:1,
            borderColor: '#031537',
            flexDirection: 'row',
        }}>
            <View style={{
                flex: 3,
                backgroundColor: '#dde5fb',
                alignItems: 'center'
            }}>
                <Text style={{textAlign: 'center', paddingTop: 15, paddingLeft: 17, paddingRight: 17 }}>
                    {moment(item.date).format('ddd LL LTS')}
                </Text>
            </View>
            <View style={{
                flex: 7,
                paddingLeft: 10,
                backgroundColor: '#bbcbf8',
                borderLeftWidth:1,
                borderColor: '#031537',
            }}>
                {item.isEdit &&
                    <Icon
                        name="md-close"
                        color="#730e12"
                        size={30}
                        style={{ position: 'absolute', right:10, zIndex: 10, top: 10 }}
                        onPress={ () => this.handleDeleteNote(item) }
                    />
                }
                <Text style={{ paddingTop: 15, paddingLeft: 10, paddingRight: 25 }}>
                    {item.text}
                </Text>
            </View>
        </View>
      );
    };

    saveData = async type => {
        const { drawerDataList } = this.state;
        const { navigation } = this.props;
        const chartId = navigation.state.params.chartData.id;
        const userSession = await AsyncStorage.getItem('session');
        const _userSession = JSON.parse(userSession);
        const apiData = drawerDataList.map((item,idx) => {
           if(idx !== 0) {
               return ({
                   content: item.text,
                   datetime: item.date,
                   destination: item.destination,
                   source: item.source,
                   type: item.type,
               })
           }
        });
        fetch(api_url, {
            method:'POST',
            headers:{
            Accept: 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "action": "saveLog",
                "log_type": type,
                "user_id": _userSession.id,
                "chart_id": chartId,
                "log_details":  apiData.splice(1),
            })
        })
        .then(response => {
            Alert.alert(
                'Alert',
                'Your incident logs has been saved',
                [{
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('Home')
                }],
                {cancelable: false},
            );
        }).catch(err => {
            Alert.alert(
                'Something went wrong please try again later.',
                [{
                    text: 'OK',
                }],
                {cancelable: false},
            );
        });
    };

    render(){
        const { newFlowCards, activeCardIndex, breadcrumbs, showDrawer, isTextboxSelected, drawerDataList, showStaticDrawer, staticData, isIncident } = this.state;
        const { navigation } = this.props;
        const activeCardContent = newFlowCards && newFlowCards.length ? newFlowCards[activeCardIndex] : null;
        return(
            <Fragment>
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
                <ScrollView>
                    <View style={styles.wrapper}>
                        <MyStatusBar backgroundColor="#031537" barStyle="light-content" />

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
                                                    // onPress={ () => this.handlePrevButton(item) }
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
                                        {`${navigation.state.params.chartData.title}${isIncident ? ' - ' : ''}${isIncident ? activeCardContent.card_type : ''}`}
                                    </Text>
                                </View>
                                <View style={{ ...styles.cardBody, backgroundColor: COLOR_CODES[activeCardContent.card_type].bgColor }}>
                                    <HTMLView
                                        value={(Base64.decode(activeCardContent.content)).replace(/^\s+|\s+$/g, '')}
                                        stylesheet={styles}
                                        addLineBreaks={false}
                                    />
                                    { isIncident &&
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
                                                            onPress={ () => this.saveData('incedent') }
                                                            underlayColor='#fff'
                                                            style={{ ...styles.nxtBtn, backgroundColor: COLOR_CODES[activeCardContent.card_type].headColor }}
                                                        >
                                                            <Text style={ styles.saveBtn }>Save As Incident Report</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={ () => this.saveData('drill') }
                                                            underlayColor='#fff'
                                                            style={{ ...styles.nxtBtn, marginTop: 50, backgroundColor: COLOR_CODES[activeCardContent.card_type].headColor }}
                                                        >
                                                            <Text style={ styles.saveBtn }>Save As Drill Log</Text>
                                                        </TouchableOpacity>
                                                    </Fragment>
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                            }
                        </View>
                    </View>
                </ScrollView>
                {isIncident &&
                    <Fragment>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                backgroundColor: '#031537',
                                bottom: 120,
                                borderBottomLeftRadius: 4,
                                borderTopLeftRadius: 4,
                                right: showStaticDrawer ? '85%' : 0
                            }}
                            onPress={ this.handleStaticDrawer }
                        >
                            <View style={{
                                height: 70,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image source={require('./assets/event_aid_icon.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#031537',
                                position: 'absolute',
                                bottom: 30,
                                borderBottomLeftRadius: 4,
                                borderTopLeftRadius: 4,
                                right: showDrawer ? '85%' : 0
                            }}
                            onPress={ this.handleDrawer }
                        >
                            <View style={{
                                height: 70,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image source={require('./assets/incident_log_icon.png')} />
                            </View>
                        </TouchableOpacity>
                    </Fragment>
                }
                { showStaticDrawer && staticData.title && staticData.content &&
                    <View style={{
                        position: 'absolute',
                        height: '100%',
                        width: '85%',
                        right: 0,
                        border: 2,
                        borderLeftWidth:6,
                        borderColor: '#031537',
                        marginTop: Platform.OS === 'ios' ? 75 : 80,
                    }}>
                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' }}>
                            <ScrollView>
                                    <View style={{
                                        marginTop: 18,
                                        backgroundColor: 'darkblue',
                                        paddingTop: 15,
                                        paddingBottom: 15,
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: '#ffffff',
                                        }}>{ staticData.title }</Text>
                                    </View>

                                    <HTMLView
                                        style={{
                                            paddingTop: 20,
                                            paddingBottom: 170,
                                            paddingLeft: 20,
                                            paddingRight: 20, }}
                                        value={(staticData.content)}
                                        stylesheet={{
                                            h3: {

                                                paddingTop: 10,
                                                fontSize: 22,
                                                fontWeight: 'bold',
                                            },
                                            p: {
                                                fontSize: 16,
                                            },
                                        }}
                                        addLineBreaks
                                    />
                            </ScrollView>
                        </View>
                    </View>
                }
                { showDrawer &&
                    <View style={{
                        zIndex: 5,
                        position: 'absolute',
                        height: '100%',
                        width: '85%',
                        right: 0,
                        border: 2,
                        borderLeftWidth:6,
                        borderColor: '#031537',
                        marginTop: Platform.OS === 'ios' ? 75 : 80,
                    }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{
                                flex:  isTextboxSelected ? 1 : 4 ,
                                backgroundColor: '#e6e6e6',
                            }}>
                                <FlatList
                                    keyExtractor={ item => item.key }
                                    data={ drawerDataList }
                                    renderItem={ this.handleDrawerData }
                                />
                            </View>
                            <View style={{
                                flex: 2,
                                backgroundColor: '#ffffff',
                            }}>
                                <TextInput
                                    placeholder={'Enter your notes here.'}
                                    placeholderTextColor={'lightgrey'}
                                    style={{ paddingLeft: 20 }}
                                    value={ this.state.addNoteText }
                                    onChangeText={ value => this.setState({ addNoteText: value }) }
                                    onFocus={() => this.setState({ isTextboxSelected: true }) }
                                    onBlur={() => this.setState({ isTextboxSelected: false }) }
                                />
                            </View>
                            <View style={{
                                flex: 2,
                                backgroundColor: 'darkblue',
                                justifyContent: 'center',
                            }}>
                                <TouchableOpacity
                                    onPress={ this.handleAddNote }
                                >
                                    <Text style={{
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        marginBottom: 80,
                                        fontSize: 16,
                                    }}>Add Note</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </Fragment>
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
        paddingRight: 25,
    },
    iconfont:{
        fontFamily: Fonts.Safeguard,
        color:'#fff',
        fontSize:25,
        marginLeft: 10,
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