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
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }



  _signInAsync = async () => {
  // async function loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      REACT_APP_FACEBOOK_APP_ID,
      { permissions: ['public_profile'] }
    );

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then(() => {
        Alert.alert('Logged in!', `Hi!`);
        this.props.navigation.navigate('App');
      })
      .catch((error) => {
        Alert.alert(`Facebook Login Error: ${error}`);
      });
    }
  }



  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
