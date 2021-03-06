
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
import LoadingIndicator from '../component/LoadingIndicator';

import { Button } from 'native-base';

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
      offers: [],
      doneFetching: false,
    }

  }

  async componentDidMount() {
    firebase.database().ref(`orders/`).once('value', snap => {

      const val = snap.val();
      console.log('val', val);

      const offers = Object.values(val)
      console.log('meals', offers);
      const keys = Object.keys(offers)
      //console.log('plz', keys)
      this.setState({keys})
      alert(this.state.keys)
      this.setState({ offers });
      this.setState({ doneFetching: true })


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

  storeData = (y) => {
    let { total, data } = this.state;
    let x = [];


    AsyncStorage.getItem('alldata').then((alldata) => {
      if (alldata == null || alldata == '') {
        x.push(y)
        AsyncStorage.setItem('alldata', JSON.stringify(x))
        console.log('if empty', x)
      }
      else {

        x = JSON.parse(alldata)
        {
          if (this.searchItems(y.name, x)) {
            alert("This Product Already In Cart")
          }
          else {
            x.push(y)
            AsyncStorage.setItem('alldata', JSON.stringify(x))
            console.log(x)
          }
        }
      }

    })

  }
  searchItems(x, y) {
    for (var i in y) {
      if (y[i].name == x) {
        return true
        break; //Stop this loop, we found it!
      }
    }
  }
  render() {

    if (!this.state.doneFetching)
      return (<LoadingIndicator size="large" />);

    return (
      <View style={styles.basicBackground}>

        <Image source={require('../icons/offers.jpg')} style={styles.frontImage} />


        <FlatList
          data={this.state.offers}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          keyExtractor={this._keyExtractor1}
          extraData={this.state}
          style={{ flex: .5, width: '100%', backgroundColor: 'white' }}
          renderItem={
            ({ item, index }) =>
              <View>
                <TouchableOpacity onPress={() => {
                }}
                  style={{ elevation: 5, backgroundColor: '#e6b800', width: width, marginBottom: 4.5, borderRadius: 20, width: width * .98, marginTop: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={{
                      height: height * .09, width: width * .21,
                      resizeMode: 'stretch', marginVertical: 10, marginLeft: 10
                    }}
                      source={{ uri: item.photo }} />
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