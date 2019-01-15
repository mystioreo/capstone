import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? {alignSelf: 'center', color: Colors.tabIconSelected} : {alignSelf: 'center', color: Colors.tabIconDefault}}>
      Home
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-wine`
          : 'md-wine'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? {alignSelf: 'center', color: Colors.tabIconSelected} : {alignSelf: 'center', color: Colors.tabIconDefault}}>
      Settings
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-construct' : 'md-construct'}
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? {alignSelf: 'center', color: Colors.tabIconSelected} : {alignSelf: 'center', color: Colors.tabIconDefault}}>
      About
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
  AboutStack,
});
