import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Expo from 'expo';
import * as firebase from 'firebase';
import { REACT_APP_FACEBOOK_APP_ID} from 'react-native-dotenv';
import { Icon } from 'react-native-elements'


export default class SignInScreen extends React.Component {
  state = {
    showSignInButton: true,
  };
  static navigationOptions = {
    title: 'Log In',
  };

  render() {
    return (
      <View style={styles.outerContainer}>
        { this.state.showSignInButton &&
          <TouchableOpacity onPress={this._signInAsync}>
            <View style={styles.container}  >
              <Icon
               size={100}
               name='facebook-square'
               type='font-awesome'
               color='#3b5998'
               />
             <Text style={styles.text}>Sign in with Facebook</Text>
            </View>
          </TouchableOpacity>
        }
        <Image
          style={{width: 200, height: 200, alignSelf: 'center'}}
          source={require('../assets/images/kitty.png')}
          accessibilityLabel="Cat with Bottle"
        />
      </View>
    );
  }

  _signInAsync = async () => {
    this.setState ({showSignInButton: false});
    try {
        const {
          type,
          token,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(REACT_APP_FACEBOOK_APP_ID, {
          permissions: ['public_profile','email'],
        });
        if (type === 'success') {

          await AsyncStorage.setItem('userToken', token);

          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const name = (await response.json()).name;
          // Build Firebase credential with the Facebook access token.
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
          // Sign in with credential from the Facebook user.
          firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then(async () => {
            firebase.auth().onAuthStateChanged(async (user) => {
              if (user != null) {
                await AsyncStorage.setItem('userID', user.uid);

                firebase.database().ref('users/' + user.uid).update(
                  {
                    name: name,
                  }
                ).then(() => {
                    Alert.alert(`Welcome to your Six Pack, ${name}!`);
                    try {
                      AsyncStorage.multiSet([["expert", "false"], ["barbell", "false"], ["szbar", "false"],
                      ["dumbbell", "false"], ["swissball", "false"], ["pullupbar", "false"], ["bench", "false"],
                      ["inclinebench", "false"], ["kettlebell", "false"], ["language", "2"]]);
                    } catch (error) {
                      Alert.alert(`Error loading settings: ${error}`)
                    }
                    this.props.navigation.navigate('Intro');
                  }).catch((error) => {Alert.alert(`Firebase Database error: ${error}`);
                });
              }
            });
          })
          .catch((error) => {
            Alert.alert(`Firebase Login Error: ${error}`);
          });
        } else {
          this.setState ({showSignInButton: true});
          Alert.alert('Unable to log you in.  Please try again later.');
        }
      } catch ({ message }) {
        Alert.alert(`Facebook Login Error: ${message}`);
      }
    }
  }

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    borderRadius: 15,
    borderColor: '#3b5998',
    borderWidth: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 50,

  },
  text: {
    margin: 20,
  }

});
