
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,


} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker, ProviderPropType, AnimatedRegion, Animated } from 'react-native-maps';
import flagPinkImg from '../assets/icons/flag-pink.png';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
//let LATITUDE =  31.205753;
//let LONGITUDE = 29.924526;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class CustomMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 31.21564,
        longitude: 29.95527,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };

    this.onMapPress = this.onMapPress.bind(this);
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });


  }



  componentDidMount = () => {
    //this.reqPermission();
    Geolocation.getCurrentPosition(
      info => {



      },
      err => console.log(err),
      {
        // timeout: 
        enableHighAccuracy: true,

      }
    );
  }
  componentWillUnmount = () => {
    //navigator.geolocation.clearWatch(this.watchID);

    // firebase
    //   .database()
    //   .ref(`LiveLocations/${this.state.speciality}`)
    //   .off();
  };

  activateGPSPopUp() {
    Alert.alert(
      strings.activateGPSTitle,
      strings.activateGPSDesc,
      [
        // { text: strings.popC, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: strings.ok,
          onPress: () => {
            // GPSState.openSettings();
            // this.findMe();
          }
        }
      ]
      // { cancelable: false },
    );
  }

  async reqPermission() {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted) {
        console.log("You can use the ACCESS_FINE_LOCATION");
        this.findMe();
      } else {
        const req = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (req === PermissionsAndroid.RESULTS.GRANTED) {
          this.findMe();
        } else {
          this.activateGPSPopUp();
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  findMe() {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const { region } = this.state;
        console.log(coords);

        this.setState({
          region: {
            ...region,
            latitude,
            longitude
          }
        });
      },
      error => {
        console.log("find me :", error);
        if (error.code === 2) {
          this.activateGPSPopUp();
        }
        this.setState({ indicator: false });
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
    );
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            onPress={this.onMapPress}
            followsUserLocation={true}
            zoomEnabled={true}
            ref={map => this._map = map}
          >
            {this.state.markers.map(marker => (
              <Marker
                title={marker.key}
                image={flagPinkImg}
                key={marker.key}
                coordinate={marker.coordinate}
              />
            ))}
          </MapView>

        </View>
        <TouchableOpacity
          onPress={() => {
            Geolocation.getCurrentPosition(
              info => {

                let hazem = {
                  latitude: info.coords.latitude,
                  longitude: info.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA

                }
                this.setState({ hazem })
                this._map.animateToRegion({
                  latitude: hazem.latitude,
                  longitude: hazem.longitude,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.025
                })
                Geocoder.init("AIzaSyCK_likJq9DZSNr6V-tK7LAm0254c4ZOOk");
                Geocoder.from(hazem.latitude, hazem.longitude)
                  .then(json => {
                    console.log('wha',json);
                    var addressComponent = json.results[0].address_components;
                    this.setState({

                      Address: addressComponent

                    })

                    console.log('one',addressComponent);
                    console.log('two',this.state.Address);
                    
                  })

                  .catch(error => console.warn(error));
              
            },
            err => console.log(err),
          {
            enableHighAccuracy: true,
            timeout:10000

          }
          );
      }}
        style={{ alignItems: "center", borderWidth: 1 }}>
          <Text> Tap to to current region</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

CustomMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: height * .4,
    width: width
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default CustomMarkers;