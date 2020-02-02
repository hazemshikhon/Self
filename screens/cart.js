
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



    }

  }

  componentDidMount() {
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
      { this.getData() 
      
      }
    });
  }
  // componentWillUnmount() {
  //   // Remove the event listener before removing the screen from the stack

  // }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('alldata')
      if (value !== null) {
        const x = JSON.parse(value)
       
        this.setState({ data: x })
        AsyncStorage.removeItem('alldata')
        AsyncStorage.setItem('alldata', JSON.stringify(this.state.data))
        console.log('cart', this.state.data)
        console.log('total', this.state.data)

      }
    } catch (e) {
      alert('eeroe')
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
    return (
      <View style={styles.basicBackground}>
        <Image source={require('../icons/cart10.jpg')} style={styles.frontImage} />

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          keyExtractor={this._keyExtractor1}
          style={{ flex: .5, width: '100%', backgroundColor: 'white' }}
          renderItem={
            ({ item ,index }) =>
              <View>
                <TouchableOpacity disabled ={true} onPress={() => {
                            AsyncStorage.removeItem('alldata')
                             }} style={{ elevation: 5, backgroundColor: '#fc9f03', width: width,height:width*.27}}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={{
                      height: height * .09, width: width * .21,
                      resizeMode: 'stretch', marginVertical: 17, marginLeft: 10, elevation: 5
                    }}
                      source={item.photo} />
                    <View style={{}}>
                      <Text style={{ marginTop: 5, color: '#f2f2f2', fontSize: 18, fontWeight: 'bold', marginLeft: 70 }}>{item.name}</Text>
                        <View style={{ flexDirection: "row" ,marginLeft:50,marginTop: 15 }}>
                        <Text style={{ color: '#f2f2f2', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Price : {item.price}</Text>

                        <TouchableOpacity
                            style={{width: 20, height: 20,borderRadius: 10,borderColor:'red',borderWidth:2,marginHorizontal: 15, alignItems: "center",justifyContent: "center",}}
                            onPress={() => {

                              let y = parseInt(item.id, 10);

                              let x =  data[index].quantity
                              data[index].quantity =data[index].quantity+1
                              data[index].price=data[index].price/x*data[index].quantity
                              this.setState({data})
                             }}
                            >
                            <Entypo name='plus'/>
                          </TouchableOpacity>
                          <Text style={{fontSize:17,textAlign:'center',fontWeight:'bold',marginTop:-3}}>{item.quantity}</Text>
                          <TouchableOpacity
                           disabled={
                            data[index].quantity==1
                          }
                          onPress={() => {
                            
                            let x =  data[index].quantity
                            data[index].quantity =data[index].quantity-1
                            
                            data[index].price=data[index].price/x*data[index].quantity
                            
                            this.setState({data})
                           }}
                            style={{width: 20, height: 20,borderRadius: 10,borderColor:'red',borderWidth:2,marginHorizontal: 15, alignItems: "center",justifyContent: "center",}}>
                            <Entypo name='minus'/>
                          </TouchableOpacity>
                         
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
    width: '100%',
    resizeMode: 'cover',
    flex: .3
  },
});