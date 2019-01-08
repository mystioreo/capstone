import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import * as firebase from 'firebase';

import Assignment from '../components/Assignment';

export default class HomeScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'Welcome to the app!',
  // };
  //
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Button title="Show me more of the app" onPress={this._showMoreApp} />
  //       <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
  //     </View>
  //   );
  // }
  //
  // _showMoreApp = () => {
  //   this.props.navigation.navigate('Other');
  // };
  //
  // _signOutAsync = async () => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate('Auth');
  // };



  static navigationOptions = {
    header: null,
  };

  render() {


    // firebase.database().ref('users/' + getUserID()).on('value', (snapshot) => {
    //   const highscore = snapshot.val().highscore;
    //   console.log("New high score: " + highscore);
    // });

    //
    async function fetchAssignments() {
      const userID = await AsyncStorage.getItem('userID');
      const assignments = firebase.database().ref('users/' + userID + '/assignments');
      assignments.orderByChild("complete").equalTo(false).on('value', (data) => {
        console.log(data.toJSON());
      });


    }

    fetchAssignments();

    async function createAssignment(drink, exercise) {
      const userID = await AsyncStorage.getItem('userID');
      if (userID != null) {
        firebase.database().ref('users/' + userID + '/assignments/' + Date.now()).set(
          {
            drink: drink,
            exercise: exercise,
            date: Date.now(),
            complete: false,
          }
        ).then(() => {
            console.log(`added assignment to database`);
          }).catch((error) => {Alert.alert(`Firebase Database error: ${error}`);
        });
      } else {
        Alert.alert("There was an error.  Please log out, log back in, and try again!");
      }
    }

    async function getExerciseFromApi(drink) {
      try {
        const response = await fetch(
          'https://wger.de/api/v2/exercise?language=2&status=2&limit=100'
        );
        const responseJson = await response.json();

        // take out this hard-coding once user is able to select equipment from settings screen
        const invalidEquipmentList = [1, 2, 3, 5, 6, 8, 9, 10];

        // is there a cleaner / faster way to do this?
        const possibleExercises = [];
        responseJson.results.forEach((result) => {
          let valid = true;
          if (result.equipment.length === 0) {
            valid = false;
          } else {
          invalidEquipmentList.forEach((equipment) => {
            if (result.equipment.includes(equipment)) {
              valid = false;
            }
          })}
          if (valid === true) {
            possibleExercises.push(result);
          }
        })

        const exercise = possibleExercises[Math.floor(Math.random() * possibleExercises.length)];
        createAssignment(drink, exercise);

      } catch (error) {
        Alert.alert(`Exercise Database error: ${error}`);
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
             <Image
                source={
                  __DEV__
                    ? require('../assets/images/splash.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.welcomeImage}
              />
          </View>

          <View style={styles.welcomeContainer}>


            <TouchableOpacity onPress={()=>getExerciseFromApi('beer')}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/beer.png')}
                accessibilityLabel="Beer"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>getExerciseFromApi('wine')}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/wine.png')}
                accessibilityLabel="Wine"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>getExerciseFromApi('cider')}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/cider.png')}
                accessibilityLabel="Cider"
              />
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>getExerciseFromApi('cocktail')}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/cocktail.png')}
                accessibilityLabel="Cocktail"
              />
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>getExerciseFromApi('spirit')}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/spirit.png')}
                accessibilityLabel="Spirit"
              />
            </TouchableOpacity>


          </View>

          <Assignment drink="beer" />
          <Assignment drink="wine" />
          <Assignment drink="beer" />
          <Assignment drink="spirit" />
          <Assignment drink="spirit" />
          <Assignment drink="cider" />
          <Assignment drink="cocktail" />


      </ScrollView>
    </View>
  )
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    justifyContent: 'center',
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
