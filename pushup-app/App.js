import React from 'react';
import { Alert, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Expo from 'expo';
import AppNavigator from './navigation/AppNavigator';
import * as firebase from 'firebase';
import { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN,
        REACT_APP_DATABASE_URL, REACT_APP_STORAGE_BUCKET,
        REACT_APP_FACEBOOK_APP_ID} from 'react-native-dotenv';


export default class App extends React.Component {
  componentDidMount() {

    const firebaseConfig = {
      apiKey: REACT_APP_API_KEY,
      authDomain: REACT_APP_AUTH_DOMAIN,
      databaseURL: REACT_APP_DATABASE_URL,
      storageBucket: REACT_APP_STORAGE_BUCKET
    };

    firebase.initializeApp(firebaseConfig);

    async function logIn() {
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
          Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

    logIn();



    // const database = firebase.database();
    //
    //
    // database.ref('users').on('value', (data) => {
    //   console.log(data.toJSON());
    // });
    //
    //
    // database.ref('users/003').set(
    //   {
    //     name: "CL",
    //     age: 8,
    //   }
    // ).then(() => {Alert.alert('Added to DATABASE!');
    // }).catch((error) => {Alert.alert('ERRORRR');
    // });
    //
    // database.ref('/users/003/name').remove();

  }



  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
