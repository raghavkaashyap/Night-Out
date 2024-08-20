import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markers } from './assets/markers';
import React, { useEffect, useRef} from 'react';



const INITIAL_REGION = {
  latitude : 42.019800,
  longitude : -93.648280,
  latitudeDelta : .01,
  longitudeDelta : .01
};

const ViewBoxTopandBottom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} />
      <Text style ={{position: 'absolute', top: 65, left: 170, right: 0, bottom: 0, justifyContent: 'top', alignItems: 'center', fontWeight: 'bold', color: 'white'}}>
        NightOut
        </Text>
      <View style={styles.top} />
      <Text style ={{position: 'absolute', top: 125, left: 150, right: 0, bottom: 0, justifyContent: 'top', alignItems: 'top', fontWeight: 'bold', color: 'white'}}>
        SELECT A BAR
        </Text>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION} showsUserLocation showsMyLocationButton>
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker}>
          <Callout>
            <View>
              <Text> {marker.name} </Text>
              </View>
            </Callout>
        </Marker>
      ))}
      </MapView>
      <View style={styles.bottom} />
      <Text style ={{position: 'absolute', top: 660, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white'}}>
        BAR STATISTICS:
        </Text>
    </View>
  );
};


const styles = StyleSheet.create({ //creates the constant styles used to create the text boxes
  container: { //creates the background color and size
    flex: 1,
    jusitfyContent: 'space-between',
    backgroundColor: 'black',
    margin: 0,
  },
  logo: { //top text box
    flex: 0.3,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'white',
    borderBottomWidth: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    
  },
  top: { //Second top text box
    flex: 0.3,
    backgroundColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 0,
    borderColor: 'white',
  },
  bottom: { //bottom text box
    flex: 0.7,
    backgroundColor: 'black',
    borderWidth: 2,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: 5,
    borderColor: 'white',
  },
  map: { //map
    width: '100%',
    height: '55%',
  },
  });

  export default ViewBoxTopandBottom; 