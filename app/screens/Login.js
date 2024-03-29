import React, { Component } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Image, StatusBar } from 'react-native';
import firebase from './../constants/firebase';


//NEED Validating need places
const { width, height } = Dimensions.get('window')
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      success: false,
      loading: false
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  Login = () => {
    const { email, password } = this.state
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(email, password);
    if (email == '' || password == '') {
      console.log("Fill the two sections");
      -Alert.alert(
        'Error',
        'Fill the two sections',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else if (reg.test(email) == false) {
      console.log("Invalid Email");
      Alert.alert(
        'Error',
        'Invalid Email',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else {
      this.setState({ loading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Dashboard1'))
        .catch(error => Alert.alert(
          'Error',
          error.message,
          [
            { text: 'OK', onPress: () => this.setState({ loading: false }) },
          ],
          { cancelable: false },
        ))
    }
  }


  render() {
    if (this.state.loading == true) {
      return (
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <Image source={require('./../assets/Train05admin.png')} />
          <ActivityIndicator size="large" color="grey" />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={{ ...StyleSheet.absoluteFill }}>
            <Image source={require('../assets/wall2.png')}
              style={{ flex: 1, width: null, height: null }} />
          </View>
          <StatusBar
            backgroundColor="#000000"
            barStyle="light-content"
          />
          <View style={styles.txtContainer}>
            <Image source={require('./../assets/icon1.png')} />
            <TextInput
              placeholder='E-mail'
              style={styles.textInput}
              placeholderTextColor='black'
              onChangeText={val => this.onChangeText('email', val)}
            />
            <TextInput
              placeholder='PASSWORD'
              secureTextEntry={true}
              style={styles.textInput}
              placeholderTextColor='black'
              onChangeText={val => this.onChangeText('password', val)}
            />
            <TouchableOpacity style={styles.button} onPress={() => this.Login()}>
              <Text>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonlink} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text>NOT REGISTERED</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonlink} onPress={() => this.props.navigation.navigate('PasswordReset')}>
              <Text>can not remember password</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    width: '90%',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgb(0,0,0)',
  },
  txtContainer: {
    position: 'absolute',
    left: 0,
    // alignContent: "center",
    alignItems: "center",
    right: 0,
    bottom: height / 2,
    height: 150,
    padding: 20,
  },
  button: {
    backgroundColor: 'rgba(114, 178, 242, 0.6)',
    height: 40,
    width: '20%',
    marginHorizontal: width / 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonlink: {
    height: 40,
    marginHorizontal: width / 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  }
})

