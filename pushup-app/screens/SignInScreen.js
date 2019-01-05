import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Button,
  Alert,
} from 'react-native';


// import { Alert, Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import * as Expo from 'expo';
// import AppNavigator from './navigation/AppNavigator';
import * as firebase from 'firebase';
import { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN,
        REACT_APP_DATABASE_URL, REACT_APP_STORAGE_BUCKET,
        REACT_APP_FACEBOOK_APP_ID} from 'react-native-dotenv';


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  };

  render() {
    return (
      // add real facebook login icon here
      <View style={styles.container}>
        <Button title="Log in with Facebook" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {

    try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(REACT_APP_FACEBOOK_APP_ID, {
          permissions: ['public_profile'],
        });
        if (type === 'success') {

          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const name = (await response.json()).name;
          // Build Firebase credential with the Facebook access token.
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
          // Sign in with credential from the Facebook user.
          firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then(() => {
            Alert.alert('Logged in!', `Hi ${name}!`);
            this.props.navigation.navigate('App');
          })
          .catch((error) => {
            Alert.alert(`Firebase Login Error: ${error}`);
          });

        } else {
          // type === 'cancel'
          Alert.alert('Unable to log you in.  Please try again later.');
        }
      } catch ({ message }) {
        Alert.alert(`Facebook Login Error: ${message}`);
      }


  // async function loginWithFacebook() {
    // const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    //   REACT_APP_FACEBOOK_APP_ID,
    //   { permissions: ['public_profile'] }
    // );

  //   if (type === 'success') {
  //     // Build Firebase credential with the Facebook access token.
  //     const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //
  //     // Sign in with credential from the Facebook user.
  //     firebase.auth().signInAndRetrieveDataWithCredential(credential)
  //     .then(() => {
  //       Alert.alert('Logged in!', `Hi!`);
  //       this.props.navigation.navigate('App');
  //     })
  //     .catch((error) => {
  //       Alert.alert(`Facebook Login Error: ${error}`);
  //     });
  //   }
  // }



  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
