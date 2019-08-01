import React, { Component } from 'react';
import { AppRegistry, Text, Alert ,Platform, StatusBar, StyleSheet, View, Dimensions, Button, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { withOrientation } from 'react-navigation';
import axios from 'axios';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      login: '',
      password: ''
    }
  }

  sendLogs() {
    axios.post('http://172.31.34.159:4242/login', this.state)
    .then(function (response) {
      console.log(response.data);
    })
  }

  render(){
    console.disableYellowBox = true; 
    return(
      <View style={[{resizeMode: 'center', backgroundColor: '#2d3436', width: '100%', height: '100%'}]}>
       <View style={{resizeMode: 'center', top: 50, fontSize: 60, textAlign: 'center', backgroundColor: '#2d3436'}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 35, fontWeight: 'bold'}}>- Login -</Text>
      </View>
      <View style={{resizeMode: 'center', top: 100}}>
        <TextInput  style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
          placeholder="E-mail Adress"
          onChangeText={(email) => this.setState({login: email})}
        />

        <TextInput secureTextEntry={true} style={{margin: 15, height: 40, padding: 10, borderColor: '#dfe6e9', borderWidth: 2, backgroundColor:'white', color: '#2c3e50', borderRadius:5}}
          placeholder="Password"
          autoCorrect={false}
          onChangeText={(password) => this.setState({password: password})}
        />

        <TouchableOpacity onPress={this.sendLogs.bind(this)} style={{backgroundColor:'#636e72', borderRadius:5 , padding: 10, margin: 15, height: 40,}}>
          <Text
      style={{color: 'white'}}> Submit </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
