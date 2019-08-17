import React, {Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Picker} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Fonts } from './src/utils/Fonts';

export default class Emergency extends Component {
    render(){
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
            <View style={{ height: 250, backgroundColor: 'rgba(220,20,20,.85)'}}>
                <Text style={styles.textWrapper}>Urgent Message</Text>
                <Picker
                    selectedValue={'emergency'}
                    style={styles.inputField}
                >
                    <Picker.Item label="Active Shooter" value="activeShooter" />
                    <Picker.Item label="Emergency" value="emergency" />
                    <Picker.Item label="Intruder" value="intruder" />
                </Picker>
                <Text style={styles.textWrapper}>Custom Message (Optional)</Text>
                <TextInput style={styles.inputField}/>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.submitBtn}>
                        <Text style={styles.submitText}>Send Message</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 50,
            }}>
                <Image source={require('./assets/watermark.png')} style={{width: 300, height: 80}} />
            </View>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(230, 230, 230)',
    },
    submitBtn: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        borderRadius: 5,
        backgroundColor: '#0d2a7a',
    },
    submitText: {
      color: '#ffffff',
        fontSize: 16,
    },
    inputField: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
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
        fontSize:23,
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
});