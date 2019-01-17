import React, { Component } from "react";
import PropTypes from "prop-types";
import * as firebase from 'firebase';
import { Animated, Easing, AsyncStorage, Alert, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment';
const { width } = Dimensions.get('window');



class Assignment extends Component {
  constructor(props) {
    super(props)
    this.state= {
      xValue: new Animated.Value(0),
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({update: true}), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const drinks = {
      beer: require('../assets/images/beer.png'),
      wine: require('../assets/images/wine.png'),
      cider: require('../assets/images/cider.png'),
      spirit: require('../assets/images/spirit.png'),
      cocktail: require('../assets/images/cocktail.png'),
    }

    const _moveAnimation = () => {
      Animated.timing(this.state.xValue, {
        toValue: -width,
        duration: 500,
        easing: Easing.cubic,
      }).start();
    }

    async function markComplete(key) {
      _moveAnimation();
      const userID = await AsyncStorage.getItem('userID');

      setTimeout( () => {
        if (userID != null) {
          firebase.database().ref('users/' + userID + '/assignments/' + key).update(
            {
              complete: true,
            }
          ).catch((error) => {Alert.alert(`Firebase Database error: ${error}`);
          });
        } else {
          Alert.alert("There was an error.  Please log out, log back in, and try again!");
        }
      },505)

    }

    const {drink, exercise, date, showDescriptionCallback, dbkey} = { ...this.props };

    return (

      <Animated.View style={[styles.container, {left: this.state.xValue}]}>
        <View style={styles.drinkcontainer}>
          <Text style={styles.date}> </Text>
            <Image
             style={styles.drink}
             source={drinks[drink]}
             accessibilityLabel={drink}
            />
          <Text style={styles.date}> {moment(date).fromNow()}</Text>
         </View>

         <View style={styles.exercise}>
            <Text onPress={() => showDescriptionCallback(true, exercise)}>
              {exercise.name}
            </Text>
         </View>

         <View style={styles.complete}>
           <Icon
            raised
            name='check'
            color='#429485'
            onPress={() => markComplete(dbkey)}
            />
         </View>
       </Animated.View>

    );
  }
}

Assignment.propTypes = {
  drink: PropTypes.string,
  exercise: PropTypes.object,
  date: PropTypes.number,
  showDescriptionCallback: PropTypes.func,
  dbkey: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d6d7da',
  },
  drinkcontainer: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  drink: {
    height: 30,
    width: 30,
  },
  exercise: {
    flex: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  complete: {
    flex: 1.5,
    padding: 5,
  },
  date: {
    fontSize: 9,
    color: '#252524',
    textAlign: 'center',
  },
});

export default Assignment;
