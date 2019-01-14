import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import IntroScreen from '../screens/IntroScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const IntroStack = createStackNavigator({ Intro: IntroScreen });

export default createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
    Intro: IntroStack,
  },
  {
  initialRouteName: 'AuthLoading',
  }
);
