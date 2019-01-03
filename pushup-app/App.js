import React from 'react';
import { Alert, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import * as firebase from 'firebase';
import { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN,
        REACT_APP_DATABASE_URL, REACT_APP_STORAGE_BUCKET } from 'react-native-dotenv';


export default class App extends React.Component {
  componentDidMount() {

    const firebaseConfig = {
      apiKey: REACT_APP_API_KEY,
      authDomain: REACT_APP_AUTH_DOMAIN,
      databaseURL: REACT_APP_DATABASE_URL,
      storageBucket: REACT_APP_STORAGE_BUCKET
    };

    firebase.initializeApp(firebaseConfig);

    //Expo.Google.logInAsync(options)

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
