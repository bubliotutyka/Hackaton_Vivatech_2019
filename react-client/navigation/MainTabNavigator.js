import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import QuizzScreen from '../screens/QuizzScreen'
import AddEvent from '../screens/AddEvent';

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
  AddEvent: {screen: AddEvent},
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused={focused}
    name={
      Platform.OS === 'ios'
      ? `ios-information-circle${focused ? '' : '-outline'}`
      : 'md-information-circle'
    }
    />
  ),
};
const EventStack = createStackNavigator({
  Event: AddEvent,
});

EventStack.navigationOptions = {
  tabBarLabel: 'Event',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused={focused}
    name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


const QuizzStack = createStackNavigator({
  Quizz: QuizzScreen,
});

QuizzStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon style={{}}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  EventStack,
  HomeStack,
  QuizzStack,
});
