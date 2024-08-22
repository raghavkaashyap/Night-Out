import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';

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
      <MapView style={styles.map}> 
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      </MapView>
      <View style={styles.bottom} />
      <Text style ={{position: 'absolute', top: 660, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white'}}>
        BAR STATISTICS:
        </Text>
    </View>
  );
};


const INITIAL_REGION = {
  latitude : 37.33,
  longitude : -122,
  latitudeDelta : 2,
  longitudeDelta : 2
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
    borderWidth: 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    
  },
  top: { //top text box
    flex: 0.3,
    backgroundColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: 'white',
  },
  bottom: { //bottom text box
    flex: 0.7,
    backgroundColor: 'black',
    borderWidth: 2,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 5,
    borderColor: 'white',
  },
  map: { //map
    width: '100%',
    height: '55%',
  },
  });

  export default ViewBoxTopandBottom; 