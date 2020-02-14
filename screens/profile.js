
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ActivityIndicator,
    Image,
   
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get('window')
import { SocialIcon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import strings from '../component/Localization';
import RNRestart from 'react-native-restart';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
             modal: false,
            thingsToTranslate: {
                orders: 'Orders',
                about: 'About us',
                contact: 'Contact us',
                settings: 'Settings',
                logout: 'Log out',
                signup: 'Sign up',
                signin: 'Sign in',
                desc: {
                  orders: 'You can control your orders here.',
                  about: 'Who we are, what we\'re looking forward to and more.',
                  contact: 'Send feedback or report problems. We like to hear from you.',
                  settings: 'Adjust font size, currency and more.',
                  logout: 'Log out of your account.',
                  signin: 'Sign into your account',
                  signup: 'Create a new account',
                }
              }
        }
    }
    componentDidMount() {
        
        // AsyncStorage.getItem("language").then((value) => {
        //   if (value == '0') {
        //     this.setState({
        //       thingsToTranslate: {
        //         orders: 'Orders',
        //         addresses: 'addresses',
        //         switch: 'Switch to arabic',
        //         logout: 'Log out',
        //       }
        //     });
        //   } else {
        //       this.setState({
        //         thingsToTranslate: {
        //         orders: 'المشتريات',
        //         switch:'تحويل الي الانجليزيه',
        //         addresses:'عنواين',
        //         logout: 'تسجيل الخروج' ,
        //       }
        //       });
        //   }
        // })
            this.setUpLang();
        
    }
    async setUpLang() {
        try {
            let lang = await AsyncStorage.getItem('lang')
            lang = (lang == null || lang == undefined) ? 'ar' : lang
            this.setLang(lang)
        } catch (e) {
            console.log(e);
        }
    }

    setLang(lang) {
        try {
            if (!lang) {
                lang = (lang == null || lang == undefined) ? 'ar' : lang
            }
            strings.setLanguage(lang);
            AsyncStorage.setItem('lang', lang)
            this.setState({ lang })
        } catch (e) {
            console.log(e);
        }
    }
    
    openModal() {
        this.setState({ visible: true });
      }
    
      closeModal() {
        this.setState({ visible: false });
      }
    render() {
        return (
            <View style={styles.basicBackground}>

                <View style={{ flex: .8 }}>
                    <View style={styles.background}>
                        <View style={{ alignItems: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Image
                                source={require('../assets/icons/images.jpg')}
                                style={{ width: 90, height: 90, borderRadius: 25, borderColor: 'black', borderWidth: 2 }} />
                        </View>
                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            this.props.navigation.navigate('Orders')
                        }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#e6b800', '#ffcc00', '#997a00']}
                                style={styles.linearGradient}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 15 }}>{strings.orders}</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            this.props.navigation.navigate('Menu')
                        }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#e6b800', '#ffcc00', '#997a00']}
                                style={styles.linearGradient}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 15 }}>{strings.addresses}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            this.props.navigation.navigate('Menu')
                        }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#e6b800', '#ffcc00', '#997a00']}
                                style={styles.linearGradient}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 15 }}>{strings.edit}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            //  AsyncStorage.getItem("language").then((value) => {
                            //     if (value == '0') {AsyncStorage.setItem("language",'1')}
                            //     else{
                            //         AsyncStorage.setItem("language",'0')
                            //     }
                            // })
                                
                            this.setLang('ar');
                            RNRestart.Restart();

                        }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#e6b800', '#ffcc00', '#997a00']}
                                style={styles.linearGradient}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 15 }}>{this.state.thingsToTranslate.switch}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            this.setState({ visible: true })}

                        }>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#e6b800', '#ffcc00', '#997a00']}
                                style={styles.linearGradient}>
                                    <Text style={{fontWeight:'bold',fontSize:24,marginLeft:15}}>{strings.logout}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        );
    };
}
const styles = StyleSheet.create({
    basicBackground: {
        flex: 1,
        backgroundColor: '#e6b800',
        height: '100%',
        width: '100%'
    },
    background: {
        backgroundColor: '#b38f00',
        height: height*.8,
        width: width*.9,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        marginTop: height * 0.05,
    },

    header2: {
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 15

    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    textlogin: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: -30
    },
    text2: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height * 0.02,
    },
    linearGradient: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopRightRadius: 15,
        width: width * 0.75,
        height: height * 0.055,
    },
    linearGradient2: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: width * 0.35,
        height: height * 0.055,
        marginHorizontal: width * 0.2,
        marginTop: 14,

    },
    social: {

        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.13,
        width: width * 0.5,
    },
    inputText: {
        color: '#000000',
        fontSize: 17,
        textAlign: 'left',
        fontWeight: 'normal',
        width: width * 0.75,
        height: height * 0.065,
    },
    bottonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottonText1: {
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',
    },
});