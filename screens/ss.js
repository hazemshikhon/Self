import React, { Component } from 'react';

// native ui elements provided by react-native api
import {
    Text,
    View,
    Image,
    ScrollView,
    Switch,
    StatusBar,
    Dimensions,
    Platform,
    Alert,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

// routing and anvigation between activity
import { Actions } from 'react-native-router-flux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import strings from '../Common/Localization';
import { AsyncStorage } from '../Common/Constants';
import { DismissKeyboardView } from '../Common/KeyboardDismssView'
const LANG = 'lang';

const { height } = Dimensions.get('window');

export default class Login extends Component {

    constructor(props) {
        super(props);
        // initializing deault data on the component state
        this.state = {
            loading: false,
            loginScene: true,
            confirm: false,
            err: {},
            isDoc: false,
            email: '',
            password: '',
            showErr: false
        }
    }

    componentWillUnmount() {
       clearTimeout( this.time)
    }

    resetPassword() {
        let { email, err } = this.state

        // render err if the email is empty
        if (!email) {
            err.email = strings.errEmail
            this.setState({ err })
        } else {
            // send password reset email
            firebase.auth().sendPasswordResetEmail(email).then(() => {
                this.setState({ confirm: true })
            }).catch(function (error) {
                // An error happened.
            });
        }
    }

    async patientLogin(uid) {
        try {
            let ref = await firebase.database().ref(`Patients/${uid}`).once('value');
            let user = ref.val();
            // there is profile
            if (user) {
                // store user
                await this._storeUser(user);
                // send him to home page
                if (this.props.regist) Actions.docRegister({ user })
                else Actions.reset('patient', { user })
            } else {
                // complete his user
                console.log('olo ysgl');
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    popUp(uid){
        Alert.alert(
            strings.popTV,
            strings.popBV2,
            [
                { text: strings.LogOut, onPress: async () => await this.onLogOut() },
                { text: strings.continue, onPress: async () => await this.patientLogin(uid), },
            ]
        )
    }

    verificationPopUp(args) {
        Alert.alert(
            args.title,
            args.subtitle,
            [
                { text: args.okText, onPress: () => args.okCallback },
            ]
        )
    }


    verifyEmail() {
        let user = firebase.auth().currentUser;
        console.log(user);
        user.sendEmailVerification().then(async (res) => {
                this.verificationPopUp({
                    title: strings.verTitle,
                    subtitle: strings.verSub,
                    okText: strings.verOk,
                    okCallback: await this.onLogOut(),
                })
            this.setState({ spinner: false });
        }).catch(e => {
            console.log(e);
            this.setState({ spinner: false });
        })
    }

    sendVerPopUp(uid){
        Alert.alert(
            strings.popTV,
            strings.verSub, 
            [
                { text: strings.LogOut, onPress: async () => await this.onLogOut(), },
                { text: strings.popV, onPress: async () => await this.verifyEmail(), },
                { text: strings.continue, onPress: async () => await this.patientLogin(uid), },
            ]
        )
    }

    popUpApproval(uid) {
        Alert.alert(
            strings.popTA,
            strings.popBA2,
            [
                { text: strings.LogOut, onPress: async () => await this.onLogOut(), },
                { text: strings.continue, onPress: async () => await this.patientLogin(uid), },
            ]
        )
    }

    async onLogOut() {
        try {
            await firebase.auth().signOut()
            Actions.reset('patient');
        } catch (e) {
            console.log('logout err:', e);
        }
    }

    async _onLogin() {
        try {
            this.setState({ loading: true })
            let { email, password, err, isDoc } = this.state;

            // show error if email or password is empty
            if (!email | !password) {
                console.log('cathedrrr', email, password);
                if (!email) {
                    err.email = strings.errEmail
                }
                if (!password) {
                    err.pass = strings.errPass
                }
                this.setState({ err, loading: false })
            } else {
                console.log(email, password);

                let response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(
                        email,
                        password
                    );
                // parse response
                const res = response.user.toJSON();
                console.log('login res: ', res);
                // if there is a user
                if (res.uid) {
                    const isVerified = res.emailVerified;
                    console.log(isVerified);
                    // if doctor
                    if (isDoc && isVerified) {
                        // retrive profile
                        let ref = await firebase.database().ref(`Doctors/${res.uid}`).once('value');
                        let profile = ref.val();
                        if (profile.Approved === true) {
                            await this._storeUser(profile);
                            // if user finished registration 
                            if (profile.step === 3) {
                                //send him to home
                                Actions.reset('doctor', { user: profile })
                            } else {
                                //send him to to complete registration
                                Actions.reset('docRegister', { user: profile });
                            }
                        } else {
                            this.popUpApproval(res.uid)
                        }
                    } else if (isDoc) {
                        this.sendVerPopUp(res.uid)
                    } else if(isVerified) {
                        await this.patientLogin(res.uid)
                    }else{
                        this.popUp(res.uid)
                    }
                }
            }
            // make activity indicator works
            // sign in
        } catch (e) {
            console.log(e.code);
            let err = this.state.err
            if (e.code == 'auth/invalid-email') {
                err.email = strings.errEmail
            } else if (e.code == 'auth/user-not-found') {
                err.email = strings.errNot
            } else if (e.code == 'auth/wrong-password') {
                err.pass = strings.errPass
            }
            this.setState({ err, loading: false })
        }
    }
    // storing user to async storage
    // consumes a user object

    header() {
        let { confirm, loginScene, user } = this.state
        if (!loginScene && confirm) {
            return (
                <View style={{ width: responsiveWidth(100), backgroundColor: '#e6f4f1', alignItems: 'center', justifyContent: 'center' }}>
                    {user !== null && <Text style={{ padding: 3, color: '#6c757f', fontFamily: 'ProximaNovaA-Regular' }} >
                        {strings.cinfirm}
                    </Text>}
                    <View style={{ paddingHorizontal: 20, width: responsiveWidth(60), alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Image resizeMethod='resize' source={require('./images/doctor2x.png')} style={{ tintColor: '#cccccc', width: responsiveWidth(11), height: responsiveHeight(9) }} />
                    </View>
                </View>
            )
        }
    }

    async _storeUser(user) {
        try {
            // stringfy user object
            const stringUser = JSON.stringify(user)
            // store it
            await AsyncStorage.setItem('user', stringUser);
        } catch (e) {
            console.log(e);
        }
    }

    showErr() {
        this.setState({ showErr: true, loading: false }, () => {
            this.time = setTimeout(() => this.setState({ showErr: false }), 5000)
        });
    }

    render() {
        return (
            <View style={{ height: height, backgroundColor: '#fbfbfd', flex: 1, paddingTop: Platform.OS == 'ios' ? 20 : 1, }}>
                <StatusBar backgroundColor='#fbfbfd' barStyle='dark-content' />
                {this.header()}
                {
                    (this.state.loading === true) ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                            {/* render the spinner  */}
                            <ActivityIndicator size='large' />
                            <Text>
                                {strings.spinner}
                            </Text>
                        </View>) :
                        <ScrollView style={{ height: height, alignContent: 'center', paddingHorizontal: 30, backgroundColor: '#fbfbfd' }}>

                            {/* header back button */}
                            <TouchableOpacity style={{ justifyContent: 'center', paddingVertical: 25 }} onPress={() => Actions.pop()}>
                                <MaterialIcons name={'arrow-back'} size={26} style={{ color: '#474f59' }} />
                            </TouchableOpacity>

                            {this.state.showErr == true && <View style={{ backgroundColor: 'red', width: 200, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>invalid inputs</Text>
                            </View>}

                            {this.state.loginScene && <View style={{ backgroundColor: '#FFFF', elevation: 1, borderRadius: 5, padding: 30 }}>
                                <Text style={{ color: '#464646', fontSize: responsiveFontSize(2.5), fontFamily: 'ProximaNovaA-Regular', lineHeight: responsiveHeight(3.5) }}>{strings.log}</Text>
                                <View style={{ margin: 10, height: responsiveHeight(63), justifyContent: 'space-between' }}>
                                    <DismissKeyboardView>
                                        <Input
                                            placeholder={strings.em}
                                            value={this.state.email}
                                            multiline
                                            errorStyle={{ color: 'red', fontSize: 11 }}
                                            errorMessage={this.state.err.email}
                                            inputStyle={{ fontSize: 13 }}
                                            keyboardType={'email-address'}
                                            returnKeyType={'go'}
                                            onChangeText={(email) => this.setState({ email, err: {} })} shake={true}
                                        />
                                    </DismissKeyboardView>

                                    <DismissKeyboardView>
                                        <Input
                                            inputStyle={{ fontSize: 13, textAlign: strings.getLanguage() === 'ar' ? 'right' : 'left' }}
                                            placeholder={strings.pass}
                                            onChangeText={(password) => this.setState({ password, err: {} })}
                                            multiline
                                            errorStyle={{ color: 'red', fontSize: 11 }}
                                            errorMessage={this.state.err.pass}
                                            autoCapitalize='none'
                                            secureTextEntry shake={true}
                                        />
                                    </DismissKeyboardView>

                                    <TouchableOpacity onPress={() => this.setState({ loginScene: false })}>
                                        <Text style={{ color: '#00bbd9', fontSize: responsiveFontSize(1.5), fontFamily: 'ProximaNovaA-Regular', lineHeight: responsiveHeight(3) }}>{strings.fpas} </Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text> {strings.rud} </Text>
                                        <Text> {this.state.isDoc ? strings.y : strings.n} </Text>
                                        <Switch value={this.state.isDoc} onValueChange={(isDoc) => this.setState({ isDoc })} />
                                    </View>
                                    {/* <TouchableOpacity onPress={() => this._onLogin()}>
                                        <Text style={{ textAlign: 'center', color: '#00bbd9', fontSize: responsiveFontSize(2.2), fontFamily: 'ProximaNovaA-Regular', lineHeight: responsiveHeight(3) }}> {strings.log} </Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#00bbd9', borderRadius: 7, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginRight: 15 }}
                                        onPress={() => { this._onLogin(); }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white' }}>{strings.log} </Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/* <View style={{alignItems:'center'}}>
                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center', elevation: 1,borderRadius:3, backgroundColor:'#4267b2', width: 190, margin: 5, height: 32, justifyContent:'center' }} onPress={()=>this.fbLogin()}>
                                            <Text style={{ color: '#FFF' }}><Foundation style={{ color: '#FFF' }} name={'social-facebook'} size={20} /> {strings.fb}  </Text>
                                        
                                    </TouchableOpacity>

                                    <GoogleSigninButton onPress={() => this._gLogin()}
                                        style={{ width: 200,margin:5, height: 36 }}
                                        size={GoogleSigninButton.Size.Standard}
                                        color={GoogleSigninButton.Color.Light}
                                    />
                                </View> */}
                                    {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 6, flexDirection: 'row', borderRadius: 35, backgroundColor: '#f3f3f3', margin: 5 }} onPress={() => this._gLogin()}>
                                    <Image resizeMethod='resize'  style={{width:responsiveWidth(6),height:responsiveHeight(4),margin:7}} source={require('./images/google.png')}/>
                                    <Text style={{ color: '#000000', fontSize: responsiveFontSize(2.4),   fontFamily:'ProximaNovaA-Regular'}}>{strings.go}</Text>
                                </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => Actions.patRegister()}>
                                        <Text style={{ textAlign: 'center', color: '#00bbd9', fontSize: responsiveFontSize(1.8), fontFamily: 'ProximaNovaA-Regular', lineHeight: 20 }}>{strings.noacc}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                            {!this.state.loginScene && <View style={{ backgroundColor: '#FFFF', elevation: 1, borderRadius: 5, padding: 30 }}>
                                <Text style={{ color: '#464646', fontSize: responsiveFontSize(2.5), fontFamily: 'ProximaNovaA-Regular', lineHeight: responsiveHeight(3.5) }}>{strings.rest}</Text>
                                <Input placeholder={strings.em} value={this.state.email}
                                    errorStyle={{ color: 'red', fontSize: 11 }} errorMessage={this.state.err.email}
                                    inputStyle={{ fontSize: 13 }}
                                    keyboardType={'email-address'}
                                    returnKeyType={'go'}
                                    onChangeText={(email) => this.setState({ email, err: {} })}
                                />

                                <TouchableOpacity onPress={() => this.resetPassword()}>
                                    <Text style={{ textAlign: 'center', color: '#00bbd9', fontSize: responsiveFontSize(2.2), fontFamily: 'ProximaNovaA-Regular', lineHeight: responsiveHeight(3) }}> {strings.send} </Text>
                                </TouchableOpacity>
                            </View>}
                        </ScrollView>
                }
            </View>
        );
    }

}