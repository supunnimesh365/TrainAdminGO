import React, { Component } from 'react';
//import {View, Text} from 'react-native';
import {
    View,
    Alert,
    Text,
    Button,
    Image,
    StatusBar,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import uuid from 'uuid-random';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', email: '', phone_number: '', success: false
        };
      }


    //NEED Validating need places

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }


    signUp = () => {
        // this.setState({success: true});
        let { username, password, email, phone_number, success } = this.state;
        // let user;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username == '' || password == '' || email == '' || phone_number == '') {
            console.log("Fill out all the fields");
            Alert.alert(
                'Warning',
                'Please fill all the fields',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
        }
        else if (reg.test(email) == false) {
            console.log("Not a email");
            Alert.alert(
                'Warning',
                'Not a valid E-mail',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
        }
        else if (!phone_number.match(/^[0-9]{10}$/)) {
            console.log("Not a phone number");
            Alert.alert(
                'Warning',
                'Not a valid Phone Number',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
        }
        else if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            console.log('Password should be strong and secure');
            Alert.alert(
                'Warning',
                'Password should be strong and secure',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
        }
        else {
            this.setState({success: true});
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>
                firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                    username: username,
                    email: email,
                    phone_number: phone_number,
                    admin_account: true
                })



            ).catch(function (error) {
                // Handle Errors here.
                console.log(error);
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });

        }









    }



    render() {
        if (this.state.success == false) {
            return (
                <View style={styles.container}>
                    <View style={{ ...StyleSheet.absoluteFill }}>
                        <Image source={require('../assets/wall.png')}
                            style={{ flex: 1, width: null, height: null }} />
                    </View>
                    <StatusBar
                        translucent
                        backgroundColor="#ffffff"
                        barStyle="dark-content"
                    />
                    <View style={styles.txtContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Username'
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('username', val)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('password', val)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('email', val)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder='Phone Number'
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('phone_number', val)}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
                            <Text>S I G N  U P</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonlink} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>back to login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else if(this.state.success == true) {
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
        borderWidth: 1,
        marginHorizontal: 10,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgb(0,0,0)',
    },
    txtContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: height / 2,
        height: 150,
        padding: 20,
    },
    button: {
        backgroundColor: 'rgba(114, 178, 242, 0.6)',
        height: 40,
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

