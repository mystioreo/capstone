import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
  TouchableHighlight,
  Modal,
} from 'react-native';



import { MonoText } from '../components/StyledText';

import * as firebase from 'firebase';

import Assignment from '../components/Assignment';
import ExerciseInfo from '../components/ExerciseInfo';
import ExerciseVideo from '../components/ExerciseVideo';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      modalVisible: false,
      modalExercise: {},
      expert: false,
    }
  }

  componentDidMount() {
    const fetchAssignments = async () => {
      const userID = await AsyncStorage.getItem('userID');
      const assignments = firebase.database().ref('users/' + userID + '/assignments');

      assignments.orderByChild("complete").equalTo(false).on('value', (data) => {
        const incompleteAssignments = data.toJSON();
        this.setState({assignments: incompleteAssignments});
      });
    }
    fetchAssignments();
  }

  static navigationOptions = {
    title: 'Six Pack',
    headerStyle: {
          backgroundColor: '#429485'
        },

  };

  render() {
    async function createAssignment(drink, exercise) {
      const userID = await AsyncStorage.getItem('userID');

      if (userID != null) {
        firebase.database().ref('users/' + userID + '/assignments/').push(
          {
            drink: drink,
            exercise: exercise,
            date: Date.now(),
            complete: false,
          }
        ).catch((error) => {Alert.alert(`Firebase Database error: ${error}`);
        });
      } else {
        Alert.alert("There was an error.  Please log out, log back in, and try again!");
      }
    }

    async function getExercisefromDatabase(drink) {
        const availableExercises = {
          0: "bicepcurls",
          1: "overheadpress",
          2: "pushups",
          3: "situps",
          4: "squats",
          5: "superman",
          6: "toelifts",
        }

        const exercise = availableExercises[Math.floor(Math.random() * 7)];

        firebase.database().ref('/exercises/' + exercise).once('value').then(function(snapshot) {
          createAssignment(drink, snapshot.val());
        });
    }

    async function getExerciseFromApi(drink) {
      let expert = await AsyncStorage.getItem('expert');
      expert = expert === "true" ? true : false;

      if (!expert) {
        getExercisefromDatabase(drink);

      } else {
        try {
          const language = await AsyncStorage.getItem('language');
          const response = await fetch(
            'https://wger.de/api/v2/exercise?language=' + language + '&status=2&limit=100'
          );
          const responseJson = await response.json();
          const invalidEquipmentList = [];
          const equipmentNumbers = {"barbell": 1, "szbar": 2, "dumbbell": 3, "swissball": 5,
                                    "pullupbar": 6, "bench": 8, "inclinebench": 9, "kettlebell": 10};

          await AsyncStorage.multiGet(['barbell','szbar', 'dumbbell', 'swissball',
                              'pullupbar', 'bench', 'inclinebench', 'kettlebell'],
                              (err, stores) => {
                                stores.map((result, i, store) => {
                                  // get at each store's key/value so you can work with it
                                  const key = store[i][0];
                                  const value = store[i][1];

                                  if (value === "false") {
                                    invalidEquipmentList.push(equipmentNumbers[key]);
                                  }
                                });
                              });

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






    }

    const populateAssignments = () => {
      const assignments = this.state.assignments;
      if (assignments) {
      return Object.keys(assignments).map( (keyName, keyIndex) => {
        const {drink, exercise, date} = { ...assignments[keyName] };

        return (
          <Assignment
            key={date}
            dbkey={keyName}
            drink={drink}
            exercise={exercise}
            date={date}
            showDescriptionCallback={showDescription}
          />
        )
      })} else {
        return (
            <Image
              style={{width: 200, height: 200, marginTop: 200, alignSelf: 'center'}}
              source={require('../assets/images/kitty.png')}
              accessibilityLabel="Cat with Bottle"
            />
        )
      }
  }

    const showDescription = (visible, exercise) => {
      this.setState({modalVisible: visible, modalExercise: exercise});
    }


    return (
      <View style={styles.container}>

          <View style={styles.drinksContainer}>

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

          <ScrollView>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {showDescription(false);}}
              >


              <View style={{marginTop: 100}}>

                <ScrollView>
                  <ExerciseInfo exercise={this.state.modalExercise} />
                  <TouchableHighlight
                    onPress={() => {
                      showDescription(false);
                    }}>
                    <Text style={styles.center}>Close</Text>
                  </TouchableHighlight>
                </ScrollView>
              </View>
            </Modal>
            {populateAssignments()}
          </ScrollView>
    </View>
  )
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4ECE5',
    paddingTop: 30,
  },
  contentContainer: {
    paddingTop: 30,

  },
  drinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
  center: {
    color: '#429485',
    alignSelf: 'center',
    margin: 30,
    fontSize: 18,

  }
});
