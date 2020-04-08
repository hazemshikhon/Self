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
import strings from '../component/Localization';
import LoadingIndicator from '../component/LoadingIndicator';

import firebase from 'react-native-firebase'
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
    this.setUpLang();
     firebase.database().ref(`meals`).once('value', snap => {
        const val = snap.val();
        const meals = Object.values(val)
        console.log('meals', meals);
        this.setState({ meals });
        this.setState({doneFetching: true})

    })

}

  async setUpLang() {
    try {
        let lang = await AsyncStorage.getItem('lang')
        lang = (lang == null) ? 'ar' : lang
        this.setLang(lang)
    } catch (e) {
        console.log(e);
    }
}

setLang(lang) {
    try {
        strings.setLanguage(lang);
        AsyncStorage.setItem('lang', lang)
        this.setState({ lang })
    } catch (e) {
        console.log(e);
    }
}
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
            ({ item ,index }) =>
              <View>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Single', { meals:this.state.meals[index] });
                }}
                  style={{ elevation: 5, backgroundColor: '#e6b800', width: width, marginBottom: 4.5, borderRadius: 20, width: width * .98, marginTop: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={{
                      height: height * .09, width: width * .21,
                      resizeMode: 'stretch', marginVertical: 10, marginLeft: 10
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
});