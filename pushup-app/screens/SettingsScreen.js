import React from 'react';
import { Picker, View, Button, StyleSheet, AsyncStorage } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { CheckBox } from 'react-native-elements';

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

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */

    return (
        <View style={styles.container}>
          <Button title="Log Out" onPress={this._signOutAsync} />

            <CheckBox
              title='Barbell'
              checked={this.state.barbell}
              onPress={() => this.setState({barbell: !this.state.barbell})}
            />

            <CheckBox
              title='SZ-bar'
              checked={this.state.szbar}
              onPress={() => this.setState({szbar: !this.state.szbar})}
            />

            <CheckBox
              title='Dumbbell'
              checked={this.state.dumbbell}
              onPress={() => this.setState({dumbbell: !this.state.dumbbell})}
            />

            <CheckBox
              title='Swiss Ball'
              checked={this.state.swissball}
              onPress={() => this.setState({swissball: !this.state.swissball})}
            />

            <CheckBox
              title='Pull-up Bar'
              checked={this.state.pullupbar}
              onPress={() => this.setState({pullupbar: !this.state.pullupbar})}
            />

            <CheckBox
              title='Bench'
              checked={this.state.bench}
              onPress={() => this.setState({bench: !this.state.bench})}
            />

            <CheckBox
              title='Incline Bench'
              checked={this.state.inclinebench}
              onPress={() => this.setState({inclinebench: !this.state.inclinebench})}
            />

            <CheckBox
              title='Kettlebell'
              checked={this.state.kettlebell}
              onPress={() => this.setState({kettlebell: !this.state.kettlebell})}
            />

            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Deutsch" value="1" />
              <Picker.Item label="English" value="2" />
            </Picker>
        </View>
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
});
