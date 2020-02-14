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

const AppNavigator = createStackNavigator({
  Menu: {
    screen: Menu
  },
  Home: {
    screen: Home
  },


  Profile: {
    screen: Profile
  },

  Orders: {
    screen: Orders
  },

  Login: {
    screen: Login
  },


  SignUp: {
    screen: SignUp
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
