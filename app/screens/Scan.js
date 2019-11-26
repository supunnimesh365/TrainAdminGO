import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Platform, Image, Dimensions, Alert, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
const { width, height } = Dimensions.get('window')
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import uuid from 'uuid-random';
import Icon1 from 'react-native-vector-icons/AntDesign'

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      Start_Scanner: false,
      Start_App: false,
      Start_Station: '',
      Start_Station_Name: '',
      Trip_Started: false,
      End_Station: '',
      End_Station_Name: '',
      tripConfirm: false,
      Access: false,
      uid: '',
      Wallet_Balance: 0,
      date: '',
      changeVal: true,
      classVal: 3,
      passengersCount: 1,
      passengersCountHalf: 0,
      successLoad: false,
      tripID: uuid(),
      usrid: firebase.auth().currentUser.uid,
      total: 0,
      balance: 0,
    };
  }

  //scan bookings and dbstatus 1 => 0

  open_QR_Code_Scanner = () => {
    var that = this;
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
            'title': 'Camera App Permission',
            'message': 'Camera App needs access to your camera '
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }

  onQR_Code_Scan_Done = (QR_Code) => {
    this.setState({ QR_Code_Value: QR_Code });
    this.setState({ Start_Scanner: false });
    var obj = JSON.parse(QR_Code);
    console.log(obj);
    var uid = obj.uid;
    var bookid = obj.bookid
    firebase.database().ref('booked/' + uid+'/'+bookid).update({
      status: 0
    })
    Alert.alert(
      'Success',
      'Your Booked Trip has successfully Completed',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {


    if (!this.state.Start_Scanner) {
      return (
        <View style={[styles.container]}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          <View style={styles.txtContainer}>
            <Card title='Scan QR Code To Verify Passengers Booking'>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
                <Icon1 size={30} name='mobile1' />
                <Icon1 size={30} name='arrowright' />
                <Icon1 size={30} name='qrcode' />
              </View>
              <TouchableOpacity
                onPress={this.open_QR_Code_Scanner}
                style={styles.button}>
                <Text style={styles.buttontxt}>
                  Open QR Scanner
            </Text>
              </TouchableOpacity>
            </Card>
          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          <CameraKitCameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={'#FF3D00'}
            frameColor={'#00C853'}
            colorForScannerFrame={'black'}
            cameraOptions={{
              flashMode: 'auto',             // on/off/auto(default)
              focusMode: 'on',               // off/on(default)
              zoomMode: 'on',                // off/on(default)
              ratioOverlay: '1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
              ratioOverlayColor: '#00000077' // optional
            }}
            onReadCode={event =>
              this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
              // this.setState({ Start_Scanner: false })
            }
          />
          <TouchableOpacity
            onPress={()=>this.setState({ Start_Scanner: false })}
            style={styles.button1}>
            <Text style={styles.buttontxt}>
              Back To Scanner
                  </Text>
          </TouchableOpacity>

        </View>
      );

    }
  }
}

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  newContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "stretch",
  },
  txtContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top: height / 2,
    // height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // bottom: 0,
    top: 0,
    height: 150,
  },
  btnContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    padding: 20,
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: 'black',
    height: 70,
    width: 200,
    alignSelf: 'center',
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderColor: 'white',
    height: 70,
    width: 200,
    alignSelf: 'center',
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    color: 'white',
  }
});
