
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

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      emailError: '',
      passwordError: '',
      loading: false,
      arr:[{name:'hazem'}]
    }
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#ffffff" />
    }
    return (
      <Text
        style={styles.bottonText}>
        Log in
      </Text>
    )
  }
  render() {
    const {arr} = this.state;
    return (
      <View style={styles.basicBackground}>

        <Image source={require('../icons/login3.jpg')} style={{ height: '20%', width: '100%', resizeMode: 'cover' }} />
        <View style={{ flex: .8 }}>
        <View style={styles.background}>
        <Text style={styles.textlogin}>Login</Text>

          <Text style={styles.text2}>Email</Text>
          <TextInput
            style={styles.inputText}
            underlineColorAndroid='#cccccc'
            placeholder="Enter Email"
            placeholderTextColor='#cccccc'
            // value={this.state.email}
            // onChangeText={(email) => this.setState({ email })}
            value={this.state.arr[0].name}
            onChangeText={(name) => {
              arr[0].name=name
              this.setState({ arr })
              alert(JSON.stringify(arr))
            }}
          />

          <Text style={styles.text2}>
            Password
          </Text>
          <TextInput
            style={styles.inputText}
            underlineColorAndroid='#cccccc'
            placeholder="Enter Password"
            secureTextEntry={true}
            placeholderTextColor='#cccccc'
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
           <TouchableOpacity style={{marginTop:50 }}onPress={() => {
              this.props.navigation.navigate('Menu')}}>
           <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#e6b800', '#ffcc00', '#997a00']}
                  style={styles.linearGradient}>
                  
                  {this.renderButton()}
                </LinearGradient>
              </TouchableOpacity>
              
            <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:-25,marginTop:50}}>
            <TouchableOpacity style={{ }}>
           <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#997a00', '#ffcc00', '#997a00']}
                  style={styles.linearGradient2}>
                  
                 <Text style={styles.bottonText1}>Sign up</Text>
                </LinearGradient>

              </TouchableOpacity>
              <TouchableOpacity>
           <LinearGradient
            
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#997a00', '#ffcc00', '#997a00']}
                  style={styles.linearGradient2}>
                  
                 <Text style={styles.bottonText}>Enter As Guest</Text>
                </LinearGradient>

              </TouchableOpacity>
              </View>
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
    height:'100%',
    width:'100%'
  },
  background: {
    backgroundColor: '#b38f00',
    height: '105%',
    width: '90%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: height * 0.05,
    paddingTop: height * 0.02,
    paddingLeft: width * 0.09,
  },
  
  header2: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign:'center',
    fontStyle:'italic',
    marginBottom:15
    
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
    marginLeft:-30
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
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
    marginTop:14,

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