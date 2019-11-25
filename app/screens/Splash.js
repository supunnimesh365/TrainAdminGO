import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import firebase from './../constants/firebase';
// import { withNavigation } from 'react-navigation'; 


//NEED Validating need places

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  // componentDidMount(){
  // setTimeout(()=>{
  //     this.props.navigation.navigate('Welcome')
  // },2000);
  // }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Dashboard1' : 'Welcome')
      console.log(user);
    })

  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
        <Image source={require('./../assets/Train05.png')} />
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})
