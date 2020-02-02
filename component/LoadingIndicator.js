import React, { Component } from 'react';
import { ActivityIndicator, View ,Text} from 'react-native';

export default class LoadingIndicator extends Component {

  render() {
    return (
      <View style={{ flex: 1,  justifyContent: 'space-around', padding: 10 , backgroundColor: '#e6b800'}}>
          <ActivityIndicator
            size={this.props.size}
            color={'white'} />
      </View>
    );
  }
}
