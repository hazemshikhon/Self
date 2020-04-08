
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
import Entypo from "react-native-vector-icons/FontAwesome";
import LoadingIndicator from '../component/LoadingIndicator';
import firebase from 'react-native-firebase'
//import { Icon } from 'react-native-elements'
import moment from 'moment';
import { Button, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import NumericInput from 'react-native-numeric-input'
const { height, width } = Dimensions.get('screen')
export default class Cart extends Component {
  constructor() {
    super()
    this.state = {
      value: 1,
      size: '',
      isChecked6: false,
      y: [],
      doneFetching: false,
      value: 0,




    }

  }

  componentDidMount() {
    //Here is the Trick
    const { navigation } = this.props;

    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
      {
        this.getData();


      }

    });

  }
  // componentWillUnmount() {
  //   // Remove the event listener before removing the screen from the stack

  // }
  
  // getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('alldata')
  //     if (value !== null) {
  //       this.setState({ value: 1 })
  //       const x = JSON.parse(value)

  //       this.setState({ data: x })

  //       AsyncStorage.removeItem('alldata')
  //       AsyncStorage.setItem('alldata', JSON.stringify(this.state.data))
        
  //     }


  //   } catch (e) {
  //     alert('eeroe')
  //   }
  // }
  getData = async () => {
    try {
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/cart`).once('value', snap => 
      {
        
        const val = snap.val();
        this.setState({ value: 1 })
        const cart = Object.values(val)
        console.log('cart', cart);
        this.setState({data:val})
        console.log("done");
        console.log(this.state.data);
        
        
        this.setState({doneFetching: true})
      })
    } catch (e) {
      alert('error')
    }


  }

  hazem = () =>{
    const current  = moment().unix()

    const {data}=this.state;
    for(var i in data){
      
      firebase.database().ref(`orders/${current}`).push(
                         
        data[i]
        
       
     ).then(() => {
       console.log('INSERTED !')
     }
     ).catch(error =>{
       console.log(error)
       
       })
    }
  }
  getTotal = async () => {
    try {
      const value = await AsyncStorage.getItem('key')
      if (value !== null) {
        const x = JSON.parse(value)
        for (var i in this.state.data) {
          if (this.state.data[i].id == x) {
            let y = this.state.data[i]

            this.state.data2.push(y)

            break;


          }

        }

      }
    } catch (e) {
      alert('error')
    }
    this.setState({ try: this.state.data2 })
    this.focusListener.remove();

  }

  render() {
    const { data } = this.state;
    if (!this.state.doneFetching)
      return (<LoadingIndicator size="large" />);

    if (this.state.value == 1) {
      return (
        <View style={styles.basicBackground}>
          <Image source={require('../icons/cart10.jpg')} style={styles.frontImage} />

          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            keyExtractor={this._keyExtractor1}
            style={{ flex: .5, width: '100%', backgroundColor: 'white' }}
            renderItem={
              ({ item, index }) =>
                <View>
                  <TouchableOpacity disabled={false} onPress={() => {
                    AsyncStorage.removeItem('alldata')
                  }} style={{ elevation: 5, backgroundColor: '#cccccc', width: width, height: width * .27 }}>
                    <View style={{ flexDirection: 'row',flex:3.5 }}>
                      <Image resizeMode='stretch' style={{
                        height: height * .09, width: width * .21,
                        resizeMode: 'stretch', marginVertical: 17, marginLeft: 10, elevation: 5,flex:.75
                      }}
                        source={{ uri: item.photo }} />
                      <View style={{flex:2.55}}>
                        <Text style={{ marginTop: 10, color: 'black', fontSize: 18, fontWeight: 'bold', marginLeft: 70 }}>{item.name}</Text>
                        <View style={{ flexDirection: "row", marginLeft: 50, marginTop: 25 }}>
                          <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Total : {item.price}EGP</Text>
                          <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>{JSON.stringify(item.extra)}</Text>




                        </View>

                      </View>
                      <TouchableOpacity style={{flex:.2}} onPress={() => {
                        data.splice(index,1);
                        this.setState({data});
                       
                        AsyncStorage.setItem('alldata',JSON.stringify(data))
                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update(
                          {
                            cart:data,
                          }
                        )
                        
                      }}>
                        <Icon name={'close'} />

                      </TouchableOpacity>

                    </View>

                  </TouchableOpacity>
                 

                </View>

            }
          >
          </FlatList>
          <TouchableOpacity
                    onPress={() => {
                    
                      
                      firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update(
                        {
                          orders:data,
                        }
                      )
                       
                    }}
                    style={{
                      backgroundColor: '#ffdb4d',marginBottom:2,marginTop:5,
                      paddingVertical: 5, paddingHorizontal: 1, borderRadius: 15,
                      alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
                      borderWidth: 1, borderColor: 'white', width: width * .6, elevation: 5
                    }}>

                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Order</Text>

                  </TouchableOpacity>
        </View>
      );
    }
    return (
      <Text
        style={{
          fontSize: 16
        }}
      >
        ليس لديك شئ ب السله الان
            </Text>
    );

  };
}

const styles = StyleSheet.create({
  basicBackground: {
    flex: 1,
    backgroundColor: '#cccccc',
    height: '100%',
    width: '100%',

  },
  frontImage: {
    width: '100%',
    resizeMode: 'cover',
    flex: .3
  },
});