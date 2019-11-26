import React, { Component } from 'react';
import { View, Text, TextInput, Picker, Alert, TouchableHighlight, Dimensions, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Image } from 'react-native';
import uuid from 'uuid-random';
import firebase from './../constants/firebase';
import { Card, ButtonGroup } from 'react-native-elements';
const { width, height } = Dimensions.get('window')
import SwitchToggle from 'react-native-switch-toggle';

class addBookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      switchOn4: false,
      successLoad: false,
      selectedStation1: '',
      selectedStation2: '',
      newStation: '',
      class1f: 0,
      class1h: 0,
      class2f: 0,
      class2h: 0,
      class3f: 0,
      class3h: 0,
      totseats: 0,
      time: '',
      trainID: '',
    };
    this.setStations = this.setStations.bind(this);
    this.selectStations1 = this.selectStations1.bind(this);
    this.selectStations2 = this.selectStations2.bind(this);
  }

  getButtonText() {
    return this.state.switchOn4 ? 'Daily' : 'Weekly';
  }

  getRightText() {
    return this.state.switchOn4 ? '' : 'Daily';
  }

  getLeftText() {
    return this.state.switchOn4 ? 'Weekly' : '';
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

  addNewBooking = () => {
    if (this.state.class1f == 0 && this.state.class1h == 0 && this.state.class2f == 0
      && this.state.class2h == 0 && this.state.class3f == 0 && this.state.class3h == 0
      && this.state.totseats) {
      Alert.alert(
        'Error',
        'Please fill all the Spaces',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else if (this.state.selectedStation1 == this.state.selectedStation2) {
      Alert.alert(
        'Error',
        'Please select two different stations',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else {
      Alert.alert(
        'Success',
        'Added a new Booking' + this.state.class1f,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      if (this.state.switchOn4 == true) {
        var val1 = 'yes'
      }
      else {
        var val1 = 'no'
      }
      var trip = this.state.selectedStation1 + this.state.selectedStation2
      firebase.database().ref('bookingDetails/' + trip + '/' + uuid()).set({
        "classes": {
          "1": {
            "class": 1,
            "full": {
              "price": parseInt(this.state.class1f)
            },
            "half": {
              "price": parseInt(this.state.class1h)
            },
            "seats": parseInt(this.state.totseats)
          },
          "2": {
            "class": 2,
            "full": {
              "price": parseInt(this.state.class2f)
            },
            "half": {
              "price": parseInt(this.state.class2h)
            },
            "seats": parseInt(this.state.totseats)
          },
          "3": {
            "class": 3,
            "full": {
              "price": parseInt(this.state.class3f)
            },
            "half": {
              "price": parseInt(this.state.class3h)
            },
            "seats": parseInt(this.state.totseats)
          },
        },
        "daily": val1,
          "fixedSeats": parseInt(this.state.totseats),
          "seats": parseInt(this.state.totseats),
          "time": this.state.time,
          "trainID": this.state.trainID
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
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          <ScrollView>
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
            </Card>
            <Card title="Enter Time and Seats Count">
              {/* <Text>Class 1 details</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Half Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class1h', val)}
                />
                <TextInput
                  placeholder='Full Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class1f', val)}
                />
              </View>
            </Card>
            <Card title="Enter Time and Seats Count">
              {/* <Text>Class 2 details</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Half Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class2h', val)}
                />
                <TextInput
                  placeholder='Full Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class2f', val)}
                />
              </View>
            </Card>
            <Card title="Enter Time and Seats Count">
              {/* <Text>Class 3 details</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Half Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class3h', val)}
                />
                <TextInput
                  placeholder='Full Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class3f', val)}
                />
              </View>
            </Card>
            <Card title="Enter Time and Seats Count">
              {/* <Text>Time, Availability and TrainID</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Seats'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('totseats', val)}
                />
                <SwitchToggle
                  buttonText={this.getButtonText()}
                  backTextRight={this.getRightText()}
                  backTextLeft={this.getLeftText()}

                  type={1}
                  buttonStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute'
                  }}

                  rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                  leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}

                  buttonTextStyle={{ fontSize: 20 }}
                  textRightStyle={{ fontSize: 20 }}
                  textLeftStyle={{ fontSize: 20 }}

                  containerStyle={{
                    marginTop: 16,
                    width: 160,
                    height: 65,
                    borderRadius: 30,
                    padding: 5,
                  }}
                  backgroundColorOn='#fff'
                  backgroundColorOff='#fff'
                  circleStyle={{
                    width: 80,
                    height: 55,
                    borderRadius: 27.5,
                    backgroundColor: 'blue', // rgb(102,134,205)
                  }}
                  switchOn={this.state.switchOn4}
                  onPress={this.onPress4}
                  circleColorOff='#e5e1e0'
                  circleColorOn='#e5e1e0'
                  duration={500}
                />

              </View>
            </Card>
            <Card title="Enter Time and Seats Count">
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Time'
                  style={styles.textInput}
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('time', val)}
                />
                <TextInput
                  placeholder='trainID'
                  style={styles.textInput}
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('trainID', val)}
                />
              </View>
            </Card>
            <TouchableHighlight
              onPress={this.addNewBooking}
              style={styles.button}>
              <Text style={styles.buttontxt}>Add New Booking</Text>
            </TouchableHighlight>
          </ScrollView >
        </View >

      );
    }
  }

  onPress4 = () => {
    this.setState({ switchOn4: !this.state.switchOn4 });
  };
}

export default addBookingDetails;

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
    width: width - 100,
    padding: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgb(0,0,0)',
  },
  txtContainer: {
    position: 'relative',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    height: 150,
    padding: 20,
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