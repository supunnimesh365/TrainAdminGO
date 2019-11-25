/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, View} from 'react-native';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/AntDesign'
import Home from './app/screens/Home'
import Scan from './app/screens/Scan'
import Topup from './app/screens/Topup'
import Splash from './app/screens/Splash'
import WelcomeScreen from './app/screens/Welcome'
import Signup from './app/screens/Signup'
import Login from './app/screens/Login'
import addStations from './app/screens/addStations'
import addFares from './app/screens/addFares'
import addBookingDetails from './app/screens/addBookingDetails'

class App extends Component{

  render(){
    return (
      <AppContainer/>
    );
  }
}

export default App;

const headerComponent = props => {
  return(
  <SafeAreaView style={{flex:1}}>
    <View style={{height:200, backgroundColor:'white', alignItems:"center", justifyContent:"center"}}>
      <Image source = {require('./app/assets/logo.png')} style={{height:120, width
      :120, borderRadius: 20, backgroundColor:"grey"}}/>
      <Text>TrainGO v1.0</Text>
      <Text>eazy pay, eazy way</Text>
    </View>
    <ScrollView> 
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)}

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
      Topup: { screen: Topup,
        navigationOptions:{
          tabBarLabel:'Topup',
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
});

const addStationStackNavigator = createStackNavigator({
  addStations : {
    screen:addStations
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
        headerTitle:'Logging Out'
    }
  }
});

const addFaresStackNavigator = createStackNavigator({
  addFares : {
    screen:addFares
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
        headerTitle:'Logging Out'
    }
  }
});

const addBookingDetailsStackNavigator = createStackNavigator({
  addBookingDetails : {
    screen:addBookingDetails
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
        headerTitle:'Logging Out'
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{
    screen:DashboardStackNavigator,
    navigationOptions:{
      title:'Home',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='home'/>
        </View>),
    },
  },
  addFares:{
    screen:addFaresStackNavigator,
    navigationOptions:{
      title:'Home',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='home'/>
        </View>),
    },
  },
  addStations:{
    screen:addStationStackNavigator,
    navigationOptions:{
      title:'Home',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='home'/>
        </View>),
    },
  },
  addBookingDetails:{
    screen:addBookingDetailsStackNavigator,
    navigationOptions:{
      title:'Home',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='home'/>
        </View>),
    },
  },
  // Signup:{
  //   screen:Signup
  // }
},{
  contentComponent:headerComponent
});

const AppSwitchNavigator = createSwitchNavigator({
  Splash:{screen:Splash},
  Welcome:{screen:WelcomeScreen},
  Dashboard1:{screen:AppDrawerNavigator},
  Signup:{screen:Signup},
  Login:{screen:Login},
  Dashboard:{screen:DashboardStackNavigator},
  addBookingDetails: {screen:addBookingDetails},
  addFares:{screen:addFares},
  addStations:{screen:addStations},
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
