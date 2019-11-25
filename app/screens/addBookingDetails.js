import React, { Component } from 'react';
import { View, Text, TextInput, Picker, TouchableHighlight, StyleSheet, StatusBar, ActivityIndicator, Image } from 'react-native';
import uuid from 'uuid-random';
import firebase from './../constants/firebase';
import { Card, ButtonGroup } from 'react-native-elements';

class addBookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      successLoad: false,
      selectedStation1: '',
      selectedStation2: '',
      newStation: ''
    };
    this.setStations = this.setStations.bind(this);
    this.selectStations1 = this.selectStations1.bind(this);
    this.selectStations2 = this.selectStations2.bind(this);
  }

  setStations(stations) {
    this.setState({ stations })
  }

  selectStations1(selectedStation1) {
    this.setState({ selectedStation1 })
  }

  selectStations2(selectedStation2) {
    this.setState({ selectedStation2 })
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
          <Card title="Please Input New Booking Details">
            <Text>Here are the available stations for now</Text>
            <Picker mode="dropdown"
              selectedValue={this.state.selectedStation1}
              onValueChange={(itemValue) =>
                this.selectStations1(itemValue)
              }
            >
              {
                stations.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item.name + item.id} key={item.name} />
                  );
                })
              }
            </Picker>
            <Picker mode="dropdown"
              selectedValue={this.state.selectedStation2}
              onValueChange={(itemValue) =>
                this.selectStations2(itemValue)
              }
            >
              {
                stations.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item.name + item.id} key={item.name} />
                  );
                })
              }
            </Picker>
            <Text>Class 1 details</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
              <TextInput
                placeholder='Half Ticket Price'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
              <TextInput
                placeholder='Full Ticket Price'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
            </View>
            <Text>Class 2 details</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
              <TextInput
                placeholder='Half Ticket Price'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
              <TextInput
                placeholder='Full Ticket Price'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
            </View>
            <Text>Class 3 details</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
              <TextInput
                placeholder='Half Ticket Price'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
              <TextInput
                placeholder='Full Ticket Price'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
            </View>
            <Text>Time, Availability and TrainID</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
              <TextInput
                placeholder='Seats'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
              <TextInput
                placeholder='Daily'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
              <TextInput
                placeholder='Time'
                style={styles.textInput}
                placeholderTextColor='black'
                onChangeText={val => this.onChangeText('newStation', val)}
              />
              </View>
              <View>
              <TextInput
                placeholder='Seats Count'
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

export default addBookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput:{
    borderBottomColor: 'black',
    borderBottomWidth:0.5,
    padding:2,
    margin:2
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