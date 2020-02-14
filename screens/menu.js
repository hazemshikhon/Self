import React from 'react';
import { View,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './homepage'
import HomeOut from './homepageout'
import Cart from './cart'
import { TabBarBottom  } from 'react-navigation';
import Login from './login'
import Offers from './offers'
import Iconic from 'react-native-vector-icons/FontAwesome';
import Profile from './profile'
import strings from '../component/Localization';

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
class MyHomeScreen extends React.Component {
  
  render() {
    const {routeName , isActive} = this.props;

    return (
      <View>
        <Button
          onPress={() => this.props.navigation.openDrawer()}

          title="Go to notifications"
        />
        <Button
          onPress={() => this.props.navigation.navigate('second')}

          title="Go to notifications"
        />
      </View>
    );
  }
}
class Hazem extends React.Component {
 async componentDidMount() {
        
   
       await this.setUpLang();
    
}
  async setUpLang() {
    try {
        let lang = await AsyncStorage.getItem('lang')
        lang = (lang == null) ? 'ar' : lang
        console.log('intro2',lang);
        this.setLang(lang)
    } catch (e) {
        console.log(e);
    }
}

setLang(lang) {
    try {
        strings.setLanguage(lang);
        // lang = (lang == 'ar') ? 'en' : 'ar'
        AsyncStorage.setItem('lang', lang)
        this.setState({ lang })
    } catch (e) {
        console.log(e);
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

const TabNavigator = createBottomTabNavigator({
  Home: {
      screen:HomeOut ,
      navigationOptions:{
        title:strings.HOME,
        tabBarIcon: ({ focused }) => (
          focused ?
          <Iconic size={22} name="home" />: <Iconic size={22} name="home" />
        ),

      },
  },
  Offers: {
    screen:Offers ,
    navigationOptions:{
      title:strings.offers,
      tabBarIcon: ({ focused }) => (
        focused ?
        <Icon  name="md-pizza" />: <Icon name="md-pizza" />
      ),

    },
},
 Login: {
      screen:Cart ,
      navigationOptions:{
        title:strings.cart,
        tabBarIcon: ({ focused }) => (
          focused ?
          <Iconic size={23} name="shopping-cart" />: <Iconic size={23} name="shopping-cart" />
        ),

      },
  },
  Profile: {
    screen:Profile ,
    navigationOptions:{
      title:strings.PROFILE,
      tabBarIcon: ({ focused }) => (
        focused ?
        <Icon  size={23} name="md-person" />: <Icon size={23} name="md-person" />
      ),

    },
},
},
{
tabBarOptions: {showLabel:true},
tabBarComponent:TabBarBottom,
tabBarPosition: 'bottom',
animationEnabled: true,
swipeEnabled: true ,
tabBarOptions: {
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 12,
      fontWeight:'bold',
      textAlign:'center',
      color:'black'
    },
    style: {
      backgroundColor: '#cccccc',
      height:50      
    },
  }
});

export default createAppContainer(TabNavigator);
