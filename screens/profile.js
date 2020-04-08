
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
import { SocialIcon, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import strings from '../component/Localization';
import RNRestart from 'react-native-restart';
import { StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase'

import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            images:[],
             modal: false,
             loading:true,
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
        firebase.database().ref(`meals`).once('value', snap => {
            console.log('snap', snap);
    
            const val = snap.val();
            console.log('val', val);
    
            const meals = Object.values(val)
            console.log('meals', meals);
            this.setState({ meals });
            this.setState({doneFetching: true})
    
        })
        
            this.setUpLang();
        
    }
    async uploadImage(uri) {
        try {
            if (uri) {                
                // upload the image to the storage under folder called Uploads with the timestamp of upload
                const imageRef = firebase.storage().ref(`Uploads/${Date.now()}.jpg`)
                await imageRef.putFile(uri, { contentType: 'application/octet-stream' })
                
                // get the download url of the image 
                let url = await imageRef.getDownloadURL()

                this.setState({url})

               
                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update(
      { avatar:url}
                  )
               console.log(firebase.auth().currentUser.uid);
               
               this.setState({
                loading: false,
              })
                // send the url to the other person at the chat
                
                
            }
        } catch (e) {
            console.log(e);
        }
    }

    selectImage() {
        // try {
        let { images } = this.state;

        // the options for picking the image  
        const options = {
            quality: 0.5,
            // maxWidth: 500,
            // maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        // get the image from gallery
        ImagePicker.launchImageLibrary(options, (response) => {

            let imagePath;

            if (Platform.OS === "android") imagePath = response.path;
            else imagePath = response.uri;

            console.log('response', response);
            if (!response.didCancel){
                images.push({
                    path: imagePath,
                    data: response.data,
                    type: response.type
                })
                this.setState({ images });
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({response :response.data})
            } 
             this.uploadImage(response.path);
        });
        // } catch (e) {
        //     console.log(e);
        // }
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
         
        const {images} = this.state
        return (
            <View style={styles.basicBackground}>

                <View style={{ flex: .8 }}>
                    <View style={styles.background}>
                        <View style={{ alignItems: 'center', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity
                             onPress={() => this.selectImage()}>
                            <Image
                                source={require('../assets/icons/images.jpg')}
                               // source ={{uri:this.state.url}}
                                style={{ width: 90, height: 90, borderRadius: 25, borderColor: 'black', borderWidth: 2 }} />
                                </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            this.props.navigation.navigate('Maps')
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
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Menu'})],
                                // actions: [NavigationActions.navigate({ routeName: 'Drawer', params: { user } })],
                              });
                              this.props.navigation.dispatch(resetAction);
                            //RNRestart.Restart();

                        }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#e6b800', '#ffcc00', '#997a00']}
                                style={styles.linearGradient}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 15 }}>{strings.lang}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                            //  const resetAction = StackActions.reset({
                            //     index: 0,
                            //     actions: [NavigationActions.navigate({ routeName: 'Menu'})],
                            //     // actions: [NavigationActions.navigate({ routeName: 'Drawer', params: { user } })],
                            //   });
                            //   this.props.navigation.dispatch(resetAction);
                            // this.setLang('en') 
                           firebase.auth().signOut();
                           const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Login'})],
                          });
                          this.props.navigation.dispatch(resetAction);
                        }}

                        >
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