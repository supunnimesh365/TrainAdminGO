import React, { Component } from 'react';
import { View, Text, Image, Picker, StyleSheet, ActivityIndicator, Dimensions, StatusBar, TouchableHighlight } from 'react-native';
import firebase from './../constants/firebase';
import { Card, ButtonGroup } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'uuid-random';

const { width, height } = Dimensions.get('window')


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details_gather: false,
      stations: [],
      successLoad: false,
      selectedStation: [],
      QRCode: ''
    };
    this.setStations = this.setStations.bind(this);
    this.selectStations = this.selectStations.bind(this);
    this.setQR = this.setQR.bind(this);
  }

  setStations(stations) {
    this.setState({ stations })
  }

  selectStations(selectedStation) {
    this.setState({ selectedStation })
  }

  setQR(QRCode) {
    this.setState({ QRCode })
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
    let { selectedStation } = this.state
    console.log(selectedStation);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    var value = {
      "station_id": selectedStation.id,
      "station_name": selectedStation.name,
      "date": today,
      "uid": uuid()
    }

    value = JSON.stringify(value);
    this.setQR(value);
    this.setState({ details_gather: true });
    // "station_id":6767683,
    // "station_name":"Maradana",
    // "date":"2019.10.22",
    // "uid":12345678903

  }




  // color scheme
  // profile details changing
  // payment options

  render() {
    const { stations } = this.state;
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
    else if (this.state.details_gather == false) {
      return (
        <View>
          <Card>
            <Text> Please select the station this machine is located in </Text>
            <Picker mode="dropdown"
              selectedValue={this.state.selectedStation}
              onValueChange={(itemValue) =>
                this.selectStations(itemValue)
              }
            >
              {
                stations.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item} key={item.name} />
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
        <View style={styles.container}>
          <QRCode
            style={styles.QR}
            value={this.state.QRCode}
            size = {200}
            logoSize={100}
            logoBackgroundColor='transparent'
          />
        </View>
      )
    }
  }
}

export default Home;

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