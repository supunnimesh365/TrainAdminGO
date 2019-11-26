import React, { Component } from 'react';
import { View, Text, TextInput, Picker, TouchableHighlight, StyleSheet, StatusBar, ActivityIndicator, Image } from 'react-native';
import uuid from 'uuid-random';
import firebase from './../constants/firebase';
import { Card, ButtonGroup } from 'react-native-elements';

class addStations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      successLoad: false,
      newStation: ''
    };
    this.setStations = this.setStations.bind(this);
  }

  setStations(stations) {
    this.setState({ stations })
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  addNewStation = () => {
    if (this.state.newStation == '') {
      Alert.alert(
        'Error',
        'Empty Value of Station',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else {
      firebase.database().ref('stations/' + uuid()).set({
        id: uuid(),
        name: this.state.newStation
      })
      this.setState({
        stations: []
      })
      this.componentDidMount()
    }
  }

  componentDidMount = () => {
    var stations = [];
    firebase.database().ref("stations/").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childkey = childSnapshot.key
        var childvalue = childSnapshot.val()
        stations.push(childvalue);
      })
      this.setStations(stations);
      this.setState({ successLoad: true });
    })
  }

  render() {
    let { stations } = this.state;
    if (this.state.successLoad == false) {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <Image source={require('./../assets/Train05.png')} />
          <ActivityIndicator size="large" color="blue" />
        </View>
      )
    }
    else {
      return (
        <View>
          <Card title="Please Input the new Station">
            <Text>Here are the available stations for now</Text>
            <Picker mode="dropdown"
              selectedValue="Available Stations"
            >
              {
                stations.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item} key={item.name} />
                  );
                })
              }
            </Picker>
            <View style={styles.txtContainer}>
              <TextInput
                placeholder='Input New Station'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
            </View>
            <TouchableHighlight
              onPress={this.addNewStation}
              style={styles.button}>
              <Text style={styles.buttontxt}>Add Station</Text>
            </TouchableHighlight>
          </Card>
        </View>
      );
    }
  }
}

export default addStations;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
    height: 70,
    width: 200,
    alignSelf: 'center',
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
  },
  QRcontain: {
    position: 'absolute',
    left: 0,
    // alignContent: "center",
    alignItems: "center",
    right: 0,

    //bottom: height / 2,
    // height: 150,
    padding: 20,
  },
  txtContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    height: 150,
    padding: 20,
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
  QR: {
    height: 150,
    width: 150,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgb(0,0,0)',
  },
  buttontxt: {
    color: 'white',
  }
});