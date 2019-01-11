import React from 'react';
import { Text, Alert, Picker, View, ScrollView, Button, StyleSheet, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: "2",
      barbell: false,
      szbar: false,
      dumbbell: false,
      swissball: false,
      pullupbar: false,
      bench: false,
      inclinebench: false,
      kettlebell: false
    }
  }

  componentDidMount() {
    const getSettings = async () => {
      const userSettings = await AsyncStorage.multiGet(['barbell','szbar', 'dumbbell', 'swissball',
                                                        'pullupbar', 'bench', 'inclinebench', 'kettlebell']);
      userSettings.forEach( (setting) => {
        this.setState({
          [setting[0]]: setting[1],
        });
        console.log(setting[0]);
        console.log(setting[1]);
      })

    }

    getSettings();
  }

  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
          backgroundColor: '#429485'
        },
  };

  render() {

    const changeSettings = async (setting) => {
      const checked = this.state[setting];
      try {
        await AsyncStorage.setItem(setting, checked === "true" ? "false" : "true");
        this.setState({[setting]: checked === "true" ? "false" : "true"});
      } catch (error) {
          Alert.alert("There was an error saving your settings.  Please try again.")
      }
    }

    const changeLanguage = async (language) => {
      try {
        await AsyncStorage.setItem('language', language);
        this.setState({language});
      } catch (error) {
          Alert.alert("There was an error saving your settings.  Please try again.")
      }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Text style={styles.center}>Equipment</Text>
            <CheckBox
              title='Barbell'
              checked={this.state.barbell === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('barbell')}
            />

            <CheckBox
              title='SZ-bar'
              checked={this.state.szbar === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('szbar')}
            />

            <CheckBox
              title='Dumbbell'
              checked={this.state.dumbbell === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('dumbbell')}
            />

            <CheckBox
              title='Swiss Ball'
              checked={this.state.swissball === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('swissball')}
            />

            <CheckBox
              title='Pull-up Bar'
              checked={this.state.pullupbar === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('pullupbar')}
            />

            <CheckBox
              title='Bench'
              checked={this.state.bench === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('bench')}
            />

            <CheckBox
              title='Incline Bench'
              checked={this.state.inclinebench === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('inclinebench')}
            />

            <CheckBox
              title='Kettlebell'
              checked={this.state.kettlebell === "true" ? true : false}
              checkedColor='#429485'
              onPress={() => changeSettings('kettlebell')}
            />


          <View style={styles.languagecontainer}>
            <Text style={styles.center}>Exercise Language</Text>
            <Picker
              selectedValue={this.state.language}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}>
              <Picker.Item label="Deutsch" value="1" />
              <Picker.Item label="English" value="2" />
            </Picker>
          </View>
          <View style={styles.logout}>
            <Button title="Log Out" onPress={this._signOutAsync} color='#429485' />
          </View>

        </ScrollView>
      );
  }

   _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  languagecontainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  contentContainer: {
    justifyContent: 'flex-start',
  },
  center: {
    padding: 10,
    alignSelf: 'center',
  },
  picker: {
    flex: 1,
    margin: 0,
    position: 'absolute',
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  logout: {
    flex: 1,
    marginTop: 120,
    paddingBottom: 50,
    paddingHorizontal: 50,
    alignSelf: 'flex-end',
  }
});
