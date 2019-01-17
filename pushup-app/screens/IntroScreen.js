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
    key: 'screen1',
    title: 'Add a drink to your list',
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
      return <AppIntroSlider slides={slides} onDone={this._onDone}/>;

  }
}
