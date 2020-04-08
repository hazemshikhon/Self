
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
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get('window')
import { SocialIcon } from 'react-native-elements';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email:'',
      password:'',
      Username:'',
      confirmPassword:'',
      loading:true
      
    }
  }

  async componentDidMount() {
    const firebaseUser = firebase.auth().currentUser;
    if (firebaseUser) {
      
      let user = await AsyncStorage.getItem('user');
      if (user) {
        console.log('yes');
        
        user = await JSON.parse(user);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Menu', params: { user } })],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        console.log('no');
        
      }
    }
    this.setState({ loading: false })

  }

  registerPressed = async () => {
    if (this.state.Username == '' ) {
      this.setState({
        error: 'please enter your Username',
      })
    }
    else
    if (this.state.email == '' ) {
      this.setState({
        error: 'please enter your email',
      })
    }
    else
    if (this.state.password == '' || this.state.confirmPassword == '') {
      this.setState({
        error: 'please enter your password',
      })
    }
    else
    if (this.state.password != '' && this.state.confirmPassword != '') {
    if (this.state.password === this.state.confirmPassword) {

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onSigninSuccess.bind(this))
    }
    else {
      this.setState({
        error: 'password and confirm password must be idenical',
      })
    }
  }
}
  onSigninSuccess() {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).set({
      email:this.state.email,
      Username:this.state.Username
    }
    )
    const email = this.state.email;
    const Username = this.state.Username;

    let user = {email , Username};
    AsyncStorage.setItem('user',JSON.stringify(user))
    console.log(user);
    

    this.props.navigation.navigate('Menu')
  
    
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#ffffff" />
    }
    return (
      <Text
        style={styles.bottonText}>
        Create Account
      </Text>
    )
  }
  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#ffffff" />
    }
    return (
      <View style={styles.basicBackground}>

        <Image source={require('../icons/signup.jpg')} style={styles.frontImage} />
        <View style={{ flex: .8 }}>
          <View style={styles.background}>
            <Text style={styles.textSignup}>Sign Up</Text>

            <TextInput
              style={styles.inputText}
              placeholder="                               Email"
              placeholderTextColor='#cccccc'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
            />
            <TextInput
              style={styles.inputText}
              placeholder="                           Username"
              placeholderTextColor='#cccccc'
              value={this.state.Username}
              onChangeText={(Username) => this.setState({ Username })}
            />
            <TextInput
              style={styles.inputText}
              placeholder="                            Password"
              secureTextEntry={true}
              placeholderTextColor='#cccccc'
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
            />
            <TextInput
              style={styles.inputText}
              placeholder="                      Confirm Password"
              secureTextEntry={true}
              placeholderTextColor='#cccccc'
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            />
            <Text>{this.state.error}</Text>
            <TouchableOpacity style={{ marginTop: 15 }}
              onPress={this.registerPressed.bind()}>
              <LinearGradient

                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#e6b800', '#ffcc00', '#997a00']}
                style={styles.linearGradient}>

                {this.renderButton()}
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
  frontImage: {
    height: '20%',
    width: '100%',
    resizeMode: 'cover',
  },
  background: {
    backgroundColor: '#b38f00',
    height: '115%',
    width: '90%',
    borderRadius: 30,
    marginTop: height * 0.03,
    paddingLeft: width * 0.07,
    marginHorizontal: 20,
    justifyContent: 'space-around'
  },

  textSignup: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 97
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: width * 0.75,
    height: height * 0.055,
  },

  inputText: {
    color: '#000000',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'normal',
    width: width * 0.75,
    height: height * 0.065,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2
  },
  bottonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});