import React, { Component } from "react";
import PropTypes from "prop-types";
import * as firebase from 'firebase';
import { AsyncStorage, Alert, View, Image, Button, Text, StyleSheet } from 'react-native';

class Assignment extends Component {
  render() {

    const drinks = {
      beer: require('../assets/images/beer.png'),
      wine: require('../assets/images/wine.png'),
      cider: require('../assets/images/cider.png'),
      spirit: require('../assets/images/spirit.png'),
      cocktail: require('../assets/images/cocktail.png'),
    }

    async function markComplete(key) {
      const userID = await AsyncStorage.getItem('userID');
      if (userID != null) {
        firebase.database().ref('users/' + userID + '/assignments/' + key).update(
          {
            complete: true,
          }
        ).then(() => {
            console.log(`assignment complete`);
          }).catch((error) => {Alert.alert(`Firebase Database error: ${error}`);
        });
      } else {
        Alert.alert("There was an error.  Please log out, log back in, and try again!");
      }
    }

    const {drink, exercise, date, showDescriptionCallback, dbkey} = { ...this.props };

    return (

      <View style={styles.container}>
          <View>
            <Image
             style={{width: 30, height: 30}}
             source={drinks[drink]}
             accessibilityLabel={drink}
            />
            <Text> {Date.now() - date} </Text>
         </View>

         <View>
            <Text onPress={() => showDescriptionCallback(true, exercise.name, exercise.description)}>
              {exercise.name}
            </Text>
         </View>

         <Button
           onPress={() => markComplete(dbkey)}
           title="✓"
           color="#841584"
           accessibilityLabel="Mark Complete"
         />
      </View>
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
    padding: 15,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});

export default Assignment;
