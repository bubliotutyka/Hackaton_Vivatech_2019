import React from 'react';
import { RadioButton } from 'react-native-paper';
import Axios from 'axios'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { requireNativeViewManager } from 'expo-core';

export default class QuizzScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            togglePage: -1,
            checked: 0,
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            questions: []
        }
        this._handleChangePage = this._handleChangePage.bind(this)
        this._sendDatas = this._sendDatas.bind(this)
    }
    componentDidMount(){
        Axios.get('http://172.31.34.159:4242/getQuestion').then((res) => {
            console.log(res.data)
            this.setState({
                questions: res.data
                
            })
        })
    }
    _handleChangePage(){
        let temp = this.state.togglePage
        temp++
        this.setState({
            togglePage: temp
        })
    }
    _sendDatas(){
        console.log(this.state)
        var arr = []
        for(var i = 0; i <= 8; i++){
            arr.push(this.state[i])
        }
        console.log(arr)
        Axios.post('http://172.31.34.159:4242/MakeProfile', {data: arr}).then((res) => {
            console.log(res)
        })
        console.log('Her send for props')
        this.props.navigation.navigate('HomeStack', {index: 1});
    }
    render(){
      console.disableYellowBox = true; 
        let render, button, radios
        const { checked } = this.state;
        radios =    <>
                    <RadioButton
                      status={checked === -3 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: -3,
                                [this.state.togglePage]: -3
                          })
                      }}
                    />
                    <RadioButton
                      status={checked === -2 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: -2,
                                [this.state.togglePage]: -2
                          })
                      }}
                    />
                    <RadioButton
                      status={checked === -1 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: -1,
                                [this.state.togglePage]: -1
                          })
                      }}
                    />
                    <RadioButton
                      value={0}
                      status={checked === 0 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: 0,
                                [this.state.togglePage]: 0
                          })
                      }}
                    />
                    <RadioButton
                      value={1}
                      status={checked === 1 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: 1,
                                [this.state.togglePage]: 1
                          })
                      }}
                    />
                    <RadioButton
                      value={2}
                      status={checked === 2 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: 2,
                                [this.state.togglePage]: 2
                          })
                      }}
                    />
                    <RadioButton
                      value={3}
                      status={checked === 3 ? 'checked' : 'unchecked'}
                      onPress={() => {
                          this.setState({
                                checked: 3,
                                [this.state.togglePage]: 3
                          })
                      }}
                    />
                    </>
        if(this.state.togglePage >= 0 && this.state.togglePage <= 8){
            render =
            <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', paddingVertical: 15}}>
                <View>
                    <Text style={styles.textStarting}>Starting: </Text>
                </View>
                <Text style={styles.textStarting}>{this.state.questions.result[this.state.togglePage].text_question}</Text>
                <View style={styles.displayRadio}>
                    <View style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:'row'}}>
                        {radios}
                    </View>
                </View>
            </View>
            button = <Button  onPress={this._handleChangePage} title="Next step"/>

        } else if(this.state.togglePage === -1){
            render =    <View>
                            <Text style={styles.textQuestions}>In order to know you, we're going to ask you some question, Ready? let's Go !</Text>
                        </View>
            button = <Button  onPress={this._handleChangePage} title="Next step"/>
        } else if(this.state.togglePage === 9){
            render =    <View>
                            <Text style={styles.textQuestions}>Thanks to have answered the quiz you can now send your datas !</Text>
                        </View>
            button = <Button  onPress={this._sendDatas} title="Send datas"/>
        }
        return(
            <View style={styles.container}>
                <View style={styles.containeQuizz}>
                <ImageBackground source={{uri:"https://cdn.welcometothejungle.co/uploads/collection/cover/2664/154883/career-hacking.jpg"}} style={{width: '100%', height: '100%'}}>
                    <Text style={styles.introduceQuizz}>Oui'Studies</Text>
                    {render}
                    <View style={{position: "absolute", bottom: 200, width: width}}>
                        {button}
                    </View>
                </ImageBackground>
                </View>
            </View>
        )
    }
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create(
    {
        container: {

            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
        },
        containeQuizz: {
            fontSize: 25,
            width: width,
            height: height,
            backgroundColor: "#ffffff",
        },
        introduceQuizz: {
            marginVertical: 30,
            fontSize: 30,
            textAlign: "center",
        },
        questions: {
            paddingVertical: 20,
            textAlign: "center",
        },
        button: {
            backgroundColor: "#fff",
            height: 50,
        }
        ,
        careerImage: {
            width: width,
            height: height,
        },
        textQuestions: {
            marginHorizontal: 5,
            marginVertical: 5,
            fontSize: 20,
            textAlign: "center"
        },
        textStarting: {
            marginHorizontal: 5,
            fontSize: 25,
            textAlign: "center",
            paddingVertical: 15,
        },
        displayRadio: {
            // justifyContent: "center",
            alignItems: "center",
        }
    }
)
