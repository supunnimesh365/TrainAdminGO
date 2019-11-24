/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/AntDesign'
import Home from './app/screens/Home'
import Scan from './app/screens/Scan'
import Operations from './app/screens/Operations'
import Splash from './app/screens/Splash'
import WelcomeScreen from './app/screens/Welcome'
import Signup from './app/screens/Signup'
import Login from './app/screens/Login'

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const DashboardTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: Home,  
      navigationOptions:{  
          tabBarLabel:'Home',  
          tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon1 style={[{color: tintColor}]} size={20} name='home'/>  
              </View>), 
       } 
      },
      Scan: { screen: Scan,
        navigationOptions:{
          tabBarLabel:'Scan',
          tabBarIcon: ({ tintColor}) => (
            <View>
                <Icon1 style={[{color:tintColor}]} size={20} name='wallet'/>
            </View>),
        },
      },
      Operations: { screen: Operations,
        navigationOptions:{
          tabBarLabel:'Operations',
          tabBarIcon: ({ tintColor}) => (
            <View>
              <Icon1 style={[{color:tintColor}]} size={20} name='book'/>
            </View>),
        },
      },
  },
  {  
    initialRouteName: "Home",  
    activeColor: '#2683c6',  
    inactiveColor: 'black',  
    fontWeight: 'bald',
    barStyle: { backgroundColor: 'white' }, 
    navigationOptions:({navigation})=>{
      const {routeName} = navigation.state.routes[navigation.state.index]
      return{
        headerTitle:routeName
      };
    } 
  },
);

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator : DashboardTabNavigator
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{
    screen:DashboardStackNavigator
  },
  // Signup:{
  //   screen:Signup
  // }
});

const AppSwitchNavigator = createSwitchNavigator({
  Splash:{screen:Splash},
  Welcome:{screen:WelcomeScreen},
  Dashboard1:{screen:AppDrawerNavigator},
  Signup:{screen:Signup},
  Login:{screen:Login}
});



const AppContainer = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
