import React, { useMemo, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { markers } from '../data/markers';

export default function NightOutScreen() {
  const [selectedBarId, setSelectedBarId] = useState(null);

  const selectedBar = useMemo(
    () => markers.find((marker) => marker.key === selectedBarId) ?? null,
    [selectedBarId],
  );

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
          onChange={(item) => setSelectedBarId(item.key)}
          renderLeftIcon={() => <AntDesign style={styles.icon} color="white" name="Safety" size={20} />}
        />
      </View>

      <View style={styles.webPlaceholder}>
        <Text style={styles.webPlaceholderTitle}>Map view is available on iOS and Android.</Text>
        <Text style={styles.webPlaceholderText}>
          {selectedBar ? `Selected: ${selectedBar.name}` : 'Select a bar to view details.'}
        </Text>
      </View>

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
  webPlaceholder: {
    flex: 1,
    margin: 20,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 20,
  },
  webPlaceholderTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  webPlaceholderText: {
    color: 'white',
    textAlign: 'center',
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
