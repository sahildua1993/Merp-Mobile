import React, {Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/Ionicons";
import { Fonts } from './src/utils/Fonts';

export default class Emergency extends Component {
    state = {
        selectedValue: '',
    };

    handlePickerChange = selectedValue => this.setState({ selectedValue });

    render(){
        const { defaultValue } = this.props;
        const { selectedValue } = this.state;
        return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.text}>
                    <View style={styles.logoimg}>
                        <TouchableOpacity
                            underlayColor='#fff'
                            style={{flexWrap: 'wrap',
                                flexDirection:'row',
                            }}
                            onPress={() => this.props.navigation.navigate('Home')}
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
            <View style={styles.pickerContainerHeight}>
                <Text style={styles.textWrapper}>Urgent Message</Text>
                <RNPickerSelect
                    placeholder={{}}
                    style={pickerSelectStyles}
                    value={selectedValue || defaultValue}
                    onValueChange={ value => this.handlePickerChange(value) }
                    items={[
                        { label: 'Active Shooter', value: 'activeShooter' },
                        { label: 'Emergency', value: 'emergency' },
                        { label: 'Intruder', value: 'intruder' },
                    ]}
                    Icon={() => {
                        return <Icon
                            name="md-play"
                            size={16}
                            color="black"
                            style={{ position: 'absolute', right: 35, top: 10, zIndex: 1, transform: [{ rotate: '90deg'}] }}
                        />;
                    }}
                />
                <Text style={styles.textWrapper}>Custom Message (Optional)</Text>
                <TextInput style={styles.inputField}/>
                <TouchableOpacity style={{
                    height: 50,
                    marginTop: 30,
                    width: 150,
                    alignSelf: 'center'
                }}>
                    <View style={styles.submitBtn}>
                        <Text style={styles.submitText}>Send Message</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1,
                zIndex: -1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <Image source={require('./assets/perp_logo_grey.png')} style={{marginLeft: 13, width: 150, height: 150}} />
            </View>

        </View>
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#ffffff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0.5,
        backgroundColor: '#ffffff',
        height: 40,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(230, 230, 230)',
    },
    submitBtn: {
        borderRadius: 5,
        backgroundColor: '#0d2a7a',
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    submitText: {
      color: '#ffffff',
      fontSize: 16,
    },
    inputField: {
        fontSize: 16,
        paddingLeft: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#ffffff',
        height: 40
    },
    textWrapper: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
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
    iconfont:{
        fontFamily: Fonts.Safeguard,
        color:'#fff',
        fontSize:25,
        marginLeft: 10,
    },
    header: {
        height: Platform.OS === 'ios' ? 75 : 56,
        ...Platform.select({
            ios: { backgroundColor: '#031537', paddingTop: 24},
            android: { backgroundColor: '#031537'}
        }),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    pickerContainerHeight: {
        height: 300,
        backgroundColor: 'rgba(220,20,20,.85)',
    }
});