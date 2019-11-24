import React, { Component } from 'react';
import { View, Text, Image, Picker, ActivityIndicator, TouchableHighlight } from 'react-native';
import firebase from './../constants/firebase';
import { Card, ButtonGroup } from 'react-native-elements';




class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details_gather: false,
      stations: [],
      successLoad: false,
      selectedStation: ''
    };
    this.setStations = this.setStations.bind(this);
    this.selectStations = this.selectStations.bind(this);
  }

  setStations(stations) {
    this.setState({ stations })
  }

  selectStations(selectedStation) {
    this.setState({ selectedStation })
  }


  componentDidMount() {
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

  getQRCode = () => {

  }




  // color scheme
  // profile details changing
  // payment options

  render() {

    if (this.state.successLoad == false) {
      return (
        <View>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <Image source={require('./../assets/Train05.png')} />
          <ActivityIndicator size="large" color="blue" />
        </View>
      )
    }
    else if (this.state.details_gather == false) {
      return (
        <View>
          <Card>
            <Text> Please select the station this machine is located in </Text>
            <Picker mode="dropdown"
              selectedValue={this.state.selectedStation}
              onValueChange={(itemValue) =>
                this.selectStation(itemValue)
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
            <TouchableHighlight
              onPress={this.getQRCode}
              style={styles.button}>
              <Text style={styles.buttontxt}>Show QR Code</Text>
            </TouchableHighlight>
          </Card>
        </View>
      )
    }
    else {
      return (
        <View>
          <Text>Here goes the QR Code</Text>
        </View>
      )
    }
  }
}

export default Home;
