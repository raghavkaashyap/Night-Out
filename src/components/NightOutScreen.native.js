import React, { useMemo, useRef, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { INITIAL_REGION } from '../constants/map';
import { markers } from '../data/markers';
import { getOrCreateUUID } from '../utils/deviceId';

export default function NightOutScreen() {
  const mapRef = useRef(null);
  const [selectedBarId, setSelectedBarId] = useState(null);

  const selectedBar = useMemo(
    () => markers.find((marker) => marker.key === selectedBarId) ?? null,
    [selectedBarId],
  );

  const onBarSelect = (item) => {
    setSelectedBarId(item.key);

    if (!mapRef.current) {
      return;
    }

    mapRef.current.animateToRegion({
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: INITIAL_REGION.latitudeDelta,
      longitudeDelta: INITIAL_REGION.longitudeDelta,
    });
  };

  const onMarkerPress = async () => {
    const uuid = await getOrCreateUUID();
    if (uuid) {
      console.log('Device UUID:', uuid);
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
          value={selectedBarId}
          onChange={onBarSelect}
          renderLeftIcon={() => <AntDesign style={styles.icon} color="white" name="Safety" size={20} />}
        />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={onMarkerPress}
          >
            <Callout>
              <View>
                <Text>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.bottom}>
        {selectedBar?.website ? (
          <Text style={styles.statsText} onPress={() => Linking.openURL(selectedBar.website)}>
            BAR STATISTICS: {selectedBar.website}
          </Text>
        ) : (
          <Text style={styles.statsText}>Select a bar to see its website</Text>
        )}
      </View>
    </View>
  );
}

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
