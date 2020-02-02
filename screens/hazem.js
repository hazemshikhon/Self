import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class Hazem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }

  }
  render() {
    return (
        <FooterTab style={{flex:.07, backgroundColor:'white'}}>
        <Button vertical>
          
          <Text>Apps</Text>
        </Button>
        <Button vertical>
          <Icon name="camera" />
          <Text>Camera</Text>
        </Button>
        <Button  vertical  onPress={  () => {this.props.navigation.navigate('Home')}}>
          <Icon  name="navigate" style={{color:'red'}}/>
          <Text>Navigate</Text>
        </Button>
        <Button vertical>
          <Icon name="person" />
          <Text>Contact</Text>
        </Button>
      </FooterTab>
    );

  }
}