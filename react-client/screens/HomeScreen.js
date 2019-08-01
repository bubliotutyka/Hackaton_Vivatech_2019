import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import Swiper from 'react-native-swiper';

import Profile from './Profile';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    var index = 0;
    if (this.props.navigation.getParam(index)){
     index = this.props.navigation.getParam(index);
    }
    
    console.disableYellowBox = true;
    const {navigate} = this.props.navigation;
    return (
      <Swiper style={styles.wrapper} horizontal={false} loop={false} index={index} showsPagination={false}>
      <Swiper style={styles.wrapper} horizontal={true} loop={true} index={0} showsPagination={true}>
        <Profile name="Amaury Feron" uri="https://cdn.discordapp.com/attachments/576434451513344001/579255258686029833/file1.jpeg" job="Hacker" describ="Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,"/>
        <Profile name="Benjamin Renel" uri="https://cdn.discordapp.com/attachments/515435601701371925/579253394699452457/BENJAMIN_RENEL_-_Linkdin.jpg" job="Developpeur Web" describ="Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,"/>
      </Swiper>
        <View style={styles.slide2}>
          <Profile name="Salem Loumissi" uri ="https://cdn.discordapp.com/attachments/500253019649343489/579247686029410304/salemsocial.png" job="Etudiant/Formation Web" describ="Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,"/>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
