import React, { Component } from 'react';
import { View, Text, TextInput, Picker, Alert, TouchableHighlight, Dimensions, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Image } from 'react-native';
import uuid from 'uuid-random';
import firebase from './../constants/firebase';
import { Card, ButtonGroup } from 'react-native-elements';
const { width, height } = Dimensions.get('window')
class addFares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      successLoad: false,
      newStation: '',
      selectedStation1: '',
      selectedStation2: '',
      class1hv: 0,
      class1fv: 0,
      class2fv: 0,
      class2hv: 0,
      class3fv: 0,
      class3hv: 0
    };
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


  componentDidMount = () => {
      this.setState({ successLoad: true });
  }


  addNewPrice = () => {
    if (this.state.class1fv == 0 && this.state.class1hv == 0 && this.state.class2fv == 0
      && this.state.class2hv == 0 && this.state.class3fv == 0 && this.state.class3hv == 0) {
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
        'Added a new fare',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
      var trip = this.state.selectedStation1 + this.state.selectedStation2
      firebase.database().ref('fare/' + trip + '/' ).set({
        '1':{
          'full':parseInt(this.state.class1fv),
          'half':parseInt(this.state.class1hv)
        },
        '2':{
          'full':parseInt(this.state.class2fv),
          'half':parseInt(this.state.class2hv)
        },
        '3':{
          'full':parseInt(this.state.class3fv),
          'half':parseInt(this.state.class3hv)
        }
      });
      this.setState({
        stations: []
      })
      this.componentDidMount()
    }
  }


  searchTrains = () => {
    this.setState({ successLoad: false });
    console.log('............')
    this.setStations([]);
    var stations = [];
    firebase.database().ref("stations/").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childkey = childSnapshot.key
        var childvalue = childSnapshot.val()
        stations.push(childvalue);
      })
      this.setStations(stations);
      this.setState({ successLoad: true });
      this.setState({ buttonload: false });
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
          <Image source={require('./../assets/Train05admin.png')} />
          <ActivityIndicator size="large" color="grey" />
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
            <Card title="Please Input New Fare Details">
              <Text>Here are the available stations for now</Text>
              <TouchableHighlight
                onPress={this.searchTrains}
                style={styles.button}>
                <Text style={styles.buttontxt}>Search for Available Stations</Text>
              </TouchableHighlight>
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
            <Card title="Enter class 1 price">
              {/* <Text>Class 1 details</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Half Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class1hv', val)}
                />
                <TextInput
                  placeholder='Full Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class1fv', val)}
                />
              </View>
            </Card>
            <Card title="Enter class 2 price">
              {/* <Text>Class 2 details</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Half Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class2hv', val)}
                />
                <TextInput
                  placeholder='Full Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class2fv', val)}
                />
              </View>
            </Card>
            <Card title="Enter class 3 price">
              {/* <Text>Class 3 details</Text> */}
              <View style={styles.txtContainer}>
                <TextInput
                  placeholder='Half Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class3hv', val)}
                />
                <TextInput
                  placeholder='Full Ticket Price'
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholderTextColor='black'
                  onChangeText={val => this.onChangeText('class3fv', val)}
                />
              </View>
            </Card>
            <TouchableHighlight
              onPress={this.addNewPrice}
              style={styles.button}>
              <Text style={styles.buttontxt}>Add New Price</Text>
            </TouchableHighlight>
          </ScrollView >
        </View >

      );
    }
  }
}

export default addFares;


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