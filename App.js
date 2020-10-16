import Login from './screens/login'
import SignUp from './screens/signup'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/homepageout'
import Menu from './screens/menu'
import Cart from './screens/cart'
import Single from './screens/single'
import Profile from './screens/profile'
import Orders from './screens/orders'
import Maps from './screens/maps'

const AppNavigator = createStackNavigator({

  Menu: {
    screen: Menu
  },
  SignUp: {
    screen: SignUp
  },

  SignUp: {
    screen: SignUp
  },



  Login: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },


  Maps: {
    screen: Maps
  },
  Home: {
    screen: Home
  },

  Orders: {
    screen: Orders
  },
  Single: {
    screen: Single
  },

  Cart: {
    screen: Cart
  }


}, {
  headerMode: 'none'
});


export default createAppContainer(AppNavigator);
