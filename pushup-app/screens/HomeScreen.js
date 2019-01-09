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
  Modal,
  WebView,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import * as firebase from 'firebase';

import Assignment from '../components/Assignment';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      modalVisible: false,
      modalTitle: "",
      modalDescription: "",
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
    header: null,
  };

  render() {

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


// console.log(invalidEquipmentList);
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

        // console.log(possibleExercises);
        const exercise = possibleExercises[Math.floor(Math.random() * possibleExercises.length)];
        createAssignment(drink, exercise);

      } catch (error) {
        Alert.alert(`Exercise Database error: ${error}`);
      }
    }

    const populateAssignments = () => {
      const assignments = this.state.assignments;
      if (assignments) {
      return Object.keys(assignments).map( (keyName, keyIndex) => {
        const {drink, exercise, date} = { ...assignments[keyName] };

        return (
          <Assignment
            key={keyIndex}
            drink={drink}
            exercise={exercise}
            date={date}
            showDescriptionCallback={showDescription}
          />
        )
    })}}

    const showDescription = (visible, title, description) => {
    this.setState({modalVisible: visible, modalTitle: title, modalDescription: description });
    }


    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.drinksContainer}>
             <Image
                source={
                  __DEV__
                    ? require('../assets/images/splash.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.welcomeImage}
              />
          </View>

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


            <TouchableOpacity onPress={()=>setModalVisible(true, "hello")}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/spirit.png')}
                accessibilityLabel="Spirit"
              />
            </TouchableOpacity>


          </View>


          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 100}}>
                <View>
                  <Text>{this.state.modalTitle}</Text>
                    <WebView
          originWhitelist={['*']}
          source={{ html: '<h1>Hello world</h1>' }}
        />

                  {
                  // <WebView
                  //   originWhitelist={['*']}
                  //   source={{ html: '<p>Get on a mat and lie on your back. Contract your abs, stretch your raise and legs and raise them (your head and shoulders are also be raised). Make sure your lower back remains in contact with the mat.</p>' }}
                  // />
                }
                {console.log(this.state.modalDescription)}
                <Text>{this.state.modalDescription}</Text>

                  <TouchableHighlight
                    onPress={() => {
                      showDescription(false);
                    }}>
                    <Text>Close</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            {populateAssignments()}
          </View>



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
  drinksContainer: {
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
