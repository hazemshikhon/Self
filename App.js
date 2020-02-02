import Login from './screens/login'
import SignUp from './screens/signup'
import {createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/homepage'
import Menu from './screens/menu'
import Cart from './screens/cart'
import Single from './screens/single'

const AppNavigator = createStackNavigator({
  

  Menu:{
    screen:Menu
  },
 
  SignUp:{
    screen: SignUp
},
  Login:{
    screen: Login
},

  Single:{
    screen:Single
  },
  
  Home:{
    screen: Home
},
Cart:{
  screen:Cart
}


}, {
  headerMode: 'none'
});


export default createAppContainer(AppNavigator);
