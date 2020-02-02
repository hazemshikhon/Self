
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
  TouchableHighlight
} from 'react-native';
import { Button } from 'native-base';
import CheckBox from 'react-native-check-box'
import Entypo from "react-native-vector-icons/FontAwesome";

import Iconic from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import NumericInput from 'react-native-numeric-input'
const { height, width } = Dimensions.get('screen')
export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      value: 1,
      size: '',
      isChecked6: false,
      data: [
        { id: '0', name: 'Pizza Margrita', price: 10, photo: require('../icons/menu11.png'), quantity: 1, ex: [],total:0 },
        { id: '1', name: 'Pizza Mix Meat', price: 20, photo: require('../icons/menu12.png'), quantity: 1, ex: [],total:0 },
        { id: '2', name: 'Pizza Chicken', price: 15, photo: require('../icons/menu13.png'), quantity: 1, ex: [],total:0 },
        { id: '3', name: 'Pizza Red Cheese', price: 25, photo: require('../icons/menu14.png'), quantity: 1, ex: [],total:0 },
        { id: '4', name: 'Pizza Mix Cheese', price: 5, photo: require('../icons/menu15.png'), quantity: 1, ex: [],total:0 },
        { id: '5', name: 'Pizza Hotdog', price: 45, photo: require('../icons/menu17.png'), quantity: 1, ex: [] ,total:0},
        { id: '6', name: 'Pizza Gampry', price: 55, photo: require('../icons/menu15.png'), quantity: 1, ex: [] ,total:0},
      ],
      data2: [

      ]

    }

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


  componentDidMount() {
    this.setState({ total: this.props.navigation.state.params.price })


  }
  renderNumber() {
    const id = this.props.navigation.state.params.id;
    const {data}=this.state;
    return (

      this.state.isChecked6 ? (

        // <NumericInput
        //   value={data[id].quantity}
        //   onChange={value => {
        //    data[id].quantity=value
        //     this.setState({ data })
        //     this.setState({ total: this.state.total + this.props.navigation.state.params.price })
        //   }}
        //   totalWidth={80}
        //   totalHeight={32}
        //   iconSize={35}
        //   step={1}
        //   minValue={1}
        //   valueType='real'
        //   rounded={true}
        //   textColor='black'
        //   iconStyle={{ fontWeight: 'bold' }}
        //   editable={false}
        //   borderColor='#ffdb4d'
        //   inputStyle={{ fontWeight: 'bold' }}
        //   rightButtonBackgroundColor='#ffdb4d'
        //   leftButtonBackgroundColor='#ffdb4d' />
        <View style={{ flexDirection: "row" ,marginLeft:15,marginTop: 5 }}>

        <TouchableOpacity
            style={{width: 20, height: 20,borderRadius: 10,borderColor:'red',borderWidth:2,marginHorizontal: 15, alignItems: "center",justifyContent: "center",}}
            onPress={() => {
              data[id].quantity =data[id].quantity+1
              this.setState({data})
              //this.setState({total:this.state.total})
             }}
            >
            <Entypo name='plus'/>
          </TouchableOpacity>
          <Text style={{fontSize:17,textAlign:'center',fontWeight:'bold',marginTop:-3}}>{data[id].quantity}</Text>
          <TouchableOpacity
          disabled={
            data[id].quantity==1
          }
          onPress={() => {
            data[id].quantity =data[id].quantity-1
            this.setState({data})
           }}
            style={{width: 20, height: 20,borderRadius: 10,borderColor:'red',borderWidth:2,marginHorizontal: 15, alignItems: "center",justifyContent: "center",}}>
            <Entypo name='minus'/>
          </TouchableOpacity>
         
        </View>
      ) : null
    )
  }
  // storeData = async (x) => {
  //   try {
  //     await AsyncStorage.setItem('data', JSON.stringify(x))


  //     console.log('x', x)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // mergeData = async (y) => {
  //   try {
  //     const value = await AsyncStorage.getItem('alldata')
  //     if (value !== null) {
  //       const x = JSON.parse(value)
  //       x.push(y)
  //       await AsyncStorage.setItem('alldata', JSON.stringify(x))
  //       console.log('with', x)

  //     }
  //     else {
  //       let x = [];
  //       x.push(y)
  //       await AsyncStorage.setItem('alldata', JSON.stringify(x))
  //       console.log('without', x)

  //     }

  //   } catch (e) {
  //     // saving error
  //   }
  // }

  searchItems(x, y) {
    for (var i in y) {
      if (y[i].name == x) {
        return true
        break; //Stop this loop, we found it!
      }
    }
  }
  storeData = (y) => {
    let { data } = this.state;
    let { total } = this.state;
    let x = [];
    const id = this.props.navigation.state.params.id;
    //this.setState({total:this.state.total*data[id].quantity});?  اشمعنا هنا لازم ادوس مرتين 
    this.state.total=this.state.total*data[id].quantity
    this.setState({total})
    console.log(this.state.total)
    //data[id] = { ...data[id], price: this.state.total }
    data[id].price=this.state.total
    this.setState({data})
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
          }
        }
      }
    })

  }


  render() {
    const x = this.props.navigation.state.params.id;
    let { data } = this.state;

    return (

      <View style={{ flex: 1, backgroundColor: '#e6b800', PaddingTop: 20 }}>
        <View style={{ marginTop: 20, width: width * .9, marginLeft: 25, height: width * .7 }}>
          <Image source={this.props.navigation.state.params.srs} style={styles.frontImage} />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 5, marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Pizza Contain cheese and many chicken and maybe spicy or not spicky dont know walahy Pizz Contain cheese and many chicken and maybe spicy or not spicky dont know walahy  </Text>

        </View>
        <View style={{ width: width * .9, borderWidth: 1, borderColor: 'black', marginLeft: 20, padding: 10, elevation: 1 }}>

          <CheckBox
            style={{ flex: 1, padding: 10, marginBottom: 15 }}
            onClick={() => {
              this.setState({
                isChecked1: !this.state.isChecked1,
              })
              if (!this.state.isChecked1) {

                this.setState({ total: this.state.total + 3 })
                this.setState({ id: this.props.navigation.state.params.id })
                //if (!data[x].ex.includes('Extra Cheadar Cheese')){data[x].ex.push('Extra Cheadar Cheese')}
                if (!data[x].ex.includes('Extra Cheadar Cheese')) {
                  data[x].ex.push('Extra Cheadar Cheese, ')
                  this.setState({ data })
                }
              }
              else {
                this.setState({ total: this.state.total - 3 })
                data[x].ex.splice(data[x].ex.indexOf('Extra Cheadar Cheese'), 1);
                this.setState({ data })
              }
            }}
            isChecked={this.state.isChecked1}
            rightText={"Extra Cheadar Cheese   +3EGP"}
            rightTextStyle={{ fontWeight: 'bold' }}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, marginBottom: 15 }}
            onClick={() => {
              this.setState({
                isChecked2: !this.state.isChecked2
              })
              if (!this.state.isChecked2) {
                this.setState({ total: this.state.total + 4.5 })

                this.setState({ id: this.props.navigation.state.params.id })
                if (!data[x].ex.includes('Extra Emmental Cheese')) {
                  data[x].ex.push('Extra Emmental Cheese ,')
                  this.setState({ data })
                }

              }
              else {
                this.setState({ total: this.state.total - 4.5 })
                data[x].ex.splice(data[x].ex.indexOf('Extra Emmental Cheese'), 1);
                this.setState({ data })
              }
            }}
            isChecked={this.state.isChecked2}
            rightText={"Extra Emmental Cheese   +4.5EGP"}
            rightTextStyle={{ fontWeight: 'bold' }}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, marginBottom: 15 }}
            onClick={() => {
              this.setState({
                isChecked3: !this.state.isChecked3
              })
              if (!this.state.isChecked3) {
                this.setState({ total: this.state.total + 5 })
                this.setState({ id: this.props.navigation.state.params.id })
                if (!data[x].ex.includes('Extra Lettuce')) {
                  data[x].ex.push('Extra Lettuce ,')
                  this.setState({ data })
                }

              }
              else {
                this.setState({ total: this.state.total - 5 })
                data[x].ex.splice(data[x].ex.indexOf('Extra Lettuce'), 1);
                this.setState({ data })
              }
            }}
            isChecked={this.state.isChecked3}
            rightText={"Extra Lettuce   +5EGP"}
            rightTextStyle={{ fontWeight: 'bold' }}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, marginBottom: 15 }}
            onClick={() => {
              this.setState({
                isChecked4: !this.state.isChecked4
              })
              if (!this.state.isChecked4) {
                this.setState({ total: this.state.total + 7 })
                this.setState({ id: this.props.navigation.state.params.id })
                // if (!data[x].ex.includes('Extra BBQ Sauce')){data[x].ex.push('Extra BBQ Sauce')}
                if (!data[x].ex.includes('Extra BBQ Sauce')) {
                  data[x].ex.push('Extra BBQ Sauce ,')
                  this.setState({ data })
                  console.log(data)
                }
                //this.setState({ extras: [...this.state.extras, 'Extra BBQ Sauce'] })

              }
              else {
                this.setState({ total: this.state.total - 7 })
                data[x].ex.splice(data[x].ex.indexOf('Extra BBQ Sauce'), 1);
                this.setState({ data })
              }
            }}
            isChecked={this.state.isChecked4}
            rightText={"Extra BBQ Sauce   +7EGP"}
            rightTextStyle={{ fontWeight: 'bold' }}
          />
          <CheckBox
            style={{ flex: 1, padding: 10 }}
            onClick={() => {
              this.setState({
                isChecked5: !this.state.isChecked5
              })
              if (!this.state.isChecked5) {
                this.setState({ total: this.state.total + 3 })
                this.setState({ id: this.props.navigation.state.params.id })
                if (!data[x].ex.includes('Extra Bun')) {
                  data[x].ex.push('Extra Bun ,')
                  this.setState({ data })
                  this.setState({m:'m'})
                }
              }
              else {
                this.setState({ total: this.state.total - 3 })
                data[x].ex.splice(data[x].ex.indexOf('Extra Bun'), 1);
                this.setState({ data })
              }
            }}
            isChecked={this.state.isChecked5}
            rightText={"Extra Bun   +3EGP"}
            rightTextStyle={{ fontWeight: 'bold' }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
            <CheckBox
              style={{ flex: 1, padding: 10 }}
              onClick={() => {
                this.setState({
                  isChecked6: !this.state.isChecked6
                })
                if (this.state.isChecked6) { this.setState({ total: this.state.total - (this.state.value * this.props.navigation.state.params.price) + this.props.navigation.state.params.price, value: 1 }) }
              }}
              isChecked={this.state.isChecked6}
              rightText={"More One"}
              rightTextStyle={{ fontWeight: 'bold' }}
            />
            {this.renderNumber()}
          </View>
          {/* <View style={{ borderWidth: 2, width: width * .4, marginHorizontal: 87, marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Price : {this.state.total}</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => {
                this.storeData(data[x]);
            }}
            style={{
              backgroundColor: '#ffdb4d', marginLeft: 45,marginBottom:20,
              paddingVertical: 5, paddingHorizontal: 1, borderRadius: 15,
              alignItems: 'center', justifyContent: 'center',
              borderWidth: 1, borderColor: 'white', width: '70%', elevation: 5
            }}>

            <Text style={{ color: 'black', fontWeight: 'bold' }}>Add to Cart</Text>

          </TouchableOpacity>
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
    width: '100%',

  },
  frontImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',


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