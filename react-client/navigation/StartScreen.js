import React, { Component } from 'react';
import { AppRegistry, Text, Platform, StatusBar, StyleSheet, View, Dimensions, Button, ImageBackground } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import Login from '../screens/Login';
import Register from '../screens/Register';

export default class StartScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      choice: null,
    };
  }

  login(){
    this.setState({choice: 'login'});
  }
  register(){
    this.setState({choice: 'register'});
  }

  render(){
    console.disableYellowBox = true;
    if (this.state.choice == null) {
      return(
        <View>
          <View style={styles.up}>
            <ImageBackground source={{uri:'https://marketingweek.imgix.net/content/uploads/2018/01/04122922/career-ladder-1240.jpg'}} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
              <View style={[{ width: "50%", margin: 10, backgroundColor:'#2c3e50', borderRadius:5 }]}>
                <Button
                  onPress={this.register.bind(this)}
                  title="Register"
                  color={Platform.OS === 'ios' ? 'white': '#2c3e50'}
                  accessibilityLabel="Learn more about this purple button"
                  />
                </View>
            </View>
            </ImageBackground>
          </View>
          <View style={styles.down}>
          <ImageBackground source={{uri:'https://www.umt.edu/career/images/story-images-examples/resources.jpg'}} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
            <View style={[{ width: "50%", margin: 10, backgroundColor:'#2c3e50', borderRadius:5}]}>
              <Button
                onPress={this.login.bind(this)}
                title="Login"
                color={Platform.OS === 'ios' ? 'white': '#2c3e50'}
                accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
            </ImageBackground>
          </View>
        </View>
      );
    }
    if (this.state.choice == 'login') {
      return(
        <View>
          <Login/>
        </View>
      );
    }
    if (this.state.choice == 'register') {
      return(
        <View>
          <Register/>
        </View>
      );
    }
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  up: {
    height: height/2,
  },
  down: {
    height: height/2,
  }
});
