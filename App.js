import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Touchable } from 'react-native';
import MapView, { Callout, MapCallout, MapOverlay, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markers } from './Screens/markers';
import React, { useEffect, useRef, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from 'react-router-dom';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';



const Stack = createNativeStackNavigator();


// const { navigate } = this.props.navigation;

// const AppButton = ({ onPress, title}) => (
//   <TouchableOpacity onPress={onPress} styles={styles.appButtonContainer}>
//     <Text style={styles.appButtonText}>{title}</Text>
//     </TouchableOpacity>
// );

const INITIAL_REGION = {
  latitude : 42.019800,
  longitude : -93.648280,
  latitudeDelta : .01,
  longitudeDelta : .01,
};

// const data = [
//   {key:'1', value: "AJ's Ultra Lounge"},
//   {key: '2', value: "Bar la Tosca"},
//   {key: '3', value: "BNC Field House"},  
//   {key: '4', value: "Cy's Roost"},
//   {key: '5', value: "Es Tas Bar and Grill"},
//   {key: '6', value: "London Underground"}, 
//   {key: '7', value: "Mickey's Irish Pub"}, 
//   {key: '8', value: "Outlaws"}, 
//   {key: '9', value: "Paddy's Irish Pub"},
//   {key: '10', value: "The Blue Owl Bar"},  
//   {key: '11', value: "Thumbs"},
//   {key: '12', value: "Welch ave. Station"}
//  ];





const ViewBoxTopandBottom = ({ navigation }) => {

  const phoneID = async () => {
    try {
      const value = await AsyncStorage.getItem('@PhoneID')
      if (value === null) {
        value = Math.random(10000000);
        console.log(value);
        await AsyncStorage.setItem('@PhoneID',value)
      }
      alert(value);
      return value;
    } catch(e) {

    }
  }
  const handleMarkerPress = (index) => {
    //alert(index);
    //console.log(JSON.stringify(phoneID()));
    phoneID();
  }

  const [name, setValue] = useState(null);
  const [data, setData] = new useState('');
  const markerRef = useRef();

  const displaySelectedMarker = (value) => {
    //  alert(markers.find(function(el){return el.key==='11'}).name);
     const markerFound = markers.find(function(el){return el.key==='11'});
    // alert(value);
     setData(markers.find(function(el){return el.name===value}).website);
     //markerRef.current && markerRef.current.showCallout();
     
  
     
  
    //  document.getElementById('11').innerHTML = (<View><Text> {markerFound.name} </Text></View>);
     
        // <Marker title='Meeeee' coordinate={markerFound} ref={markerFound => { markerFound.showCallout.name}}>
        // <Callout>
        //     <Text> HIiiiiiiiiii </Text>
        //   </Callout>
        //  </Marker>
    //  <Marker>
    //   <Callout>
    //     <View>
    //       <Text> {markerFound.name} </Text>
    //     </View>
    //   </Callout>
    // </Marker>
  };

  return (

    <View style={styles.container}>
      <View style={styles.logo} />
      <Text style ={{position: 'absolute', top: 65, left: 170, right: 0, bottom: 0, justifyContent: 'top', alignItems: 'center', fontWeight: 'bold', color: 'white'}}>
        NightOut
        </Text>
        <View style={styles.appButtonContainer}>
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
        value={name}
        onChange={item => {
          setValue(item.value); displaySelectedMarker(item.name); 
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="white" name="Safety" size={20} />
        )}
      />
     </View>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION} showsUserLocation showsMyLocationButton>
      {markers.map((marker, index) => (
        <Marker id={index} key={index} coordinate={marker} showCallout={true} ref={index === 11 ? markerRef : undefined} onPress={() => handleMarkerPress(index)}>
          <Callout>
            <View>
              <Text> {marker.name} </Text>
              </View>
            </Callout>
        </Marker>
      ))}
      </MapView>
      <View style={styles.bottom} />
      <Text style ={{position: 'absolute', top: 660, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white'}}
      onPress={() => Linking.openURL(data)}
      >
        BAR STATISTICS: {data}
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
  appButtonContainer: {
    height: '10%',
    backgroundColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: 'white',
    justifyContent: "center",
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  dropdown: {
    margin: 20,
    height: 60,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
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