
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from 'native-base';
//import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'react-native-check-box'
import Iconic from 'react-native-vector-icons/FontAwesome';
import Single from './single'
import LoadingIndicator from '../component/LoadingIndicator';

import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import firebase from 'react-native-firebase'
import NumericInput from 'react-native-numeric-input'
const { height, width } = Dimensions.get('screen')
export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      value: 1,
      size: '',
      isChecked6: false,
      // data: [
      //   { id: '0', name: 'Pizza Margrita', price: 10, photo: require('../icons/menu11.png'), quantity: 1 },
      //   { id: '1', name: 'Pizza Mix Meat', price: 20, photo: require('../icons/menu12.png'), quantity: 1 },
      //   { id: '2', name: 'Pizza Chicken', price: 15, photo: require('../icons/menu13.png'), quantity: 1 },
      //   { id: '3', name: 'Pizza Red Cheese', price: 25, photo: require('../icons/menu14.png'), quantity: 1 },
      //   { id: '4', name: 'Pizza Mix Cheese', price: 5, photo: require('../icons/menu15.png'), quantity: 1 },
      //   { id: '5', name: 'Pizza Hotdog', price: 45, photo: require('../icons/menu17.png'), quantity: 1 },
      //   { id: '6', name: 'Pizza Gampry', price: 55, photo: require('../icons/menu15.png'), quantity: 1 },
      // ]
      meals:[],
      doneFetching: false,
    }

  }

  async componentDidMount() {
     firebase.database().ref(`meals`).once('value', snap => {
        console.log('snap', snap);

        const val = snap.val();
        console.log('val', val);

        const meals = Object.values(val)
        console.log('meals', meals);
        // this.setState({ packages, spinner: false, packagesObj: val });
        this.setState({ meals });
        this.setState({doneFetching: true})

    })

}
  renderSize(sizeType) {
    const { size } = this.state;
    return (
      <TouchableOpacity onPress={() => {
        this.setState({ size: sizeType })
      }} style={{ height: 20, width: 20, borderWidth: 1, borderColor: 'black', justifyContent: 'center', backgroundColor: size === sizeType ? "white" : '#e6b800' }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', justifyContent: 'center' }}>{sizeType}</Text>
      </TouchableOpacity>
    )
  }

  renderNumber(value) {
    return (

      this.state.isChecked6 ? (


        <NumericInput
          value={value}
          onChange={value => this.setState({ value })}
          totalWidth={80}
          totalHeight={32}
          iconSize={35}
          step={1}
          minValue={1}
          valueType='real'
          rounded={true}
          textColor='black'
          iconStyle={{ fontWeight: 'bold' }}
          editable={false}
          borderColor='#ffdb4d'
          inputStyle={{ fontWeight: 'bold' }}
          rightButtonBackgroundColor='#ffdb4d'
          leftButtonBackgroundColor='#ffdb4d' />
      ) : null
    )
  }
  // storeData = async (x) => {
  //   try {
  //     alert('x')
  //     await AsyncStorage.setItem('alldata', JSON.stringify(x))
  //     console.log(x)
  //   } catch (e) {
  //     // saving error
  //   }
  // }
  render() {
    if(!this.state.doneFetching)
    return (<LoadingIndicator size="large" />);


    return (
      <View style={styles.basicBackground}>

        <Image source={require('../icons/signup.jpg')} style={styles.frontImage} />


        <FlatList
          data={this.state.meals}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          keyExtractor={this._keyExtractor1}
          extraData={this.state}
          style={{ flex: .5, width: '100%', backgroundColor: 'white' }}
          renderItem={
            ({ item }) =>
              <View>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Single', { id: item.id, name: item.name, price: item.price, srs: item.photo, quantity: item.quantity });

                }}
                  style={{ elevation: 5, backgroundColor: '#e6b800', width: width, marginBottom: 4.5, borderRadius: 20, width: width * .98, marginTop: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={{
                      height: height * .09, width: width * .21,
                      resizeMode: 'stretch', marginVertical: 10, marginLeft: 10, elevation: 5
                    }}
                      source={{uri:item.photo}} />
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={{ color: '#f2f2f2', textAlign: 'right', fontSize: 22, fontWeight: 'bold', marginLeft: 40 }}>{item.name}</Text>
                      <View style={{ backgroundColor: 'green', width: width * .17, marginLeft: 40, marginTop: 5, borderRadius: 6 }}>
                        <Text style={{ color: '#f2f2f2', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Price : {item.price}</Text>
                      </View>
                    </View>
                  </View>

                </TouchableOpacity>

              </View>

          }
        >
        </FlatList>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  basicBackground: {
    flex: 1,
    backgroundColor: '#e6b800',
    height: '100%',
    width: '100%',

  },
  frontImage: {
    height: '20%',
    width: '100%',
    resizeMode: 'cover',
    flex: .2
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