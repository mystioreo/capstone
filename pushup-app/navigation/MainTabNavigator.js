import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StyledText from '../components/StyledText';
import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? {color: Colors.tabIconSelected} : {color: Colors.tabIconDefault}}>
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
    <Text style={focused ? {color: Colors.tabIconSelected} : {color: Colors.tabIconDefault}}>
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

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});
