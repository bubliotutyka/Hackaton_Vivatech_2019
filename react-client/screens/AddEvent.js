import React, { Component } from 'react';
import { AppRegistry, Text, Alert ,Platform, StatusBar, StyleSheet, View, Dimensions, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';

// POST addBranch
{/*type formation ou jobs, title, date start and end, nom*/}

const type = [
  {
    label: 'Jobs',
    value: 'jobs',
  },
  {
    label: 'School',
    label: 'school'
  }
]

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      type: null,
      company: null,
      dateStart: null,
      dateEnd: null,
      isDateTimePickerVisible: false
    }
  }

  showDateTimePicker = () => {
   this.setState({ isDateTimePickerVisible: true });
 };

 hideDateTimePicker = () => {
   this.setState({ isDateTimePickerVisible: false });
 };

 handleDatePickedStart =async date => {
   console.log("A date has been picked STart: ", date);

    await this.setState({dateStart: date});
   this.hideDateTimePicker();
   console.log(this.state);
 };

 handleDatePickedEnd = async date => {
   console.log("A date has been picked End: ", date);
     await this.setState({dateEnd: date});
   this.hideDateTimePicker();
   console.log(this.state);
 };

  render(){
    console.disableYellowBox = true; 
    if (this.state.dateStart == null) {
      date = <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePickedStart.bind(this)}
        onCancel={this.hideDateTimePicker}
      />
    }else {
      date = <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePickedEnd}
        onCancel={this.hideDateTimePicker}
      />
    }


    return(
      <View style={styles.container}>
        <Text style={{color: 'white', margin: 15, fontSize:20 }}>Add event</Text>
        <TextInput type={'outlined'} label='Title' style={styles.input} onChangeText={(title) => this.setState({title: title})}/>
        <RNPickerSelect
          placeholder={{}}
          items={type}
          onValueChange={value => {
            this.setState({
              type: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.type}
        />
        <TextInput label='Company / School' style={styles.input} onChangeText={(company) => this.setState({company: company})}/>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        {date}
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#34495e',
  },
  input:{
    margin: 15,
    borderRadius:5
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height:50,
    margin:15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    color: 'grey',
    backgroundColor: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 50,
    margin:15,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'grey',
    backgroundColor: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
