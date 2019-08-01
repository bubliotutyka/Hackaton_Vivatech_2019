import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { AppRegistry, Text, Alert ,Platform, StatusBar, StyleSheet, View, Dimensions, ImageBackground, TextInput, TouchableOpacity, } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { withOrientation } from 'react-navigation';
import axios from 'axios';
import DateTimePicker from "react-native-modal-datetime-picker";

import QuizzScreen from './QuizzScreen';



export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
        registered: false,
        login: '',
        password: '',
        last_name: '',
        first_name: '',
        mail: '',
        age: null,
    }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = age => {
    console.log("A date has been picked: ", age);
    this.setState({age: age});
    console.log(this.state);
    this.hideDateTimePicker();
  };

  sendLogs() {
      axios.post('http://172.31.34.159:4242/signin', this.state)
      .then(function (response) {
          console.log(response.data);
        })
    }

    render(){
      console.disableYellowBox = true;
      if (this.state.registered == false) {
        return(
    <View style={[{resizeMode: 'center', backgroundColor: '#2d3436', width: '100%', height: '100%'}]}>
      <View style={{resizeMode: 'center', top: 50, fontSize: 60, textAlign: 'center', backgroundColor: '#2d3436'}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 35, fontWeight: 'bold'}}>- Register -</Text>
      </View>
      <View style={{resizeMode: 'center', top: 100}}>
        <TextInput  style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
          placeholder="Login"
          onChangeText={(login) => this.setState({login: login})}
        />

        <TextInput secureTextEntry={true} style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
            placeholder="Password"
            autoCorrect={false}
            onChangeText={(password) => this.setState({password: password})}
        />

        <TextInput  style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
            placeholder="E-mail Adress"
            onChangeText={(mail) => this.setState({mail: mail})}
        />

        <TextInput  style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
          placeholder="First Name"
          onChangeText={(first_name) => this.setState({first_name: first_name})}
        />

        <TextInput  style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
          placeholder="Last Name"
          onChangeText={(last_name) => this.setState({last_name: last_name})}
        />
        <View style={{backgroundColor: '#2d3436'}}>
        <DateTimePicker
        mode = 'date'
        datePickerModeAndroid = 'spinner'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

        <TouchableOpacity onPress={this.showDateTimePicker} style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}>
          <Text
      style={{color: '#b2bec3'}}> Birthday Date</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.sendLogs.bind(this)} style={{backgroundColor:'#636e72', borderRadius:5 , padding: 10, margin: 15, height: 40,}}>
          <Text
      style={{color: 'white'}}> Submit </Text>
        </TouchableOpacity>
            </View>
          </View>
    </View>
    );
  }
  if (this.state.registered == true) {
    return(
      <QuizzScreen/>
    );
  }
  }
}
