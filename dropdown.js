import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
//import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markers } from './Screens/markers';


//stores a list of bars for the dropdown


const data = [
    {key:'1', value: "AJ's Ultra Lounge"},
    {key: '2', value: "Bar la Tosca"},
    {key: '3', value: "BNC Field House"},  
    {key: '4', value: "Cy's Roost"},
    {key: '5', value: "Es Tas Bar and Grill"},
    {key: '6', value: "London Underground"}, 
    {key: '7', value: "Mickey's Irish Pub"}, 
    {key: '8', value: "Outlaws"}, 
    {key: '9', value: "Paddy's Irish Pub"},
    {key: '10', value: "The Blue Owl Bar"},  
    {key: '11', value: "Thumbs"},
    {key: '12', value: "Welch ave. Station"}
   ];
   
   
   const DropdownComponent = () => {
    const [value, setValue] = useState(null);
   
   
    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="value"
        valueField="key"
        placeholder="Select bar"
        searchPlaceholder="Search NightOut..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
    );
   };
   
   
   
   
   
   
   const styles = StyleSheet.create({
    dropdown: {
      margin: 20,
      height: 60,
      borderBottomColor: 'black',
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
    },
    selectedTextStyle: {
      fontSize: 16,
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
   

   export default DropdownComponent;