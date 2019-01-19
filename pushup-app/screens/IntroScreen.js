import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'screen0',
    title: "Welcome to your Six Pack! \nLet's get started with a quick tour.",
    image: require('../assets/images/largeIcon.png'),
    imageStyle: styles.image,
    backgroundColor: '#DA859A',
  },
  {
    key: 'screen1',
    title: 'Add drinks to your list',
    image: require('../assets/images/drinkscreen.png'),
    imageStyle: styles.image,
    backgroundColor: '#429485',
  },
  {
    key: 'screen2',
    title: 'Get exercise details',
    image: require('../assets/images/exercisescreen.png'),
    imageStyle: styles.image,
    backgroundColor: '#C9A991',
  },
  {
    key: 'screen3',
    title: 'Customize using Expert Mode',
    image: require('../assets/images/equipmentscreen.png'),
    imageStyle: styles.image,
    backgroundColor: '#DA859A',
  }
];

export default class IntroScreen extends React.Component {

  _onDone = () => {
    this.props.navigation.navigate('App');
  }
  render() {
      return <AppIntroSlider slides={slides} showSkipButton={true} showPrevButton={true} bottomButton={true} onSkip={this._onDone} onDone={this._onDone}/>;

  }
}
