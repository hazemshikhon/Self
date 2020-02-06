
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
import LoadingIndicator from '../component/LoadingIndicator';
import firebase from 'react-native-firebase'

import Iconic from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import NumericInput from 'react-native-numeric-input'
const { height, width } = Dimensions.get('screen')
export default class Single extends Component {
  constructor() {
    super()
    this.state = {
      value: 1,
      size: '',
      isChecked6: false,
      extra: [],
      data:[],
      doneFetching: false,
      ex:[]

    }

  }

  renderNumber() {
    const {data}=this.state;
    const id =  this.props.navigation.state.params.meals.id;
    return (
      <View style={{ flexDirection: "row"}}>

      <TouchableOpacity
          style={{width: 35, height: 35,borderRadius: 25,borderColor:'black',borderWidth:2,marginHorizontal: 15, alignItems: "center",justifyContent: "center",}}
          onPress={() => {
            data.quantity =data.quantity+1
            this.setState({data})
            //this.setState({total:this.state.total})
           }}
          >
          <Entypo name='plus' size={18}/>
        </TouchableOpacity>
        <Text style={{fontSize:22,textAlign:'center',fontWeight:'bold',marginLeft:30,marginRight:30}}>{data.quantity}</Text>
        <TouchableOpacity
        disabled={
          data.quantity==1
        }
        onPress={() => {
          data.quantity =data.quantity-1
          this.setState({data})
         }}
          style={{width: 35, height: 35,borderRadius: 25,borderColor:'black',borderWidth:2,marginHorizontal: 15, alignItems: "center",justifyContent: "center",}}>
          <Entypo name='minus' size={18}/>
        </TouchableOpacity>
       
      </View>
   
  )
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
    let { total,data } = this.state;
    let x = [];
   
    total = total * this.state.data.quantity
    this.setState({ total })
    this.state.data.price=total;
    console.log(total)
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

  async componentDidMount() {
    firebase.database().ref(`exrta`).once('value', snap => {
      console.log('snap', snap);

      const val = snap.val();
      console.log('val', val);
      const extra = Object.values(val)
      console.log('extra', extra);
      
      // this.setState({ packages, spinner: false, packagesObj: val });
      this.setState({ extra });

      this.setState({data:this.props.navigation.state.params.meals})
      console.log(this.state.data.quantity)
      this.setState({ total: this.props.navigation.state.params.meals.price })

      this.setState({doneFetching: true})

    })

  }

  checkThisBox = (itemID) => {
    let extra = this.state.extra
    console.log('bef', extra[itemID])
    extra[itemID].checked = !extra[itemID].checked
    console.log('aft', extra[itemID])
    this.setState({ extra: extra })
  }
  render() {

  if(!this.state.doneFetching)
    return (<LoadingIndicator size="large" />);
    return (

      <View style={{ flex: 1, backgroundColor: '#e6b800', PaddingTop: 20 }}>
        <View style={{ marginTop: 20, width: width * .9, marginLeft: 25, height: width * .7 }}>
          <Image source={{ uri: this.props.navigation.state.params.meals.photo }} style={styles.frontImage} />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 5, marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 7 }}>{this.props.navigation.state.params.meals.name}</Text>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{this.state.data.desc}</Text>

        </View>
        <View style={{ width: width * .9, borderWidth: 1, borderColor: 'black', marginLeft: 20, padding: 10, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10 ,fontFamily:'wds052801'}}>Extras : </Text>
          <FlatList
            data={this.state.extra}
            extraData={this.state}
            renderItem={
              ({ item }) =>
                <View>
                  <CheckBox
                    onClick={() => {
                      this.checkThisBox(item.id);
                      if (this.state.extra[item.id].checked) {
                        this.setState({ total: this.state.total + item.price })
                        
                       
                      }
                      else {
                        this.setState({ total: this.state.total - item.price })
                      }
                    }}
                    style={{ paddingBottom: 5 }}
                    isChecked={this.state.extra[item.id].checked}
                    rightText={item.name + '  +' + item.price + 'EGP'}
                    rightTextStyle={{ fontWeight: 'bold' }}
                  />
                </View>
            }
          />
          <View style={{flexDirection:'row',marginTop:18,justifyContent:'center'}}>
            {this.renderNumber()}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.storeData(this.state.data);
          }}
          style={{
            backgroundColor: '#ffdb4d', marginTop: 20,
            paddingVertical: 5, paddingHorizontal: 1, borderRadius: 15,
            alignItems: 'center', justifyContent: 'center',alignContent:'center',alignSelf:'center',
            borderWidth: 1, borderColor: 'white', width: width*.6, elevation: 5
          }}>

          <Text style={{ color: 'black', fontWeight: 'bold' }}>Add to Cart</Text>

        </TouchableOpacity>
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