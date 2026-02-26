import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Touchable, Linking } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markers } from './markers';
import React, { useEffect, useRef, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const Stack = createNativeStackNavigator();

const INITIAL_REGION = {
  latitude : 42.019800,
  longitude : -93.648280,
  latitudeDelta : .01,
  longitudeDelta : .01,
};

const ViewBoxTopandBottom = () => {

  const getOrCreateUUID = async () => {
    try {
      let uuid = await AsyncStorage.getItem('@PhoneID');
      if (uuid === null) {
        uuid = Crypto.randomUUID();
        await AsyncStorage.setItem('@PhoneID', uuid);
      }
      return uuid;
    } catch(e) {
      console.error("Failed to get or create UUID", e);
    }
  }

  const handleMarkerPress = () => {
    getOrCreateUUID().then(uuid => {
      console.log("Device UUID:", uuid);
    });
  }

  const [selectedBar, setSelectedBar] = useState(null);
  const [selectedBarWebsite, setSelectedBarWebsite] = useState('');
  const mapRef = useRef(null);

  const onBarSelect = (item) => {
    setSelectedBar(item.key);
    setSelectedBarWebsite(item.website);
    const marker = markers.find(m => m.key === item.key);
    if (marker && mapRef.current) {
        mapRef.current.animateToRegion({
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo} />
      <Text style={styles.title}>NightOut</Text>
      <View style={styles.dropdownContainer}>
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={markers}
            search
            maxHeight={300}
            labelField="name"
            valueField="key"
            placeholder="Select bar"
            searchPlaceholder="Search NightOut..."
            value={selectedBar}
            onChange={onBarSelect}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="white" name="Safety" size={20} />
            )}
        />
      </View>
      <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION} showsUserLocation showsMyLocationButton>
        {markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker} onPress={handleMarkerPress}>
            <Callout>
              <View>
                <Text>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.bottom}>
        {selectedBarWebsite ? (
            <Text style={styles.statsText} onPress={() => Linking.openURL(selectedBarWebsite)}>
                BAR STATISTICS: {selectedBarWebsite}
            </Text>
        ) : (
            <Text style={styles.statsText}>Select a bar to see its website</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logo: {
    height: 100,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'white',
    borderBottomWidth: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  title: {
    position: 'absolute',
    top: 65,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  dropdownContainer: {
    backgroundColor: 'black',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: 'white',
    paddingHorizontal: 15,
  },
  dropdown: {
    height: 60,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  map: {
    flex: 1,
  },
  bottom: {
    height: 100,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'white',
    borderTopWidth: 0,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statsText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ViewBoxTopandBottom;