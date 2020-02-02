
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
  AsyncStorage
} from 'react-native';
import { Button } from 'native-base';
//import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'react-native-check-box'
import Iconic from 'react-native-vector-icons/FontAwesome';

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
      flower1: [
        { key1: 'this pizza very good', name1: 'Pizza mix cheese', price1: 10, photo1: require('../icons/menu11.png') },
        { key1: 'this pizza very good', name1: 'Pizza Mix meat', price1: 20, photo1: require('../icons/menu12.png') },
        { key1: 'this pizza very good', name1: 'Pizza mango', price1: 5, photo1: require('../icons/menu13.png') },
        { key1: 'this pizza very good', name1: 'Pizza farawla', price1: 5, photo1: require('../icons/menu14.png') },
        { key1: 'this pizza very good', name1: 'Pizza echta', price1: 5, photo1: require('../icons/menu15.png') },
        { key1: 'this pizza very good', name1: 'Pizza meaaat', price1: 5, photo1: require('../icons/menu17.png') },
        { key1: 'this pizza very good', name1: 'Pizza chicken', price1: 5, photo1: require('../icons/menu15.png') },
      ],
    }

  }

  openModal() {
    this.setState({ visible: true });
  }

  closeModal() {
    this.setState({ visible: false });
  }
  openModal2() {
    this.setState({ visible2: true });
  }

  closeModal2() {
    this.setState({ visible2: false });
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
  storeData = async (x) => {
    try {
      await AsyncStorage.setItem('key', x)
    } catch (e) {
      // saving error
    }
  }
  render() {

    return (
      <View style={styles.basicBackground}>

        <Image source={require('../icons/signup.jpg')} style={styles.frontImage} />

        <Modal
          visible={this.state.visible}
          modalStyle={{ backgroundColor: '#ffdb4d', elevation: 5 }}
          onTouchOutside={() => {
            this.closeModal()
          }}
          width={width * .75}
        >
          <ModalContent style={{ backgroundColor: '#ffdb4d' }}>
            <TouchableOpacity onPress={() => this.closeModal()} style={{ height: 10, width: 10 }}>
              <Iconic name="close" />

            </TouchableOpacity>
            <Image
              style={{ width: '50%', height: '30%', resizeMode: 'stretch', justifyContent: 'center', alignSelf: 'center' }}
              source={this.state.path} />
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 7 }}>{this.state.name}</Text>

            <View style={{ marginHorizontal: 50, marginTop: 20, marginBottom: 20 }}>
              <Text style={{ textAlign: 'center' }}>Pizz Contain cheese and many chicken and maybe spicy or not spicky dont know walahy </Text>
            </View>

            <Text style={{ marginLeft: 90, marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Price : {this.state.price * this.state.value}</Text>
            <TouchableOpacity
              onPress={() => {
                this.closeModal()
                this.openModal2()
              }}
              style={{
                backgroundColor: '#ffdb4d', marginLeft: 45,
                paddingVertical: 5, paddingHorizontal: 1, borderRadius: 15,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 1, borderColor: 'white', width: '70%', elevation: 5
              }}>

              <Text style={{ color: 'black', fontWeight: 'bold' }}>Add to Cart</Text>

            </TouchableOpacity>
          </ModalContent>
        </Modal>



        <Modal
          visible={this.state.visible2}
          modalStyle={{ backgroundColor: '#ffdb4d', elevation: 5 }}
          onTouchOutside={() => {
            this.closeModal2()
          }}
          width={width * .75}
        >
          <ModalContent style={{ backgroundColor: '#ffdb4d' }}>
            <TouchableOpacity onPress={() => this.closeModal2()} style={{ height: 10, width: 10 }}>
              <Iconic name="close" />

            </TouchableOpacity>

            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Extras !</Text>
            <View style={{ marginTop: 15 }}>

              <CheckBox
                style={{ flex: 1, padding: 10, marginBottom: 15 }}
                onClick={() => {
                  this.setState({
                    isChecked1: !this.state.isChecked1
                  })
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
                  if (!this.state.isChecked2) { alert(this.state.x) }
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
                  }}
                  isChecked={this.state.isChecked6}
                  rightText={"More One"}
                  rightTextStyle={{ fontWeight: 'bold' }}
                />
                {this.renderNumber()}
              </View>
            </View>
           
            <TouchableOpacity
              onPress={() => {this.closeModal2()
                              console.log(this.state)
              }}
              style={{
                backgroundColor: '#ffdb4d', marginLeft: 45,
                paddingVertical: 5, paddingHorizontal: 1, borderRadius: 15,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 1, borderColor: 'white', width: '70%', elevation: 5
              }}>

              <Text style={{ color: 'black', fontWeight: 'bold' }}>Done</Text>

            </TouchableOpacity>
          </ModalContent>
        </Modal>

        <FlatList
          data={this.state.flower1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          keyExtractor={this._keyExtractor1}
          style={{ flex: .5, width: '100%', backgroundColor: 'white' }}
          renderItem={
            ({ item }) =>
              <View>
                <TouchableOpacity onPress={() => {
                  this.setState({ visible: true });
                  this.setState({ path: item.photo1 })
                  this.setState({ name: item.name1 })
                  this.setState({ price: item.price1 })
                }} style={{ elevation: 5, backgroundColor: '#e6b800', width: width, marginBottom: 10, borderRadius: 20, width: width * .98, marginTop: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image resizeMode='stretch' style={{
                      height: height * .09, width: width * .21,
                      resizeMode: 'stretch', marginVertical: 10, marginLeft: 10, elevation: 5
                    }}
                      source={item.photo1} />
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={{ color: '#f2f2f2', textAlign: 'right', fontSize: 22, fontWeight: 'bold', marginLeft: 40 }}>{item.name1}</Text>
                      <View style={{ backgroundColor: 'green', width: width * .17, marginLeft: 40, marginTop: 5, borderRadius: 6 }}>
                        <Text style={{ color: '#f2f2f2', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Price : {item.price1}</Text>
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