import { Dropdown } from 'react-native-element-dropdown'; // import dropdown interface
import React, { useState } from 'react';

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
  
  //dropdown component
  
const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const DropdownValue = () => {
      if (value || isFocus){
        return(
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Select BAR
        </Text>
        );
        }
        return null;
    }
    return (
      <View style={styles.container}>
        {DropdownValue()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          //searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default {DropdownComponent};